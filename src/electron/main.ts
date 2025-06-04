import { app, BrowserWindow, shell } from 'electron';
import path from 'node:path';

const isDev = process.env.NODE_ENV === 'development';

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: isDev,
    },
    autoHideMenuBar: true,
    show: false,
    backgroundColor: '#0f0f0f'
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  if (!isDev) {
      mainWindow.webContents.openDevTools = () => {
        console.warn('Attempt to open DevTools blocked in production');
      };

      mainWindow.webContents.on('devtools-opened', () => {
        console.warn('DevTools opened in production, closing...');
        mainWindow.webContents.closeDevTools();
      });
    }

  const filePath = path.join(__dirname, '../dist/index.html');
  console.log('Trying to load:', filePath);

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          isDev
            ? "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; connect-src * wss://irc-ws.chat.twitch.tv"
            : "default-src 'self' 'unsafe-inline'; media-src 'self'; img-src 'self' https://i.imgur.com; connect-src 'self' https://twitch.tv; connect-src 'self' https://boosty.to; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' wss://irc-ws.chat.twitch.tv"
        ],
      },
    });
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  const loadPromise = isDev
    ? mainWindow.loadURL('http://localhost:5173')
    : mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));

  loadPromise.catch(err => {
    console.error('Window load error:', err);
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error(`Failed to load: ${validatedURL} - ${errorDescription} (${errorCode})`);
  });

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Window finished loading.');
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
