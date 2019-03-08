<template>
  <a-card :bordered="false">
    <result :is-success="false" :title="title" :description="description">
      <template slot="action">
        <a-button type="primary" @click='$router.go(-1)' >返回上页</a-button>
      </template>
      <div>
        <div style="font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-bottom: 16px">
          您提交的内容有如下错误：
        </div>
        <div style="margin-bottom: 16px">
          <a-icon type="close-circle-o" style="color: #f5222d; margin-right: 8px"/>
          您的编辑的内容格式不符合要求，请返回上页并刷新重试。
          <a style="margin-left: 16px"@click='$router.go(-1)'>立即修改 <a-icon type="right" /></a>
        </div>
        <div>
          <a-icon type="close-circle-o" style="color: #f5222d; margin-right: 8px"/>
          服务器错误，请联系网络管理员。
          <a style="margin-left: 16px"@click='$router.go(-1)'>立即检修 <a-icon type="right" /></a>
        </div>
      </div>
    </result>
  </a-card>
</template>

<script>
  import Result from './Result'

  export default {
    name: 'Error',
    components: {
      Result
    },
    data () {
      return {
        title: '提交失败',
        description: '请核对并修改以下信息后，再重新提交。'
      }
    }
  }
</script>

<style scoped>

</style>