<template>
  <div class="login">
      <!-- 设置咱中间区域 ELement UI  卡片-->
      <!-- 组件（卡片） -->
      <el-card class="login-card">
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <!-- 表单 -->
          <el-form style="margin-top:20px">
              <!-- 一个表单域就是一个form-item-->
              <el-form-item>
                  <!-- 手机号 -->
                <el-input></el-input>
              </el-form-item>
              <el-form-item>
                  <!-- 验证码 -->
                  <el-input style="width:200px"></el-input>
                  <el-button style="float:right">发送验证码</el-button>
              </el-form-item>
              <el-form-item>
                  <!-- 选框 -->
                   <el-checkbox>我已阅读并同意你列举出来的<el-link type="primary">霸王条款</el-link></el-checkbox>
              </el-form-item>
              <el-form-item>
                   <el-button style="width:100%" type="primary">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

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
