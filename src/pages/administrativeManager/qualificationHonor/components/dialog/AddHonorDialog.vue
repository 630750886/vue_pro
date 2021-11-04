<template>
	<el-dialog :visible.sync="dialogVisible"  v-if="dialogVisible" width="40%" :title="title1" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%">
			<el-form-item label="荣誉名称" prop="honourableName">
				 <el-input v-model="form.honourableName"></el-input>
			</el-form-item>
		</el-form>

		<dialog-button :cancelBtn="{show:false}" :resetBtn="{show:false}" okBtn="确 定" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
	</el-dialog>
</template>

<script>
	import DialogButton from "../../../acomponents/DialogButton.vue"
	import Station from "../../../acomponents/Station.vue"

	export default {
		components: {
			DialogButton,
			Station
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
	
				//表单对象
				form: {
					
				},
				//表单验证规则
				formRules: {
					honourableName:[{ required: true, message: '请输入必填项', trigger: 'blur' }]
				}
			}
		},

		methods: {
			
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
