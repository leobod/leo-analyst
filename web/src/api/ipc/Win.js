import { ipcServicePrefix } from '@/utils/request'
const prefix = 'Win'
export const Min = ipcServicePrefix(`${prefix}/Min`)
export const Max = ipcServicePrefix(`${prefix}/Max`)
export const IsMax = ipcServicePrefix(`${prefix}/IsMax`)
export const ToggleMax = ipcServicePrefix(`${prefix}/ToggleMax`)
export const Close = ipcServicePrefix(`${prefix}/Close`)
export const Move = ipcServicePrefix(`${prefix}/Move`)
