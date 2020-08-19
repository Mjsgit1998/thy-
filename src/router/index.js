import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout'
import Login from '../views/login'
import left from '../views/left'
import Release from '../views/release'
import Home from '../views/home'
import Article from '../views/article'
import JSONbig from 'json-bigint'
import axios from 'axios'
import Comment from '../views/comment'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 在请求去拦截器 中config 是本次请求的一些相关配置 对象
  // config 就是最后要发给后台的那个配置对象
  // 我们可以在拦截器中对congig 进行统一配置 token
  // console.log('请求拦截器', config)
  const token = window.localStorage.getItem('user-token')
  // 统一添加 token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // return config 是通行的规则
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

axios.defaults.transformResponse = [function (data, heades) {
  // console.log(data)
  // return JSONbig
  // axios 默认使用 json.parse(data)转为对象,
  // 这里我们需要手动配置 JSONbig.parse(data)一下
  // 任何接口都会返回数据
  // 所有请求接口返回的数据都要 JSONbig.parse(data) 一下
  // 但是删除返回的是 空数组
  // 空数据 转 会报错
  // 说白了当没有响应体的时候 JSONbig.parse(data) 会报错
  // 把可能会出错的 代码放到try ，把出错之后的处理放到catch里边
  try {
    return JSONbig.parse(data)
  } catch (err) {
    // 一旦try里边的代码执行引发异常，那么就会进入到catch去执行
    return {}
  }
}]
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
      },
      // 编辑：当从a 路径跳到b俩个路由使用的是同一个组件
      // 那么这个组件就不会渲染 复用
      //  正常的路由跳转会销毁，渲染新匹配的组件
      {
        path: '/release/:articleId',
        component: Release

      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/comment',
        component: Comment
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
