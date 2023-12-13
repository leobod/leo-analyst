import { ipcServicePrefix } from '@/utils/request'
const prefix = 'I18nCollector'
export const GetI18nList = ipcServicePrefix(`${prefix}/GetI18nList`)
export const SaveI18nKeyList = ipcServicePrefix(`${prefix}/SaveI18nKeyList`)
