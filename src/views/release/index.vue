<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$route.params.articleId? '编辑文章' :'发布文章'}}</span>
      </div>
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <!-- 富文本 -->
          <quill-editor
            ref="myQuillEditor"
            v-model="article.content"
          />
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option :label="channel.name" :value="channel.id"
            v-for="channel in channels" :key="channel.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label='1'>单图</el-radio>
            <el-radio :label='3'>三图</el-radio>
            <el-radio :label='0'>无图</el-radio>
            <el-radio :label='-1'>自动</el-radio>
          </el-radio-group>
            <template v-if="article.cover.type !== -1">
              <el-row>
                <el-col :span="6"
                v-for="item in article.cover.type"
                :key="item"
                >
                <!--
                  :active,cover,in=mage[0], 1
                  :active,cover,in=mage[1], 2
                  :active,cover,in=mage[2], 3
                  它选中的图片同步到数组中的第几项

                 -->
                  <upload-images  v-model="article.cover.images[item - 1]"></upload-images>
                </el-col>
              </el-row>
                  <!-- <upload-images></upload-images> -->
            </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQuillEditor, { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import components from '../components'
Vue.use(VueQuillEditor /* { default global options } */)

export default {
  name: 'PublishArticle',
  components: {
    quillEditor,
    'upload-images': components
  },
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 图片，无图就是空数组即可
        },
        channel_id: ''
      },
      channels: []
    }
  },
  created () {
    this.loadChannels()
    // 添加和编辑使用的都是这个组件
    // 只有编辑的时候，初始化 ，有id 加载文章内容
    if (this.$route.params.articleId) {
      this.loadArticles()
    }
  },
  methods: {
    loadArticles () {
      this.$axios({
        method: 'GET',
        url: `/articles/${this.$route.params.articleId}`
      }).then(res => {
        console.log(res)
        this.article = res.data.data
      })
    },
    // 点击发布
    onPublish (draft) {
      if (this.$route.params.articleId) {
        // 编辑
        // 调用
        this.upedArticle(draft)
      } else {
        // 请求添加
        this.addArticle(draft)
      }
    },
    // 添加 发的请求
    addArticle (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err, '发布失败')
      })
    },
    // 编辑
    upedArticle  (draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.articleId}`,
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      }).catch(() => {
        this.$message.error('更新失败')
      })
    },
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    }

  }
}
</script>

<style scoped>
</style>
