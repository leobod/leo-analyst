import { ipcServicePrefix } from '@/utils/request'
const prefix = 'File'
export const OpenDirectoryDialog = ipcServicePrefix(
  `${prefix}/OpenDirectoryDialog`
)
export const OpenFileDialog = ipcServicePrefix(`${prefix}/OpenFileDialog`)
export const OpenSaveFileDialog = ipcServicePrefix(
  `${prefix}/OpenSaveFileDialog`
)
export const SaveFileManual = ipcServicePrefix(`${prefix}/SaveFileManual`)
