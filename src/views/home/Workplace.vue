<template>
  <page-layout :avatar="avatar">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.name }}<span class="welcome-text">，{{ welcome() }}</span></div>
      <div>
        <span>{{ROLE().ROLE}} | 明辉伟业 - {{ROLE().dept}}</span>&nbsp&nbsp
        <div>本月（{{moment().startOf('month').format('MM.DD')}}——{{moment().endOf('month').format('MM.DD')}}）</div></div>
      <div>&nbsp</div>
      
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="3" :offset="2">
          <a-popover title="在职人员" trigger="hover" :mouseEnterDelay="0.3">
            <template slot="content">
              <div style="height:200px; width: 300px;overflow: auto;">
                <a-tag v-for="i in allListThisMonth" color="blue"><a @click="$router.push(`/employee/detail/${i.id}`)">{{i.name}}</a></a-tag>
              </div>
            </template>
            <head-info title="在职" :content="allThisMonth" :center="false" :bordered="false"/>
            <p></p>
          </a-popover>
        </a-col>
        <a-col :span="3">
          <a-popover title="入职人员" trigger="hover" :mouseEnterDelay="0.3">
            <template slot="content">
              <div style="height:200px; width: 300px;overflow: auto;">
                <a-tag v-for="i in employListThisMonth" color="blue"><a @click="$router.push(`/employee/detail/${i.id}`)">{{i.name}}</a></a-tag>
              </div>
            </template>
            <head-info title="入职" :content="employThisMonth" :center="false" :bordered="false"/>
            <p></p>
          </a-popover>
        </a-col>
        <a-col :span="3">
          <a-popover title="转正人员" trigger="hover" :mouseEnterDelay="0.3">
            <template slot="content">
              <div style="height:200px; width: 300px;overflow: auto;">
                <a-tag v-for="i in regListThisMonth" color="blue"><a @click="$router.push(`/employee/detail/${i.id}`)">{{i.name}}</a></a-tag>
              </div>
            </template>
            <head-info title="转正" :content="regThisMonth" :center="false" />
            <p></p>
          </a-popover>
        </a-col>
        <a-col :span="3">
          <a-popover title="合同到期人员" trigger="hover" :mouseEnterDelay="0.3">
            <template slot="content">
              <div style="height:200px; width: 300px;overflow: auto;">
                <a-tag v-for="i in contractListThisMonth" color="blue"><a @click="$router.push(`/employee/detail/${i.id}`)">{{i.name}}</a></a-tag>
              </div>
            </template>
            <head-info title="合同" :content="contractThisMonth" :center="false" />
            <p></p>
          </a-popover>
        </a-col>
        <a-col :span="3">
          <a-popover title="离职人员" trigger="hover" :mouseEnterDelay="0.3">
            <template slot="content">
              <div style="height:200px; width: 300px;overflow: auto;">
                <a-tag v-for="i in leaveListThisMonth" color="blue"><a @click="$router.push(`/employee/detail/${i.id}`)">{{i.name}}</a></a-tag>
              </div>
            </template>
            <head-info title="离职" :content="leaveThisMonth" :center="false" />
            <p></p>
          </a-popover>
        </a-col>
        <a-col :span="3">
          <a-popover title="生日人员" trigger="hover" :mouseEnterDelay="0.3">
            <template slot="content">
              <div style="height:200px; width: 300px;overflow: auto;">
                <a-tag v-for="i in birthListThisMonth" color="blue"><a @click="$router.push(`/employee/detail/${i.id}`)">{{i.name}}</a></a-tag>
              </div>
            </template>
            <head-info title="生日" :content="birthThisMonth" :center="false" />
            <p></p>
          </a-popover>
        </a-col>
        <a-col :span="3">
          <a-popover title="调岗人员" trigger="hover" :mouseEnterDelay="0.3">
            <template slot="content">
              <div style="height:200px; width: 300px;overflow: auto;">
                <a-tag v-for="i in positionChangesListThisMonth" color="blue"><a @click="$router.push(`/employee/detail/${i.id}`)">{{i.name}}</a></a-tag>
              </div>
            </template>
            <head-info title="调岗" :content="positionChangesThisMonth" :center="false" />
            <p></p>
          </a-popover>
        </a-col>
      </a-row>
    </div>
  </page-layout>
</template>

