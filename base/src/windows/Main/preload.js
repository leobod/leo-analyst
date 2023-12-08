const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('$ipc', {
  winAction: (params) => ipcRenderer.invoke('win:action', params),
  fileAction: (params) => ipcRenderer.invoke('file:action', params),
  pageAction: (params) => ipcRenderer.invoke('page:action', params)
})
