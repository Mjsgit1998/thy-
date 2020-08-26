<template>
  <div class="upload-image">
    <div class="preview" @click="onUploadShow">
        <!-- <img v-if="previewImage" src="" alt=""> -->
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <!--
      visible 控制对话框的显示和隐藏
     -->
    <el-dialog
      title="请选择文章封面图片"
      :visible.sync="centerDialogVisible"
      width="50%"
      center
    >
      <!-- 标签导航 -->
      <!--
        el-tabs 组件
          v-model 双向绑定
            数据驱动视图：当绑定数据发生改变，激活的标签页受影响
            视图影响数据：当标签改变的时候，标签的 name 会同步到数据中
          label 标签的标题
          name 相当于标签的 id
       -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="素材库" name="first">
          <!-- 标签内容写到里面来 -->
          <!--
            radio 有个 change 事件
            当选择的 radio 改变的时候会触发
           -->
          <el-radio-group v-model="activeImage">
            <el-radio label="all">全部</el-radio>
            <el-radio label="collect">收藏</el-radio>
          </el-radio-group>
          <el-row :gutter="20">
            <el-col :span="6"
            :class="{
                'item-images': index === activeIndex
            }"
             v-for="(item,index) in images"
             :key="item.id"
            @click.native="activeIndex = index"
             >
              <img height="100" :src="item.url">
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">配置管理</el-tab-pane>
      </el-tabs>
      <!-- /标签导航 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfim">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadImage',
  components: {},
  props: {
    //   数组的路径 图片的路径
    value: {
      type: String
    }
  },
  data () {
    return {
      centerDialogVisible: false,
      activeName: 'first', // 默认激活的标签样式
      activeImage: 'all', // 图片类型
      images: [],
      activeIndex: null // 激活图片样式的索引
    //   previewImage: ''
    }
  },
  computed: {},
  watch: {
  },
  created () {
    console.log(123)
  },
  methods: {
    onUploadShow () {
    //   请求加载数据
      this.loadImages()

      // 显示弹窗
      this.centerDialogVisible = true
    },
    loadImages () {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          // this.activeImages 双向绑定了radio 单选框
          // 也就是在获取选中的那个radio 选中状态
          collect: this.activeImage === 'collect' // 是否获取收藏图片
        }
      }).then(res => {
        console.log(res)
        this.images = res.data.data.results
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击对话框时候
    onConfim () {
      const image = this.images[this.activeIndex]
      if (image) {
        //   将 选中的图片 赋值给框 有一个东西来放， 你要放在那个框里的图片
        // this.previewImage = image.url // 将所选的图片路径赋值给previewImage
        // 将你所选的图片的路径同步给父组件绑定的数据
        this.$emit('input', image.url)
      }
      this.centerDialogVisible = false
    }
  }
}
</script>

<style scoped>
.item-images{
    border: 1px solid red;
}
.upload-image {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.upload-image .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
