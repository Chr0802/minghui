<template>
	<page-layout>
		<a-row :gutter='24'>
			<a-col :span='6'>
				<a-card :bordered="false">
				  <div>
				    部门-岗位-岗位职称
				    <!-- <a-tree
					    showLine
					    :defaultExpandedKeys="['0-0-0']"
					    @select="onSelect"
					  >
				  		<a-tree-node key="0-0">
					      <span slot="title" style="color: #1890ff">明辉伟业</span>
					    </a-tree-node>
					  </a-tree> -->
					  <a-tree 
					  	:treeData="treeData"
					  	showLine
					  	@select="onSelect"
					  	@rightClick="rightClick" >
					  </a-tree>
				  </div>
				  <div>
				  	<template v-if="addDeptPermission">
				  		<a-row :gutter="24">
					  		<a-input placeholder="部门名称" v-model="addDeptName" style="width:80%">
							  </a-input>
							  <div>&nbsp</div>
							</a-row>
				  		<a-row :gutter="24">
						  	<a-popconfirm title="确认添加该部门？" @confirm="add('',addDeptName)">
						  		<a-button type="primary">提交</a-button>
						  	</a-popconfirm>&nbsp
						  	<a-button @click="addDeptPermission=false">取消</a-button>
						  </a-row>
				  	</template>
				  	<a-button type='dashed' icon="plus" v-else @click="addDeptPermission=true">添加部门</a-button>
				  </div>
				  <a-modal
			      :visible="visible_1"
			      @ok="handleOk"
			      :confirmLoading="confirmLoading"
			      @cancel="handleCancel"
			      width='750px'
			      >
			      <template slot="title">
			      	<div style="padding-bottom: 10px">{{currentNodeData.title}}</div>
			      	<div>
			      		<template v-if="currentNodeData.key.split('-').length===3">
				      		<template v-if='editVisible'>
			      				<a-input placeholder="职称名称" v-model="name" style="width:30%"/>&nbsp
			      				<a-button-group>
			      					<a-popconfirm title="确认修改？" @confirm="save(currentNodeData.key,1)">
									      <a-button type="primary">OK</a-button>
									    </a-popconfirm>
									    <a-popconfirm title="取消编辑？"@click="editVisible=false">
									      <a-button>Cancel</a-button>
								      </a-popconfirm>
								    </a-button-group>
			      			</template>
			      			<template v-else>
				      			<a-button icon="edit" @click='editVisible=true'>修改职称名称</a-button>&nbsp
				      			<a-popconfirm title="确认删除？" @confirm="del(currentNodeData.key,1)">
					      			<a-button type="danger" icon="delete">删除该职称</a-button>
					      		</a-popconfirm>
			      			</template>
			      		</template>
			      		<template v-else>
			      			<template v-if='addVisible'>
			      				<a-input :placeholder="currentNodeData.key.split('-').length===1?'岗位名称':'职称名称'" v-model="name" style="width:30%"/>&nbsp
			      				<a-input-number :min="0" :max="50" :placeholder="currentNodeData.key.split('-').length===1?'岗位系数':'职称系数'" v-model="score" style="width:20%"/>&nbsp
			      				<a-button-group>
			      					<a-popconfirm title="确认添加？" @confirm="add(currentNodeData.key,{name,score});name='';score=''">
									      <a-button type="primary">OK</a-button>
								      </a-popconfirm>
								      <a-popconfirm title="取消编辑？" @confirm="name='';score='';addVisible=false">
									      <a-button>Cancel</a-button>
									    </a-popconfirm>
								    </a-button-group>
			      			</template>
			      			<template v-if='editVisible'>
			      				<a-input :placeholder="currentNodeData.key.split('-').length===1?'部门名称':'岗位名称'" v-model="name" style="width:30%"/>&nbsp
			      				<a-button-group>
								      <a-popconfirm title="确认修改？" @confirm="save(currentNodeData.key,1)">
									      <a-button type="primary">OK</a-button>
								      </a-popconfirm>
								      <a-popconfirm title="取消编辑？" @confirm="name='';editVisible=false">
									      <a-button>Cancel</a-button>
									    </a-popconfirm>
								    </a-button-group>
			      			</template>
			      			<a-button v-if="(!addVisible)&&(!editVisible)" @click='addVisible=true' type="primary" icon="plus" @>{{currentNodeData.key.split('-').length===1?'添加岗位':'添加职称'}}</a-button>&nbsp
			      			<a-button v-if="(!addVisible)&&(!editVisible)" @click='editVisible=true' icon="edit">{{currentNodeData.key.split('-').length===1?'修改部门':'修改岗位'}}</a-button>&nbsp
			      			<a-popconfirm title="确认删除？" @confirm="del(currentNodeData.key,1)">
				      			<a-button v-if="(!addVisible)&&(!editVisible)" type="danger" icon="delete">{{currentNodeData.key.split('-').length===1?'删除该部门':'删除该岗位'}}</a-button>
				      		</a-popconfirm>
			      		</template>
			      	</div>
			      </template>
			      <a-table :pagination='false' :columns='columns' :dataSource='currentNodeData.children' bordered>
			      	<template slot="id" slot-scope="text, record, index">
					      <template>{{record.key.split('-')[record.key.split('-').length-1]}}</template>
					    </template>
					    <template slot="name" slot-scope="text, record, index">
					      <div>
					        <a-input
					          v-if="record.editable"
					          style="margin: -5px 0"
					          :value="record.title"
					          @change="e => handleChange(e.target.value, record.key, 'title',record)"
					        />
					        <template v-else>{{record.title}}</template>
					      </div>
					    </template>
					    <template slot="operation" slot-scope="text, record, index">
					      <div class='editable-row-operations'>
					        <span v-if="record.editable">
					        	<a-popconfirm title='确认保存?' @confirm="save(record.key,0)">
					            <a>保存</a>
					          </a-popconfirm>
					          &nbsp
					          <a-popconfirm title='放弃修改?' @confirm="cancel(record.key)">
					            <a>取消</a>
					          </a-popconfirm>
					          &nbsp
					          <a-popconfirm title='确认删除?' @confirm="del(record.key,0)">
					            <a>删除</a>
					          </a-popconfirm>
					        </span>
					        <span v-else>
					          <a @click="edit(record.key)">编辑</a>
					        </span>
					      </div>
					    </template>
			      </a-table>
				  </a-modal>
				</a-card>
			</a-col>
			<a-col :span="18">
				<a-card :bordered="false">
					<div class="operate">
		        <a-button type="dashed" style="width: 100%" icon="plus" @click='initAddStore' :disabled='!Boolean(curSelectedLength)'>添加</a-button>
		      </div>
		      <a-modal
			      :visible="visible_2"
			      @ok="submitAddStore"
			      :confirmLoading="confirmLoading"
			      @cancel="cancelAddStore"
			      title = '添加店铺'
			      >
			      <template v-if='curSelectedLength===2'>
			      	<a-form :form='form'>
			      		<a-form-item
									label="负责店铺"
									:labelCol="formItemLayout_m.labelCol"
						      :wrapperCol="formItemLayout_m.wrapperCol">
									<a-select
										mode="multiple"
										style='width:100%'
										placeholder="店铺名称"
									 	v-decorator="[
						          'store',
						          {rules: [{ required: true }]}
						        ]">
						        <a-select-option v-for="s in selectOptions" :value='s._id'>{{s.name}}</a-select-option>
						      </a-select>
								</a-form-item>
			      	</a-form>
			      </template>
			      <template v-else>
			      	<a-form :form="form">
				      	<a-form-item
									label="名称"
									:labelCol="formItemLayout_m.labelCol"
						      :wrapperCol="formItemLayout_m.wrapperCol">
									<a-input
										style='width:100%'
										placeholder="店铺名称"
									 	v-decorator="[
						          'name',
						          {rules: [{ required: true }]}
						        ]"/>
								</a-form-item>
				      	<a-form-item
									label="平台"
									:labelCol="formItemLayout_m.labelCol"
						      :wrapperCol="formItemLayout_m.wrapperCol">
									<a-input
										style='width:100%'
										placeholder="所属平台"
									 	v-decorator="[
						          'platform',
						          {rules: [{ required: true }]}
						        ]"/>
								</a-form-item>
				      	<a-form-item
									label="品牌"
									:labelCol="formItemLayout_m.labelCol"
						      :wrapperCol="formItemLayout_m.wrapperCol">
									<a-input
										style='width:100%'
										placeholder="店铺商品品牌"
									 	v-decorator="[
						          'brand',
						          {rules: [{ required: true }]}
						        ]"/>
								</a-form-item>
				      	<a-form-item
									label="备注"
									:labelCol="formItemLayout_m.labelCol"
						      :wrapperCol="formItemLayout_m.wrapperCol">
									<a-textarea
										style='width:100%'
										placeholder="店铺项目等信息"
									 	:rows="4"
									 	v-decorator="[
						          'notes',
						          {rules: [{ required: true }]}
						        ]"/>
								</a-form-item>
							</a-form>
			      </template>
			    </a-modal>
					<a-list :loading="loading">
		        <a-list-item :key="index" v-for="(item, index) in stores">
		          <a-list-item-meta :description="item.description">
		            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
		            <a slot="title">{{ item.title }}</a>
		          </a-list-item-meta>
		          <div slot="actions">
		            <a-dropdown v-show="curSelectedLength===1">
		              <a-menu slot="overlay">
		                <!-- <a-menu-item><a >编辑</a></a-menu-item> -->
		                <a-menu-item><a @click='showDeleteConfirm(item._id)'>删除</a></a-menu-item>
		              </a-menu>
		              <a>更多<a-icon type="down"/></a>
		            </a-dropdown>
		          </div>
		          <div class="list-content">
		            <div class="list-content-item">
		              <span>所属平台</span>
		              <p>{{ item.platform }}</p>
		            </div>
		          </div>
		        </a-list-item>
		      </a-list>
				</a-card>
			</a-col>
		</a-row>
	</page-layout>
