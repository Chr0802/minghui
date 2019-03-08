import { axios } from '@/utils/request'

const api = {
  gender: '/statistics/gender',
  degree:'/statistics/degree',
  age:'/statistics/age',
  seniority:'/statistics/seniority',
  coef:'/statistics/coef',
  IO:'/statistics/IO',
}

export default api

export function getGender() {
  return axios({
    url: api.gender,
    method: 'get'
  })
}
export function getDegree() {
  return axios({
    url: api.degree,
    method: 'get'
  })
}
export function getAge() {
  return axios({
    url: api.age,
    method: 'get'
  })
}
export function getSeniority() {
  return axios({
    url: api.seniority,
    method: 'get'
  })
}
export function getCoef() {
  return axios({
    url: api.coef,
    method: 'get'
  })
}
export function getIO() {
  return axios({
    url: api.IO,
    method: 'get'
  })
}
