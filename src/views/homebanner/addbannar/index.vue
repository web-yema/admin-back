<template>
  <div class="banner-box">
    <h2>上传首页轮播图片</h2>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    <el-upload
      ref="upload"
      class="upload-demo"
      action="http://127.0.0.1:3088/homebanner"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-progress="handleProgress"
      list-type="picture-card"
      :auto-upload="false"
      :limit="num"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
    <div>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      num: 6
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePreview(file) {
      // console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleProgress(event, file, fileList) {},
    handleExceed() {
      this.$message({
        message: '最多可以上传6张',
        type: 'warning'
      })
    }
  }
}
</script>

<style  scoped>
.banner-box {
  width: 70%;
  margin: 20px auto;
}
</style>
