import { axios } from '@/utils/request'

const api = {
  all:'/dept/all',
  update:'/dept/update',
  delete:'/dept/delete',
  add:'/dept/add',
  getStore:'/dept/getStore',
}

export default api

export function getAllDept(parameter) {
  return axios({
    url: api.all,
    method: 'get',
    params: parameter
  })
}
export function getStoreOfDept(parameter) {
  return axios({
    url: api.getStore,
    method: 'get',
    params: parameter
  })
}
export function updateDept(parameter) {
  return axios({
    url: api.update,
    method: 'post',
    data: parameter
  })
}
export function deleteDept(parameter) {
  return axios({
    url: api.delete,
    method: 'post',
    data: parameter
  })
}
export function addDept(parameter) {
  return axios({
    url: api.add,
    method: 'post',
    data: parameter
  })
}