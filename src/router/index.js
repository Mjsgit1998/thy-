import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout'
import Login from '../views/login'
import left from '../views/left'
import Release from '../views/release'
import Home from '../views/home'
import Article from '../views/article'
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  // 一级路由容器
  {
    path: '/',
    component: Layout,
    children: [
      // 默认子路由
      {
        path: '',
        component: Home
      },
      {
        path: '/release',
        component: Release
      }, {
        path: '/article',
        component: Article
      }
    ]
  },
  // 一级路由登录页
  {
    path: '/login',
    component: Login
  }, {
    path: '/left',
    component: left
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})
// 路由拦截器 该方法接收函数作为参数
// 参数1： to 表示去哪里的路由信息
// 参数2：  from 表示来自哪里的路由信息
// 参数3： next 是一个方法，用于路由放行
// 我们要做的就是 判断一下你用户是否处在登录状态，有通过，没有跳到登录
router.beforeEach((to, from, next) => {
  // console.log(from)
  // console.log('所有的页面都要经过')
  // 如果是登录页 直接放行
  if (to.path === '/login') {
    next()
    return
  }
  // 非登录页
  // 判断是否有 token
  const token = window.localStorage.getItem('user-token')
  if (token) {
    next()
  } else {
    // 没有就跳回登录页
    next('/login')
  }
})

export default router
