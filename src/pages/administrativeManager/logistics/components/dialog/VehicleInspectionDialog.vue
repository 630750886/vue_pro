<template>
	<div>
		<el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%" @close="dialogClose()" :close-on-click-modal="false">
			<el-form :model="form" ref="formRef" :rules="formRules" label-width="100px">
				<el-form-item label="年检日期">
					<el-date-picker
						v-model="form.checkedDate"
						type="date"
						placeholder="选择日期"
						format="yyyy/MM/dd"
						value-format="yyyy/MM/dd"
						>
						</el-date-picker>
				</el-form-item>
				<el-form-item label="年检经办人">
					<el-input v-model="form.checkedVehiclePersonName"></el-input>
				</el-form-item>
				<el-form-item label="年检有效期">
					<rea-datescope
							v-model="datadefault"
							value-type="array"
					></rea-datescope>
<!--					<date-picker-scope  @getData="getdate" v-model="datadefault"></date-picker-scope>-->
				</el-form-item>
			</el-form>
			<dialog-button resetBtn="false" :cancelBtn="{show:false}" :okBtn="comman=='adds'?'新增':'保存'" @okBtn="submitFormData" @cancelBtn="dialogClose()"></dialog-button>
		</el-dialog>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import DialogButton from '../../../acomponents/DialogButton.vue'
	import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue'
	import ElDataPickerTemplate from '../../../acomponents/ElDataPickerTemplate.vue'

	import DatePickerScope from '../../../acomponents/DatePickerScope.vue'

	export default {
		components: {
			DialogButton,
			ElSelectTemplate,
            ElDataPickerTemplate,
			DatePickerScope,
		},
		props: {
			title: '',
			station: {
				type: Object,
				default: () => {
					return {
						organize: [],
					}
				}
			},
			comman:{type:String,
			        default:'adds'
					}
		},
		watch: {},
		//数据节点
		data() {
			return {
				dialogVisible: false,
				//表单对象
				form: {
					vehicleKeyId:'',
					checkedDate:'',
					checkedVehiclePersonName:'',
					checkedVehicleAddress:'',
					checkedVehicleCompanyName:'',
					checkedVehicleAttachFile:'',
					checkedBeginDate:'',
					checkedEndDate:''
				},
				//表单验证规则
				formRules: {
				},
				datadefault:[],
			}
		},
		//生命周期函数节点
		created() {},
		//自定义函数节点
		methods: {
			getdate(data) {
				if (data!==null)
				{
					this.form.checkedBeginDate=data[0];
					this.form.checkedEndDate=data[1];
				}
			},
			dialogClose() {
				this.dialogVisible = false
				this.$refs.formRef.resetFields()
			},
			submitFormData() {
				this.form.checkedBeginDate=this.datadefault[0];
				this.form.checkedEndDate=this.datadefault[1];
				this.$refs.formRef.validate(valid => {
					if (!valid) return
					this.$emit('getFormData', this.$myfunction.copyData(this.form))
					this.datadefault=[]
					this.dialogClose()
				})
			},
			openDialog(data) {
			  if (this.comman==="adds")
			  {
				  this.form.vehicleKeyId=data.keyid;
			  }
			  else
			  {
				console.log(data);
				this.form=data;
					this.datadefault=[]
					this.datadefault.push(this.form.checkedBeginDate);
					this.datadefault.push(this.form.checkedEndDate);
			  }
			  this.dialogVisible = true
			}
		}
	}
</script>
<style lang='less' scoped>
	.btn-right {
		float: right;
		margin-right: 0 !important;
	}
</style>
