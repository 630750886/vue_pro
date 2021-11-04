<template>
	<el-dialog :visible.sync="dialogVisible" width="40%" :title="title" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%" >

			<el-form-item label="作废情况说明">
				<el-input v-model="form.cacelDetail"></el-input>
			</el-form-item>
			<!-- <el-form-item label="作废发票">
				<upload-button v-model="form.cacelAttach"></upload-button>
			</el-form-item> -->

		</el-form>

		<dialog-button resetBtn="false" :cancelBtn="{show:false}" ok-btn="提 交" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>

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
					info:'',

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
