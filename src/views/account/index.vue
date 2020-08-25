<template>
  <div>
    <el-form ref="form" :model="user" label-width="80px">
      <el-form-item label="用户头像">
        <!-- 默认的是什么方式method：post PATCH
        上传文件 使用的是upload 自带的
        自定义 组件默认发送的是post 请求
        而我们接口里的是PATCH 请求
        它不支持 自定义
        http-request 覆盖
         -->
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :http-request='onUpload'
          >
          <img width="100" :src="user.photo" class="avatar">
          <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="个人介绍">
        <el-input type="textarea" v-model="user.intro"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
       <el-form-item label="手机号">
        <el-input disabled v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import eventBus from '../utils/event-bus'
export default {
  name: 'AccountIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        name: '', // 昵称
        intro: '', // 简介
        id: '', // id
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      }
    }
  },
  computed: {},
  watch: {
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    onSubmit () {
      // const name = this.user.name
      // const intor = this.user.intor
      // const email = this.user.email
      // 对象解构 等价于上面的三句话
      const { name, email, intro } = this.user
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          // name: this.user.name,
          // intor: this.user.intor,
          // email: this.user.email
          name,
          email,
          intro
        }
      }).then(res => {
        eventBus.$emit('upload', this.user)
        this.$message({
          type: 'success',
          message: '修改成功'

        })
      }).catch(err => {
        console.log(err)
        this.$message.error('修改失败')
      })
    },
    loadUserProfile () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        // res.date undefined
        // undefined.data 报错了
        this.user = res.data.data
      }).catch(err => {
        console.log(err)
        this.$message.error('获取数据失败')
      })
    },
    // 经过简单的测试我们发现在回调函数参数中会接收到一个参数，有上传相关配置对象 file
    onUpload (config) {
      const fd = new FormData()
      fd.append('photo', config.file)
      this.$axios({
        method: 'PATCH',
        url: '/user/photo',
        data: fd
      }).then(res => {
        // console.log();
        // 更新视图
        this.user.photo = res.data.data.photo

        // 通知 一下你头部， 我改了 你也要变 头像， name
        eventBus.$emit('upload', this.user)
      }).catch(err => {
        console.log(err)
        this.$message.error('上传失败')
      })
    }
  }
}
</script>

<style scoped></style>
