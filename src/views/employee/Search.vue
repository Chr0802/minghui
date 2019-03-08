<template>
	<page-layout>
		<div slot="headerContent">
			<span>本月（{{moment().startOf('month').format('MM.DD')}}——{{moment().endOf('month').format('MM.DD')}}）：</span>
			<span>在职</span>
			<span style="padding-right: 10px;padding-left:5px;color: #1890ff">{{allThisMonth}}</span>
			<span>入职</span>
			<span style="padding-right: 10px;padding-left:5px;color: green">{{employThisMonth}}</span>
			<span>离职</span>
			<span style="padding-right: 10px;padding-left:5px;color: red">{{leaveThisMonth}}</span>
		</div>
		<div slot="extra">
			<div style="padding-bottom: 15px">
				<a-button type="primary" icon="plus" @click="$router.replace('/employee/Add')">员工</a-button>
				<span style="padding: 5px">&nbsp</span>
				<a-button type="primary" icon="table" @click="showArchive()">人事报表</a-button>
			</div>
		</div>
		<a-card :bordered="false">
			<div class="search-page-search-wrapper">
				<a-form layout="inline">
					<a-row :gutter="24">
						<a-col :span="4">
							<a-form-item label="员工状态">
								<a-select defalutValue="on" v-model="queryParam.status" placeholder="" @change="search()">
									<a-select-option value="1">在职</a-select-option>
									<a-select-option value="0">离职</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<a-form-item label="员工编号">
								<a-input v-model="queryParam.emplID" placeholder="" @change="search()"/>
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<a-form-item label="员工姓名">
								<a-input v-model="queryParam.name" placeholder="" @change="search()"/>
							</a-form-item>
						</a-col>
						<a-col :span="5" :offset="3">
							<a-button type="primary" icon="reload" @click='refresh()'>刷新</a-button>&nbsp
							<a-button type="primary" icon="filter" @click="showDrawer">高级筛选</a-button>
						</a-col>
					</a-row>
				</a-form>
			</div>
			<a-drawer
				v-if="reset"
	      title="高级筛选"
	      :width="720"
	      @close="onClose"
	      :visible="visible"
	      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
	    >
	      <a-form :form="form" layout="vertical" hideRequiredMark>
	        <a-row :gutter="16">
	          <a-col :span="12">
	            <a-form-item label="学历">
	              <a-select
	                v-decorator="['eduDegree', {
	                  rules: [{}]
	                }]"
	                placeholder="请选择员工学历"
	              >
		              <a-select-option value='博士'>博士</a-select-option>
					      	<a-select-option value='硕士'>硕士</a-select-option>
					      	<a-select-option value='本科'>本科</a-select-option>
					      	<a-select-option value='大专'>大专</a-select-option>
					      	<a-select-option value='高中'>高中</a-select-option>
					      	<a-select-option value='初中'>初中</a-select-option>
					      	<a-select-option value='小学'>小学</a-select-option>
					      </a-select>
	            </a-form-item>
	          </a-col>
	          <a-col :span="12">
	            <a-form-item label="籍贯">
	              <a-input
	                v-decorator="['nativePlace', {
	                  rules: [{}]
	                }]"
	                placeholder="例如：河北省"
	              />
	            </a-form-item>
	          </a-col>
	        </a-row>
	        <a-row :gutter="16">
	          <a-col :span="12">
	            <a-form-item label="民族">
	              <a-input
	                v-decorator="['nationality', {
	                  rules: [{}]
	                }]"
	                placeholder="例如：汉族"
	              />
	            </a-form-item>
	          </a-col>
	          <a-col :span="12">
	            <a-form-item label="户口性质">
	              <a-select
	                v-decorator="['crNature', {
	                  rules: [{}]
	                }]"
	                placeholder="请选择员工户口性质"
	              >
	                <a-select-option value='本埠农业'>本埠农业</a-select-option>
					      	<a-select-option value='本埠城镇'>本埠城镇</a-select-option>
					      	<a-select-option value='外埠农业'>外埠农业</a-select-option>
					      	<a-select-option value='外埠城镇'>外埠城镇</a-select-option>
	              </a-select>
	            </a-form-item>
	          </a-col>
	        </a-row>
	        <a-row :gutter="16">
	          <a-col :span="12">
	            <a-form-item label="婚姻状况">
	              <a-select
	                v-decorator="['maritalSts', {
	                  rules: [{}]
	                }]"
	                placeholder="请选择员工婚姻状况"
	              >
	                <a-select-option value='已婚'>已婚</a-select-option>
					      	<a-select-option value='未婚'>未婚</a-select-option>
					      	<a-select-option value='已婚已育'>已婚已育</a-select-option>
					      	<a-select-option value='已婚未育'>已婚未育</a-select-option>
	              </a-select>
	            </a-form-item>
	          </a-col>
	          <a-col :span="12">
	            <a-form-item label="是否住宿">
	              <a-select
	                v-decorator="['acmd', {
	                  rules: [{}]
	                }]"
	                placeholder="请选择员工住宿情况"
	              >
	              	<a-select-option value='是'>是</a-select-option>
					      	<a-select-option value='否'>否</a-select-option>
		            </a-select>
	            </a-form-item>
	          </a-col>
	        </a-row>
	        <a-row :gutter="16">
	          <a-col :span="12">
	            <a-form-item label="政治面貌">
	              <a-select
	                v-decorator="['politicsSts', {
	                  rules: [{}]
	                }]"
	                placeholder="请选择员工政治面貌"
	              >
									<a-select-option value='中共党员'>中共党员</a-select-option>
					      	<a-select-option value='中共预备党员'>中共预备党员</a-select-option>
					      	<a-select-option value='共青团员'>共青团员</a-select-option>
					      	<a-select-option value='民主党派人士'>民主党派人士</a-select-option>
					      	<a-select-option value='无党派人士'>无党派人士</a-select-option>
					      	<a-select-option value='群众'>群众</a-select-option>
	              </a-select>
	            </a-form-item>
	          </a-col>
	          <a-col :span="12">
	            <a-form-item label="出生日期">
	              <a-range-picker
	                v-decorator="['birthday', {
	                  rules: [{type:'array'}]
	                }]"
	                style="width: 100%"
	                :getPopupContainer="trigger => trigger.parentNode"
	              />
	            </a-form-item>
	          </a-col>
	        </a-row>
	        <a-row :gutter="16">
	        	<a-col :span="12">
	            <a-form-item label="入职时间">
	              <a-range-picker
	                v-decorator="['employDate', {
	                  rules: [{type:'array'}]
	                }]"
	                style="width: 100%"
	                :getPopupContainer="trigger => trigger.parentNode"
	              />
	            </a-form-item>
	          </a-col>
	          <a-col :span="12">
	            <a-form-item label="应转正日期">
	              <a-range-picker
	              	:showTime="{defaultValue:[moment('00:00:00', 'HH:mm:ss'),moment('23:59:59', 'HH:mm:ss')]}"
	                v-decorator="['regDate', {
	                  rules: [{type:'array'}]
	                }]"
	                style="width: 100%"
	                :getPopupContainer="trigger => trigger.parentNode"
	              />
	            </a-form-item>
	          </a-col>
	        </a-row>
	        <a-row :gutter="16">
	        	<a-col :span="12">
	            <a-form-item label="合同起始日期">
	              <a-range-picker
	                v-decorator="['contractDateFrom', {
	                  rules: [{type:'array'}]
	                }]"
	                style="width: 100%"
	                :getPopupContainer="trigger => trigger.parentNode"
	              />
	            </a-form-item>
	          </a-col>
	          <a-col :span="12">
	            <a-form-item label="合同终止日期">
	              <a-range-picker
	                v-decorator="['contractDateTo', {
	                  rules: [{type:'array'}]
	                }]"
	                style="width: 100%"
	                :getPopupContainer="trigger => trigger.parentNode"
	              />
	            </a-form-item>
	          </a-col>
	        </a-row>
	      </a-form>
	      <div
	        :style="{
	          position: 'absolute',
	          left: 0,
	          bottom: 0,
	          width: '100%',
	          borderTop: '1px solid #e9e9e9',
	          padding: '10px 16px',
	          background: '#fff',
	          textAlign: 'right',
	        }">
	        <a-button :style="{marginRight: '8px'}" @click="onClose">返回</a-button>
	        <a-button :style="{marginRight: '8px'}" @click="clearCondition">重置</a-button>
	        <a-button @click="advanceSearch" type="primary">确定</a-button>
	      </div>
	    </a-drawer>
	    <a-drawer
	      title="人事报表存档"
	      placement="right"
	      :closable="false"
	      :width="360"
	      @close="archiveVisible=false"
	      :visible="archiveVisible">
	      <a-directory-tree
			    multiple
			    defaultExpandAll
			    @select="e=>onSelect(e)"
			    @expand="onExpand">
			    <a-tree-node v-for='(dir,index) in archiveTreeData' :title="dir.name" :key="index">
			      <a-tree-node v-for="(file,i) in dir.results" :key="file.path" :title="file.name" isLeaf />
			    </a-tree-node>
			  </a-directory-tree>
	    </a-drawer>
			<a-divider/>
			<div class="search-page-table-wrapper">
				<a-table
					v-if="reset"
					:rowKey="record => record._id"
					:columns="columns" 
					:dataSource="data"
					:loading="loading"
					:pagination="pagination"
					@change="handleTableChange"
					:customRow="(record,index)=>{
						return{
							on:{
								click:()=>{
									$router.push(`/employee/detail/${record._id}`)
								}
							}
						}
					}">
					<template slot='emplID' slot-scope='emplID'>
				 		{{emplID}}
					</template>
					<template slot='employDate' slot-scope="employDate">
				 		{{moment(employDate,"YYYY-MM-DD HH:mm Z").format("YYYY-MM-DD")}}
					</template>
					<template slot='store' slot-scope="store">
						<div v-for="s in store" style='padding: 2px'>
							<a-tag  color="blue" :key="s._id">{{s.name}}</a-tag>
						</div>
					</template>

				</a-table>
			</div>
		</a-card>
	</page-layout>
