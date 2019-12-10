<template>
  <div class="container">
    <div class="content">
      <div class="form">
        <el-form ref="order" :inline="true" :model="order" class="demo-form-inline">
          <el-form-item label="订单号" prop="orderNumber" :rules="[{ type: 'number', message: '订单号必须为数字值'}]">
            <el-input v-model.number="order.orderNumber" autocomplete="off" placeholder="订单号" />
          </el-form-item>
          <el-form-item label="下单日期">
            <el-date-picker v-model="order.orderDate" :disabled-date="true" type="date" :editable="false" placeholder="下单日期" :picker-options="pickerOptions" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120" />
          <el-table-column prop="phone" label="手机号" width="150" />
          <el-table-column prop="address1" label="收获地址" show-overflow-tooltip />
          <el-table-column prop="address2" label="发货地址" show-overflow-tooltip />
          <el-table-column prop="orderNumber" label="订单号" />
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="seeClick(scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="updateClick(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        orderNumber: '', // 订单号
        orderDate: '' // 下单日期
      },
      // 从当天起以后的的日期禁用
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        phone: '13511001044',
        address1: '上海市普陀区金沙江路 1518 弄',
        address2: '上海市普陀区金沙江路 1518 弄',
        orderNumber: '123456789'
      }],
      multipleSelection: []
    }
  },
  methods: {
    // 查询
    onSearch() {
      console.log('查询成功!')
    },
    // 重置
    reset() {
      this.order = {}
    },
    // 取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 查看
    seeClick(row) {
      console.log(row)
    },
    // 修改
    updateClick(row) {
      console.log(row)
    },
    // 删除
    deleteClick(row) {
      console.log(row)
    }
  }
}
</script>

<style>
.container{
  box-sizing: border-box;
  padding: 24px 24px 0;
  background-color: #ECECEC;
}
.container .content{
  box-sizing: border-box;
  padding: 24px;
  background-color: #fff;
}
</style>
