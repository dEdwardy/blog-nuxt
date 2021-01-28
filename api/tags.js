import { GET, POST, PUT, DELETE } from "./service.js";
//tags module
export const getTags = (params = {}) => GET("tags", params);
export const addTag = (params = {}) => POST("tags", params);
export const updateTag = (params = {}) => PUT("tags", params);
