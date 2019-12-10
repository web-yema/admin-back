<template>
  <div>
    <el-dialog title="提示" width="50%" :visible.sync="dialogVisible" :before-close="handleClose">
      <div>
        <div class="file">
          <div class="title">单价：</div>
          <el-input v-model.number="compileObj.price" placeholder="请输入内容"></el-input>
        </div>
        <div class="file">
          <div class="title">数量：</div>
          <el-input v-model.number="compileObj.number" placeholder="请输入内容"></el-input>
        </div>
        <div class="file">
          <div class="title">状态：</div>
          <el-select v-model="compileObj.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="file">
          <div class="title">名字：</div>
          <el-input v-model="compileObj.store_name" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <span slot="footer">
        <el-button  @click="handleClose">取消</el-button>
        <el-button type="primary" @click="send">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("order", ["dialogVisible", "compileObj"])
  },
  methods: {
    ...mapMutations("order", ["vuexHandleClose"]),
    handleClose() {
      // console.log("关");
      this["vuexHandleClose"]();
    },
    // 发起修改请求
    send() {
      // 发送给后台请求
      console.log(this.compileObj);
      // console.log("关");
      this["vuexHandleClose"]();
    }
  },
  data() {
    return {
      options: [
        {
          value: 0,
          label: "待付款"
        },
        {
          value: 1,
          label: "待发货"
        },
        {
          value: 2,
          label: "已发货"
        },
        {
          value: 3,
          label: "已完成"
        }
      ],
      value: " "
    };
  }
};
</script>
<style lang="scss" scoped>
.file {
  display: flex;
  align-items: center;
  margin: 10px 0 10px 0px;
  .title {
    width: 50px;
    box-sizing: border-box;
  }
}
</style>
