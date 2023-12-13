import { ipcServicePrefix } from '@/utils/request'
const prefix = 'SettingsLoader'
export const DetectSettingsPath = ipcServicePrefix(
  `${prefix}/DetectSettingsPath`
)
export const GetSettings = ipcServicePrefix(`${prefix}/GetSettings`)
export const InitSettings = ipcServicePrefix(`${prefix}/InitSettings`)
