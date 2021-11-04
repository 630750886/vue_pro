<template>
	<el-dialog :visible.sync="dialogVisible" width="40%" :title="title1" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%">


			<el-form-item label="收款类型">
				<el-select v-model="form.collType">
					<el-option v-for="item in collTypeOptions" :key="item.id" :value="item.id" :label="item.name"></el-option>
				</el-select>
			</el-form-item>
			<!-- 投标保证金 -->
			<template v-if="form.collType == 2 ">

				<el-form-item label="项目名称">
					<el-input v-model="form.projectName"></el-input>
				</el-form-item>
			</template>

			<!-- 其他来往款 -->
			<template v-if="form.collType == 3">
				<el-form-item label="所属组织">
					<el-select v-model="form.organization" placeholder="请选择"></el-select>
				</el-form-item>
				<el-form-item label="收取方式">
					<el-select v-model="form.payType">
						<el-option value="1" label="总公司"></el-option>
						<el-option value="2" label="总公司代缴纳"></el-option>
					</el-select>
					<el-upload v-if="form.payType == 2">
						<el-button>点击上传</el-button>
					</el-upload>
				</el-form-item>
				


				<el-form-item label="保证金收款账户名">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="保证金收款账户开户">
					<el-input v-model="form.userbank"></el-input>
				</el-form-item>
				<el-form-item label="保证金收款账户号">
					<el-input v-model="form.usernumber"></el-input>
				</el-form-item>
				<el-form-item label="缴纳金额(元)">
					<el-input v-model="form.acount"></el-input>
				</el-form-item>
			</template>
			<!-- 风险保证金	 -->
			<template v-if="form.collType == 1">
				<el-form-item label="收取方式">
					<el-select v-model="form.payType">
						<el-option value="1" label="总公司"></el-option>
						<el-option value="2" label="总公司代缴纳"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="保证金类型">
					<el-select v-model="form.bondType">
						<el-option value="1" label="项目"></el-option>
						<el-option value="2" label="非项目"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="合同编号">
					<el-select v-model="form.contractNum">
						<el-option label="001"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="合同名称">
					<el-input v-model="form.contractName"></el-input>
				</el-form-item>
			</template>
			
		</el-form>

		<dialog-button :resetBtn="{show:false}" :cancelBtn="{show:false}" okBtn="确 定" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
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

				//收费类型
				collTypeOptions: [
					//服务费、中标服务费、文件费、管理费、风险（履约）保证金、投标保证金、其他往来款、其他收款
					{
						id: 1,
						name: '风险（履约）保证金'
					},
					{
						id: 2,
						name: '投标保证金'
					},
					{
						id: 3,
						name: '其他往来款'
					},
				],


				//表单对象
				form: {
					acount: '',
					collType: '',
					contractNum: '',
					contractName: '',
					username: '',
					userbank: '',
					usernumber:'',
					organization: '',
					payType: '',
					bondType: '',
					type: '',
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
