export default ({ app }) => {
    app.router.afterEach((to, from,next) => {
      console.log(to.path)
      console.log(from)
      console.log(next)
    })
  }