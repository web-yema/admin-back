import { GetListData } from '@/api/order'
export default {
  namespaced: true,
  state: {
    // 数据列表
    listData: [],
    // 弹出窗
    dialogVisible: false,
    // 编辑
    compileObj: {},
    filterListData: [],
    // 是否过滤数组
    flag: 0
  },
  mutations: {
    // 处理全部数据逻辑
    getListData(state) {
      state.flag = 0
    },
    // 过滤数组
    setfilterListData(state, arr) {
      state.flag = 1
      state.filterListData = arr
    },
    // 获取列表数据
    setListData(state, data) {
      state.listData = data
    },
    // 编辑数据
    vuexCompileObj(state, obj) {
      state.compileObj = obj
      // 编辑时弹出框
      state.dialogVisible = true
    },
    // 关窗口
    vuexHandleClose(state) {
      state.dialogVisible = false
    }
  },
  actions: {
    // 获取列表数据
    async vuexGetListData({ commit }) {
      const { data } = await GetListData()
      if (data.code === 0) {
        commit('setListData', data.data)
        return data.data
      }
    }
  }
}
