<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>图片管理</span>
  </div>

  <el-radio-group>
      <el-radio-button label="上海"></el-radio-button>
      <el-radio-button label="北京"></el-radio-button>
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
                    }"></i>
                    <!-- class 本来就是绑定数据字符串 -->
                    <!-- <i :class='item.is_collected ? "el-icon-star-on" : "el-icon-star-off"' ></i> -->
                    <i class="el-icon-delete"></i>
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
      images: []
    }
  },
  computed: {},
  components: {},
  watch: {},
  created () {
    this.loadImages()
  },
  methods: {
    loadImages () {
      this.$axios({
        method: 'GET',
        url: '/user/images'

      }).then(res => {
        console.log(res)
        this.images = res.data.data.results
      }).catch(err => {
        console.log(err)
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
