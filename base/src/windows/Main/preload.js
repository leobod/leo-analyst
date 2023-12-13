const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('$ipc', {
  service: (params) => ipcRenderer.invoke('service', params)
})
