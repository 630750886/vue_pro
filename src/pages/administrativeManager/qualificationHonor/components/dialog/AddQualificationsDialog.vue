<template>
	<el-dialog :visible.sync="dialogVisible"  v-if="dialogVisible" width="40%" :title="title1" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%">
			<el-form-item label="新建类型" prop="aptitudeName">
				<el-select v-model="form.addType" placeholder="请选择">
					<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item v-if="form.addType==1 || form.addType==2 || form.addType==3 || form.addType==4" label="名称" prop="addName">
				<el-input v-model="form.addName"></el-input>
			</el-form-item>
		</el-form>

		<dialog-button  :cancelBtn="{show:false}" :resetBtn="{show:false}" okBtn="新建" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
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
					addType:"",
					addName:"",
				},
				options: [{
					value: '1',
					label: '资质'
				}, {
					value: '2',
					label: '荣誉'
				}, {
					value: '3',
					label: '公司'
				}, {
					value: '4',
					label: '检查'
				}],
				value: '',
				//表单验证规则
				formRules: {
					addName:[ { required: true, message: '请输入必填项', trigger: 'blur' }]
				}
			}
		},
		computed:{
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
						this.form={}
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
.aa{

}
</style>
