<template>
	<el-dialog :visible.sync="dialogVisible" width="30%" :title="title" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="200px">

			<el-form-item label="基本存款账户信息扫描件">
				<upload-button v-model="form.basicAccount"></upload-button>
			</el-form-item>	
					<el-form-item >
					  <span slot="label"><i class="el-icon-circle-plus-outline" @click="addSettle"></i>新增一般户:</span>
					</el-form-item>
			<template v-for="(item,index) in dataList">
				<el-form-item label="银行名称" >
						<el-input v-model="item.remark"></el-input>
				</el-form-item>
				<el-form-item label="附件信息" >
						<upload-button v-model="item.attachId"></upload-button>
				</el-form-item>
				</template>	
			<!-- <el-form-item label="一般结算账户信息扫描件">
				<upload-button></upload-button>
			</el-form-item> -->

		</el-form>
		<dialog-button resetBtn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>

	</el-dialog>
</template>

<script>
	import DialogButton from "../../../acomponents/DialogButton.vue"
	export default {
		components: {
			DialogButton,	
		},
		props: {
			title: {
				type: String,
				dealt: ''
			},
			action: ''
			
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
				//开票类型

				//表单对象
				form: {
					
				},
				//表单验证规则
				formRules: {

				},
				dataList:[]
			}
		},
		methods: {
			openDialog(pa) {
				this.form=pa;
				this.dialogVisible = true
			},
			dialogClose() {
				this.dialogVisible = false
				this.resetForm()
			},
			submitFormData() {
				if(this.dataList.length>0){
					let days = new Date();
				this.dataList=this.dataList.map(element => {
						return Object.assign(element,{commpanyId:this.form.keyid,createTime:days.Format("yyyy-MM-dd"),state:"0"})
					});
				}
				let pa = Object.assign(this.form,{settleList:this.dataList});
				//this.$myfunction.copyData(this.dataList)
				this.$emit('getFormData', pa);
				this.dialogClose()
			},
			resetForm() {
				this.$refs.formRef.resetFields()
			},
			addSettle(){
				this.dataList.push({remark:'',attachId:''});
			}
		}
	}
</script>

<style scoped>

</style>
