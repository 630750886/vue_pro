<template>
	<el-dialog :visible.sync="dialogVisible"  v-if="dialogVisible" width="40%" :title="title1" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%">
			<el-form-item label="采购数量">
				<el-input  ></el-input>
			</el-form-item>
			<el-form-item label="采购单价">
				<el-input  ></el-input>
			</el-form-item>
			<el-form-item label="采购总价">
				<el-input  ></el-input>
			</el-form-item>
			<el-form-item label="供应商名称">
				<el-input  ></el-input>
			</el-form-item>
			<el-form-item label="供应商联系人">
				<el-input  ></el-input>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-input  ></el-input>
			</el-form-item>
			
			<el-form-item  label="发票金额(元)">
				<el-input  ></el-input>____ 元 
			</el-form-item>
			<el-form-item  label="发票扫描件">
				上传附件
			</el-form-item>
			<el-form-item label="欠票金额(元)">
				
			</el-form-item>
			
			
		</el-form>

		<dialog-button :resetBtn="{show:false}" :cancelBtn="{show:false}" okBtn="确 定" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
	</el-dialog>
</template>

<script>
	import DialogButton from "../../../acomponents/DialogButton.vue"
	import Station from "../../../acomponents/Station.vue"
	import ElSelectTemplate from "../../../acomponents/ElSelectTemplate.vue"

	export default {
		components: {
			DialogButton,
			Station,
			ElSelectTemplate
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
					type:'',
				},
				//表单验证规则
				formRules: {}
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
