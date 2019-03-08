<template>
  <a-list>
    <a-list-item>
      <a-button v-if='hasPermission' @click="$router.push('/user/register')">进入注册界面</a-button>
    </a-list-item>
  </a-list>
</template>

<script>
  import AList from 'ant-design-vue/es/list'
  import AListItem from 'ant-design-vue/es/list/Item'
  import { mapGetters } from 'vuex'
  export default {
    name: 'Article',
    components: {
      AList,
      AListItem
    },
    computed:{
      ...mapGetters(['nickname', 'avatar','roles']),
      hasPermission(){
        let role = this.roles.id
        return (role === 'hrm')||(role === 'leader')
      },
    }
  }
</script>

<style scoped>

</style>