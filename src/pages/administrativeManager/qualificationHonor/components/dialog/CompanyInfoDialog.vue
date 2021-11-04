<template>
	<el-dialog :visible.sync="dialogVisible"  v-if="dialogVisible" width="50%" :title="title" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="30%">
			<el-form-item label="公司名称">
				<el-input v-model="form.companyName" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="公司类型">
				<el-select v-model="form.companyTypeKeyId" placeholder="请选择" @change="getplaytype">
					<el-option v-for="item in typeOptions"
					:key="item.id"
					:label="item.name"
					:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="统一社会信用代码">
				  <el-input v-model="form.companyCreditCode" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="法定代表人/负责人">
				 <el-input v-model="form.companyCorporate" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="成立日期">
				 <el-date-picker
					v-model="form.companyBeginDate"
					type="date"
					placeholder="选择日期"
					format="yyyy/MM/dd"
					value-format="yyyy/MM/dd"
					>
					</el-date-picker>
			</el-form-item>
			<el-form-item label="场所图">
				<upload-button v-model="form.companyAddressFile"></upload-button>
			</el-form-item>
			<el-form-item label="执照正本">
				<upload-button v-model="form.companyZLicenceFile"></upload-button>
			</el-form-item>
			<el-form-item label="执照副本">
				<upload-button v-model="form.companyFLicenceFile"></upload-button>
			</el-form-item>
			<el-form-item label="副本数">
				<el-input style="width: 80px" v-model="form.companyFLicenceNum"  label="描述文字"></el-input>
			</el-form-item>
			<el-form-item label="租赁合同">
				<upload-button v-model="form.contrantLicenceFile"></upload-button>
			</el-form-item>
			<el-form-item label="合同有效期">
<!--				<date-picker-scope  @getData="getdate" v-model="datadefault"></date-picker-scope>-->
				<el-date-picker
						v-model="form.contrantBeginDate"
						type="date"
						placeholder="选择日期"
						value-format="yyyy/MM/dd"
						format="yyyy/MM/dd">
				</el-date-picker>- <el-date-picker
					v-model="form.contrantEndDate"
					type="date"
					placeholder="选择日期"
					value-format="yyyy/MM/dd"
					format="yyyy/MM/dd">
			</el-date-picker>
			</el-form-item>
		</el-form>
		<dialog-button  :cancelBtn="{show:false}"  :resetBtn="{show:false}" okBtn="保存" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
	</el-dialog>
</template>

<script>
	import DatePickerScope from "../../../acomponents/DatePickerScope.vue"
	import ElSelectTemplate from "../../../acomponents/ElSelectTemplate.vue"

	export default {
		components: {
			DatePickerScope,
			ElSelectTemplate,
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
		data:function() {
			return {
			//父窗口传递的弹窗标题
			//弹窗显示控制
			dialogVisible: false,
			//公司分类
			typeOptions:[
					//总公司、自营分公司、协议分公司、项目分公司、办事处
					{id:"1",name:'总公司'},
					{id:"2",name:'自营分支机构'},
					{id:"3",name:'代理分支机构'},
					{id:"4",name:'联营分支机构'}
				],
				//表单对象
				form: {
					keyid:'',
					companyName:'',
					companyTypeKeyId:'',
					companyTypeName:'',
					companyCreditCode:'',
					companyCorporate:'',
					companyBeginDate:'',
					contrantBeginDate:'',
					contrantEndDate:'',
					companyAddress:'',
					companyAddressFile:'',
					companyZLicenceFile:'',
					companyFLicenceFile:'',
					contrantLicenceFile:''
				},
				// datadefault:[],
				//表单验证规则
				formRules: {}
			}
		},

		methods: {
			getplaytype(iteminfo)
			{
				let item = this.typeOptions.find((item,index,arr)=>{
					return item.id == iteminfo
				})
				this.form.companyTypeKeyId=item.id;
				this.form.companyTypeName=item.name;
			},
			getdate(itemdate)
			{
                console.log(itemdate.length);
                if (itemdate.length===2)
				{
					this.form.contrantBeginDate=itemdate[0];
					this.form.contrantEndDate=itemdate[1];
				}
			},
			//设置弹窗显示
			openDialog(data) {
				this.form=data;
				// this.datadefault.push(this.form.contrantBeginDate);
				// this.datadefault.push(this.form.contrantEndDate);
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
