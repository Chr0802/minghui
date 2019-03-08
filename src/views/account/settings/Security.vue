<template>
  <!-- <a-list
    itemLayout="horizontal"
    :dataSource="data"
  >
    <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
      <a-list-item-meta>
        <a slot="title">{{ item.title }}</a>
        <span slot="description">
          <span class="security-list-description">{{ item.description }}</span>
          <span v-if="item.value"> : </span>
          <span class="security-list-value">{{ item.value }}</span>
        </span>
      </a-list-item-meta>
      <template v-if="item.actions">
        <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
      </template>
    </a-list-item>
  </a-list> -->
  <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form layout='vertical' :form="form">
          <a-form-item
            label="原密码"
          >
            <a-input 
              type="password" 
              placeholder="请输入您的原始密码" 
              v-decorator="[
                'originPassword',
                {rules: [{ required: true },]}
            ]"/>
          </a-form-item>
          <a-form-item
            label="新密码"
          >
            <a-input 
              type="password" 
              placeholder="请输入您的新密码"
              v-decorator="[
                'newPassword',
                {rules: [{ required: true },]}
            ]"/>
          </a-form-item>

          <a-form-item
            label="确认新密码"
          >
            <a-input 
              type="password" 
              placeholder="请确认您的新密码"
              v-decorator="[
                'newPassword1',
                {rules: [{ required: true },]}
            ]"/>
          </a-form-item>
        </a-form>
        <a-button type='primary' :loading='buttonLoading' @click='changePassword'>修改密码</a-button>
      </a-col>
   </a-row>
</template>

<script>
  import {changePWD} from '@/api/login'
  import { mapActions } from 'vuex'
  import md5 from 'md5'
  export default {
    data () {
      return {
        // data: [
        //   { 
        //     title: '账户密码' ,
        //     description: '当前密码强度', 
        //     value: '强', 
        //     actions: { 
        //       title: '修改', 
        //       callback: () => { this.$message.info('This is a normal message')} 
        //     } 
        //   },
        //   { 
        //     title: '手机号码' , 
        //     description: '已绑定手机', 
        //     value: '138****8293', 
        //     actions: { 
        //       title: '修改', 
        //       callback: () => { this.$message.success('This is a message of success') } 
        //     }  
        //   },
        //   { 
        //     title: '账户登录名' , 
        //     description: '用于登录的用户名', 
        //     value: 'ant***sign.com', 
        //     actions: { 
        //       title: '修改', 
        //       callback: () => { this.$message.warning('This is message of warning') } 
        //     }  
        //   },
        // ],
        buttonLoading:false
      }
    },
    methods:{
      md5,
      ...mapActions(['Login', 'Logout']),
      changePWD,
      changePassword(){
        console.log('111')
        this.form.validateFields((err,value)=>{
          console.log(value)
          if(!err){
            if (value.newPassword!==value.newPassword1){
              this.$message.warn('新密码两次输入不一致')
              this.form.setFieldsValue({
                'newPassword':'',
                'newPassword1':''
              })
            }else{
              this.buttonLoading = true
              value.originPassword = this.md5(value.originPassword)
              value.newPassword = this.md5(value.newPassword)
              value.newPassword1 = this.md5(value.newPassword1)
              this.changePWD({...value}).then(res=>{
                if(res.result!=='WRONG PWD'){
                  this.$message.success('密码修改成功，即将重新登录......')
                  this.buttonLoading = false
                  setTimeout(()=>{
                    this.Logout({}).then(() => {
                      window.location.reload()
                    }).catch(err => {
                      that.$message.error({
                        title: '错误',
                        description: err.message
                      })
                    })
                  }, 1000)
                }else{
                  this.$message.error('用户原密码错误，请重新输入')
                  this.buttonLoading = false
                  this.form.setFieldsValue({
                    'originPassword':'',
                    'newPassword':'',
                    'newPassword1':''
                  })
                } 
              },err=>{
                this.$message.warn(err.message)
                this.buttonLoading = false
                this.form.setFieldsValue({
                  'originPassword':'',
                  'newPassword':'',
                  'newPassword1':''
                })
              })
            }
          }
        })
      }
    },
    created(){
      this.form = this.$form.createForm(this)
    }
  }
</script>

<style scoped>

</style>