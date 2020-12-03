import { GET, POST, PUT, DELETE } from './index.js'
//user module
export const  getUsers = params => GET('system/user',params)
export const  getDepartTree = params => GET('system/depart',params)

//menu module
export const  getMenu = params => GET('system/menu',params)
export const  getMenuTree = params => GET('/api/routes/tree',params)
export const  setMenu = params => POST('system/menu',params)