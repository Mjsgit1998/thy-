<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>图片管理</span>
  </div>

    <el-radio-group
        v-model="type"
        @change="onFind"
    >
      <el-radio-button label="全部"></el-radio-button>
      <el-radio-button label="收藏"></el-radio-button>
    </el-radio-group>
    <!-- <el-button type="text">操作按钮</el-button> -->
    <!-- action 上传文件的请求地址
    on-preview 上传预览事件
    on-remove 删除事件
    这个上传组件比较特殊，他会自动帮我们发请求
    我们只需要把i接口相关的配置给他配好 就可以了
    它内部的请求不是我们项目中所用的axios
    请求方式： post
    手动去配请求头
     -->
    <el-upload
        class="upload-demo"
        style="float: right; padding: 3px 0"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        :on-success="uploadSuccess"
        >
        <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
    <!-- el-row 行
        gutter 间隔距离
        el-col  列
        span 用来指定列数
    -->
    <el-row :gutter="20">
        <el-col
        :xs="24"
        :sm="12"
        :md="4"
        v-for="item in images"
        :key="item.id"
        >
            <el-card :body-style="{ padding: '0px' }">
                <img
                 :src="item.url"
                 class="image"
                 height="200"
                 >
                <div style="padding: 10px" class="action">
                    <!-- 还支持对象语法： -->
                    <i :class="{
                        'el-icon-star-on': item.is_collected,
                        'el-icon-star-off': !item.is_collected
                    }"
                        @click="onCollect(item)"
                    ></i>
                    <!-- class 本来就是绑定数据字符串 -->
                    <!-- <i :class='item.is_collected ? "el-icon-star-on" : "el-icon-star-off"' ></i> -->
                    <i class="el-icon-delete"
                        @click="onDelete(item)"
                    ></i>
                </div>
            </el-card>
        </el-col>
    </el-row>
    </el-card>
</template>

<script>
const token = window.localStorage.getItem('user-token')
export default {
  name: 'MediaINdex',
  data () {
    return {
      images: [],
      type: '全部',
      //   给上传组件 使用的请求头
      uploadHeaders: {
        Authorization: `Bearer ${token}`
      }
    }
  },
  computed: {},
  components: {},
  watch: {},
  created () {
    this.loadImages()
  },
  methods: {
    loadImages (isCollect = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: isCollect // 是否获取收藏图片
        }
      }).then(res => {
        console.log(res)
        this.images = res.data.data.results
      }).catch(err => {
        console.log(err)
      })
    },
    // 该函数 是radio 的change 事件处理函数
    //  事件有个回调 这个回调参数：radio label 值
    // 我们 可以声名一个形参来接收
    onFind (value) {
      this.loadImages(value !== '全部')
    },
    // 收藏 和 取消收藏
    onCollect (item) {
      // 请求/取消收藏
      this.$axios({
        method: 'PUT',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        // console.log(res)
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        // 更新一下视图
        item.is_collected = !item.is_collected
      }).catch(err => {
        console.log(err)
        this.$message.error('操作失败')
      })
    },
    onDelete (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'DELETE',
          url: `/user/images/${item.id}`
        }).then(res => {
        //   console.log();
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // 更新一下列表
          this.loadImages(this.type !== '全部')
        }).catch(err => {
          console.log(err)
          this.$message.error('删除失败')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    uploadSuccess () {
      // 刷新一下图片
      this.loadImages(this.type !== '全部')
    }
  }
}
</script>

<style>
    .action{
        font-size: 24px;
        /* text-align: center; */
        display: flex;
        justify-content: space-around;
    }
</style>