</template>

<script>
	const columns = [
	{
	  title: '编号',
	  dataIndex: 'emplID',
	  scopedSlots: { customRender: 'emplID' },
	  sorter:true
	}, 
	{
	  title: '姓名',
	  dataIndex: 'name',
	}, {
		title:'性别',
		dataIndex:'gender',
		filters: [
	    { text: '男', value: '男' },
	    { text: '女', value: '女' },
	  ],
	},{
	  title: '年限',
	  dataIndex: 'seniority_value',
	}, {
	  title: '入职时间',
	  dataIndex: 'employDate',
	  sorter:true,
	  scopedSlots: { customRender: 'employDate' },
	}, {
	  title: '手机',
	  dataIndex: 'phone',
	}, {
	  title: '邮箱',
	  dataIndex: 'email',
	}, {
	  title: '部门',
	  dataIndex: 'dept.name',
	  filters:[],
	}, {
	  title: '所在店铺',
	  dataIndex: 'store',
	  scopedSlots: { customRender: 'store' }
	}];
	import PageLayout from "@/components/page/PageLayout"
	import {getAllEmployee,getEmployThisMonth,getLeaveThisMonth,getBirthThisMonth,getRegEDThisMonth,getRegINGThisMonth,getFuzzyQuery,getQuery,getSearchHeadData} from "@/api/employee"
	import {getAllDept} from "@/api/dept"
	import {getEmployeeDataTemp,getArchivePath} from "@/api/fs"
	import moment from 'moment'
  export default {
    name: 'Search',
    data(){
    	return{
    		data:[],
    		columns,
    		loading:false,
    		pagination:{},
    		queryParam:{
    			emplID:'',
    			name:'',
    			status:'1'
    		},
    		form: this.$form.createForm(this),
	      visible: false,
	      leaveThisMonth:'',
	      employThisMonth:'',
	      allThisMonth:'',
	      lastTimeStamp:'',
	      queryMethod:'1',
	      archiveVisible:false,
	      archiveTreeData:[],
	      reset:true
    	}
    },
    components:{
    	PageLayout
    },
    methods:{
    	getAllEmployee,
    	getEmployThisMonth,
    	getLeaveThisMonth,
    	getFuzzyQuery,
    	getQuery,
    	getAllDept,
    	getEmployeeDataTemp,
    	getArchivePath,
    	getSearchHeadData,
    	moment,
    	clearCondition(){
    		this.$nextTick(()=>{
    			this.form.setFieldsValue({
						'eduDegree':null,
						'nativePlace':null,
						'nationality':null,
						'crNature':null,
						'maritalSts':null,
						'acmd':null,
						'politicsSts':null,
						'birthday':null,
						'employDate':null,
						'regDate':null,
						'contractDateFrom':null,
						'contractDateTo':null
					})
    		})
    		
    	},
    	refresh(){
    		this.reset = false
    		this.$nextTick(() => {
    			this.fetch()
					this.reset = true
				})
    	},
    	sorter(a,b){
    		var nameA = a.name.toUpperCase(); // ignore upper and lowercase
			  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
			  if (nameA < nameB) {
			    return -1;
			  }
			  if (nameA > nameB) {
			    return 1;
			  }
			  return 0
    	},
    	showDrawer() {
	      this.visible = true
	    },
	    showArchive() {
	    	this.getArchivePath().then(res=>{
	    		if(res.result){
	    			this.archiveTreeData = res.result.sort(this.sorter)
	    			this.archiveVisible = true
	    		}
	    	},err=>{
	    		this.$message.error(err.message)
	    	}).then(()=>{
	    		this.getEmployeeDataTemp().then(res=>{
	    			if(res.result = 'SUCCESS'){
	    				console.log('>>>实时人事报表已更新!')
	    			}else{
	    				this.$message.error(res.message)
	    			}
	    		},err=>{
	    			this.$message.error(err.message)
	    		})
	    	})
	    },
	    onSelect(key){
	    	window.open('http://192.168.1.240:3000/'+key[0].slice(9))
	    },
	    onExpand(){},
	    onClose() {
	      this.visible = false
	      let fields = this.form.getFieldsValue()
	      console.log('fieldsValue:',fields)
	    },
	    fetch(params={queryMethod:this.queryMethod}) {
	    	console.log('params:', params)
	    	this.loading = true
	    	this.getAllDept().then(res=>{
	    		if(res.result){
	    			let deptFilter = JSON.parse(JSON.stringify(res.result)).map(item=>({
	    				'text':item.name,
	    				'value':item._id,
	    			}))
	    			this.columns[7].filters = deptFilter
	    		}
	    	})
	    	this.getQuery({
	    		page_size:10,
	    		...params,
	    		...this.queryParam
	    	}).then(res=>{
	    		const pagination = { ...this.pagination }
	    		pagination.total = res.result.count
	    		this.loading = false
	    		this.data = res.result.list
	    		this.pagination = pagination
	    	})
	    	//2019/3/6 
	    	this.getSearchHeadData({}).then(res=>{
	    		this.leaveThisMonth = res.result.leave
	    		this.employThisMonth = res.result.employ
	    		this.allThisMonth = res.result.all
	    	})
	    },
	    handleTableChange(pagination, filters, sorter){
	    	console.log(pagination)
	    	const pager = {...this.pagination}
	    	pager.current = pagination.current
	    	this.pagination = pager
	    	console.log(filters)
	    	let advanceQueryParam = this.form.getFieldsValue()
	    	this.fetch({
	    		page_size:pagination.pageSize,
	    		page:pagination.current,
	    		sortField: sorter.field,
	        sortOrder: sorter.order,
	        queryMethod: this.queryMethod,
	        ...filters,
	        ...advanceQueryParam,
	    	})
	    },
	    search(){
	    	let timeStamp = Date.now()
	    	this.lastTimeStamp = timeStamp
	    	setTimeout(()=>{
	    		if (this.lastTimeStamp-timeStamp == 0) {
	    			console.log(this.queryParam)
						if(this.queryParam.emplID===''&&this.queryParam.name===''){
			    		this.queryMethod = '1'
			    		this.fetch()
			    	}else{
							this.queryMethod = '2'
							this.fetch({
		    				queryMethod:this.queryMethod,
		    			})
			    	}
	    		}
	    	},500)
	    },
	    advanceSearch(){
	    	this.queryParam.emplID = ''
	    	this.queryParam.name = ''
	    	this.queryParam.status = '1'
	    	this.queryMethod = '3'
	    	let advanceQueryParam = this.form.getFieldsValue()
	    	this.onClose()
    		this.fetch({
    			...advanceQueryParam,
    			queryMethod:this.queryMethod
    		})

	    }
    },
    created(){
			this.fetch()
    }
  }
</script>

<style scoped>

</style>