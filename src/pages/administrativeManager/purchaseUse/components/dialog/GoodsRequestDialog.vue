<template>
	<el-dialog :visible.sync="dialogVisible"  v-if="dialogVisible" width="40%" :title="title1" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%">

			<el-form-item label="领用物品类型" prop="purchaseTypekeyid">
				 <el-select-template :data="typeOptions"  v-model="form.purchaseTypekeyid" @getData="gettypedata"></el-select-template>
			</el-form-item>
			<el-form-item  label="领用数量" prop="useAppSum">
				<el-input-number v-model="form.useAppSum" placeholder="请输入内容" :controls="false"></el-input-number>
			</el-form-item>
			<el-form-item  label="用途说明" prop="appusedesc">
				<el-input v-model="form.appusedesc" placeholder="请输入内容"></el-input>
			</el-form-item>

		</el-form>

		<dialog-button :resetBtn="{show:false}" :cancelBtn="{show:false}" okBtn="提 交" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
	</el-dialog>
</template>

<script>
	import DialogButton from "../../../acomponents/DialogButton.vue"
	import Station from "../../../acomponents/Station.vue"
	import ElSelectTemplate from "../../../acomponents/ElSelectTemplate.vue"
	import ElTextareaTemplate from "../../../acomponents/ElTextareaTemplate.vue"

	export default {
		components: {
			DialogButton,
			Station,
			ElSelectTemplate,
      ElTextareaTemplate
		},
		props: {
			title: {
				type: String,
				dealt: ''
			}
		},
		watch: {
			title(newValue) {
				this.title = newValue
			}
		},
		mounted() {},
		data: function() {

			return {

				//父窗口传递的弹窗标题
				title1: this.title,
				//弹窗显示控制
				dialogVisible: false,
				//类型
				typeOptions:[
					//弘典酒、茅台酒、飞天迎宾酒、A4纸、A3纸、安全帽、工作服
					{id:1,name:'弘典酒'},
					{id:2,name:'茅台酒'},
					{id:3,name:'飞天迎宾酒'},
					{id:4,name:'A4纸'},
					{id:5,name:'A3纸'},
					{id:6,name:'安全帽'},
					{id:7,name:'工作服'},
				],

				//表单对象
				form: {
					purchaseTypekeyid:'',
					purchaseTypeName:'',
					useAppSum:0,
					appusedesc:'',//用途说明
				},
				//表单验证规则
				formRules: {purchaseTypekeyid:[{ required: true, message: '请输入必填项', trigger: 'blur' }], useAppSum:[{ required: true, message: '请输入必填项', trigger: 'blur' }], appusedesc:[{ required: true, message: '请输入必填项', trigger: 'blur' }]}
			}
		},

		methods: {
			gettypedata(item)
				{
					this.form.purchaseTypeName=item.name;
					this.form.purchaseTypekeyid=item.id;
				},
			//设置弹窗显示
			openDialog() {
				this.dialogVisible = true
			},
			dialogClose() {
				this.dialogVisible = false
				this.resetForm()
			},
			submitFormData() {
			 this.$refs.formRef.validate((valid) => {
				if (valid) {
						this.$emit('getFormData', this.$myfunction.copyData(this.form))
						this.dialogClose()
				}else
				{
					this.$message.success("数据录入不完整!请确认!")
				}
				});
			},
			resetForm() {
				this.$refs.formRef.resetFields()
			}
		}

	}
</script>

<style scoped>

</style>
