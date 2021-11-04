<template>
	<el-dialog :visible.sync="dialogVisible" v-if="dialogVisible" width="50%" :title="title" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="30%">
			<el-form-item label="行政检查名称">
				<el-input v-model="form.licenceCheckName" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="检查单位">
				<el-input v-model="form.licenceCheckUnit" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="检查开始时间">
				<el-date-picker
						v-model="form.begindateTime"
						type="date"
						placeholder="选择开始日期"
						value-format="yyyy/MM/dd"
						format="yyyy/MM/dd">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="检查结束时间">
				<el-date-picker
					v-model="form.enddateTime"
					type="date"
					placeholder="选择结束日期"
					value-format="yyyy/MM/dd"
					format="yyyy/MM/dd">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="要求">
				<upload-button v-model="form.licenceCheckNeed"></upload-button>
			</el-form-item>
			<el-form-item label="材料">
				<upload-button v-model="form.licenceCheckAttachFile"></upload-button>
			</el-form-item>
			<template>
				<el-form-item label="证明材料">
					<upload-button v-model="form.lcheckDocumentFile"></upload-button>
				</el-form-item>
			</template>
			<template>
				<el-form-item label="整改资料">
					<upload-button v-model="form.licenceCheckChangeAttachFile"></upload-button>
				</el-form-item>
			</template>
		</el-form>
		<dialog-button :resetBtn="{show:false}" okBtn="保存" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
	</el-dialog>
</template>

<script>
	import DatePickerScope from "../../../acomponents/DatePickerScope.vue"
	import ElSelectTemplate from "../../../acomponents/ElSelectTemplate.vue"
	export default {
		components: {
			DatePickerScope,
			ElSelectTemplate,
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
				//弹窗显示控制
				dialogVisible: false,
				//表单对象
				form: {
					keyid:'',
					licenceCheckName:'',//行政检查名称
					licenceCheckUnit:'',//检查单位
					licenceCheckLead:'',//公司检查负责人
					licenceCheckNeed:'',//检查要求
					licenceCheckAttachFile:'',//检查提交材料
					licenceCheckChange:'',//整改
					licenceCheckChangeAttachFile:'',//整改相关材料
					lcheckDocumentFile:'',// 证明材料
					begindateTime:"",
					enddateTime:"",
				},
				//表单验证规则
				formRules: {}
			}
		},

		methods: {

			//设置弹窗显示
			openDialog(data) {
				console.log(data);
				this.form=data;
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
