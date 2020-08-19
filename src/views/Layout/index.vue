<template>
  <div class="home">
    <!-- 布局 -->
    <el-container>
      <!-- 左右布局
      左侧 -->
      <el-aside class="left" style="width:220px">
        <div class="menu-title" >
          <img src="../../assets/img/th.png" alt="">
        </div>
        <!-- 左侧菜单 -->
        <el-menu
        style="width:221px"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
        <!-- 菜单 -->
        <!-- 一级菜单 -->
         <el-menu-item index="/">首页</el-menu-item>
        <!-- 二级菜单 -->
        <el-submenu index="1">
        <template slot="title">内容管理</template>
          <el-menu-item index="/release">发布文章</el-menu-item>
          <el-menu-item index="/article">内容列表</el-menu-item>
          <el-menu-item >评论列表</el-menu-item>
          <el-menu-item >素材管理</el-menu-item>
      </el-submenu>
        <!-- 二级菜单 -->
          <el-submenu index="2">
        <template slot="title">粉丝管理
        </template>
          <el-menu-item >图文数据</el-menu-item>
          <el-menu-item >粉丝概况</el-menu-item>
          <el-menu-item >粉丝画像</el-menu-item>
          <el-menu-item >粉丝列表</el-menu-item>
      </el-submenu>
        <!-- 一级菜单 -->
         <el-menu-item>
          <span slot="title">账户信息</span>
        </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 上下 -->
       <el-container>
          <el-header>
            <layout-header></layout-header>
          </el-header>
        <el-main>
          <!-- 二级路由容器 -->
          <router-view :key="$route.path"></router-view>
        </el-main>
  </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
  components: {
    'layout-header': Header
  }
}
</script>

<style lang='less' scoped>
  .left{
    background-color: #545c64;
    height: 100vh;
    overflow: hidden;
  }
</style>
