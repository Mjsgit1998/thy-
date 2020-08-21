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
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>

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
export default {
  name: 'MediaINdex',
  data () {
    return {
      images: [],
      type: '全部'
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
