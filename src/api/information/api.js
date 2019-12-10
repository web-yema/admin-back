import Axios from 'axios'

// 查询客户
export const selectCustomer = data => {
  return Axios.post('http://127.0.0.1:3088/selectcustomer', data)
}

// 删除客户
export const deleteCustomer = (_id) => {
  return Axios.post('http://127.0.0.1:3088/deletecustomer', _id)
}

// 修改客户信息
export const updateCustomer = (_id, obj) => {
  return Axios.post('http://127.0.0.1:3088/updatecustomer', {
    _id,
    obj
  })
}
