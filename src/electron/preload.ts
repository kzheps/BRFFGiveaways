import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

type WindowAction = 'minimize' | 'maximize' | 'close';

declare global {
  interface Window {
    electronAPI: {
      windowAction: (action: WindowAction) => Promise<void>;
    };
  }
}

contextBridge.exposeInMainWorld('electronAPI', {
  windowAction: (action: WindowAction) => ipcRenderer.invoke('window-action', action),
});
