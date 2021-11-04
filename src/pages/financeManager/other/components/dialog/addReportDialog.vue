<template>
	<el-dialog :visible.sync="dialogVisible" width="40%" :title="title" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%" >
			

			<el-form-item label="审计年份">
				<el-date-picker></el-date-picker>
			</el-form-item>
			<el-form-item label="审计报告">
				
			</el-form-item>
		</el-form>
		<dialog-button resetBtn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
		
	</el-dialog>
</template>

<script>
	import DialogButton from "../../../acomponents/DialogButton.vue"

	export default {
		components: {
			DialogButton
		},
		props: {
			title: {
				type: String,
				dealt: ''
			},
			action:'',
		},
		watch: {
			title(newValue) {
				this.title1 = newValue
			}
		},
		mounted() {
			//this.title=this.title1
		},
		data() {

			return {
				//父窗口传递的弹窗标题
				title1: '',
				//弹窗显示控制
				dialogVisible: false,
				//开票类型
				typeOptions:[
					//总公司、自营分公司、协议分公司、项目分公司
					{id:1,name:'总公司'},
					{id:2,name:'自营分公司'},
					{id:3,name:'协议分公司'},
					{id:4,name:'项目分公司'},
				],
				//表单对象
				form: {
					type: '',
					nickName:'',
				},
				//表单验证规则
				formRules: {
					
				}
			}
		},
		methods: {
			openDialog() {
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
	