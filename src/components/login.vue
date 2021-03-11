<template>
  <div  class="blue">
    <div  class="father_box">
      <div  class="son">
        <img src="../assets/img/touxiang.jpg" alt="">
      </div>
      <el-form ref="login_form_Ref"  :model="loginObject"  :rules="login_rules"  class="login_form" >
        <el-form-item prop="username" >
          <el-input   v-model="loginObject.username"      prefix-icon="iconfont icon-40one" type="text"></el-input>
        </el-form-item>
        <el-form-item prop="password" >
          <el-input  v-model="loginObject.password"   prefix-icon="iconfont icon-password"  type="password"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button type="info" @click="removeForm()">重置</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      loginObject: {
        username: 'admin',
        password: '123456'
      },
      login_rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '账号长度应该在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度应该在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    removeForm () {
      this.$refs.login_form_Ref.resetFields()
    },
    login () {
      // 对账号密码进行预验证，避免一些不必要的服务器访问请求
      this.$refs.login_form_Ref.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginObject)
        if (res.meta.status === 200) {
          this.$message.success('登录成功')
          // localStorage是持久性会话,会将token值永久保存
          // sessionStorage是会话，只有在当前页面有效
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
        } else {
          this.$message.error('登录失败')
        }
      })
    }
  }

}
</script>

<style   scoped>
  .blue {
    height: 100%;
    background-color: #2b4b6b;
  }
  .father_box {
    width:450px;
    height:350px;
    position: absolute;
    /*让盒子的左上角垂直居中并且水平居中*/
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    background-color:#fff
  }
  .son  {
    width:130px;
    height:130px;
    position: absolute;
    padding:10px;
    left:50%;
    transform: translate(-50%,-50%);
    border:1px  solid #eee;
    border-radius:50%;
    background-color:#fff;

    box-shadow: 0px 0px 10px #ddd;
  }
  .son  img{
    width: 100%;
    height:100%;
    background-color:#eee;
    border-radius:50%;
  }
  .login_form{
    position: absolute;
    top:100px;
    /*width=padding+border+width*/
    width:100%;
    padding:0px 20px;
    box-sizing: border-box;
  }

  .btn{
    display:flex;
    justify-content:flex-end;
  }
</style>
