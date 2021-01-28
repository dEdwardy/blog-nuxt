import axios from "axios";
import { Message } from 'element-ui'
// 高阶函数  method 1 
// export default axios => () => ({
//   users(params) {
//     return axios.get("/system/user", { params });
//   },
// });
const service = axios.create({
  // baseURL: "http://rap2api.taobao.org/app/mock/272279",
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data; //res is my own data
    // console.log(res);
    // return res
    console.log(res)
    if (res.status === 200) {
      return res;
    } else {
      Message({
        type:'error',
        message:res.data.message.error
      })
      return Promise.reject(new Error(res.data.message.error|| "Error"));
    }
  },
  error => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export const GET = (url, params) => service.get(url, { params });
export const POST = (url, params) => service.post(url, params);
export const PUT = (url, params) => service.put(url, params);
export const DELETE = (url, params) => service.delete(url, params);
