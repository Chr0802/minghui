import { axios } from '@/utils/request'

const api = {
  detail: '/employee/detail',
  all:'/employee/all',
  query:'/employee/query',
  employThisMonth:'/employee/employThisMonth',
  regEDThisMonth:'/employee/regEDThisMonth',
  birthThisMonth:'/employee/birthThisMonth',
  leaveThisMonth:'/employee/leaveThisMonth',
  regINGThisMonth:'/employee/regINGThisMonth',
  contractThisMonth:'/employee/contractThisMonth',
  positionChangesThisMonth:'/employee/positionChangeThisMonth',
  fuzzyQuery:'/employee/fuzzyQuery',
  addEmployee:'/employee/addEmployee',
  updateEmployee:'/employee/updateEmployee',
  searchHeadData:'/employee/searchHeadData'
}

export default api

export function addEmployee(parameter) {
  return axios({
    url: api.addEmployee,
    method: 'post',
    data: parameter
  })
}
export function updateEmployee(parameter) {
  return axios({
    url: api.updateEmployee,
    method: 'post',
    data: parameter
  })
}
export function getEmployeeDetail(parameter) {
  return axios({
    url: api.detail,
    method: 'get',
    params: parameter
  })
}
export function getPositionChangesThisMonth(parameter) {
  return axios({
    url: api.positionChangesThisMonth,
    method: 'get',
    params: parameter
  })
}
export function getAllEmployee(parameter) {
  return axios({
    url: api.all,
    method: 'get',
    params: parameter
  })
}
export function getQuery(parameter) {
  return axios({
    url: api.query,
    method: 'get',
    params: parameter
  })
}
export function getFuzzyQuery(parameter) {
  return axios({
    url: api.all,
    method: 'get',
    params: parameter
  })
}
export function getEmployThisMonth(parameter){
  return axios(
  {
    url: api.employThisMonth,
    method:'get',
    params:parameter
  })
}
export function getLeaveThisMonth(parameter){
  return axios(
  {
    url: api.leaveThisMonth,
    method:'get',
    params:parameter
  })
}
export function getBirthThisMonth(parameter){
  return axios(
  {
    url: api.birthThisMonth,
    method:'get',
    params:parameter
  })
}
export function getRegEDThisMonth(parameter){
  return axios(
  {
    url: api.regEDThisMonth,
    method:'get',
    params:parameter
  })
}
export function getRegINGThisMonth(parameter){
  return axios(
  {
    url: api.regINGThisMonth,
    method:'get',
    params:parameter
  })
}
export function getContractThisMonth(parameter){
  return axios(
  {
    url: api.contractThisMonth,
    method:'get',
    params:parameter
  })
}
export function getSearchHeadData(parameter){
  return axios(
  {
    url: api.searchHeadData,
    method:'get',
    params:parameter
  })
}