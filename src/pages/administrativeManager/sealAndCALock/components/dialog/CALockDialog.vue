<template>
	<el-dialog :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width" :title="title" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%">
			<el-form-item label="CA锁名称">
				<el-input v-model="form.caLockName"></el-input>
			</el-form-item>
			<el-form-item label="CA锁类型">
			  <el-select v-model="form.caLockTypeKeyId" placeholder="请选择" @change="getsealType">
					<el-option
					v-for="item in sealType"
					:key="item.id"
					:label="item.name"
					:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="CA锁管理人">
				<el-input v-model="form.caLockPersonName" placeholder="请输入内容"></el-input>
			</el-form-item>
			<divider></divider>
			<span>CA锁使用网站</span>
			<el-form-item label="网站名称">
				<el-input v-model="form.caLockWebName" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="链接">
				<el-input v-model="form.caLockWebUrl" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="用户名">
				<el-input v-model="form.caLockWebUserName" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="form.caLockWebUserPassWord" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="网站简要简介">
				<el-input v-model="form.caLockWebDesc" type="textarea" placeholder="请输入内容" :rows="1"></el-input>
			</el-form-item>
			<divider></divider>
			<span>手机绑定情况</span>
			<el-form-item label="机主">
				<el-input v-model="form.caLockWebPhonePerson" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="手机号">
				<el-input v-model="form.caLockWebPhonCode" placeholder="请输入内容"></el-input>
			</el-form-item>
			<divider></divider>
			<el-form-item label="CA锁启用时间">
				<el-date-picker
					v-model="form.caLockBeginDate"
					type="date"
					placeholder="选择日期"
					value-format="yyyy/MM/dd">
					</el-date-picker>
			</el-form-item>
			<el-form-item label="启用相关证明材料">
				<upload-button v-model="form.caLockBeginDocumentFile"></upload-button>
			</el-form-item>
			<el-form-item label="CA锁停用时间">
				<el-date-picker
					v-model="form.caLockEndDate"
					type="date"
					placeholder="选择日期"
					value-format="yyyy/MM/dd">
					</el-date-picker>
			</el-form-item>
			<el-form-item label="停用相关证明材料">
					<upload-button v-model="form.caLockEndDocumentFile"></upload-button>
			</el-form-item>
			<el-form-item label="是否产生使用费">
				<template>
					<el-radio v-model="form.iscost" :label="true">是</el-radio>
					<el-radio v-model="form.iscost" :label="false">否</el-radio>
				</template>
			</el-form-item>
			<el-form-item v-if="form.iscost" label="使用费/元">
				<el-input-number v-model="form.caCostSum" :step="2"></el-input-number>
			</el-form-item>
			<el-form-item label="CA锁使用有效期">
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

		<dialog-button :cancelBtn="{show:false}" :resetBtn="{show:false}" okBtn="确 定" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
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
					caLockName:'',//CA锁名称
					caLockTypeName:'',//
					caLockTypeKeyId:'',//CA锁类型
					caLockPersonKeyId:'',//CA锁管理人id
					caLockPersonName:'',//CA锁管理人
					caLockBeginDate:'',//CA锁启用时间
					caLockBeginDocumentFile:'',//启用相关证明材料
					caLockEndDate:'',//锁停用时间
					caLockEndDocumentFile:'',//停用相关证明材料
					BeginDate:'',//开始有效期
					EndDate:'',//结束有效期
					istermValidity:false,//是否有有效期
					iscost:false,//是否产生费用
					caCostSum:0,  //经费
					caLockWebName:'',//网站名称
					caLockWebUrl:'',//链接
					caLockWebUserName:'',//用户名
					caLockWebUserPassWord:'',//密码
					caLockWebDesc:'',//网站简要
					caLockWebisPhone:false,//是否绑定
					caLockWebPhonePerson:'',//机主
					caLockWebPhonCode:''//手机号
				},
				//表单验证规则
				formRules: {},
				sealType:[//、、、、
					{id:"1",name:'法人锁'},
					{id:"2",name:'公司锁'},
					{id:"3",name:'个人锁'},
					{id:"4",name:'软件锁'},
					{id:"5",name:'其他锁'},
				],
			}
		},

		methods: {
			getsealType(data){
				console.log(data);
				let ditem= this.sealType.find((item,index)=>{
					if(item.id=== data){
					return item;
				}
					})
				this.form.caLockTypeKeyId=ditem.id;
				this.form.caLockTypeName=ditem.name;
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
