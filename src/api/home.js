import request from '@/utils/request'
import {
  url
} from './api'

export function RemoveBanner(data) {
  return request({
    url: url + '/removebanner',
    method: 'post',
    data
  })
}
