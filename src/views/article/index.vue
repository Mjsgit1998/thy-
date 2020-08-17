<template>
  <div class="article">
    <!-- 筛选数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group>
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- /筛选数据 -->

    <!-- 文章列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到59806条符合条件的内容</span>
      </div>
      <!-- el-table表格组件
      data 表格的数组 要求是数组
      表格组件会使用data 数据自己内部进行遍历，我们不需要自己进行遍历
      只需要告诉表格组件：
        data 是啥
        表头名叫啥
        列值是什么
        el-table-column 表格的列组件
        prop 用来指定渲染那个数据字段
        label 表头的名称
        width： 列宽
       -->
      <el-table
      :data="articles"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="封面"
          width="180">
          <!-- 自定义表格列
          在template 上声明 slot-scope = 'scope'，然后我们就可以通过scope.row获取到遍历项
            注意：只有当需在自定义表格列模板中访问遍历项的时候才这么做
           -->
           <template slot-scope="scope">
               <img style="width:50px" :src="scope.row.cover.images[0]" alt="">
           </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布日期">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template>
              <el-button type="primary" icon="el-icon-edit"></el-button>
              <el-button type="primary" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- /文章列表 -->
  </div>
</template>

<script>
export default {
  name: 'abc',
  data () {
    return {
      // 过滤数据的表单
      filterForm: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      },
      rangeDate: '',
      articles: []// 文章数据列表
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      // 在我们的项目中 除了/login页面不需要token
      // 否则 后端会给我们返回401的错误
      // 这里后端要求把token放到请求头中
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: { // 添加请求头
        // 名字：值
        // 后端要求把token放到请求头中，它使用的名字叫：Authorization
        // 注意： Bearer 有个空格，多了少了都不行
          Authorization: `Bearer ${token}`

        }
      }).then(res => {
        console.log(res.data.data.results)
        this.articles = res.data.data.results
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    }
  }
}
</script>

<style scoped>
</style>
