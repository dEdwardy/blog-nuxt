import { GET, POST, PUT, DELETE } from "./service.js";
//tags module
export const getTags = (params = {}) => GET("tags", params);
export const addTag = (params = {}) => POST("tags", params);
export const updateTag = (id,params) => PUT(`tags/${id}`, params);
export const deleteTag = (id) => DELETE(`tags/${id}`);