</template>

<script>
	const columns=[{
		title:'编号',
		dataIndex:'id',
		width:'25%',
		scopedSlots:{ customRender:'id'},
	},{
		title:'名称',
		dataIndex:'name',
		// width:'25%',
		scopedSlots:{ customRender:'name'}
	},
	// {
	// 	title:'人数',
	// 	dataIndex:'peoples',
	// 	width:'25%',
	// 	scopedSlots:{ customRender:'peoples'}
	// }
	,{
	  title: '操作',
	  dataIndex: 'operation',
	  scopedSlots: { customRender: 'operation' }
	}]
	const formItemLayout_m = {
	  labelCol: { span: 4 },
	  wrapperCol: { span: 18, offset: 1 },
	};
	import PageLayout from "@/components/page/PageLayout"
	import {getAllDept,updateDept,deleteDept,addDept,getStoreOfDept} from "@/api/dept"
	import {addStore,deleteStore,updateStore} from "@/api/store"
  export default {
    name: 'Overview',
    data(){
    	return {
    		loading:false,
    		formItemLayout_m,
    		curSelected:'',
    		addDeptName:'',
    		stores:[],
    		selectOptions:[],//给岗位添加店铺的下拉备选项
    		selectedOptions:[],//添加前，岗位已选的店铺
    		columns,
    		treeData:[],
    		ModalText: 'Content of the modal',
	      visible_1: false,
	      visible_2: false,
	      confirmLoading: false,
	      currentNodeData:{"key":'',"title":'',children:[]},
	      cacheData:{},
	      editPermission:true,
	      addDeptPermission:false,
	      addVisible:false,
	      editVisible:false,
	      score:'',
	      name:'',
    	}
    },
    computed:{
    	curSelectedLength(){
    		return this.curSelected?this.curSelected.split('-').length:0
    	}
    },
    components:{
    	PageLayout
    },
    methods: {
	    getAllDept,
	    updateDept,
	    deleteDept,
	    addDept,
	    getStoreOfDept,
	    addStore,
	    deleteStore,
	    updateStore,
	    showDeleteConfirm(id) {
	    	let that = this
	      this.$confirm({
	        title: '确定要删除这家店铺吗？',
	        content: '为确保数据正常，删除之前，请对与店铺相关联的岗位与员工进行修改。',
	        okText: '确定',
	        okType: 'danger',
	        cancelText: '取消',
	        onOk() {
	          that.loading = true
	          that.deleteStore({id}).then(res=>{
	          	that.$message.success('删除店铺成功！')
	          },err=>{
	          	that.$message.error(err.message)
	          }).finally(()=>{
	          	that.getStoreOfDept({key:that.curSelected}).then(res=>{
				      	that.stores = res.result.map(item=>{
				      		return{
				      			_id:item._id,
				      			title:item.name,
				      			avatar: item.avatar,
				      			description:item.notes,
				      			platform:item.platform,
				      			brand:item.brand,
				      		}
				      	})
				      },err=>{
				      	that.$message.error(err.message)
				      }).finally(()=>{
				      	that.loading = false
				      })
	          })
	        },
	        onCancel() {
	          console.log('Cancel');
	        },
	      });
	    },
	    onSelect (selectedKeys, info) {
	    	this.curSelected = selectedKeys[0]
	      console.log('selected', selectedKeys, info)
	      if (info.selected){
	      	this.loading = true
	      	this.getStoreOfDept({key:selectedKeys[0]}).then(res=>{
		      	console.log(res)
		      	this.stores = res.result.map(item=>{
		      		return{
		      			_id:item._id,
		      			title:item.name,
		      			avatar: item.avatar,
		      			description:item.notes,
		      			platform:item.platform,
		      			brand:item.brand
		      		}
		      	})
		      },err=>{
		      	this.$message.error(err.message)
		      }).finally(()=>{
		      	this.loading = false
		      })
	      }else{
	      	this.stores = []
	      }
	    },
	    rightClick(info){
	    	this.visible_1 = true
	    	this.currentNodeData = info.node.dataRef
	    	console.log(this.currentNodeData)
	    },
	    initAddStore(){
	    	if(this.curSelectedLength===2){
	    		this.selectedOptions = JSON.parse(JSON.stringify(this.stores)).map(item=>item._id)
	    		this.form.setFieldsValue({'store':this.selectedOptions})
	    		this.visible_2 = true
	    		this.getStoreOfDept({key:''}).then(res=>{
	    			this.selectOptions = res.result
	    		},err=>{
	    			console.log('error:',err)
    				this.$message.error(err.message)
    				this.visible_2 = false
	    		})
	    	}else{
	    		this.visible_2 = true
	    	}
	    },
	    handleOk(e) {
    		this.visible_1 = false
	    },
	    submitAddStore(e){
	    	this.form.validateFields((err,res)=>{
	    		if(!err){
	    			if(this.curSelectedLength===1){
	    				this.confirmLoading = true
		    			this.addStore({...res}).then(res=>{
		    				console.log(res)
		    				this.$message.success('新增店铺成功')
		    			},err=>{
		    				console.log('error:',err)
		    				this.$message.error(err.message)
		    			}).finally(()=>{
		    				this.confirmLoading = false
		    				this.visible_2 = false
		    				this.getStoreOfDept({key:this.curSelected}).then(res=>{
					      	this.stores = res.result.map(item=>{
					      		return{
					      			_id:item._id,
					      			title:item.name,
					      			avatar: item.avatar,
					      			description:item.notes,
					      			platform:item.platform
					      		}
					      	})
					      },err=>{
					      	this.$message.error(err.message)
					      }).finally(()=>{
					      	this.loading = false
					      })
		    			})
	    			}else{
	    				this.confirmLoading = true
	    				console.log('res:',res)
		    			this.addStore({...res,'dept_position_id':this.curSelected}).then(res=>{
		    				console.log(res)
		    				this.$message.success('添加店铺成功')
		    			},err=>{
		    				console.log('error:',err)
		    				this.$message.error(err.message)
		    			}).finally(()=>{
		    				this.confirmLoading = false
		    				this.visible_2 = false
		    				this.getStoreOfDept({key:this.curSelected}).then(res=>{
					      	this.stores = res.result.map(item=>{
					      		return{
					      			_id:item._id,
					      			title:item.name,
					      			avatar: item.avatar,
					      			description:item.notes,
					      			platform:item.platform,
					      			brand:item.brand,
					      		}
					      	})
					      },err=>{
					      	this.$message.error(err.message)
					      }).finally(()=>{
					      	this.loading = false
					      })
		    			})
	    			}
	    		} 
	    	})
	    },
	    cancelAddStore(e){
	    	this.visible_2 = false
	    },
	    handleCancel(e) {
	      console.log('Clicked cancel button');
	      this.visible_1 = false
	      this.addVisible = false
	      this.editVisible = false
	      this.name = ''
	      this.score = ''
	    },
	    edit(key){
	    	if (this.editPermission){
	    		this.editPermission = false
		    	this.cacheData = JSON.parse(JSON.stringify(this.currentNodeData))
		    	const newData = JSON.parse(JSON.stringify(this.currentNodeData.children))
		    	const target = newData.filter(item => key === item.key)[0]
		      if (target) {
		        target.editable = true
		        // console.log('当前节点数据(不可编辑状态):',this.currentNodeData.children)
		        // console.log('当前节点缓存数据:',this.cacheData.children)
		        this.currentNodeData.children = newData
		        // console.log('当前节点数据:(可编辑状态)',this.currentNodeData.children)
		        // console.log('当前节点缓存数据:',this.cacheData.children)
		      } else {
		      	// console.log('当前节点选中子节点数据(不可编辑状态):',newData.filter(item => key.slice(0,-4) === item.key)[0].children)
		      	const newData_1 = JSON.parse(JSON.stringify(newData.filter(item => key.slice(0,-4) === item.key)[0].children))
		      	const target_1 = newData_1.filter(item => key === item.key)[0]
		      	if (target_1) {
		      		target_1.editable = true
		      		this.currentNodeData.children.filter(item => key.slice(0,-4) === item.key)[0].children = newData_1
		      	}
		      }
		    }else{
		    	this.$message.warning('请先完成当前编辑');
		    }
	    },
	    cancel (key) {
	      const newData = JSON.parse(JSON.stringify(this.currentNodeData.children))
	    	const target = newData.filter(item => key === item.key)[0]
	      if (target) {
	        Object.assign(target, this.cacheData.children.filter(item => key === item.key)[0])
	        delete target.editable
	        this.currentNodeData.children = newData
	      } else {
	      	const newData_1 = newData.filter(item => key.slice(0,-4) === item.key)[0].children
	      	const target_1 = newData_1.filter(item => key === item.key)[0]
	      	if (target_1) {
	      		Object.assign(target_1, this.cacheData.children.filter(item => key.slice(0,-4) === item.key)[0].children.filter(item => key === item.key)[0])
		        delete target_1.editable
		        this.currentNodeData.children = newData
	      	}
	      }
	      this.editPermission = true
	    },
	    save(key,type){
	    	console.log('edit_key:',key)
	    	if(type===1){
	    		let value = this.name
	    		this.updateDept({"key":key,'value':value}).then(res=>{
	        	console.log('saved_res:',res)
	        	this.init().then(()=>{
	        		this.handleCancel()
	        		this.editVisible = false
	        	})
	        })
	    	}else{
		    	const newData = JSON.parse(JSON.stringify(this.currentNodeData.children))
		      const target = newData.filter(item => key === item.key)[0]
		    	if (target) {
		        let value = target['title']
		        this.updateDept({"key":key,"value":value}).then(res=>{
		        	console.log(res)
		        	this.editPermission = true
		        	delete target.editable
		        	this.currentNodeData.children = newData
		        	console.log(this.currentNodeData.children)
		        })
		      } else {
		      	const newData_1 = newData.filter(item => key.slice(0,-4) === item.key)[0].children
		      	const target_1 = newData_1.filter(item => key === item.key)[0]
		      	if(target_1) {
		      		let value = target_1['title']
		      		this.updateDept({"key":key,"value":value}).then(res=>{
			        	console.log(res)
			        	this.editPermission = true
			        	delete target_1.editable
				        this.currentNodeData.children = newData
				        console.log(this.currentNodeData.children)
			        })
		      	}
		      }
		    }
	    },
	    del(key,type){
	    	console.log('delete_key:',key)
	    	if(type===1){
	    		this.deleteDept({"key":key}).then(res=>{
	        	console.log('deleted,res:',res)
	        	this.init().then(()=>{
	        		this.handleCancel()
	        	})
	        })
	    	}else{
	    		let newData = JSON.parse(JSON.stringify(this.currentNodeData.children))
		      const target = newData.filter(item => key === item.key)[0]
		    	if (target) {
		        this.deleteDept({"key":key}).then(res=>{
		        	console.log('deleted,res:',res)
		        	this.editPermission = true
		        	newData = newData.filter(item => key !== item.key)
		        	this.currentNodeData.children = newData
		        	console.log('deleted,newdata:',this.currentNodeData.children)
		        })
		      } else {
		      	let newData_1 = newData.filter(item => key.slice(0,-4) === item.key)[0].children
		      	const target_1 = newData_1.filter(item => key === item.key)[0]
		      	if(target_1) {
		      		this.deleteDept({"key":key}).then(res=>{
			        	console.log('deleted,res:',res)
			        	this.editPermission = true
			        	newData.filter(item => key.slice(0,-4) === item.key)[0].children = newData_1.filter(item => key !== item.key)
				        this.currentNodeData.children = newData
				        console.log('deleted,newdata:',this.currentNodeData.children)
			        })
		      	}
		      }
	    	}
	    },
	    add(key,value){
	    	if(key===''){
	    		this.addDept({"key":key,"value":value}).then(res=>{
	    			this.init()
	    			console.log(res)
	    			this.addDeptPermission = false
	    			this.addDeptName = ''
	    		})
	    	}else{
	    		let key_id = key + '-id'
	    		this.addDept({"key":key_id,"value":value}).then(res=>{
	    			console.log(res)
	    			this.init().then(()=>{
	    				let curNodeKey = key_id.split('-')
		    			switch (curNodeKey.length) {
		    				case 2:
		    					console.log('before:',this.currentNodeData)
		    					this.currentNodeData.children = JSON.parse(JSON.stringify(this.treeData)).filter(item=>item.key===curNodeKey[0])[0].children
		    					console.log('after:',this.currentNodeData)
		    					break;
		    				case 3:
			    				console.log('before:',this.currentNodeData)
		    					this.currentNodeData.children = JSON.parse(JSON.stringify(this.treeData)).filter(item=>item.key===curNodeKey[0])[0].children.filter(item=>item.key===key)[0].children
		    					console.log('after:',this.currentNodeData)
		    					break;
		    				default:
		    					this.currentNodeData = []
		    					break;
		    			}
	    			})
	    			this.addDeptPermission = false
	    			this.addDeptName = ''
	    		})
	    		console.log(">>",key,value)
	    	}
	    	this.addVisible=false
	    },
	    handleChange(value, key, column,r){
	    	const newData = JSON.parse(JSON.stringify(this.currentNodeData.children))
	      const target = newData.filter(item => key === item.key)[0]
	      if (target) {
	        target[column] = value
	        this.currentNodeData.children = newData
	      } else {
	      	console.log(newData.filter(item => key.slice(0,-4) === item.key)[0].children)
	      	const newData_1 = JSON.parse(JSON.stringify(newData.filter(item => key.slice(0,-4) === item.key)[0].children))
	      	const target_1 = newData_1.filter(item => key === item.key)[0]
	      	if(target_1) {
	      		target_1[column] = value
	      		this.currentNodeData.children.filter(item => key.slice(0,-4) === item.key)[0].children = newData_1
	      	}
	      }
	      console.log(r)
	    },
	    async init(){
	    	await this.getAllDept().then(res=>{
		  		let depts = res.result
		  		this.treeData = depts.filter(dept=>(
		  			dept.sts === 1
		  		)).map(dept=> {
		  			let pos = dept.positions.filter(pos=>(
		  				pos.sts === 1
		  			)).map(pos=>{
		  				let tit = pos.titles.filter(tit=>(
		  					tit.sts === 1
		  				)).map(tit=> {
		  					return {
		  						title:tit.name,
		  						key:dept._id+"-"+pos.id+"-"+tit.id
		  					}
		  				})
		  				return {
		  					title:pos.name,
		  					key:dept._id+"-"+pos.id,
		  					children:tit
		  				}
		  			})
		  			return {
		  				title:dept.name,
		  				key:dept._id,
		  				children:pos
		  					}
		  				})
		  		console.log(this.treeData)
		  	})
		  }
	  },
	  created(){
	  	this.form = this.$form.createForm(this)
	  },
	  mounted(){
	  	this.init()
	  }
	}
</script>

<style scoped>
	.ant-input{
		width: 115px
	}
</style>