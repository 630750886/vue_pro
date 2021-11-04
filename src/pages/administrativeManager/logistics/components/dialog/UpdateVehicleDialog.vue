<template>
	<div>
		<el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="50%" @close="dialogClose()" :close-on-click-modal="false">
			<el-form :model="form" ref="formRef" :rules="formRules" label-width="100px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="车辆号牌">
							<el-input v-model="form.vehicleCardId" clearable></el-input>
						</el-form-item>
						<el-form-item label="购买日期">
							<el-date-picker
							v-model="form.buyDate"
							type="date"
							placeholder="选择日期"
							format="yyyy/MM/dd"
							value-format="yyyy/MM/dd"
							>
							</el-date-picker>
						</el-form-item>
						<el-form-item label="车身颜色">
							<el-input v-model="form.vehicleColor"></el-input>
						</el-form-item>
						<el-form-item label="轮胎型号">
							<el-input v-model="form.vehicleShoeTypeCode"></el-input>
						</el-form-item>
						<el-form-item label="燃油型号">
							<el-input v-model="form.vehiclefuelTypeCode"></el-input>
						</el-form-item>

					</el-col>
					<el-col :span="12">
						<el-form-item label="车辆型号">
							<el-input v-model="form.vehicleTypeName"></el-input>
						</el-form-item>
						<el-form-item label="车主">
							<el-input v-model="form.vehicleOwnerName"></el-input>
						</el-form-item>
						<el-form-item label="驾乘人数">
							<el-input v-model="form.vehicleCount"></el-input>
						</el-form-item>
						<el-form-item label="排量">
							<el-input v-model="form.vehicleVolume"></el-input>
						</el-form-item>
						<el-form-item label="发动机号">
							<el-input v-model="form.vehicleMotorCode"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

			</el-form>
			<dialog-button resetBtn="false" :cancelBtn="{show:false}" okBtn="保存" @okBtn="submitFormData" @cancelBtn="dialogClose()"></dialog-button>
		</el-dialog>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import DialogButton from '../../../acomponents/DialogButton.vue'
	import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue'
	import DatePickerScope from '../../../acomponents/DatePickerScope.vue'

	export default {
		components: {
			DialogButton,
			ElSelectTemplate,
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
			}
		},
		watch: {},
		//数据节点
		data() {
			return {
				dialogVisible: false,
				//表单对象
				form: {

				},
				//表单验证规则
				formRules: {

				},
			}
		},
		//生命周期函数节点
		created() {},
		//自定义函数节点
		methods: {
			dialogClose() {
				this.dialogVisible = false
				this.$refs.formRef.resetFields()
			},
			submitFormData() {
				this.$refs.formRef.validate(valid => {
					if (!valid) return
					this.$emit('getFormData', this.$myfunction.copyData(this.form))
					this.dialogClose()
				})
			},
			openDialog(data) {
				this.form=data;
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
