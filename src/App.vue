<template>
  <!-- ：locale为国际化语言选项，用来设置UI框架组件的默认语言 -->
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-locale-provider>
</template>

<script>
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'

  export default {
    data () {
      return {
        locale: zhCN
      }
    },
    mounted () {
      const { $store } = this
      deviceEnquire(deviceType => {

        switch (deviceType) {
          case DEVICE_TYPE.DESKTOP:
            $store.commit('TOGGLE_DEVICE', 'desktop')
            $store.dispatch('setSidebar', true)
            break
          case DEVICE_TYPE.TABLET:
            $store.commit('TOGGLE_DEVICE', 'tablet')
            $store.dispatch('setSidebar', false)
            break
          case DEVICE_TYPE.MOBILE:
          default:
            $store.commit('TOGGLE_DEVICE', 'mobile')
            $store.dispatch('setSidebar', true)
            break
        }
        console.log('deviceType', deviceType)
      })
    }
  }
</script>
<style>
  #app {
    height: 100%;
  }
  .ant-input-disabled{
    background-color: #f5f5f5;
    opacity: 1!important;
    /*cursor: not-allowed;*/
    color: #000!important;
    border: 1px solid #fff!important;
  }
  .ant-select-disabled .ant-select-selection{
    opacity: 1!important;
    color: #000!important;
    border: 1px solid #fff!important;
  }
</style>