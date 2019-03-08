<template>
	<page-layout>
		<div slot="headerContent">
      <!-- <span style="padding-right: 50px">员工编号：detail?detail.emplID+10000:''</span>
      <span style="padding-right: 50px">detail?detail.dept.name:''-detail?detail.position:''</span> -->
      <span>员工状态：</span><a-switch checkedChildren="在职" unCheckedChildren="离职" v-model = 'sts' />
      <div>&nbsp</div>
    </div>
    <a-back-top />
    <!-- <div slot="extra">
      <div style="padding-bottom: 15px">
      	<a-button type="primary" icon="edit" @click="edit()">修改</a-button>
      </div>
    </div> -->
		<a-card 
			:bordered="false">
			<a-form :form="form">
			  <a-row :gutter="24">
			  	<a-col :span="21">
						<div class="info-wrapper">
							<a-divider orientation="left" id="basic-info">基本信息</a-divider>
							<a-row :gutter="24">
								<a-col :span="5" :offset="1">
									<a-avatar shape="circle" size="large">{{lastname}}</a-avatar>
								</a-col>
								<a-col :span="8">
									<a-form-item
							      :labelCol="formItemLayout.labelCol"
							      :wrapperCol="formItemLayout.wrapperCol"
							      label='姓名'
							    >
							      <a-input
							        v-decorator="[
							          'name',
							          {rules: [{ required: true, message: '请填写员工姓名' }]}
							        ]"
							        placeholder='请填写员工姓名'
							      />
							    </a-form-item>
							    <a-form-item
							      :labelCol="formItemLayout.labelCol"
							      :wrapperCol="formItemLayout.wrapperCol"
							      label='性别'
							    >
							      <a-select
							        v-decorator="[
							          'gender',
							          {rules: [{ required: true, message: '请设置员工性别'  }]}
							        ]"
							        placeholder='请选择员工性别'
							      >
								      <a-select-option value='男'>男</a-select-option>
								      <a-select-option value='女'>女</a-select-option>
								    </a-select>
							    </a-form-item>
							    <a-form-item
										label="出生日期"
										:labelCol="formItemLayout.labelCol"
							      :wrapperCol="formItemLayout.wrapperCol"
									>
										<a-date-picker
											placeholder='请设置员工出生日期'
											@change='getAge'
											v-decorator="[
							          'birthday',
							          {rules: [{ required: true ,message: '请设置员工出生日期'} ]}
							        ]"
							       />
									</a-form-item>
								</a-col>
								<a-col :span="8">
							    <a-form-item
							      :labelCol="formItemLayout.labelCol"
							      :wrapperCol="formItemLayout.wrapperCol"
							      label='年龄'
							    >
							      <a-input
							      	:disabled="true"
							      	placeholder='年龄由系统计算'
							        v-decorator="[
							          'age',
							          {rules: []}
							        ]"
							      />
							    </a-form-item>
							    <a-form-item
							      :labelCol="formItemLayout.labelCol"
							      :wrapperCol="formItemLayout.wrapperCol"
							      label='血型'
							    >
							      <a-select
								      placeholder='请选择员工血型'
							        v-decorator="[
							          'bloodType',
							          {rules: [{ required: true,message:'请选择员工血型'}]}
							        ]"
							      >
							      	<a-select-option value="未知">未知</a-select-option>
								      <a-select-option value="A">A型</a-select-option>
								      <a-select-option value="B">B型</a-select-option>
								      <a-select-option value="O">O型</a-select-option>
								      <a-select-option value="AB">AB型</a-select-option>
								    </a-select>
							    </a-form-item>
							    <a-form-item
										label="最高学历"
										:labelCol="formItemLayout.labelCol"
							      :wrapperCol="formItemLayout.wrapperCol"
							      placeholder='请选择员工学历'
									>
										<a-select
								      placeholder='请选择员工学历'
											v-decorator="[
							          'eduDegree',
							          {rules: [{ required: true ,message:'请选择员工最高学历'}]}
							        ]"
							      >
							      	<a-select-option value="未知">未知</a-select-option>
							      	<a-select-option value='博士'>博士</a-select-option>
							      	<a-select-option value='硕士'>硕士</a-select-option>
							      	<a-select-option value='本科'>本科</a-select-option>
							      	<a-select-option value='大专'>大专</a-select-option>
							      	<a-select-option value="中专">中专</a-select-option>
							      	<a-select-option value='高中'>高中</a-select-option>
							      	<a-select-option value="职高">职高</a-select-option>
							      	<a-select-option value='初中'>初中</a-select-option>
							      	<a-select-option value='小学'>小学</a-select-option>
								    </a-select>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row :gutter="24">
								<a-col :span="24">
									<a-form-item
										label="国家/地区"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='示例：中国大陆，中国台湾，中国香港，中国澳门等'
											v-decorator="[
							          'region',
							          {rules: [{ required: true ,message:'请填写员工国家地区'}]}
							        ]">
							      	<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
								    </a-input>
									</a-form-item>
									<a-form-item
										label="身份证号"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='请填写员工身份证号'
											v-decorator="[
							          'IDNum',
							          {rules: [{ required: true,message:'请填写员工身份证号' },{pattern:/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,message:'身份证号不合法'}]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
								</a-col>
								<a-col :span="5">
									<a-form-item
										label="身份证照"
										:labelCol="{span:21}"
										:wrapperCol="{span:0}">
										<!-- <a-input
											v-decorator="[
							          'IDPhoto',
							          {rules: [{ required: true }]}
							        ]">
										</a-input> -->
									</a-form-item>
								</a-col>
								<a-col :span="18">
									<div class="clearfix">
								    <a-upload
								      :action="'//192.168.1.240:3000/upload?id=temp&item=IDPhoto'"
								      listType="picture-card"
								      :fileList="IDPhotoList"
								      @preview="handlePreview"
								      @change="e=>handleChange({IDPhotoList:e.fileList},e)"
								      :remove="remove">
								      <div v-if="IDPhotoList.length < 2">
								        <a-icon type="plus" />
								        <div class="ant-upload-text">上传</div>
								      </div>
								    </a-upload>
								    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
								      <img alt="example" style="width: 100%" :src="previewImage" />
								    </a-modal>
								    <div style="color: #999;height:40px;line-height: 39px">*图片格式为jpg/jpeg/png,大小在2MB之内</div>
								  </div>
								</a-col>
								<a-col :span="24">
									<a-form-item
										label="籍贯"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='示例：北京市东城区，河北省保定市等'
											v-decorator="[
							          'nativePlace',
							          {rules: [{ required: true,message:'请填写员工籍贯' ,}]}
							        ]">
							      	<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
								    </a-input>
									</a-form-item>
									<a-form-item
										label="民族"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='示例：汉族，蒙古族等'
											v-decorator="[
							          'nationality',
							          {rules: [{ required: true,message:'请填写员工民族' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="户籍所在地"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='示例：北京市东城区，河北省保定市等'
											v-decorator="[
							          'crLocation',
							          {rules: [{ required: true,message:'请填写员工户籍所在地' }]}
							        ]">
							      	<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
								    </a-input>
									</a-form-item>
									<a-form-item
										label="户口性质"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-select
											placeholder='请选择员工户口性质'
											v-decorator="[
							          'crNature',
							          {rules: [{ required: true,message:'请选择员工户口性质' }]}
							        ]">
											<a-select-option value='本埠农业'>本埠农业</a-select-option>
							      	<a-select-option value='本埠城镇'>本埠城镇</a-select-option>
							      	<a-select-option value='外埠农业'>外埠农业</a-select-option>
							      	<a-select-option value='外埠城镇'>外埠城镇</a-select-option>
										</a-select>
									</a-form-item>
									<a-form-item
										label="是否住宿"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol">
										<a-select
											placeholder='请选择员工是否住宿'
											v-decorator="[
							          'acmd',
							          {rules: [{ required: true,message:'请选择员工是否住宿' }]}
							        ]">
							      	<a-select-option value='是'>是</a-select-option>
							      	<a-select-option value='否'>否</a-select-option>
								    </a-select>
									</a-form-item>
									<a-form-item
										label="婚姻状况"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-select
											placeholder='请选择员工婚姻状况'
											v-decorator="[
							          'maritalSts',
							          {rules: [{ required: true,message:'请选择员工婚姻状况' }]}
							        ]">
							        <a-select-option value="未知">未知</a-select-option>
							      	<a-select-option value='已婚'>已婚</a-select-option>
							      	<a-select-option value='未婚'>未婚</a-select-option>
							      	<a-select-option value='已婚已育'>已婚已育</a-select-option>
							      	<a-select-option value='已婚未育'>已婚未育</a-select-option>
										</a-select>
									</a-form-item>
									<a-form-item
										label="怀孕状况"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol">
										<a-select
											placeholder='请选择员工怀孕状况'
											v-decorator="[
							          'pragnancySts',
							          {rules: [{ required: true,message:'请选择员工怀孕状况' }]}
							        ]">
							        <a-select-option value="未知">未知</a-select-option>
							      	<a-select-option value='备孕'>备孕</a-select-option>
							      	<a-select-option value='待孕'>待孕</a-select-option>
							      	<a-select-option value='怀孕'>怀孕</a-select-option>
								    </a-select>
									</a-form-item>
									<a-form-item
										label="子女状态"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='请填写员工子女状态'
											v-decorator="[
							          'childrenSts',
							          {rules: [{ required: true,message:'请填写员工子女状态' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
								</a-col>
								<a-col :span="5">
									<a-form-item
										label="员工照片"
										:labelCol="{span:21}"
										:wrapperCol="{span:0}">
										<!-- <a-input
											v-decorator="[
							          'emplPhoto',
							          {rules: [{ required: true,message:'请填写员工' }]}
							        ]">
										</a-input> -->
									</a-form-item>
								</a-col>
								<a-col :span="18">
									<div class="clearfix">
								    <a-upload
								      :action="'//192.168.1.240:3000/upload?id=temp&item=emplPhoto'"
								      listType="picture-card"
								      :fileList="emplPhotoList"
								      @preview="handlePreview"
								      @change="e=>handleChange({emplPhotoList:e.fileList},e)"
								      :remove="remove"
								    >
								      <div v-if="emplPhotoList.length < 1">
								        <a-icon type="plus" />
								        <div class="ant-upload-text">上传</div>
								      </div>
								    </a-upload>
								    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
								      <img alt="example" style="width: 100%" :src="previewImage" />
								    </a-modal>
								    <div style="color: #999;height:40px;line-height: 39px">*图片格式为jpg/jpeg/png,大小在2MB之内</div>
								  </div>
								</a-col>
								<a-col :span="24">
									<a-form-item
										label="政治面貌"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol">
										<a-select
											placeholder='请选择员工政治面貌'
											@change='changePolitisticsSts'
											v-decorator="[
							          'politicsSts',
							          {rules: [{ required: true,message:'请填写员工政治面貌' }]}
							        ]">
							        <a-select-option value="未知">未知</a-select-option>
							      	<a-select-option value='中共党员'>中共党员</a-select-option>
							      	<a-select-option value='中共预备党员'>中共预备党员</a-select-option>
							      	<a-select-option value='共青团员'>共青团员</a-select-option>
							      	<a-select-option value='民主党派人士'>民主党派人士</a-select-option>
							      	<a-select-option value='无党派人士'>无党派人士</a-select-option>
							      	<a-select-option value='群众'>群众</a-select-option>
								    </a-select>
									</a-form-item>
									<template v-if='haveJoinedParty'>
										<a-form-item
											label="入党日期"
											:labelCol="formItemLayout_m.labelCol"
								      :wrapperCol="formItemLayout_m.wrapperCol"
										>
											<a-date-picker
												v-decorator="[
								          'PartyDate',
								          {rules: [{ required: true ,message:'请填写员工入党时间'}]}
								        ]"
								       />
										</a-form-item>
									</template>
									<a-form-item
										label="现居住地"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='请填写员工现居住地'
											v-decorator="[
							          'rsdt',
							          {rules: [{ required: true,message:'请填写员工现居住地' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="居住证城市"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='请填写员工居住证城市'
											v-decorator="[
							          'rsdtPermitCity',
							          {rules: [{ required: true,message:'请填写员工居住证城市' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="居住证起止日期"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol"
									>
										<a-range-picker
											v-decorator="[
							          'rsdtPermitDate',
							          {rules: [{ required: true,message:'请填写员工居住证起止日期' }]}
							        ]"
							      />
									</a-form-item>
								</a-col>
							</a-row>
						</div>
						<div class="info-wrapper">
							<a-divider orientation="left" id="contact-info">通讯信息</a-divider>
							<a-row :gutter="24">
								<a-col :span="24">
									<a-form-item
										label="手机号码"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='请填写员工手机号码'
											v-decorator="[
							          'phone',
							          {rules: [{ required: true,message:'请填写员工手机号码' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="电子邮箱"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='请填写员工电子邮箱，若没有，填写“无”'
											v-decorator="[
							          'email',
							          {rules: [{ required: true,message:'请填写员工电子邮箱' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="QQ"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='请填写员工QQ号码，若没有，填写“无”'
											v-decorator="[
							          'QQ',
							          {rules: [{ required: true,message:'请填写员工QQ号码' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="紧急联系人姓名"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='请填写员工紧急联系人姓名'
											v-decorator="[
							          'emrgCtctName',
							          {rules: [{ required: true,message:'请填写员工紧急联系人姓名' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="紧急联系人电话"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='请填写员工紧急联系人电话'
											v-decorator="[
							          'emrgCtctPhone',
							          {rules: [{ required: true,message:'请填写员工紧急联系人电话' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="紧急联系人关系"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='请填写紧急联系人与员工关系'
											v-decorator="[
							          'emrgCtctRel',
							          {rules: [{ required: true,message:'请填写员工紧急联系人关系' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
								</a-col>
							</a-row>
						</div>
						<div class="info-wrapper">
							<a-divider orientation="left" id="edu-info">教育信息</a-divider>
							<a-row :gutter="24">
								<a-col :span="24">
									<a-form-item
										label="学历类型"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol"
									>
										<a-select
											placeholder='请选择员工学历类型'
											v-decorator="[
							          'eduDegree',
							          {rules: [{ required: true,message:'请填写员工学历' }]}
							        ]"
							      >
								      <a-select-option value="未知">未知</a-select-option>
							      	<a-select-option value='博士'>博士</a-select-option>
							      	<a-select-option value='硕士'>硕士</a-select-option>
							      	<a-select-option value='本科'>本科</a-select-option>
							      	<a-select-option value='大专'>大专</a-select-option>
							      	<a-select-option value="中专">中专</a-select-option>
							      	<a-select-option value='高中'>高中</a-select-option>
							      	<a-select-option value="职高">职高</a-select-option>
							      	<a-select-option value='初中'>初中</a-select-option>
							      	<a-select-option value='小学'>小学</a-select-option>
								    </a-select>
									</a-form-item>
									<a-form-item
										label="毕业学校"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='请填写员工毕业学校'
											v-decorator="[
							          'school',
							          {rules: [{ required: true,message:'请填写员工毕业学校' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="专业"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='请填写员工所学专业，若没有，填写“无”'
											v-decorator="[
							          'major',
							          {rules: [{ required: true,message:'请填写员工所学专业' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="在校日期"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol"
									>
										<a-range-picker
											v-decorator="[
							          'egDate',
							          {rules: [{ required: true,message:'请填写员工在校日期' }]}
							        ]"
							       />
									</a-form-item>
								</a-col>
								<a-col :span="5">
									<a-form-item
										label="毕业证书"
										:labelCol="{span:21}"
										:wrapperCol="{span:0}">
										<!-- <a-input
											v-decorator="[
							          'gradCert',
							          {rules: [{ required: true,message:'请填写员工' }]}
							        ]">
										</a-input> -->
									</a-form-item>
								</a-col>
								<a-col :span="18">
									<div class="clearfix">
								    <a-upload
								      :action="'//192.168.1.240:3000/upload?id=temp&item=gradCert'"
								      listType="picture-card"
								      :fileList="gradCertList"
								      @preview="handlePreview"
								      @change="e=>handleChange({gradCertList:e.fileList},e)"
								      :remove="remove"
								    >
								      <div v-if="gradCertList.length < 2">
								        <a-icon type="plus" />
								        <div class="ant-upload-text">上传</div>
								      </div>
								    </a-upload>
								    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
								      <img alt="example" style="width: 100%" :src="previewImage" />
								    </a-modal>
								    <div style="color: #999;height:63.2px;line-height: 39px">*图片格式为jpg/jpeg/png,大小在2MB之内</div>
								  </div>
								</a-col>
								<a-col :span="5">
									<a-form-item
										label="学位证书"
										:labelCol="{span:21}"
										:wrapperCol="{span:0}">
										<!-- <a-input
											v-decorator="[
							          'diploma',
							          {rules: [{ required: true,message:'请填写员工' }]}
							        ]">
										</a-input> -->
									</a-form-item>
								</a-col>
								<a-col :span="18">
									<div class="clearfix">
								    <a-upload
								      :action="'//192.168.1.240:3000/upload?id=temp&item=diploma'"
								      listType="picture-card"
								      :fileList="diplomaList"
								      @preview="handlePreview"
								      @change="e=>handleChange({diplomaList:e.fileList},e)"
								      :remove="remove"
								    >
								      <div v-if="diplomaList.length < 2">
								        <a-icon type="plus" />
								        <div class="ant-upload-text">上传</div>
								      </div>
								    </a-upload>
								    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
								      <img alt="example" style="width: 100%" :src="previewImage" />
								    </a-modal>
								    <div style="color: #999;height:40px;line-height: 39px">*图片格式为jpg/jpeg/png,大小在2MB之内</div>
								  </div>
								</a-col>
							</a-row>
						</div>
						<div class="info-wrapper">
							<a-divider orientation="left" id="employment-info">从业信息</a-divider>
							<a-row :gutter="24">
								<a-col :span="24">
									<a-form-item
										label="上家公司"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='请填写员工上家公司名称'
											v-decorator="[
							          'preCo',
							          {rules: [{ required: true,message:'请填写员工上家公司名称' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="职称（最高）"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='请填写员工最高职称'
											v-decorator="[
							          'preTitle',
							          {rules: [{ required: true,message:'请填写员工最高职称' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
								</a-col>
								<a-col :span="5">
									<a-form-item
										label="简历"
										:labelCol="{span:21}"
										:wrapperCol="{span:0}">
										<!-- <a-input
											v-decorator="[
							          'resume',
							          {rules: [{ required: true,message:'请填写员工' }]}
							        ]">
										</a-input> -->
									</a-form-item>
								</a-col>
								<a-col :span="18">
									<div class="clearfix">
								    <a-upload
								      :action="'//192.168.1.240:3000/upload?id=temp&item=resume'"
								      listType="picture-card"
								      :fileList="resumeList"
								      @preview="handlePreview"
								      @change="e=>handleChange({resumeList:e.fileList},e)"
								      :remove="remove"
								    >
								      <div v-if="resumeList.length < 2">
								        <a-icon type="plus" />
								        <div class="ant-upload-text">上传</div>
								      </div>
								    </a-upload>
								    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
								      <img alt="example" style="width: 100%" :src="previewImage" />
								    </a-modal>
								    <div style="color: #999;height:40px;line-height: 39px">*图片格式为jpg/jpeg/png,大小在2MB之内</div>
								  </div>
								</a-col>
								<a-col :span="24">
									<a-form-item
										label="有无竞业限制"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol"
									>
										<a-select
											placeholder='请员工员工有无竞业限制'
											v-decorator="[
							          'nonCompetition',
							          {rules: [{ required: true,message:'请选择员工有无竞业限制' }]}
							        ]"
							      >
							      	<a-select-option value='有'>有</a-select-option>
							      	<a-select-option value='无'>无</a-select-option>
								    </a-select>
									</a-form-item>
								</a-col>
								<a-col :span="5">
									<a-form-item
										label="前公司离职证明"
										:labelCol="{span:21}"
										:wrapperCol="{span:0}">
										<!-- <a-input
											v-decorator="[
							          'preSeveranceDoc',
							          {rules: [{ required: true,message:'请填写员工' }]}
							        ]">
										</a-input> -->
									</a-form-item>
								</a-col>
								<a-col :span="18">
									<div class="clearfix">
								    <a-upload
								      :action="'//192.168.1.240:3000/upload?id=temp&item=preSeveranceDoc'"
								      listType="picture-card"
								      :fileList="preSeveranceDocList"
								      @preview="handlePreview"
								      @change="e=>handleChange({preSeveranceDocList:e.fileList},e)"
								      :remove="remove"
								    >
								      <div v-if="preSeveranceDocList.length < 2">
								        <a-icon type="plus" />
								        <div class="ant-upload-text">上传</div>
								      </div>
								    </a-upload>
								    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
								      <img alt="example" style="width: 100%" :src="previewImage" />
								    </a-modal>
								    <div style="color: #999;height:40px;line-height: 39px">*图片格式为jpg/jpeg/png,大小在2MB之内</div>
								  </div>
								</a-col>
								<a-col :span="24">
									<a-form-item
										label="备注"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol">
										<a-textarea
											placeholder="请填写员工从业信息备注"
										 	:rows="4"
										 	v-decorator="[
							          'remark',
							          {rules: [{ required: true,message:'请填写员工从业信息备注' }]}
							        ]"/>
									</a-form-item>
								</a-col>
							</a-row>
						</div>
						<div class="info-wrapper">
							<a-divider orientation="left" id="post-info">岗位信息</a-divider>
							<a-row :gutter="24">
								<a-col :span="24">
									<a-form-item
										label="入司日期"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-date-picker
											v-decorator="[
							          'employDate',
							          {rules: [{ required: true,message:'请填写员工入司日期' }]}
							        ]"
							       />
									</a-form-item>
									<a-form-item
										label="应转正日期"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-date-picker
											v-decorator="[
							          'regDate',
							          {rules: [{ required: true,message:'请填写员工应转正日期' }]}
							        ]"
							       />
									</a-form-item>
									<a-form-item
										label="转正状态"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-switch 
											checkedChildren="正式" 
											unCheckedChildren="试用"
											v-model = 'regSts'
											/>
									</a-form-item>
									<template v-if='regSts'>
										<a-form-item
											label="实际转正日期"
											:labelCol="formItemLayout_m.labelCol"
											:wrapperCol="formItemLayout_m.wrapperCol">
											<a-date-picker
												v-decorator="[
								          'actualRegDate',
								          {rules: [{ required: true ,message:'请选择员工实际转正日期'}]}
								        ]"
								       />
										</a-form-item>
									</template>
									<a-form-item
										label="部门"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-select
											placeholder='请选择员工所在部门'
											@change="deptChange"
											v-decorator="[
							          'dept',
							          {rules: [{ required: true,message:'请选择员工所在部门' }]}
							        ]">
							        <template v-for='d in depts'>
							        	<a-select-option :value='d._id'>{{d.name}}</a-select-option>
							        </template>
										</a-select>
									</a-form-item>
									<a-form-item
										label="岗位"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-select
											placeholder='请选择员工所属岗位'
											@change="positionChange"
											v-decorator="[
							          'position',
							          {rules: [{ required: true,message:'请选择员工所属岗位' }]}
							        ]">
							        <template v-for='p in positions'>
							        	<a-select-option :value='p.id'>{{p.name}}</a-select-option>
							        </template>
										</a-select>
									</a-form-item>
									<a-form-item
										label="岗位职称"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol">
										<a-select
											placeholder='请选择员工岗位职称'
											@change='titleChange'
											v-decorator="[
							          'title',
							          {rules: [{ required: true,message:'请选择员工岗位职称' }]}
							        ]">
							        <template v-for='t in titles'>
							        	<a-select-option :value="t.id">{{t.name}}</a-select-option>
							        </template>
								    </a-select>
									</a-form-item>
									<template v-if='stores&&stores.length!==0'>
										<a-form-item
											label="店铺"
											:labelCol="formItemLayout_m.labelCol"
								      :wrapperCol="formItemLayout_m.wrapperCol">
											<a-select
												mode="multiple"
												placeholder="请选择员工负责店铺"
												v-decorator="[
								          'store',
								          {rules: [{ required: true,message:'请选择员工负责店铺' }]}
								        ]">
								        <template v-for='s in stores'>
								        	<a-select-option :value="s._id">{{s.name}}</a-select-option>
								        </template>
									    </a-select>
										</a-form-item>
									</template>
									<!-- <a-form-item
										label="人员系数"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
							      	:disabled="true"
											v-decorator="[
							          'employeeCoef',
							          {rules: [{ required: true,message:'请填写员工' }]}
							        ]">
										</a-input>
									</a-form-item> -->
								</a-col>
							</a-row>
						</div>
						<div class="info-wrapper">
							<a-divider orientation="left" id="contract-info">合同信息</a-divider>
							<a-row :gutter="24">
								<a-col :span="24">
									<a-form-item
										label="签订与否"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-switch 
											checkedChildren="是" 
											unCheckedChildren="否" 
											v-model = 'isSign'
											/>
									</a-form-item>
								</a-col>
								<a-col :span="5">
									<a-form-item
										label="员工合同"
										:labelCol="{span:21}"
										:wrapperCol="{span:0}">
									</a-form-item>
								</a-col>
								<a-col :span="18">
									<div class="clearfix">
								    <a-upload
								    	:action="'//192.168.1.240:3000/upload?id=temp&item=contract'" 
								      @change="e=>handleChange({contractList:e.fileList},e)"
								      :remove="remove"
								      :disabled='!contractUpload'
								    	:fileList="contractList" >
									    <a-button>
									      <a-icon type="upload" /> 上传
									    </a-button>
									  </a-upload>
									  <div style="color: #999;height:40px;line-height: 39px">*文件为Excel表格，注意文件命名（推荐员工姓名加数字）</div>
								  </div>
								</a-col>
								<a-col :span="24">
									<a-form-item
										label="合同起止日期"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-range-picker
											v-decorator="[
							          'contractDate',
							          {rules: [{ required: true,message:'请选择员工合同起始日期' }]}
							        ]"
							       />
									</a-form-item>
									<a-form-item
										label="当前合同起止日期"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol"
									>
										<a-range-picker
											v-decorator="[
							          'curContractDate',
							          {rules: [{ required: true,message:'请选择员工当前合同起始日期' }]}
							        ]"
							       />
									</a-form-item>
									<!-- <a-form-item
										label="工龄"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											v-decorator="[
							          'seniority',
							          {rules: [{ required: true }]}
							        ]">
										</a-input>
									</a-form-item> -->
								</a-col>
							</a-row>
						</div>
			  	</a-col>
			  	<a-col :span="3" style="height: 100%">
			  		<a-anchor :offsetTop="100" @click="clickAnchor">
					    <a-anchor-link href="#basic-info" title="基本信息" />
					    <a-anchor-link href="#contact-info" title="通讯信息" />
					    <a-anchor-link href="#edu-info" title="教育信息"/>
					    <a-anchor-link href="#employment-info" title="从业信息"/>
					    <a-anchor-link href="#post-info" title="岗位信息"/>
					    <a-anchor-link href="#contract-info" title="合同信息"/>
					  </a-anchor>
			  	</a-col>
			  </a-row>
			</a-form>
		</a-card>
		<footer-tool-bar :style="{ width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}">
      <a-button type="primary" @click="submit" >提交</a-button>
    </footer-tool-bar>
	</page-layout>
</template>

<script>
	const formItemLayout = {
	  labelCol: { span: 6 },
	  wrapperCol: { span: 16,offset:2 },
	};
	const formItemLayout_m = {
	  labelCol: { span: 4 },
	  wrapperCol: { span: 18, offset: 1 },
	};
	const formItemLayout_l = {
	  labelCol: { span: 2,},
	  wrapperCol: { span: 16, offset: 1 },
	};
	import PageLayout from "@/components/page/PageLayout"
	import FooterToolBar from '@/components/FooterToolbar'
	import moment from 'moment'
	import { mixin, mixinDevice } from '@/utils/mixin'
	import {getEmployeeDetail} from '@/api/employee'
	import {deleteEmployeeFile} from '@/api/fs'
	import {getAllDept} from "@/api/dept"
	import {addEmployee} from "@/api/employee"
  export default {
    name: 'Detail',
    mixins: [mixin, mixinDevice],
    data(){
    	return{
    		detail:null,
    		isEditting:false,
    		dateFormat:"YYYY-MM-DD HH:mm Z",
				formItemLayout,
	      formItemLayout_m,
	      formItemLayout_l,
	      previewVisible: false,
	      previewImage: '',
	      IDPhotoList:[],
	      emplPhotoList:[],
	      gradCertList:[],
	      diplomaList:[],
	      resumeList:[],
	      preSeveranceDocList:[],
	      contractList:[],
	      depts:[],
	      positions:[],
	      stores:[],
	      titles:[],
	      titleScore:null,
	      positionScore:null,
	      lastname:'员工',
	      sts:true,
	      isSign:true,
	      regSts:false,
	      politicsSts:'',

    	}
    },
    computed:{
    	haveJoinedParty(){
    		return (this.politicsSts==='中共党员')||(this.politicsSts==='中共预备党员')
    	},
    	contractUpload(){
    		return this.contractList.length < 1
    	}
    },
    components:{
    	PageLayout,
    	FooterToolBar
    },
    methods:{
    	moment,
    	deleteEmployeeFile,
	    getEmployeeDetail,
	    getAllDept,
	    addEmployee,
	    clickAnchor(e,link){
	    	e.preventDefault();
	      console.log(link);
	    },
	    changePolitisticsSts(value){
	    	this.politicsSts = value
	    },
	    submit(){
	    	let formValues = this.form.getFieldsValue()
	    	this.form.validateFields((err,values) => {
          if (!err) {
          	const hide = this.$message.loading('正在提交......', 0);
          	values.birthday = values.birthday.toISOString()
          	values.employDate = values.employDate.toISOString()
          	values.seniority = values.employDate
          	values.PartyDate = this.haveJoinedParty?values.PartyDate.toISOString():null
          	values.regDate = values.regDate.toISOString()
          	values.actualRegDate = this.regSts?values.actualRegDate.toISOString():null
          	values.enrollmentDate = values.egDate[0].toISOString()
          	values.graduationDate = values.egDate[1].toISOString()
          	values.contractDateFrom = values.contractDate[0].toISOString()
          	values.contractDateTo = values.contractDate[1].toISOString()
          	values.curContractDateFrom = values.curContractDate[0].toISOString()
          	values.curContractDateTo = values.curContractDate[1].toISOString()
          	values.rsdtPermitDateFrom = values.rsdtPermitDate[0].toISOString()
          	values.rsdtPermitDateTo = values.rsdtPermitDate[1].toISOString()
          	values.sts = this.sts?1:0
          	values.isSign = this.isSign?'是':'否'
          	values.regSts = this.regSts?'是':'否'
          	values.IDPhoto = this.IDPhotoList.map(item=>item.response.files[0].url)
          	values.emplPhoto = this.emplPhotoList.map(item=>item.response.files[0].url)
          	values.gradCert = this.gradCertList.map(item=>item.response.files[0].url)
          	values.diploma = this.diplomaList.map(item=>item.response.files[0].url)
          	values.resume = this.resumeList.map(item=>item.response.files[0].url)
          	values.preSeveranceDoc = this.preSeveranceDocList.map(item=>item.response.files[0].url)
          	values.contracts = this.contractList.map(item=>item.response.files[0].url)
          	values.positionScore = this.positionScore
          	values.titleScore = this.titleScore
          	delete values.egDate
          	delete values.contractDate
          	delete values.curContractDate
          	delete values.rsdtPermitDate
            console.log(values)
            addEmployee(values).then((res,err)=>{
            	if(res.result){
            		console.log('success',res.result)
            		this.$router.push(`/employee/success/${res.result.emplID}/${res.result._id}`)
            	}else{
            		console.log(res,err)
            		this.$router.push('/employee/error')
            	}
            	
            })
          }
        })
	    },
	    getAge(date){
	     	let age = Number.parseInt(moment().diff(date,'years',true))
	     	this.form.setFieldsValue({age})
	    },
    	date(d){
    		let str = this.moment(d,this.dateFormat).format("YYYY-MM-DD")
    		return this.moment(str,'YYYY-MM-DD')
    	},
    	edit(){
    		this.isEditting = true
    	},
    	handleCancel () {
	      this.previewVisible = false
	    },
	    handlePreview (file) {
	      this.previewImage = file.url || file.thumbUrl
	      this.previewVisible = true
	    },
	    handleChange (p,e) {
	    	console.log(p)
	    	if(p.contractList){
	    		p.contractList.map((file) => {
		        if (file.response) {
		          file.url = file.response.files[0].url;
		        }
		        return file;
		      });
	    	}
	      Object.assign(this.$data,p)
	    },
	    remove(file){
	    	let url = decodeURI(file.url || file.response.files[0].url)
	    	let params = url.split('/').reverse()
	    	let id = params[2]
	    	let item = params[1]
	    	let name = params[0]
	    	return this.deleteEmployeeFile({
	    		id:id,
	    		item:item,
	    		filename:name
	    	}).then(res=>{
	    		console.log(res)
	    		if(res.status===500){
	    			return false
	    		}
	    	})
	    },
	    deptChange(value){
	    	console.log(value);
	    	this.positions = JSON.parse(JSON.stringify(this.depts)).filter(item=>item._id===value)[0].positions
	    	this.form.setFieldsValue({
	    		'position':'001',
	    	})
	    	this.positionChange('001')
	    },
	    positionChange(value){
	    	console.log(value);
				this.titles = JSON.parse(JSON.stringify(this.positions)).filter(item=>item.id===value)[0].titles 
				this.stores = JSON.parse(JSON.stringify(this.positions)).filter(item=>item.id===value)[0].stores 
				this.positionScore = JSON.parse(JSON.stringify(this.positions)).filter(item=>item.id===value)[0].score
				this.form.setFieldsValue({
	    		'title':'001',
	    	})
	    	this.titleChange('001')
	    },
	    titleChange(value){
	    	console.log(value);
	    	this.titleScore = JSON.parse(JSON.stringify(this.titles)).filter(item=>item.id===value)[0].score
	    },
	    fetchData(){
	    	let id = this.$route.params.id
	    	this.getEmployeeDetail({"id":id}).then(res=>{
	    		this.detail = res.result
	    		this.positionScore = this.detail.positionScore
	    		this.titleScore = this.detail.titleScore
	    		console.log(this.detail)
	    		this.IDPhotoList = [...this.detail.IDPhoto].map((item,index)=>{
	    			return {
	    				name:'IDPhoto.png',
	    				status:'done',
	    				uid:index*(-1),
	    				url:item
	    			}})
	    		this.emplPhotoList = [...this.detail.emplPhoto].map((item,index)=>{
	    			return {
	    				name:'emplPhoto.png',
	    				status:'done',
	    				uid:index*(-1),
	    				url:item
	    			}})
	    		this.resumeList = [...this.detail.resume].map((item,index)=>{
	    			return {
	    				name:'resume.png',
	    				status:'done',
	    				uid:index*(-1),
	    				url:item
	    			}})
	    		this.gradCertList = [...this.detail.gradCert].map((item,index)=>{
	    			return {
	    				name:'gradCert.png',
	    				status:'done',
	    				uid:index*(-1),
	    				url:item
	    			}})
	    		this.diplomaList = [...this.detail.diploma].map((item,index)=>{
	    			return {
	    				name:'diploma.png',
	    				status:'done',
	    				uid:index*(-1),
	    				url:item
	    			}})
	    		this.preSeveranceDocList = [...this.detail.preSeveranceDoc].map((item,index)=>{
	    			return {
	    				name:'preSeveranceDoc.png',
	    				status:'done',
	    				uid:index*(-1),
	    				url:item
	    			}})
		    	this.form.setFieldsValue({
		    		'name':this.detail.name,
		    		'birthday':this.date(this.detail.birthday),
		    		'age':this.detail.age,
		    		'gender':this.detail.gender,//the value of select-option should be string
		    		'bloodType':this.detail.bloodType,
		    		'eduDegree':this.detail.eduDegree,
		    		'region':this.detail.region,
		    		'IDNum':this.detail.IDNum,
		    		'nativePlace':this.detail.nativePlace,
		    		'crLocation':this.detail.crLocation,
		    		'nationality':this.detail.nationality,
		    		'crNature':this.detail.crNature,
		    		'maritalSts':this.detail.maritalSts,
		    		'pragnancySts':this.detail.pragnancySts,
		    		'acmd':this.detail.acmd,
		    		'politicsSts':this.detail.politicsSts,
		    		'PartyDate':this.date(this.detail.PartyDate),
		    		'rsdt':this.detail.rsdt,
		    		'rsdtPermitCity':this.detail.rsdtPermitCity,
		    		'rsdtPermitDate':[this.date(this.detail.rsdtPermitDateFrom),this.date(this.detail.rsdtPermitDateTo)],
		    		'email':this.detail.email,
		    		'QQ':this.detail.QQ,
		    		'emrgCtctName':this.detail.emrgCtctName,
		    		'emrgCtctPhone':this.detail.emrgCtctPhone,
		    		'emrgCtctRel':this.detail.emrgCtctRel,
		    		'school':this.detail.school,
		    		'major':this.detail.major,
		    		'gradCert':this.detail.gradCert,
		    		'diploma':this.detail.diploma,
		    		'preCo':this.detail.preCo,
		    		'preTitle':this.detail.preTitle,
		    		'resume':this.detail.resume,
		    		'preSeveranceDoc':this.detail.preSeveranceDoc,
		    		'remark':this.detail.remark,
		    		'egDate':[this.date(this.detail.enrollmentDate),this.date(this.detail.graduationDate)],
		    		'employDate':this.date(this.detail.employDate),
		    		'regDate':this.date(this.detail.regDate),
		    		'actualRegDate':this.date(this.detail.actualRegDate),
		    		'regSts':this.detail.regSts,
		    		'nonCompetition':this.detail.nonCompetition,
		    		'employeeCoef':this.detail.coef,
		    		'contractDate':[this.date(this.detail.contractDateFrom),this.date(this.detail.contractDateTo)],
		    		'curContractDate':[this.date(this.detail.curContractDateFrom),this.date(this.detail.curContractDateTo)],
		    		'seniority':this.detail.seniority_value,
		    		'dept':this.detail.dept._id,
		    		'position':this.detail.position,
		    		'title':this.detail.title,
		    	})
	    	}).then(()=>{
	    		this.getAllDept().then(res=>{
		    		this.depts = res.result
		    		console.log(this.depts)
		    		this.positions = JSON.parse(JSON.stringify(this.depts)).filter(item=>item._id===this.detail.dept._id)[0].positions
		    		this.titles = JSON.parse(JSON.stringify(this.positions)).filter(item=>item.id===this.detail.position)[0].titles
		    	})
	    	})
	    },
	    initDeptList(){
	    	this.getAllDept().then(res=>{
	    		this.depts = res.result
	    		console.log(this.depts)
	    		this.form.setFieldsValue({
	    			'dept':res.result[0]._id
	    		})
	    		this.positions = JSON.parse(JSON.stringify(this.depts)).filter(item=>item._id===this.depts[0]._id)[0].positions
	    		this.titles = JSON.parse(JSON.stringify(this.positions)).filter(item=>item.id===this.positions[0].id)[0].titles
	    	})
	    }
    },
    created(){
    	this.form = this.$form.createForm(this)
    	// this.fetchData()
    	this.initDeptList()
    },
    watch:{
    	'$route': 'fetchData'
    }
  }
</script>

<style scoped>
	.ant-back-top {
    bottom: 100px;
  }
	.info-wrapper{
	}
	.ant-avatar-lg{
		width: 150px;
		height: 150px;
		line-height: 150px;
		font-size: 50px;
		padding-top: 50px
	}
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  .ant-upload-select-picture-card {
    margin-top: 8px;
    color: #666;
		height: 200px!important;
		width: 200px!important;
  }
  .ant-input-disabled{
  	background-color: #f5f5f5;
    opacity: 1;
    /*cursor: not-allowed;*/
    color: #000;
    border: 1px solid #fff;
  }
</style>