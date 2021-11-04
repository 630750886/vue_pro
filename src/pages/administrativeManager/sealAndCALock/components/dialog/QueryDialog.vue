<template>
	<el-dialog :visible.sync="dialogVisible"  v-if="dialogVisible" width="40%" :title="title1" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%">
			<el-form-item label="状态">
				<el-radio-group v-model="radio">
					<el-radio label="启用中"></el-radio>
					<el-radio label="停用中"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="名称">
				 <el-input ></el-input>
			</el-form-item>
			<el-form-item label="类型">
				<el-select-template :data="typeOptions" v-model="form.type"></el-select-template>
			</el-form-item>

			<el-form-item v-if="form.type == 1 || form.type == 2" label="印章类型">
				<el-select-template :data='sealTypeOptions' ></el-select-template>
			</el-form-item>

			<el-form-item v-if="form.type ==3" label="CA锁类型">
				<el-select-template :data='lockTypeOptions' ></el-select-template>
			</el-form-item>

			<el-form-item  label="使用组织">
				<el-select-template></el-select-template>
			</el-form-item>
			<el-form-item  label="工程师名称">
				<el-input></el-input>
			</el-form-item>

		</el-form>

		<dialog-button :cancelBtn="{show:false}" :resetBtn="{show:false}" okBtn="确 定" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
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
					//印章、电子印章、CA锁
					{id:1,name:'印章'},
					{id:2,name:'电子印章'},
					{id:3,name:'CA锁'},
				],
				//印章类型
				sealTypeOptions:[
					//部门章、业务专用章、公章、法人章、签字章、合同专用章、财务专用章、发票专用章、执业章、资质章、其他印章
					{id:1,name:'部门章'},
					{id:2,name:'业务专用章'},
					{id:3,name:'公章'},
					{id:4,name:'法人章'},
					{id:5,name:'签字章'},
					{id:6,name:'合同专用章'},
					{id:7,name:'财务专用章'},
					{id:8,name:'发票专用章'},
					{id:9,name:'执业章'},
					{id:10,name:'资质章'},
					{id:11,name:'其他印章'},

				],
				//CA锁类型
				lockTypeOptions:[
					//法人锁、公司锁、个人锁、软件锁、其他锁
					{id:1,name:'法人锁'},
					{id:2,name:'公司锁'},
					{id:3,name:'个人锁'},
					{id:4,name:'软件锁'},
					{id:5,name:'其他锁'},
				],
				//表单对象
				form: {
					type:'',
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
