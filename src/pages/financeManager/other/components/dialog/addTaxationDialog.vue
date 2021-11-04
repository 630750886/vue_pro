<template>
	<el-dialog :visible.sync="dialogVisible" width="40%" title="" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%" >
			<el-form-item label="公司类型" prop="commpanyType">
				<el-select v-model="form.commpanyType" >
					<el-option v-for="item in typeOptions" :key="item.id" :value="item.id" :label="item.name"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="公司名称" prop="commpanyName">
				<el-input aria-placeholder="请输入" v-model="form.commpanyName"></el-input>
			</el-form-item>
		</el-form>
		<dialog-button resetBtn="false" :cancelBtn="{show:false}"  ok-btn="新 建"  @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
		
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
					{id:'总公司',name:'总公司'},
					{id:'代理分公司',name:'代理分公司'},
					{id:'自营分公司',name:'自营分公司'},
					{id:'联营分公司',name:'联营分公司'},
				],
				//表单对象
				form: {
					
				},
				//表单验证规则
				formRules: {
					commpanyType: [{ required: true, message: '请填写完整信息', trigger: 'blur' }],
					commpanyName: [{ required: true, message: '请填写完整信息', trigger: 'blur' }]
				}
			}
		},
		methods: {
			openDialog(val) {
				this.form=val;
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
					this.$message.success("数据录入完不完整!请确认!")
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
	