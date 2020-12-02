// 高阶函数
export default (axios) => () => ({
    users(params) {
      return axios.get('/system/user', { params })
    },
    departTree(params) {
      return axios.get('/system/depart', { params })
    }
  })