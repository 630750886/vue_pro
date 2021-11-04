<template>
	<el-dialog :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width" :title="title" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%">
			<el-form-item label="电子印章名称">
				<el-input v-model="form.electronicSealName"></el-input>
			</el-form-item>
			<el-form-item label="电子印章类型">
				<el-select v-model="form.electronicSealTypeKeyId" placeholder="请选择" @change="getsealType">
					<el-option
					v-for="item in sealType"
					:key="item.id"
					:label="item.name"
					:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="工程师">
				<el-input v-model="form.engineerName"></el-input>
			</el-form-item>
			<divider></divider>
			<span>电子印章使用网站</span>
			<el-form-item label="网站名称">
				<el-input v-model="form.electronicSealWebName"></el-input>
			</el-form-item>
			<el-form-item label="链接">
				<el-input v-model="form.electronicSealWebUrl"></el-input>
			</el-form-item>
			<el-form-item label="用户名">
				<el-input v-model="form.electronicSealWebUserName"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="form.electronicSealWebUserPassWord"></el-input>
			</el-form-item>
			<el-form-item label="网站简要简介">
				<el-input v-model="form.electronicSealWebDesc"></el-input>
			</el-form-item>
			<divider></divider>
			<span>手机绑定情况</span>
			<el-form-item label="机主">
				<el-input v-model="form.electronicSealWebPhonePerson"></el-input>
			</el-form-item>
			<el-form-item label="手机号">
				<el-input v-model="form.electronicSealWebPhonCode"></el-input>
			</el-form-item>
			<divider></divider>
			<el-form-item label="电子印章启用时间">
				<el-date-picker
					v-model="form.electronicSealBeginDate"
					type="date"
					placeholder="选择日期"
					format="yyyy/MM/dd"
					value-format="yyyy/MM/dd">
					</el-date-picker>
			</el-form-item>
			<el-form-item label="启用相关证明材料">
				<upload-button v-model="form.electronicSealBeginDocumentFile"></upload-button>
			</el-form-item>
			<el-form-item label="电子印章停用时间">
				<el-date-picker
					v-model="form.electronicSealEndDate"
					type="date"
					placeholder="选择日期"
					format="yyyy/MM/dd"
					value-format="yyyy/MM/dd">
					</el-date-picker>
			</el-form-item>
			<el-form-item label="停用相关证明材料">
				<upload-button v-model="form.electronicSealEndDocumentFile"></upload-button>
			</el-form-item>
			<el-form-item label="是否产生使用费">
				<template>
					<el-radio v-model="form.iscost" :label="true">是</el-radio>
					<el-radio v-model="form.iscost" :label="false">否</el-radio>
				</template>
			</el-form-item>
			<el-form-item v-if="form.iscost" label="使用费/元">
				<el-number v-model="form.caCostSum"></el-number>
			</el-form-item>
			<el-form-item label="电子印章使用有效期">
				<el-row>
					<el-col :span="11">
					<el-date-picker
					v-model="form.beginDate"
					style="width: 100%;"
					type="date"
					placeholder="开始日期"
					format="yyyy/MM/dd"
					value-format="yyyy/MM/dd">
					</el-date-picker></el-col>
					<el-col :span="1">到</el-col>
					<el-col :span="12"><el-date-picker
					style="width: 100%;"
					v-model="form.endDate"
					type="date"
					placeholder="结束日期"
					format="yyyy/MM/dd"
					value-format="yyyy/MM/dd">
					</el-date-picker></el-col>
					</el-row>
			</el-form-item>
		</el-form>

		<dialog-button :resetBtn="{show:false}" okBtn="确 定" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
	</el-dialog>
</template>

<script>
	import DialogButton from "../../../acomponents/DialogButton.vue"

	import ElSelectTemplate from "../../../acomponents/ElSelectTemplate.vue"
	import ElCascaderTemplate from "../../../acomponents/ElCascaderTemplate.vue"
	import ElDataPickerTemplate from "../../../acomponents/ElDataPickerTemplate.vue"
	import DatePickerScope from "../../../acomponents/DatePickerScope.vue"
	import QueryInput from "../../../acomponents/QueryInput.vue"
	import YesOrNoTemplate from "../../../acomponents/YesOrNoTemplate.vue"
	import ElNumber from "../../../acomponents/ElNumber.vue"
	import ElTextareaTemplate from "../../../acomponents/ElTextareaTemplate.vue"
	import Divider from "../../../acomponents/Divider.vue"

	export default {
		components: {
			DialogButton,
			ElSelectTemplate,
			ElCascaderTemplate,
			ElDataPickerTemplate,
			DatePickerScope,
			QueryInput,
			YesOrNoTemplate,
			ElNumber,
			ElTextareaTemplate,
			Divider
		},
		props: {
			width:{
				type: String,
				default: '50%'
			},
			title: {
				type: String,
				default: ''
			}
		},
		watch: {
		},
		mounted() {},
		data: function() {
			return {
				//弹窗显示控制
				dialogVisible: false,
				//表单对象
				form: {
					keyid:'',
					electronicSealName:'',//电子印章名称
					electronicSealTypeKeyId:'',
					electronicSealTypeName:'', //电子印章类型
					engineerName:'',
					electronicSealWebName:'',//网站名称
					electronicSealWebUrl:'',//链接
					electronicSealWebUserName:'',//用户名
					electronicSealWebUserPassWord:'',//密码
					electronicSealWebDesc:'',//网站简要
					electronicSealWebisPhone:false,//是否绑定
					electronicSealWebPhonePerson:'',//机主
					electronicSealWebPhonCode:'',//手机号
					electronicSealBeginDate:'',//启用时间
					electronicSealBeginDocumentFile:'',//启用相关证明材料
					electronicSealEndDate:'',//停用时间
					electronicSealEndDocumentFile:'',//停用相关证明材料
					beginDate:'',//开始有效期
					endDate:'',//结束有效期
					istermValidity:false,//是否有有效期
					iscost:false,//是否产生费用
					caCostSum:''  //经费
				},
				//表单验证规则
				formRules: {},
				sealType:[
					{id:"1",name:'部门章'},
					{id:"2",name:'业务专用章'},
					{id:"3",name:'公章'},
					{id:"4",name:'法人章'},
					{id:"5",name:'签字章'},
					{id:"6",name:'合同专用章'},
					{id:"7",name:'财务专用章'},
					{id:"8",name:'发票专用章'},
					{id:"9",name:'执业章',},
					{id:"10",name:'资质章'},
					{id:"11",name:'其他印章'},
				],
        practiceType:[
          {id:1,name:'监理工程师'},
          {id:2,name:'造价工程师'},
          {id:3,name:'咨询工程师'},
        ]
			}
		},

		methods: {
             getsealType(data){
				let ditem= this.sealType.find((item,index)=>{
					if(item.id=== data){
					return item;
				}
					})
				this.form.electronicSealTypeKeyId=ditem.id;
				this.form.electronicSealTypeName=ditem.name;
				},
			//设置弹窗显示
			openDialog(data) {
				this.form=data;
				this.dialogVisible = true
			},
			dialogClose() {
				this.dialogVisible = false
				this.resetForm()
			},
			submitFormData() {
				this.$emit('getFormData', this.$myfunction.copyData(this.form))
				this.dialogClose()
			},
			resetForm() {
				this.$refs.formRef.resetFields()
			}
		}

	}
</script>

<style scoped>

</style>
