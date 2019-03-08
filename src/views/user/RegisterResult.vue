<template>
  <result
    :isSuccess="true"
    :content="false"
    :title="title"
    :description="description">

    <template slot="action">
      <a-button size="large" type="primary">现在登录</a-button>
      <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">返回首页</a-button>
    </template>

  </result>
</template>

<script>
  import Result from '@/views/result/Result'

  export default {
    name: 'RegisterResult',
    components: {
      Result
    },
    data () {
      return {
        description: '该用户已注册成功，请牢记您的用户名及密码',
        form: {}
      }
    },
    computed: {
      title () {
        const v = this.form && this.form.username || 'xxx'
        const title = `你的账号：${v} 注册成功`
        return title
      }
    },
    created () {
      this.form = this.$route.params
    },
    methods: {
      goHomeHandle () {
        this.$router.push({ name: 'login' })
      }
    }
  }
</script>

<style scoped>

</style>