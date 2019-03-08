import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar

  if (Vue.ls.get(ACCESS_TOKEN)) { /* has token */

    if (to.path === '/user/login') {/*目标路由为登录界面，跳过登陆，进入工作台*/
      next({ path: '/home/workplace' })
      NProgress.done()
    } else {/*目标路由不是登录界面，验证该用户是否有进入目标路由的权限*/
      if (store.getters.roles.length === 0) {/*store中还没有get用户权限*/
        store
          .dispatch('GetInfo')
          .then(res => {/*获取用户权限列表*/
            const roles = res.result && res.result.role
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              router.addRoutes(store.getters.addRouters)
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            store.dispatch('Logout').then(() => {
              next({ path: '/user/login', query: { redirect: to.fullPath } })
            })
          })
      } else {/*store中已经存在用户权限信息roles，直接进入*/
        next()
      }
    }
  } else {/*doesn't have token */
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})




/**Action 权限指令**/
const action = Vue.directive('action', {
  bind: function (el, binding, vnode) {
    const actionName = binding.arg
    const roles = store.getters.roles
    const permissionId = vnode.context.$route.meta.permission
    let actions = []
    roles.permissions.forEach(p => {
      if (p.permissionId != permissionId) {
        return
      }
      actions = p.actionList
    })
    if (actions.indexOf(actionName) < 0) {
      setTimeout(() => {
        if(el.parentNode == null){
          el.style.display = 'none'
        }
        else{
            el.parentNode.removeChild(el)
        }
      }, 10)

    }
  }
})

export {
  action
}
