<template>
  <div class="add-merch">
    <el-steps
      :active="active"
      process-status="finish"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="填写基本信息" />
      <el-step title="编辑商品详情" />
      <el-step title="完成" />
    </el-steps>

    <div class="mer-contaire">
      <div v-show="active==0">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品名" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>

          <el-form-item label="商品规格">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model="ruleForm.price" />
          </el-form-item>
          <el-form-item label="划线价">
            <el-input v-model="ruleForm.markingprice" />
          </el-form-item>
          <el-form-item label="库存">
            <el-input-number v-model="ruleForm.num" :min="0" @change="handleChange" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="ruleForm.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="active==1">f</div>
    </div>
    <div class="text-box">
      <h3>说明</h3>商品图
      <p>建议尺寸 800*800 像素，最大上传个数为10张。</p>
      <p>库存</p>
      <p>库存为 0 时，会放到【已售罄】的商品列表中，保存后买家看到的商品可售库存同步更新。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      ruleForm: {
        name: '',
        region: '',
        price: '',
        num: 0,
        markingprice: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名', trigger: 'blur' },
          {
            min: 2,
            max: 60,
            message: '长度在 10 到 60 个字符',
            trigger: 'blur'
          }
        ],
        price: [{ required: true, message: '请输入价格', trigger: 'change' }]
      }
    }
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!')
          if (this.active++ > 2) this.active = 0
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.add-merch {
  width: 90%;
  margin: 0 auto;
}
.mer-contaire {
  width: 50%;
  margin: 0 auto;
  margin-top: 50px;
}
.text-box {
  padding: 0 96px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  margin: 50px 0;
}
</style>
