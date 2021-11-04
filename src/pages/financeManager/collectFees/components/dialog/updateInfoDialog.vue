<template>
	<el-dialog :visible.sync="dialogVisible" width="30%" :title="title1" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="100px">

			<el-form-item label="文件费收取时间">
				 <el-date-picker v-model="form.date1" format="yyyy/MM/dd" value-format="yyyy-MM-dd"></el-date-picker>
			</el-form-item>
			<el-form-item label="文件费收款类型">
				<el-select-template :data="[{id:1,name:'公账'},{id:2,name:'现金'}]" v-model="form.fileType"></el-select-template>
			</el-form-item>
			<el-form-item label="保证金收取时间">
				 <el-date-picker v-model="form.date2" format="yyyy/MM/dd" value-format="yyyy-MM-dd"></el-date-picker>
			</el-form-item>
			<el-form-item label="保证金收款类型">
				<el-select-template :data="[{id:1,name:'公账'},{id:2,name:'现金'}]" v-model="form.moneyType"></el-select-template>
			</el-form-item>
			<el-form-item label="保证金退还时间">
				<el-date-picker v-model="form.date2" format="yyyy/MM/dd" value-format="yyyy-MM-dd"></el-date-picker>
			</el-form-item>

		</el-form>

		<dialog-button :resetBtn="{show:false}"
		 :cancelBtn="{show:false}" okBtn="确 定" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
	</el-dialog>
</template>

<script>
	import DialogButton from "../../../acomponents/DialogButton.vue"
	import ElSelectTemplate from "../../../acomponents/ElSelectTemplate.vue"
	import Station from "../../../acomponents/Station.vue"

	export default {
		components: {
			DialogButton,
			ElSelectTemplate,
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
					date1:'',
					date2:'',
					fileType:'',
					moneyType:'',
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
