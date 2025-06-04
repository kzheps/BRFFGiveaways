import { IpcRenderer, IpcRendererEvent } from 'electron';

declare global {
  interface Window {
    electronAPI: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      endGiveaway: (callback: (event: IpcRendererEvent, message: string) => void) => IpcRenderer;
    }
  }
}
}
