<template>
  <div class="order-list">
    <div v-for="(item,index) in flag?filterListData:data" :key="index">
      <div class="list_title">
        <span>{{item.time}}</span>
        <span>订单号：{{item.name}}</span>
        <span>共计：{{item.list.reduce((pre,next)=>{
          return pre  + Number(next.money)
          },0)}}</span>
      </div>
      <el-table
      :data="item.list"
      style="width: 100%">
        <el-table-column
          label="store_name"
          prop="store_name"
          width="180">
        </el-table-column>
        <el-table-column
          prop="img"
          width="180">
        </el-table-column>
        <el-table-column
          label="status"
          prop="status"
          width="180">
        </el-table-column>
        <el-table-column
          label="money"
          prop="money"
          width="180">
        </el-table-column>
        <el-table-column
          label="time"
          prop="time"
          width="180">
        </el-table-column>
        <el-table-column
          label="number"
          prop="number">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(index,scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <popUp />
  </div>
</template>

<script>
import popUp from "@/views/order-center/order-list/popUp.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "orderList",
  components: {
    popUp
  },
  data() {
    return {
      data: [],
      dialogVisible: false,
      handleEditObj: {}
    };
  },
  computed: {
    ...mapState("order", ["listData", "flag", "filterListData"])
  },
  async mounted() {
    let res = await this["vuexGetListData"]();
    let arr = res.map(v => {
      let list = v.list.map(item => {
        let money = parseInt(item.number) * parseInt(item.price);
        let status = this.corresponding(item.status);
        return { ...item, money, status };
      });
      return { ...v, list };
    });
    this.data = arr;
  },
  methods: {
    ...mapActions("order", ["vuexGetListData"]),
    ...mapMutations("order", ["vuexCompileObj"]),
    corresponding(num) {
      let status = [, "待付款", "待发货", "已发货", "已完成"];
      if (num > 0 && num < 5) {
        return status[num];
      }
    },
    // 编辑
    handleEdit(i, index, row) {
      this["vuexCompileObj"]({ index: i, i: index, ...row });
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.order-list {
  background: white;
  box-sizing: border-box;
  padding: 20px;
  padding-top: 10px;
  .list_title {
    background: #dcdcdc;
    padding: 10px;
    margin-top: 20px;
  }
}
</style>