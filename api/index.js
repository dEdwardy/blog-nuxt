// 高阶函数
export default (axios) => () => ({
    index(params) {
      return axios.get('/system/user', params)
    }
  })