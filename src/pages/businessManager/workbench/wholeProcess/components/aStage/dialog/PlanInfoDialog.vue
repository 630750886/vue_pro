<template>
	<!--框架或入库合同备案对话框-->

	<el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
 <el-form :model="form" ref="formRef" :rules="formRules" label-width="110px">

			<el-row>
				<el-col :span="12">
					<el-form-item label="计划开始时间:">{{start}}</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="计划完成时间:">{{end}}</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="计划服务天数:">{{num1}}</el-form-item>

				</el-col>
				<el-col :span="12">
					<el-form-item label="计划回访及归档天数:">{{num2}}</el-form-item>
				</el-col>

				<el-col :span="24">
					<el-form-item label="服务内容:" >
						<template v-for="item in services" >
							<el-col :span="10" >
								<el-form-item :label="item.name+':'">{{item.connet}}</el-form-item>
							</el-col>
						</template>
					</el-form-item>
				</el-col>


			</el-row>
		</el-form>
		<div>
			<dialog-button :reset-btn="{show:false}" @cancelBtn="dialogClose" :cancelBtn="{show:false}" @okBtn="submitFormData"></dialog-button>
		</div>
	</el-dialog>

</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	export default {
		components: {

		},
		props: {
			title: '',
			width: {
				type: String,
				default: '50%'
			},
			updateData: ''
		},
		watch: {
			updateData(newValue) {
				this.form = this.$myfunction.copyData(newValue)
			}
		},
		//数据节点
		data() {
			return {
				dialogVisible: false,
				form:{},
				formRules:{},
				start: '2020/1/1',
				end: '2020/2/2',
				num1: 10,
				num2: 10,
				services: [{
						no: 1,
						name: '现场踏勤',
						connet: '完成踏勤'
					},
					{
						no: 2,
						name: '会商',
						connet: '完成踏勤'
					},
					{
						no: 3,
						name: '其他',
						connet: '完成踏勤'
					},
				]
			}
		},
		//生命周期函数节点
		created() {},
		//自定义函数节点
		methods: {
			openDialog(key, value) {
				this.$set(this.form, key, value)
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
<style lang='less' scoped>

</style>
