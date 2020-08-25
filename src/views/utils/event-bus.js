import Vue from 'vue'
// 该模块导出了一个新建的空的vue 实例
export default new Vue()

// 如何使用 vue
// Vue 实例有两位用于通信的方法
//  发布订阅
// 在通信的a端（组件）使用event-bus 订阅一个自定义事件
//  eventBus.$on('事件名称', () => {
// 自定义逻辑
// })

// 在 通信 b 端（组件）, 根据咱们一个业务逻辑发布调用自定义事件
//  event.$emit('事件名称',如果有数据的话可以放到这)
