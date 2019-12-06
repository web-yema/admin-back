import request from '@/utils/request'
import {
  url
} from './api'

export function login(data) {
  return request({
    url: url + '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: url + '/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: url + '/logout',
    method: 'post'
  })
}

// 注册

export function registers(data) {
  return request({
    url: url + '/register',
    method: 'post',
    data
  })
}
