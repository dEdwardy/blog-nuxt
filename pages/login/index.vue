<template>
  <div class="login">
    <div class="login-wrapper">
      <el-form
        ref="form"
        style="width:100%"
        :rules="rules"
        :model="form"
      >
        <el-form-item
          label="Username"
          prop="username"
        >
          <el-input
            style="width:100%"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Password"
          prop="password"
        >
          <el-input
            style="width:100%"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>Remember me</el-button>
          <el-button @click="login">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'none',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  methods:{
    login(){
      this.$refs.form.validate(valid => {
        if(valid){
          this.$store.dispatch('localStorage/login',this.form)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  .login-wrapper{
    width:600px;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding:20px;
    background-color: rgba(#000,.1);
  }
}
</style>