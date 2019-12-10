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
              <el-button type="text" size="small" @click="updateClick(scope.row), dialogVisible = true">编辑</el-button>
              <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                <div class="flex"><span>姓名：</span><el-input v-model="name" placeholder="请输入姓名" /></div>
                <div class="flex"><span>手机号：</span><el-input v-model="phone" placeholder="请输入手机号" /></div>
                <div class="flex"><span>收货地址：</span><el-cascader v-model="address1" placeholder="请选择收货地址" class="address" :options="options" /></div>
                <div class="flex"><span>详细地址：</span><el-input v-model="address" placeholder="如道路、门牌号、小区、楼栋号、单元室等" /></div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
      </div>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
    </div>
  </div>
</template>

<script>
import city from '../../../assets/city/citys.json'
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
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          phone: '13511001044',
          address1: '上海市普陀区金沙江路 1518 弄',
          address2: '上海市普陀区金沙江路 1518 弄',
          orderNumber: '123456789'
        }
      ],
      multipleSelection: [],
      dialogVisible: false, // 弹框
      name: '', // 姓名
      phone: '', // 手机号
      address1: [], // 收货地址
      options: [], // 城市
      address: '' // 详细地址
    }
  },
  created() {
    this.options = city
  },
  methods: {
    // 查询
    onSearch() {
      console.log('查询成功！')
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
    // 修改
    updateClick(row) {
      console.log(row)
    },
    // 删除
    deleteClick(row) {
      console.log(row)
      this.$confirm('此操作将永久删除该客户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
.container {
  box-sizing: border-box;
  padding: 24px;
  height: 93vh;
  background-color: #ececec;
}
.container .content {
  box-sizing: border-box;
  padding: 24px;
  height: 100%;
  background-color: #fff;
}
.pagination{
  margin: 20px 0;
}
.flex{
  display: flex;
  justify-content: space-around;
}
.flex>span:nth-of-type(1){
  display: inline-block;
  width: 90px;
  height: 60px;
  text-align: center;
  line-height: 35px;
}
.address{
  width: 410px;
}
</style>
