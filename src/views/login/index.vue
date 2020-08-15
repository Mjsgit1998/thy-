<template>
  <div class="login">
      <!-- 设置咱中间区域 ELement UI  卡片-->
      <!-- 组件（卡片） -->
      <el-card class="login-card">
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <!-- 表单 -->
          <el-form ref="formobj" :model="loginForm" :rules="loginRules" style="margin-top:20px">
              <!-- 一个表单域就是一个form-item-->
              <el-form-item prop="mobile">
                  <!-- 手机号 -->
                <el-input v-model="loginForm.mobile"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <!-- 验证码 -->
                  <el-input style="width:200px" v-model="loginForm.code"></el-input>
                  <el-button style="float:right">发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="check">
                  <!-- 选框 -->
                   <el-checkbox v-model="loginForm.check">我已阅读并同意你列举出来的<el-link type="primary">霸王条款</el-link></el-checkbox>
              </el-form-item>
              <el-form-item>
                   <el-button style="width:100%" type="primary" @click="login">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 需要校验的表单数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否勾选
      },
      //   校验规则
      loginRules: {
        //   key 校验的字段名： value （数组=》校验规则）
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          {
            pattern: /^\d{6}$/, message: '请输入6位正确验证码'
          }
        ],
        check: [{
          validator: function (rule, value, callback) {
            // rule 当前的规则，value=>checked的值,callback => 回调函数
            if (value) {
              // 选中 通过
              callback()// 直接执行表示直接通过
            } else {
              callback(new Error('您必须同意'))
            }
          }
        }]
      }

    }
  },
  methods: {
    login () {
      // this.$refs.formobj 获取到el-form 对象实例
      this.$refs.formobj.validate((isOk) => {
        if (isOk) {
        //   为true 直接调用接口
          this.$axios({
            url: '/authorizations',
            data: this.loginForm,
            method: 'POST'
          }).then(res => {
            // console.log(res.data.data.token)
            window.localStorage.setItem('user-token', res.data.data.token)
            // 跳转到主页
            this.$router.push('/home')
          }).catch(() => {
            this.$message({
              message: '警告哦，您输入的信息有误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
    .login{
        background-image: url('../../assets/img/login_bg.jpg');
        background-size: cover;//自适应
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-card{
            width: 400px;
            height: 340px;
            .title {
                text-align: center;
                img{
                width: 200px;
            }
            }
        }
    }
</style>
