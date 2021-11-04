<template>
	<el-dialog :visible.sync="dialogVisible" width="30%" :title="title" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef"  label-width="150px">
			<el-form-item label="一般结算账户信息扫描件">
				<upload-button v-model="form.settleAccount"></upload-button><!--多份-->
				<el-button type="text" @click="addAttach">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="scope" align="center" height="7.5rem" 
		border
		highlight-current-row :header-cell-style="{fontSize:'14px'}">
							<el-table-column prop="createTime" label="时间" align="center"></el-table-column>
							<el-table-column label="附件" align="center">
								<template slot-scope="scope">
									<download-button :value="scope.row.attachId"></download-button>
								</template>
							</el-table-column>
							<el-table-column label="操作" align="center" width="300px">
								<template slot-scope="scope">
									<el-button type="text" @click="delAttach(scope.row.keyid)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
		<dialog-button resetBtn="false" :cancelBtn="{show:false}" @okBtn="dialogClose" @cancelBtn="dialogClose"></dialog-button>

	</el-dialog>
</template>

<script>
	import DialogButton from "../../../acomponents/DialogButton.vue"
	

	export default {
		components: {
			DialogButton,
			UploadButton
		},
		props: {
			title: {
				type: String,
				dealt: ''
			},
			scope:'',
			parentId:''
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
					settleAccount:''
				},
				//表单验证规则
				formRules: {

				}
			}
		},
		methods: {
			openDialog(sc,id) {
				this.scope=sc;
				this.parentId=id;
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
			},
			delAttach(keyid){
				;//删除
			},
			addAttach(){
				if(!this.$myfunction.isEmpty(this.form.settleAccount)){
						;//添加
				}else{
					this.$message.warning("请先上传附件！");
				}
			}
		}
	}
</script>

<style scoped>

</style>
