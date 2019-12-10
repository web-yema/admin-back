<template>
    <div class="order-title">
        <div>订单列表</div>
        <div class="select">
            <el-button-group>
                <el-button :class="{active:index===0}"  size="small" @click="chenge(0)">全部</el-button>
                <el-button :class="{active:index===1}"  size="small" @click="chenge(1)">待付款</el-button>
                <el-button :class="{active:index===2}"  size="small" @click="chenge(2)">待发货</el-button>
                <el-button :class="{active:index===3}"  size="small" @click="chenge(3)">已发货</el-button>
                <el-button :class="{active:index===4}"  size="small" @click="chenge(4)">已完成</el-button>
            </el-button-group>
            <div class="right">
                <el-input size="small"  placeholder="请输入内容" v-model="search" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
                    <el-select size="small" v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                </el-select>
                </el-input>
                
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      search: "",
      select: "",
      index: 0
    };
  },
  methods: {
    ...mapMutations("order", ["setfilterListData", "getListData"]),
    chenge(index) {
      this.index = index;
      if (index) {
        let arr = [];
        this.listData.forEach(v => {
          let x = v.list.filter(item => {
            return item.status === index;
          });
          if (x.length) {
            arr.push({
              ...v,
              list: x
            });
          }
        });
        // 条件数组二位
        this["setfilterListData"](arr);
      } else {
        // 全部数据
        this["getListData"]();
      }
    }
  },
  computed: {
    ...mapState("order", ["listData"])
  }
};
</script>

<style lang="scss" scoped>
.active {
  background: #e7f4ff;
  color: #1890ff;
}
.order-title {
  background: #ffffff;
  box-sizing: border-box;
  padding: 20px;
  border-bottom: 1px gray solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .select {
    display: flex;
    align-items: center;
    .right {
      margin-left: 15px;
    }
    .input-with-select {
      width: 200px;
    }
  }
}
</style>
