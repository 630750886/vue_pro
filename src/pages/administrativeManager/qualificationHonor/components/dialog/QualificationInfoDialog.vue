<template>
	<el-dialog  :visible.sync="dialogVisible" v-if="dialogVisible"  :width="width"  :title="title" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="30%">
			<el-form-item label="资质名称">
				<el-input v-model="form.aptitudeName" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="资质等级">
				 <el-input v-model="form.aptitudeLevel" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="技术负责人">
				 <el-input v-model="form.aptitudeleading" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="专业">
				<el-input v-model="form.aptitudeProfession" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="资质证书正本扫描件">
				<upload-button v-model="form.aptitudeOriginalAttachFile"></upload-button>
			</el-form-item>
			<el-form-item label="资质证书副本扫描件">
				<upload-button v-model="form.aptitudeCarbonAttachFile"></upload-button>
			</el-form-item>
			<el-form-item label="副本数量">
				<el-input v-model="form.aptitudeCarbonNumber" :min="0" style="width: 80px"></el-input>
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
		</el-form>
		<dialog-button :resetBtn="{show:false}" okBtn="保存" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
	</el-dialog>
</template>

<script>
	import DatePickerScope from "../../../acomponents/DatePickerScope.vue"


	export default {
		components: {
			DatePickerScope,
		},
		props: {
			title: {
				type: String,
				dealt: ''
			},
			width:{
			  type:String,
				dealt: '50%'
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
				dialogVisible:false,
				form: {
                   keyid:'',
				   aptitudeName:'',
				   aptitudeLevel:'',
				   aptitudeleading:'',
				   aptitudeProfession:'',
				   aptitudeOriginalAttachFile:'',
				   aptitudeCarbonAttachFile:'',
				   aptitudeCarbonNumber:0,
				   aptitudeBeginDate:'',
				   aptitudeEndDate:''
				},
				//表单验证规则
				formRules: {},
			}
		},
		methods: {
			getdateinfo(itemcon)
			{
				console.log(itemcon.length);
                if (itemcon.length===2)
				{
					this.form.aptitudeBeginDate=itemcon[0];
					this.form.aptitudeEndDate=itemcon[1];
				}
			},
			//设置弹窗显示
			openDialog(ditem) {
				this.form=ditem;
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
