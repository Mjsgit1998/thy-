<template>
  <div>声命周期
      {{name}}
    <input v-model="name">
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '张三'
    }
  },
  //   创建前后
  beforCreate () {
    //   不做处理
    console.log('实例之前创建')
  },
  created () {
    //   一般用作数据查询，没有完成页面渲染
    console.log('实例创建之后')
  },
  //   页面渲染前后
  beforeMount () {
    //   也可以加载数据，依旧没有渲染页面
    console.log('页面渲染前')
  },
  mounted () {
    //   页面显然完成，可以获取DOM对象
    console.log('页面渲染之后执行')
  },
  //   数据更新前后
  beforUpdate () {
    console.log('数据更新前执行')
  },
  updated () {
    console.log('数据更新后执行')
  },
  //   实例销毁阶段
  beforeDestroy () {
    //   定时器，将之前定义的定时器销毁掉
    console.log('销毁之前')
  },
  destroyed () {
    console.log('销毁之后')
  }
}
</script>

<style>

</style>
