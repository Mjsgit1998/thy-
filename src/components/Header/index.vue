<template>
  <div>
      <!-- 头部组件 -->
    <el-row>
        <el-col :span="6" class="left">
           <i class="el-icon-s-fold"></i>
           <span>山西天狐云科技有限公司</span>
        </el-col>
         <!-- ? <el-col :span="8"><div class="grid-content bg-purple"></div></el-col> -->
        <!-- 右侧 -->
        <el-col :span="6" class="right">
          <el-tooltip class="item" effect="dark" content="搜索" placement="top">
           <el-input placeholder="请输入内容"></el-input>
          </el-tooltip>
           <el-tooltip class="item" effect="dark" content="消息" placement="top">
           <span>消息</span>
          </el-tooltip>
          <img src="../../assets/img/avatar.jpg" alt="">
          <!-- 下拉菜单 -->
          <el-dropdown trigger='click'>
            <span>
              水若寒宇
            </span>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>git地址</el-dropdown-item>
              <!-- 如果咱们想要给组件注册原生的事件使用一个修饰符 .native -->
              <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    onLogout () {
      // console.log(123)
    // 写我的退出
      this.$confirm('你确定要退出吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认执行
        // 删除token
        window.localStorage.removeItem('user-token')
        // 返回login
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.left{
  // display: flex;
  float: left;
  i{
    font-size: 25px;
  }
  span{
    // font-size: 25px;
  }
}
.right{
  display: flex;
  // justify-content: center;
  align-items: center;
  float:right;
  img{
    border-radius: 50%;
  }
}

</style>
