<template>
	<el-dialog :visible.sync="dialogVisible" width="40%" :title="title" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="160px">
			<el-form-item label="纳税人识别号">
				<el-input  v-model="form.taxNo"></el-input>
			</el-form-item>

			<el-form-item label="开户行">
				<el-input v-model="form.bank"></el-input>
			</el-form-item>
			<el-form-item label="账号">
				<el-input  v-model="form.acount"></el-input>
			</el-form-item>
			<el-form-item label="开票地址">
				<el-input  v-model="form.taxNo_addr"></el-input>
			</el-form-item>
			<el-form-item label="开票电话">
				<el-input  v-model="form.taxPhone"></el-input>
			</el-form-item>
<el-form-item label="税务信用等级">
				<el-input  v-model="form.taxCreditRate"></el-input>
			</el-form-item>
			<el-form-item label="税务评级年份">
				 <rea-datepicker v-model="form.taxRateYear" type="year"></rea-datepicker>
			</el-form-item>

			<el-form-item label="税务信用等级网页截图">
				 <upload-button v-model="form.taxCreditRateAttach"></upload-button>
			</el-form-item>

		</el-form>
		<dialog-button resetBtn="false" :cancelBtn="{show:false}"  @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>

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
			action: '',
		},
		watch: {

		},
		mounted() {
			//this.title=this.title1
		},
		data() {

			return {
				//弹窗显示控制
				dialogVisible: false,
				//开票类型

				//表单对象
				form: {					
				},
				//表单验证规则
				formRules: {

				}
			}
		},
		methods: {
			openDialog(pa) {
				this.form=pa;
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
