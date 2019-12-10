// import request from '@/utils/request'
import axios from 'axios'

export function GetListData() {
  return axios.get('http://localhost:3088' + '/order/listData')
}
