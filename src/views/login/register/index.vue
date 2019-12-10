<template>
  <div class="register-box">
    <div class="register-container">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="title-container">
          <h3 class="title">注册</h3>
        </div>
        <el-form-item label="用户名" prop="adminName">
          <el-input v-model="ruleForm.adminName" placeholder="用户名" type="name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" placeholder="密码" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item label="确认密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="确认密码"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址" type="email" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="reg" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="gologin('ruleForm')">去登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validEmail } from '@/utils/validate'
import { registers } from '@/api/user'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['showsbtn'],
  data() {
    var validatoradminName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        if (this.ruleForm.adminName !== '') {
          this.$refs.ruleForm.validateField('name')
        }
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能小于6位'))
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('password')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱地址'))
      } else if (!validEmail(value)) {
        callback(new Error('请输入正确邮箱地址'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        adminName: '',
        pass: '',
        password: '',
        email: ''
      },
      rules: {
        adminName: [{ validator: validatoradminName, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        password: [{ validator: validatePass2, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async register(data) {
      return await registers(data)
    },

    gologin() {
      this.showsbtn()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.register({ ...this.ruleForm }).then(data => {
            // console.log(data)
            this.$message({
              message: data.message,
              type: data.data
            })
            this.showsbtn()
          })
        } else {
          this.$message({
            message: '请输入提示的信息',
            type: 'warning'
          })
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

<style lang="scss" scoped>
.register-box {
  width: 100%;
  height: 100vh;
  background: #283443;
}
.register-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
  width: 500px;
  font-size: 17px;

  .title-container {
    text-align: center;
    color: #fff;
    font-size: 20px;
  }
}
</style>
