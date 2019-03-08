import { axios } from '@/utils/request'

const api = {
  delete:'/fs/deleteEmployeeFile',
  update:'/fs/update',
  getTemp:'/fs/getEmployeeDataTemp' ,
  getPath:'fs/getArchivePath',
}

export default api

export function deleteEmployeeFile(parameter) {
  return axios({
    url: api.delete,
    method: 'delete',
    params: parameter
  })
}

export function getEmployeeDataTemp() {
  return axios({
    url: api.getTemp,
    method: 'get',
  })
}

export function getArchivePath() {
  return axios({
    url: api.getPath,
    method: 'get',
  })
}