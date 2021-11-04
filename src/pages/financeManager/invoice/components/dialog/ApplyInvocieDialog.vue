<template>
	<el-dialog :visible.sync="dialogVisible" width="50%" :title="title" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="90px" >


			<el-row>
				<el-col :span="24">
					<el-form-item >
					  <span slot="label"><i class="el-icon-circle-plus-outline" @click="num++"></i>发票构成:</span>
					</el-form-item>
				</el-col>
			</el-row>


			<template v-for="i in num">
				<el-row>
					<el-col :span="12">
						<el-form-item :label="'开票金额(元)'+i">
							<query-input  v-model="form.money"></query-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="开票类型">
							<el-select-template v-model="form.type" :data="typeOptions">
							</el-select-template>
						</el-form-item>
					</el-col>
				</el-row>

				<template v-if="form.type == 1 || form.type == 2 || form.type == 3">
					<el-row>
						<el-col :span="12">
							<el-form-item label="合同编号">
								<el-select v-model="form.contractNum">
									<el-option label="001"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="合同名称">
							</el-form-item>
						</el-col>
					</el-row>


				</template>

				<!-- 选择后二 -->
				<template v-if="form.type == 4 || form.type == 5">
					<el-row>
						<el-col :span="24">
							<el-form-item label="所属组织">
								<el-select-template v-model="form.organization[i]" placeholder="请选择"></el-select-template>
							</el-form-item>
						</el-col>
					</el-row>

				</template>

			</template>


			<el-row>
				<el-col :span="24">
					<el-form-item label="填写开票信息">
						发票模板
					</el-form-item>
					<el-form-item label="如为总公司代开发票请上传税金支付证明" label-width="300">

					</el-form-item>
				</el-col>

			</el-row>


		</el-form>

		<dialog-button resetBtn="false"
		 :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>

	</el-dialog>
</template>

<script>
	import DialogButton from "../../../acomponents/DialogButton.vue"
	import ElSelectTemplate from "../../../acomponents/ElSelectTemplate.vue"
	import QueryInput from "../../../acomponents/QueryInput.vue"

	export default {
		components: {
			DialogButton,
			ElSelectTemplate,
			QueryInput,
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
				num:1,
				//开票类型
				typeOptions:[
					//服务费、中标服务费、文件费、管理费、其他收款
					{id:1,name:'服务费'},
					{id:3,name:'文件费'},
					{id:4,name:'管理费'},
					{id:5,name:'其他收款'},
				],
				//表单对象
				form: {
					contractName:'',
					contractNUm:'',
					constitute:'',
					date: '',
					type: [],
					customer: '',
					money: [],
					allMoney: '',
					organization:'',
					number:'',

				},
				//表单验证规则
				formRules: {

				}
			}
		},
		methods: {
			openDialog() {
				this.resetForm();
				this.dialogVisible = true
			},
			dialogClose() {
				this.resetForm();
				this.dialogVisible = false
			},
			submitFormData() {
				this.$emit('getFormData', this.$myfunction.copyData(this.form))
				this.dialogClose()
			},
			resetForm() {
				this.form={};
				this.$refs.formRef.resetFields()
			}
		}
	}
</script>

<style scoped>

</style>
