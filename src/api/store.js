import { axios } from '@/utils/request'

const api = {
  all:'/store/all',
  update:'/store/update',
  delete:'/store/delete',
  add:'/store/add',
}

export default api

export function getAllStore(parameter) {
  return axios({
    url: api.all,
    method: 'get',
    params: parameter
  })
}
export function updateStore(parameter) {
  return axios({
    url: api.update,
    method: 'post',
    data: parameter
  })
}
export function deleteStore(parameter) {
  return axios({
    url: api.delete,
    method: 'post',
    data: parameter
  })
}
export function addStore(parameter) {
  return axios({
    url: api.add,
    method: 'post',
    data: parameter
  })
}