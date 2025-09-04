import { ipcMain, WebContents, WebFrameMain } from "electron";
import { EventPayloadMapping } from "../../types.js";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";

export function isDev() {
    return process.env.NODE_ENV === 'development';
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => EventPayloadMapping[Key]
) {
  ipcMain.handle(key, (event) => {
    validateEventFrame(event.senderFrame);
     return handler()
  });
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload);
}

export function validateEventFrame(frame: WebFrameMain | null) {
  console.log(frame?.url);
  // Handle null frame
  if (!frame) {
    throw new Error('Invalid frame');
  }
  if(isDev() && new URL(frame.url).origin == 'http://localhost:5173'){  
    return true;
  }
  if(frame.url !== pathToFileURL(getUIPath()).toString()){
    throw new Error('Malicious event');
  }
}