<script>
  import { timeFix } from '@/utils/util'
  import {mapGetters} from 'vuex'

  import PageLayout from '@/components/page/PageLayout'
  import HeadInfo from '@/components/tools/HeadInfo'
  import Radar from '@/components/chart/Radar'
  import moment from 'moment'
  import {getAllEmployee,getEmployThisMonth,getLeaveThisMonth,getBirthThisMonth,getRegEDThisMonth,getRegINGThisMonth,getPositionChangesThisMonth,getContractThisMonth} from "@/api/employee"

  export default {
    name: 'Workplace',
    components: {
      PageLayout,
      HeadInfo,
      Radar
    },
    data() {
      return {
        timeFix: timeFix(),
        avatar: '',
        user: {},
        projects: [],
        loading: true,
        leaveThisMonth:'...',
        employThisMonth:'...',
        birthThisMonth:'...',
        contractThisMonth:'...',//目前显示本月 当前合同 到期的
        allThisMonth:'...',
        regThisMonth:'...',//本月将要转正？还是已经转正？目前显示是将要转正的
        positionChangesThisMonth:'...',
        leaveListThisMonth:[],
        employListThisMonth:[],
        birthListThisMonth:[],
        contractListThisMonth:[],//目前显示本月 当前合同 到期的
        allListThisMonth:[],
        regListThisMonth:[],//本月将要转正？还是已经转正？目前显示是将要转正的
        positionChangesListThisMonth:[]
      }
    },
    computed: {
      userInfo() {
        return this.$store.getters.userInfo
      }
    },
    created() {
      this.user = this.userInfo
      this.avatar = this.userInfo.avatar
    },
    mounted() {
      this.init()
    },
    methods: {
      getAllEmployee,
      getEmployThisMonth,
      getLeaveThisMonth,
      getBirthThisMonth,
      getRegINGThisMonth,
      getPositionChangesThisMonth,
      getContractThisMonth,
      moment,
      ...mapGetters(['nickname', 'welcome']),
      ROLE(){
        let role = this.userInfo.role.id
        let ROLE = ''
        let dept = '人资部'
        switch (role) {
          case 'hrm':
            ROLE = '人事经理'
            break;
          case 'leadr':
            ROLE = '领导'
            dept = '高层管理'
            break;
          default:
            ROLE = '人事'
            break;
        }
        return {ROLE,dept}
      },
      init(){
        this.getAllEmployee({}).then(res=>{
          console.log('getAllEmployee>>>',res.result)
          this.allThisMonth = res.result.count.toString()
          this.allListThisMonth = res.result.list
        })
        this.getLeaveThisMonth({}).then(res=>{
          console.log('getLeaveThisMonth>>>',res.result)
          this.leaveThisMonth = res.result.count.toString()
          this.leaveListThisMonth = res.result.list
        })
        this.getEmployThisMonth({}).then(res=>{
          console.log('getEmployThisMonth>>>',res.result)
          this.employThisMonth = res.result.count.toString()
          this.employListThisMonth = res.result.list
        })
        this.getBirthThisMonth({}).then(res=>{
          console.log('getBirthThisMonth>>>',res.result)
          this.birthThisMonth = res.result.count.toString()
          this.birthListThisMonth = res.result.list
        })
        this.getRegINGThisMonth({}).then(res=>{
          console.log('getRegINGThisMonth>>>',res.result)
          this.regThisMonth = res.result.count.toString()
          this.regListThisMonth = res.result.list
        })
        this.getPositionChangesThisMonth({}).then(res=>{
          console.log('getPositionChangesThisMonth>>>',res.result)
          this.positionChangesThisMonth = res.result.count.toString()
          this.positionChangesListThisMonth = res.result.list
        }),
        this.getContractThisMonth({}).then(res=>{
          console.log('getContractThisMonth>>>',res.result)
          this.contractThisMonth = res.result.count.toString()
          this.contractListThisMonth = res.result.list
        })
      }
      
    }
  }
</script>

<style lang="scss" scoped>
  .project-list {

    .card-title {
      font-size: 0;

      a {
        color: rgba(0, 0, 0, 0.85);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;

        &:hover {
          color: #1890ff;
        }
      }
    }
    .card-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
    .project-item {
      display: flex;
      margin-top: 8px;
      overflow: hidden;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      a {
        color: rgba(0, 0, 0, 0.45);
        display: inline-block;
        flex: 1 1 0;

        &:hover {
          color: #1890ff;
        }
      }
      .datetime {
        color: rgba(0, 0, 0, 0.25);
        flex: 0 0 auto;
        float: right;
      }
    }
    .ant-card-meta-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
  }

  .item-group {
    padding: 20px 0 8px 24px;
    font-size: 0;
    a {
      color: rgba(0, 0, 0, 0.65);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 13px;
      width: 25%;
    }
  }

  .members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 24px;
      height: 24px;
      .member {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }
      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }

  .mobile {

    .project-list {

      .project-card-grid {
        width: 100%;
      }
    }

    .more-info {
      border: 0;
      padding-top: 16px;
      margin: 16px 0 16px;
    }

    .headerContent .title .welcome-text {
      display: none;
    }
  }

</style>