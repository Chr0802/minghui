<template>
  <a-card :bordered="false">
    <result :is-success="true" :description="description" :title="title">
      <template slot="action">
        <a-button type="primary" @click='$router.go(-2)'>返回列表</a-button>
        <a-button style="margin-left: 8px" @click="$router.replace(`/employee/detail/${$route.params.id}`)">查看详细</a-button>
      </template>
      <div>
        <a-row style="margin-bottom: 16px">
          <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="5">
            <span style="color: rgba(0, 0, 0, 0.85)">员工ID：</span>
            {{$route.params.emplID}}
          </a-col>
          <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
            <span style="color: rgba(0, 0, 0, 0.85)">操作人：</span>
            {{nickname}}
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="13">
            <span style="color: rgba(0, 0, 0, 0.85)">操作时间：</span>
            {{new Date()}}
          </a-col>
        </a-row>
      </div>
    </result>
  </a-card>
</template>

<script>
  import Result from './Result'
  import { mixinDevice } from '@/utils/mixin.js'
  import {mapGetters,mapState} from 'vuex'

  const directionType = {
    horizontal: 'horizontal',
    vertical: 'vertical'
  }

  export default {
    name: 'Success',
    components: {
      Result
    },
    computed:{
      ...mapGetters([
        'nickname'
        ])
    },
    mixins: [mixinDevice],
    data () {
      return {
        title: '提交成功',
        description: '',
        directionType
      }
    }
  }
</script>

<style scoped>

</style>