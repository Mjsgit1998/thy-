<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>评论列表</span>
        </div>
         <el-table
            :data="articles"
            style="width: 100%">
        <el-table-column
            prop="title"
            label="标题"
            width="180">
        </el-table-column>
        <el-table-column
            prop="total_comment_count"
            label="总评论">
        </el-table-column>
                <el-table-column
            prop="fans_comment_count"
            label="粉丝评论">
        </el-table-column>
        <el-table-column
            prop="comment_status"
            label="评论状态"
            width="180">
            <template slot-scope="scope">
                <!-- 开关属性 绑定的数据是一个布尔值他会根据布尔值的真假来决定开关的状态 -->
                <el-switch
                    v-model="scope.row.comment_status"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="onStatusChange(scope.row)"
                    >
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column
            prop="address"
            label="操作">
            <template>
                <!-- <el-link type="primary">修改评论</el-link>
                <el-link type="primary">关闭评论</el-link> -->
                <el-button type="text">修改</el-button>
                <el-button type="text">关闭</el-button>
            </template>
      </el-table-column>
    </el-table>
    </el-card>
</template>

<script>
export default {
  // 组件的name
  name: 'CommentIndex',
  data () {
    return {
      articles: []// 文章列表
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        console.log(res)
        this.articles = res.data.data.results
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    },
    onStatusChange (article) {
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: article.id.toString()
        },
        data: {
          // 开关属性 双向绑定了article.comment_status
          // 所以说：comment_status 也就是在获取开关组件的状态吧
          allow_comment: article.comment_status
        }
      }).then(res => {
        // console.log(res)
        this.$message({
          type: 'success',
          message: `${article.comment_status ? '开启' : '关闭'} 成功`
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('操作失败')
      })
    }
  }
}
</script>

<style>

</style>
