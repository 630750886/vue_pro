<template>
	<el-dialog :visible.sync="dialogVisible" width="40%" :title="title1" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%">

			<el-form-item >
			  <span slot="label"><i class="el-icon-circle-plus-outline" @click="num++"></i>发票:</span>
			</el-form-item>
			
			<el-row>
				<template v-for="i in num">
					<el-col :span="12">
						<el-form-item label="发票号">
							<el-input v-model="form.invoice"></el-input>
						</el-form-item>
					</el-col>
				</template>
				
			</el-row>
			
		</el-form>

		<dialog-button :resetBtn="{show:false}"
		:cancelBtn="{show:false}"
		okBtn="确 定" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
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
				num:1,

				//父窗口传递的弹窗标题
				title1: this.title,
				//弹窗显示控制
				dialogVisible: false,
	
				//表单对象
				form: {
					invoice:''
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
