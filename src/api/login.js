import api from './index'
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return axios({
    url: '/auth/login',
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha(parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo() {
  return axios({
    url: '/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout() {
  return axios({
    url: '/auth/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function changePWD(parameter) {
  return axios({
    url: '/user/changePassword',
    method: 'post',
    data: parameter
  })
}

export function addUser(parameter) {
  return axios({
    url: '/user/addUser',
    method: 'post',
    data: parameter
  })
}


export function verifyUsername(parameter) {
  return axios({
    url: '/user/verifyUsername',
    method: 'get',
    params: parameter
  })
}