// plugins/axios-api-plugin.js
import createApi from '~/api/index.js'
// 这里ctx也可以访问到store
export default (ctx, inject) => {
  // 注入上下文
  // 挂载到vue实例上面 (组件中使用：this.$api)
  const apiAxios = createApi(ctx.$axios)
  inject('api', apiAxios())
}