<template>
	<el-dialog :visible.sync="dialogVisible"  v-if="dialogVisible" width="50%" :title="title" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="30%">
			<el-form-item label="荣誉名称">
				<el-input v-model="form.honourableName" placeholder="请输入内容"></el-input>
			</el-form-item>
<!--			<el-form-item label="提交材料">-->
<!--				<upload-button v-model="form.honourableAppAttachFile"></upload-button>-->
<!--			</el-form-item>-->
			<el-form-item label="荣誉等级">
				  <el-input v-model="form.honourableLevel" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="单位名称">
					<el-input v-model="form.issuanceUnits" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="荣誉获得日期">
				 <el-date-picker
						v-model="form.honourableGetDate"
						type="date"
						placeholder="选择日期"
						format="yyyy/MM/dd"
						value-format="yyyy/MM/dd"
						></el-date-picker>
			</el-form-item>
			<el-form-item label="有效期">

				<el-date-picker
						v-model="form.aptitudeBeginDate"
						type="date"
						placeholder="选择日期"
						value-format="yyyy/MM/dd"
						format="yyyy/MM/dd">
				</el-date-picker>- <el-date-picker
					v-model="form.aptitudeEndDate"
					type="date"
					placeholder="选择日期"
					value-format="yyyy/MM/dd"
					format="yyyy/MM/dd">
			</el-date-picker>
			</el-form-item>
			<el-form-item label="荣誉扫描件">
				<upload-button v-model="form.honourableAttachFile"></upload-button>
			</el-form-item>
		</el-form>
		<dialog-button :cancelBtn="{show:false}" :resetBtn="{show:false}" okBtn="保存" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
	</el-dialog>
</template>

<script>
	import DatePickerScope from "../../../acomponents/DatePickerScope.vue"
	export default {
		components: {
			DatePickerScope
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
					honourableName:'',
					// honourableAppAttachFile:'',
					honourableLevel:'',
					issuanceUnits:'',
					honourableGetDate:'',
					honourableAttachFile:'',
					aptitudeBeginDate:'',
					aptitudeEndDate:''
				},
				//表单验证规则
				formRules: {}
			}
		},
		methods: {
			getdate(itemdate)
			{
                console.log(itemdate.length);
                if (itemdate.length===2)
				{
					this.form.aptitudeBeginDate=itemdate[0];
					this.form.aptitudeEndDate=itemdate[1];
				}
			},
			//设置弹窗显示
			openDialog(data) {
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
