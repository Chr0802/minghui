<template>
	<page-layout>
		<div slot="headerContent">
      <span @click='$router.back()' style="padding-right: 50px">员工编号：{{detail?detail.emplID:''}}</span>
      <span style="padding-right: 50px">{{detail?detail.dept.name:''}}-{{detail?detail.position:''}}</span>
      <span>员工状态：</span><a-switch checkedChildren="在职" unCheckedChildren="离职" v-model='sts' @change='leave' :disabled="!isEditting"/>
      <div>&nbsp</div>
    </div>
    <div slot="extra">
      <div style="padding-bottom: 15px">
      	<a-button v-if="hasPermission" type="primary" icon="edit" @click="edit()">修改</a-button>
      </div>
    </div>
    <a-back-top />
		<a-card 
			:bordered="false">
			<a-form :form="form">
			  <a-row :gutter="24">
			  	<a-col :span="21">
						<div class="info-wrapper">
							<a-divider orientation="left" id="basic-info">基本信息</a-divider>
							<a-row :gutter="24">
								<a-col :span="5" :offset="1">
									<a-avatar shape="circle" size="large">{{detail?detail.name.charAt(0):''}}</a-avatar>
								</a-col>
								<a-col :span="8">
									<a-form-item
							      :labelCol="formItemLayout.labelCol"
							      :wrapperCol="formItemLayout.wrapperCol"
							      label='姓名'
							    >
							      <a-input
							      	:disabled="!isEditting"
							        v-decorator="[
							          'name',
							          {rules: [{ required: true,message:'姓名是必填项目'}]}
							        ]"
							      />
							    </a-form-item>
							    <a-form-item
							      :labelCol="formItemLayout.labelCol"
							      :wrapperCol="formItemLayout.wrapperCol"
							      label='性别'
							    >
							      <a-select
							      	:disabled="!isEditting"
							        v-decorator="[
							          'gender',
							          {rules: [{ required: true,message:'性别是必填项目' }]}
							        ]"
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'birthday',
							          {rules: [{ required: true,message:'出生日期是必填项目' },]}
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
							        v-decorator="[
							          'age',
							          {rules: [{ required: true,message:'年龄是必填项目' }]}
							        ]"
							      />
							    </a-form-item>
							    <a-form-item
							      :labelCol="formItemLayout.labelCol"
							      :wrapperCol="formItemLayout.wrapperCol"
							      label='血型'
							    >
							      <a-select
							      	:disabled="!isEditting"
							        v-decorator="[
							          'bloodType',
							          {rules: [{ required: true,message:'血型是必填项目'}]}
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
									>
										<a-select
							      	:disabled="!isEditting"
											v-decorator="[
							          'eduDegree',
							          {rules: [{ required: true,message:'最高学历是必填项目' }]}
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
											:disabled="!isEditting"
											placeholder='示例：中国大陆，中国台湾，中国香港，中国澳门等'
											v-decorator="[
							          'region',
							          {rules: [{ required: true ,message:'国家/地区是必填项目'}]}
							        ]">
							      	<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
								    </a-input>
									</a-form-item>
									<a-form-item
										label="身份证号"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
											placeholder='请输入员工身份证号'
							      	:disabled="!isEditting"
											v-decorator="[
							          'IDNum',
							          {rules: [{ required: true,message:'身份证号是必填项目' },{pattern:/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,message:'身份证号不合法'}]}
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
							      	:disabled="!isEditting"
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
								      :action="'//192.168.1.240:3000/upload?id='+$route.params.id+'&item=IDPhoto'"
								      listType="picture-card"
								      :fileList="IDPhotoList"
								      @preview="handlePreview"
								      @change="e=>handleChange({IDPhotoList:e.fileList},e)"
								      :remove="remove">
								      <div v-if="(IDPhotoList.length < 2)&&isEditting">
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
							      	:disabled="!isEditting"
							      	placeholder='示例：北京市东城区，河北省保定市等'
											v-decorator="[
							          'nativePlace',
							          {rules: [{ required: true,message:'籍贯是必填项目' }]}
							        ]">
							      	<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
								    </a-input>
									</a-form-item>
									<a-form-item
										label="民族"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
							      	:disabled="!isEditting"
											v-decorator="[
							          'nationality',
							          {rules: [{ required: true,message:'民族是必填项目' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="户籍所在地"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
							      	:disabled="!isEditting"
											placeholder='示例：北京市东城区，河北省保定市等'
											v-decorator="[
							          'crLocation',
							          {rules: [{ required: true,message:'户籍所在地是必填项目' }]}
							        ]">
							      	<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
								    </a-input>
									</a-form-item>
									<a-form-item
										label="户口性质"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-select
							      	:disabled="!isEditting"
											v-decorator="[
							          'crNature',
							          {rules: [{ required: true,message:'户口性质是必填项目' }]}
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'acmd',
							          {rules: [{ required: true,message:'是否住宿是必填项目' }]}
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'maritalSts',
							          {rules: [{ required: true,message:'婚姻状况是必填项目' }]}
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'pragnancySts',
							          {rules: [{ required: true,message:'婚姻状况是必填项目' }]}
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'childrenSts',
							          {rules: [{ required: true,message:'子女状态是必填项目' }]}
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'emplPhoto',
							          {rules: [{ required: true,message:'是必填项目' }]}
							        ]">
										</a-input> -->
									</a-form-item>
								</a-col>
								<a-col :span="18">
									<div class="clearfix">
								    <a-upload
								      :action="'//192.168.1.240:3000/upload?id='+$route.params.id+'&item=emplPhoto'"
								      listType="picture-card"
								      :fileList="emplPhotoList"
								      @preview="handlePreview"
								      @change="e=>handleChange({emplPhotoList:e.fileList},e)"
								      :remove="remove"
								    >
								      <div v-if="(emplPhotoList.length < 1)&&isEditting">
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
											@change='changePolitisticsSts'
							      	:disabled="!isEditting"
											v-decorator="[
							          'politicsSts',
							          {rules: [{ required: true,message:'政治面貌是必填项目' }]}
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
								      	:disabled="!isEditting"
												v-decorator="[
								          'PartyDate',
								          {rules: [{ required: true,message:'入党日期是必填项目' }]}
								        ]"
								       />
										</a-form-item>
									</template>
									<a-form-item
										label="现居住地"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
							      	:disabled="!isEditting"
											v-decorator="[
							          'rsdt',
							          {rules: [{ required: true,message:'现居住地是必填项目' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="居住证城市"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
							      	:disabled="!isEditting"
											v-decorator="[
							          'rsdtPermitCity',
							          {rules: [{ required: true,message:'居住证城市是必填项目' }]}
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'rsdtPermitDate',
							          {rules: [{ required: true,message:'居住证起止日期是必填项目' }]}
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'phone',
							          {rules: [{ required: true,message:'手机号码是必填项目' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="电子邮箱"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
							      	:disabled="!isEditting"
											v-decorator="[
							          'email',
							          {rules: [{ required: true,message:'电子邮箱是必填项目' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="QQ"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
							      	:disabled="!isEditting"
											v-decorator="[
							          'QQ',
							          {rules: [{ required: true,message:'QQ是必填项目' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="紧急联系人姓名"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
							      	:disabled="!isEditting"
											v-decorator="[
							          'emrgCtctName',
							          {rules: [{ required: true,message:'紧急联系人姓名是必填项目' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="紧急联系人电话"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
							      	:disabled="!isEditting"
											v-decorator="[
							          'emrgCtctPhone',
							          {rules: [{ required: true,message:'紧急联系人电话是必填项目' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="紧急联系人关系"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
							      	:disabled="!isEditting"
											v-decorator="[
							          'emrgCtctRel',
							          {rules: [{ required: true,message:'紧急联系人关系是必填项目' }]}
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'eduDegree',
							          {rules: [{ required: true,message:'学历类型是必填项目' }]}
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'school',
							          {rules: [{ required: true,message:'毕业学校是必填项目' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="专业"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
							      	:disabled="!isEditting"
											v-decorator="[
							          'major',
							          {rules: [{ required: true,message:'专业是必填项目' }]}
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'egDate',
							          {rules: [{ required: true,message:'在校日期是必填项目' }]}
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'gradCert',
							          {rules: [{ required: true,message:'是必填项目' }]}
							        ]">
										</a-input> -->
									</a-form-item>
								</a-col>
								<a-col :span="18">
									<div class="clearfix">
								    <a-upload
								      :action="'//192.168.1.240:3000/upload?id='+$route.params.id+'&item=gradCert'"
								      listType="picture-card"
								      :fileList="gradCertList"
								      @preview="handlePreview"
								      @change="e=>handleChange({gradCertList:e.fileList},e)"
								      :remove="remove"
								    >
								      <div v-if="(gradCertList.length < 2)&&isEditting">
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'diploma',
							          {rules: [{ required: true,message:'是必填项目' }]}
							        ]">
										</a-input> -->
									</a-form-item>
								</a-col>
								<a-col :span="18">
									<div class="clearfix">
								    <a-upload
								      :action="'//192.168.1.240:3000/upload?id='+$route.params.id+'&item=diploma'"
								      listType="picture-card"
								      :fileList="diplomaList"
								      @preview="handlePreview"
								      @change="e=>handleChange({diplomaList:e.fileList},e)"
								      :remove="remove"
								    >
								      <div v-if="(diplomaList.length < 2)&&isEditting">
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'preCo',
							          {rules: [{ required: true,message:'上家公司是必填项目' }]}
							        ]">
											<a-icon slot="suffix" type="edit" style="color:rgba(0,0,0,0.4);"/>
										</a-input>
									</a-form-item>
									<a-form-item
										label="职称（最高）"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
							      	:disabled="!isEditting"
											v-decorator="[
							          'preTitle',
							          {rules: [{ required: true,message:'最高职称是必填项目' }]}
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'resume',
							          {rules: [{ required: true,message:'是必填项目' }]}
							        ]">
										</a-input> -->
									</a-form-item>
								</a-col>
								<a-col :span="18">
									<div class="clearfix">
								    <a-upload
								      :action="'//192.168.1.240:3000/upload?id='+$route.params.id+'&item=resume'"
								      listType="picture-card"
								      :fileList="resumeList"
								      @preview="handlePreview"
								      @change="e=>handleChange({resumeList:e.fileList},e)"
								      :remove="remove"
								    >
								      <div v-if="(resumeList.length < 2)&&isEditting">
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'nonCompetition',
							          {rules: [{ required: true,message:'有无竞业限制是必填项目' }]}
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'preSeveranceDoc',
							          {rules: [{ required: true,message:'是必填项目' }]}
							        ]">
										</a-input> -->
									</a-form-item>
								</a-col>
								<a-col :span="18">
									<div class="clearfix">
								    <a-upload
								      :action="'//192.168.1.240:3000/upload?id='+$route.params.id+'&item=preSeveranceDoc'"
								      listType="picture-card"
								      :fileList="preSeveranceDocList"
								      @preview="handlePreview"
								      @change="e=>handleChange({preSeveranceDocList:e.fileList},e)"
								      :remove="remove"
								    >
								      <div v-if="(preSeveranceDocList.length < 2)&&isEditting">
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
											placeholder="从业信息备注"
										 	:rows="4"
							      	:disabled="!isEditting"
										 	v-decorator="[
							          'remark',
							          {rules: [{ required: true,message:'备注是必填项目' }]}
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'employDate',
							          {rules: [{ required: true,message:'入司日期是必填项目' }]}
							        ]"
							       />
									</a-form-item>
									<a-form-item
										label="应转正日期"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-date-picker
							      	:disabled="!isEditting"
											v-decorator="[
							          'regDate',
							          {rules: [{ required: true,message:'应转正日期是必填项目' }]}
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
											v-model='regSts'
											:disabled="!isEditting"
											/>
									</a-form-item>
									<template v-if='regSts'>
										<a-form-item
											label="实际转正日期"
											:labelCol="formItemLayout_m.labelCol"
											:wrapperCol="formItemLayout_m.wrapperCol">
											<a-date-picker
								      	:disabled="!isEditting"
												v-decorator="[
								          'actualRegDate',
								          {rules: [{ required: true,message:'实际转正日期是必填项目' }]}
								        ]"
								       />
										</a-form-item>
									</template>
									<a-form-item
										label="部门"
										:labelCol="formItemLayout_m.labelCol"
										:wrapperCol="formItemLayout_m.wrapperCol">
										<a-select
											@change="deptChange"
							      	:disabled="!isEditting"
											v-decorator="[
							          'dept',
							          {rules: [{ required: true,message:'部门是必填项目' }]}
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
											@change="positionChange"
							      	:disabled="!isEditting"
											v-decorator="[
							          'position',
							          {rules: [{ required: true,message:'岗位是必填项目' }]}
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
											@change='titleChange'
							      	:disabled="!isEditting"
											v-decorator="[
							          'title',
							          {rules: [{ required: true,message:'岗位职称是必填项目' }]}
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
								      	:disabled="!isEditting"
								      	@change='storeChange'
												placeholder="请选择店铺"
												v-decorator="[
								          'store',
								          {rules: [{ required: true,message:'店铺是必填项目'}]}
								        ]">
								        <template v-for='s in stores'>
								        	<a-select-option :value="s._id">{{s.name}}</a-select-option>
								        </template>
									    </a-select>
										</a-form-item>
									</template>
									<template v-if="isDPTChanged">
										<a-form-item
											label="转岗理由"
											:labelCol="formItemLayout_m.labelCol"
								      :wrapperCol="formItemLayout_m.wrapperCol">
											<a-textarea
												placeholder='该职工岗位变化的理由'
												v-decorator="[
								          'reason',
								          {rules: [{ required: true,message:'转岗理由是必填项目' }]}
								        ]"/>
										</a-form-item>
									</template>
									<a-form-item
										label="人员系数"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
							      	:disabled="true"
											v-decorator="[
							          'employeeCoef',
							          {rules: [{ required: true,message:'人员系数是必填项目' }]}
							        ]">
										</a-input>
									</a-form-item>
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
											:disabled="!isEditting"
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
								      :disabled='!(contractUpload && isEditting)'
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
							      	:disabled="!isEditting"
											v-decorator="[
							          'contractDate',
							          {rules: [{ required: true,message:'合同起止日期是必填项目' }]}
							        ]"
							       />
									</a-form-item>
									<a-form-item
										label="当前合同起止日期"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol"
									>
										<a-range-picker
							      	:disabled="!isEditting"
											v-decorator="[
							          'curContractDate',
							          {rules: [{ required: true,message:'当前合同起止日期是必填项目' }]}
							        ]"
							       />
									</a-form-item>
									<a-form-item
										label="工龄"
										:labelCol="formItemLayout_m.labelCol"
							      :wrapperCol="formItemLayout_m.wrapperCol">
										<a-input
							      	:disabled="true"
											v-decorator="[
							          'seniority',
							          {rules: [{ required: true,message:'工龄是必填项目' }]}
							        ]">
										</a-input>
									</a-form-item>
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
		<footer-tool-bar v-if="isEditting" :style="{ width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}">
      <a-button type="primary" @click="update()" >提交</a-button>
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
	import {getEmployeeDetail,updateEmployee} from '@/api/employee'
	import {deleteEmployeeFile} from '@/api/fs'
	import {getAllDept} from "@/api/dept"
	import { mapGetters } from 'vuex'
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
	      titles:[],
	      stores:[],
	      titleScore:null,
	      positionScore:null,
	      sts:true,
	      isSign:true,
	      regSts:true,
	      changedPosition:'',
	      changedDept:'',
	      changedTitle:'',
	      changedStore:[],
	    	politicsSts:'',
    	}
    },
    computed:{
    	...mapGetters(['roles']),  
    	isDPTChanged(){
    		let storeStr = this.changedStore.sort().join(',')
    		let pre = this.detail?this.detail.dept._id+this.detail.position+this.detail.title+this.detail.store.sort().join(','):''
    		let cur = this.changedDept+this.changedPosition+this.changedTitle + storeStr
    		return pre !== cur
    	},
    	haveJoinedParty(){
    		return (this.politicsSts==='中共党员')||(this.politicsSts==='中共预备党员')
    	},
      hasPermission(){
        let role = this.roles.id
        console.log('>>>',role)
        return (role === 'hrm')||(role === 'hr')
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
	    updateEmployee,
	    getAllDept,
	    clickAnchor(e,link){
	    	e.preventDefault();
	      console.log(link);
	    },
	    leave(checked){
	    	if(!checked){
	    		this.$message.info('注意，您已将该员工状态设置为离职')
	    	}
	    },
	    changePolitisticsSts(value){
	    	this.politicsSts = value
	    },
	    update(){
	    	this.spinning = true
	    	let updated_detail = this.form.getFieldsValue()
	    	updated_detail.id = this.$route.params.id
	    	this.form.validateFields((err,values) => {
          if (!err) {
          	const hide = this.$message.loading('正在提交......', 0);
          	updated_detail.birthday = updated_detail.birthday.toISOString()
          	updated_detail.employDate = updated_detail.employDate.toISOString()
          	updated_detail.seniority = updated_detail.employDate
          	updated_detail.PartyDate = this.haveJoinedParty?updated_detail.PartyDate.toISOString():null
          	updated_detail.regDate = updated_detail.regDate.toISOString()
          	updated_detail.actualRegDate = this.regSts?updated_detail.actualRegDate.toISOString():null
          	updated_detail.enrollmentDate = updated_detail.egDate[0].toISOString()
          	updated_detail.graduationDate = updated_detail.egDate[1].toISOString()
          	updated_detail.contractDateFrom = updated_detail.contractDate[0].toISOString()
          	updated_detail.contractDateTo = updated_detail.contractDate[1].toISOString()
          	updated_detail.curContractDateFrom = updated_detail.curContractDate[0].toISOString()
          	updated_detail.curContractDateTo = updated_detail.curContractDate[1].toISOString()
          	updated_detail.rsdtPermitDateFrom = updated_detail.rsdtPermitDate[0].toISOString()
          	updated_detail.rsdtPermitDateTo = updated_detail.rsdtPermitDate[1].toISOString()
          	updated_detail.sts = this.sts?1:0
          	updated_detail.isSign = this.isSign?'是':'否'
          	updated_detail.regSts = this.regSts?'是':'否'
          	updated_detail.IDPhoto = this.IDPhotoList.map(item=>(item.response?item.response.files[0].url:item.url))
          	updated_detail.emplPhoto = this.emplPhotoList.map(item=>(item.response?item.response.files[0].url:item.url))
          	updated_detail.gradCert = this.gradCertList.map(item=>(item.response?item.response.files[0].url:item.url))
          	updated_detail.diploma = this.diplomaList.map(item=>(item.response?item.response.files[0].url:item.url))
          	updated_detail.resume = this.resumeList.map(item=>(item.response?item.response.files[0].url:item.url))
          	updated_detail.contracts = this.contractList.map(item=>item.response.files[0].url)
          	updated_detail.preSeveranceDoc = this.preSeveranceDocList.map(item=>item.response.files[0].url)
          	updated_detail.titleScore = this.titleScore
          	updated_detail.positionScore = this.positionScore
          	delete updated_detail.egDate
          	delete updated_detail.contractDate
          	delete updated_detail.curContractDate
          	delete updated_detail.rsdtPermitDate
            console.log(updated_detail)
            updateEmployee(updated_detail).then((res,err)=>{
            	if(res.result){
	            	setTimeout(hide,50)
	            	console.log('success',res.result)
	            	this.$router.push(`/employee/success/${res.result.emplID}/${res.result._id}`)
            	}else{
            		console.log(res,err)
            		this.$router.push('/employee/error')
            	}
            })
          }
        })
	    	// this.updateEmployee(updated_detail).then((res)=>{
	    	// 	console.log(res)
	    	// })
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
	    	// console.log(p,e)
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
	    	if(this.isEditting){
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
	    	}else{
	    		return false
	    	}
		    	
	    },
	    deptChange(value){
	    	console.log(value)
	    	this.changedDept = value
	    	this.positions = JSON.parse(JSON.stringify(this.depts)).filter(item=>item._id===value)[0].positions
	    	this.form.setFieldsValue({
	    		'position':'001',
	    	})
	    	this.positionChange('001')
	    },
	    positionChange(value){
	    	console.log(value)
	    	this.changedPosition = value
				this.titles = JSON.parse(JSON.stringify(this.positions)).filter(item=>item.id===value)[0].titles
				this.stores = JSON.parse(JSON.stringify(this.positions)).filter(item=>item.id===value)[0].stores 
				this.positionScore = JSON.parse(JSON.stringify(this.positions)).filter(item=>item.id===value)[0].score
				this.form.setFieldsValue({
	    		'title':'001',
	    	})
	    	this.titleChange('001')
	    },
	    titleChange(value){
	    	console.log(value)
	    	this.changedTitle = value
	    	this.titleScore = JSON.parse(JSON.stringify(this.titles)).filter(item=>item.id===value)[0].score
	    },
	    storeChange(value){
	    	console.log(value)
	    	this.changedStore = value.sort()
	    },
	    fetchData(){
	    	let id = this.$route.params.id
	    	this.isEditting = false
	    	if(id){
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
		    		this.contractList = [...this.detail.contracts].map((item,index)=>{
		    			let name = item.split('/').reverse()[0]
		    			return {
		    				name:name,
		    				status:'done',
		    				uid:index*(-1),
		    				url:item
		    			}})
		    		this.sts = this.detail.sts==1
		    		this.isSign = this.detail.isSign==='是'
		    		this.regSts = this.detail.regSts==='是'
		    		this.changedDept = this.detail.dept._id//记录岗位信息，实现转岗记录
		    		this.changedPosition = this.detail.position
		    		this.changedTitle = this.detail.title
		    		this.changedStore = this.detail.store
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
			    		'childrenSts':this.detail.childrenSts,
			    		'acmd':this.detail.acmd,
			    		'politicsSts':this.detail.politicsSts,
			    		'PartyDate':this.date(this.detail.PartyDate),
			    		'rsdt':this.detail.rsdt,
			    		'rsdtPermitCity':this.detail.rsdtPermitCity,
			    		'phone':this.detail.phone,
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
			    		this.stores = JSON.parse(JSON.stringify(this.positions)).filter(item=>item.id===this.detail.position)[0].stores
			    		this.titles = JSON.parse(JSON.stringify(this.positions)).filter(item=>item.id===this.detail.position)[0].titles
			    	}).then(()=>{
			    		this.form.setFieldsValue({
			    			'store':this.detail.store
			    		})
			    	})
		    	})
	    	}
	    }
    },
    created(){
    	this.form = this.$form.createForm(this)
    	this.fetchData()
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