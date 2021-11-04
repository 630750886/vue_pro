<template>
	<el-dialog :visible.sync="dialogVisible" width="40%" :title="title" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%" >
			
			<el-form-item label="总公司">
				<el-form-item label="各业务部">
					开票总额：      回款总额：       应收款总额：
				</el-form-item>
			</el-form-item>
			<el-form-item label="分公司">
				<el-form-item label="铜仁分公司">
					开票总额：      回款总额：       应收款总额：
				</el-form-item>
				<el-form-item label="遵义分公司">
					开票总额：      回款总额：       应收款总额：
				</el-form-item>
			</el-form-item>
			<el-form-item label="项目部">
				开票总额：      回款总额：       应收款总额：
			</el-form-item>
			<a href="">历史数据查看</a>
			
			
		</el-form>

		<dialog-button resetBtn="false" :cancelBtn="{show:false}" ok-btn="保 存" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>

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
