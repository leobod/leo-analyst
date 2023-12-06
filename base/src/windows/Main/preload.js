const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('$ipc', {
    winAction: (params) => ipcRenderer.invoke('win:action', params),
    pageAction: (params) => ipcRenderer.invoke('page:action', params)
})