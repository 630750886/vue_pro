<template>
	<el-dialog :visible.sync="dialogVisible"  v-if="dialogVisible" width="40%" :title="title1" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%">
			<el-form-item label="类型">
				<el-select-template :data="typeOptions" v-model="form.type"></el-select-template>
			</el-form-item>
			<el-form-item  label="采购数量">
				<el-input  ></el-input>
			</el-form-item>
			<el-form-item  label="采购单价">
				<el-input  ></el-input>
			</el-form-item>
			<el-form-item  label="采购总价">
				<el-input  ></el-input>
			</el-form-item>
			<el-form-item  label="供应商名称">
				<el-input  ></el-input>
			</el-form-item>
			<el-form-item  label="联系电话">
				<el-input  ></el-input>
			</el-form-item>
			<el-form-item  label="发票金额(元)">
				<el-input  ></el-input>
			</el-form-item>
			<el-form-item  label="发票金额(元)">
				<el-input  ></el-input>
			</el-form-item>
			<el-form-item  label="欠票金额(元)">
				<el-input  ></el-input>
			</el-form-item>
			
		</el-form>

		<dialog-button :resetBtn="{show:false}" :cancelBtn="{show:false}" okBtn="确 定" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
	</el-dialog>
</template>

<script>
	import DialogButton from "../../../acomponents/DialogButton.vue"
	import Station from "../../../acomponents/Station.vue"
	import ElSelectTemplate from "../../../acomponents/ElSelectTemplate.vue"

	export default {
		components: {
			DialogButton,
			Station,
			ElSelectTemplate
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
				//类型
				typeOptions:[
					//弘典酒、茅台酒、飞天迎宾酒、A4纸、A3纸、安全帽、工作服、生活用品、绿卉、
					//办公用品、纸杯、手提袋、宣传册、烟灰缸、名片、其他
					{id:1,name:'弘典酒'},
					{id:2,name:'茅台酒'},
					{id:3,name:'飞天迎宾酒'},
					{id:4,name:'A4纸'},
					{id:5,name:'A3纸'},
					{id:6,name:'安全帽'},
					{id:7,name:'工作服'},
					{id:8,name:'生活用品'},
					{id:9,name:'办公用品'},
					{id:10,name:'纸杯'},
					{id:11,name:'手提袋'},
					{id:12,name:'宣传册'},
					{id:13,name:'烟灰缸'},
					{id:14,name:'名片'},
					{id:15,name:'其他'},
				],
				
				//表单对象
				form: {
					purchaseAppTypekeyid:'002',
          			purchaseAppTypeName:'通用物品'
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
