<template>
  <div>
    <!-- 筛选数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="文章状态">
          <!-- 单选框组会把radio的label同步绑定给数据 -->

          <el-radio-group v-model="filterForm.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select placeholder="请选择活动区域" v-model="filterForm.channel_id">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="rangeDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <!-- 点击查询按钮 重新发送请求赛选数据，新查询的数据肯定从第一页开始 -->
          <el-button type="primary" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- /筛选数据 -->

    <!-- 文章列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{totalCount}}条符合条件的内容</span>
      </div>
      <!--
            el-table 表格组件
        data 表格的数组，要求是数组
        表格组件会使用 data 数据，在内部自己进行遍历，我们不需要自己写什么 v-for
        你只需要告诉这个表格组件：
          data 是啥
          表头名是什么
          列值是什么
        el-table-column 表格列组件
          prop 用来指定渲染哪个数据字段
          label 表头名称
          width 列宽

        表格列默认只能渲染普通文本，如果想要渲染点儿别的东西，需要自定义表格列。

       -->
      <el-table
        :data="articles"
        style="width: 100%"
        v-loading="loading"
        >
        <el-table-column
          prop="date"
          label="封面"
          width="180"
          >
             <!--
            自定义表格列
            在 template 上声明 slot-scope="scope" ，然后就可以通过 scope.row 获取遍历项
            scope.row 就相当于我们自己 v-for 的 item

            注意：只有当你需要在自定义表格列模板中访问遍历项的时候才这么做
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
          <template slot-scope="scope">
             <el-tag
              :type="articleStatus[scope.row.status].type"
            >{{ articleStatus[scope.row.status].label }}</el-tag>
            <!-- <span v-show="scope.row.status === 0">草稿</span>
            <span v-show="scope.row.status === 1">待审核</span>
            <span v-show="scope.row.status === 2">审核通过</span>
            <span v-show="scope.row.status === 3">审核失败</span>
            <span v-show="scope.row.status === 4">已删除</span> -->
            <!-- <span v-show="scope.row.status === 5">草稿</span> -->

          </template>
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
    <!-- 默认10条每页 total指定一共多少条数据
    layout 布局 -->
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      @current-change = 'onPageChange'
      >
    </el-pagination>
  </div>
</template>

<script>
export default {
  // 建议给每个组件都起一个名字，有一些好处，例如我们可以在调试工具中根据名字搜索组件
  name: 'abc',
  data () {
    return {
      // 过滤数据的表单
      filterForm: {
        status: null,
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      },
      rangeDate: '',
      articles: [], // 文章数据列表
      articleStatus: [
        {
          value: 0,
          label: '草稿'
        },
        {
          value: 1,
          label: '待审核'
        },
        {
          value: 2,
          label: '审核通过'
        },
        {
          value: 3,
          label: '审核失败'
        },
        {
          value: 4,
          label: '已删除'
        }

      ],
      totalCount: 0, // 默认总记录数
      loading: true
    }
  },

  created () {
    this.loadArticles()
  },

  methods: {

    loadArticles (page = 1) {
      this.loading = true
      // 在我们的项目中，除了 /login 接口不需要 token，其它所有的接口都需要提供 token 才能请求
      // 否则后端返回 401 错误
      // 我们这里的后端要求把 token 放到请求头中
      const token = window.localStorage.getItem('user-token')

      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: { // 添加请求头
          // 名字: 值
          // 后端要求把 token 放到请求头中，使用一个名字叫：Authorization
          // 注意，token的格式要求：Bearer 用户token
          // 注意！！！Bearer有个空格，多了少了都不行
          Authorization: `Bearer ${token}`
        },
        params: {
          page, // 页码
          per_page: 10, // 每页大小
          status: this.filterForm.status
        }
      }).then(res => {
        // console.log(123)
        this.articles = res.data.data.results
        // 更新总数
        this.totalCount = res.data.data.total_count
      }).catch(err => {
        console.log(err, '获取数据失败')
      }).finally(() => {
        this.loading = false
      })
    },
    onPageChange (page) {
      // 请求加载指定文章列表
      this.loadArticles(page)
    }
  }
}
</script>

<style scoped>
</style>
