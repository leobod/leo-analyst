import { ipcServicePrefix } from '@/utils/request'
const prefix = 'PkgLoader'
export const GetPkgInfo = ipcServicePrefix(`${prefix}/GetPkgInfo`)
