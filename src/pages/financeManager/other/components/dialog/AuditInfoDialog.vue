<template>
	<el-dialog :visible.sync="dialogVisible" width="40%" :title="title" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%" >

			<el-form-item label="公司类型">
				<el-input v-model="form.type"></el-input>
			</el-form-item>
			
			<el-form-item label="公司名称">
				<el-input v-model="form.companyName"></el-input>
			</el-form-item>
			
			<el-form-item label="审计报告1">
				<el-upload >
					<el-button>点击上传</el-button>
				</el-upload>
			</el-form-item>
			<el-form-item label="审计年份">
				<el-date-picker></el-date-picker>
			</el-form-item>
			
			<el-form-item label="每月完税凭证1">
				<el-upload >
					<el-button>点击上传</el-button>
				</el-upload>
			</el-form-item>
			<el-form-item label="完税时间">
				<el-date-picker></el-date-picker>
			</el-form-item>
			
			<el-form-item label="年度完税凭证1">
				<el-upload >
					<el-button>点击上传</el-button>
				</el-upload>
			</el-form-item>
			<el-form-item label="完税时间">
				<el-date-picker></el-date-picker>
			</el-form-item>
			
			<el-form-item label="社保缴纳凭证1">
				<el-upload >
					<el-button>点击上传</el-button>
				</el-upload>
			</el-form-item>
			<el-form-item label="缴纳时间">
				<el-date-picker></el-date-picker>
			</el-form-item>
			
		</el-form>
		<dialog-button resetBtn="false" :cancelBtn="{show:false}" ok-btn="上 传" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
		
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
				
				//表单对象
				form: {
					type: '',
					companyName:'',
					tel:'',
					bank:'',
					accountNumber:'',
					level:'',
					date:'',
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
	