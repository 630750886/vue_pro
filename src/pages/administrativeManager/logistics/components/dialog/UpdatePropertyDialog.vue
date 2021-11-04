<template>
	<div>
		<el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="50%" @close="dialogClose()" :close-on-click-modal="false">
			<el-form :model="form" ref="formRef" :rules="formRules" label-width="100px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="房东姓名">
							<el-input v-model="form.ownerName" clearable></el-input>
						</el-form-item>
						<el-form-item label="房东电话">
							<el-input v-model="form.ownerPhone"></el-input>
						</el-form-item>
<!--						<el-form-item label="房东身份证">-->
<!--							<upload-button v-model="form.ownerCardIDFile">附件上传</upload-button>-->
<!--						</el-form-item>-->
<!--						<el-form-item label="房屋用途">-->
<!--							<el-select-template-->
<!--							:data="pusetype" v-model="form.propertyUseTypeKeyId"-->
<!--							@getData="getusetype">-->
<!--							</el-select-template>-->
<!--						</el-form-item>-->
						<el-form-item label="电费号">
							<el-input v-model="form.propertyElectricCode"></el-input>
						</el-form-item>
						<el-form-item label="网络号">
							<el-input v-model="form.propertyNetCode"></el-input>
						</el-form-item>
<!--						<el-form-item label="房屋租金付款类型">-->
<!--							<el-select-template :data="playtype" v-model="form.propertyRentWayTypeKeyId" @getData="getplaytype"></el-select-template>-->
<!--						</el-form-item>-->
					</el-col>
					<el-col :span="12">
						<el-form-item label="房屋落址">
							<el-input v-model="form.propertyAddress"></el-input>
						</el-form-item>
						<el-form-item label="水费号">
							<el-input v-model="form.propertyWaterCode"></el-input>
						</el-form-item>
						<el-form-item label="燃气号">
							<el-input v-model="form.propertyGasCode"></el-input>
						</el-form-item>
						<el-form-item label="座机号">
							<el-input v-model="form.propertyPhoneCode"></el-input>
						</el-form-item>
<!--						<el-form-item label="租金/元">-->
<!--							<el-input v-model="form.propertyrentSum"></el-input>-->
<!--						</el-form-item>-->
					</el-col>
				</el-row>
				<el-form-item label="租赁合同扫描件">
					<upload-button v-model="form.ownerConTractAttachFile" >上传附件</upload-button></el-form-item>
				<el-form-item label="租赁合同有效期">
					<el-row>
					<el-col :span="11">
						<el-date-picker type="date" placeholder="开始日期" v-model="form.ownerConTractBeginDate" style="width: 100%;"
						format="yyyy/MM/dd "
						value-format="yyyy/MM/dd "></el-date-picker>
						</el-col>
						<el-col class="line" :span="1">致</el-col>
						<el-col :span="11">
						<el-date-picker type="date" placeholder="结束日期" v-model="form.ownerConTractEndDate" style="width: 100%;"
						format="yyyy/MM/dd "
						value-format="yyyy/MM/dd "></el-date-picker>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<dialog-button resetBtn="false" :cancelBtn="{show:false}" okBtn="保存" @okBtn="submitFormData" @cancelBtn="dialogClose()"></dialog-button>
		</el-dialog>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import DialogButton from '../../../acomponents/DialogButton.vue'
	import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue'
	import MultipleInput from '../../../acomponents/MultipleInput.vue'
	import DatePickerScope from '../../../acomponents/DatePickerScope.vue'

	export default {
		components: {
			DialogButton,
			ElSelectTemplate,
			MultipleInput,
			DatePickerScope,
		},
		props: {
			title: '',
			station: {
				type: Object,
				default: () => {
					return {
						organize: [],
					}
				}
			}
		},
		watch: {},
		//数据节点
		data() {
			return {
				dialogVisible: false,
				//表单对象
				form: {ownerName:'',
				propertyUseTypeName:'',
				propertyElectricCode:'',
				propertyNetCode:'',
				propertyRentWayTypeName:'',
				ownerPhone:'',
				propertyAddress:'',
				propertyWaterCode:'',
				propertyGasCode:'',
				propertyPhoneCode:'',
				ownerConTractAttachFile:'',
				ownerConTractEndDate:''
				},
				//表单验证规则
				formRules: {

				},
				playtype:[
					{id:1,name:'月'},
					{id:2,name:'季度'},
					{id:3,name:'半年'},
					{id:4,name:'1年'},
					{id:5,name:'2年'},
					{id:6,name:'3年'},
					{id:7,name:'其他'},
					],
				pusetype:[{id:1,name:'食堂使用'},{id:2,name:'宿舍使用'},{id:3,name:'办公使用'},{id:4,name:'其他使用'}]

			}
		},
		//生命周期函数节点
		created() {},
		//自定义函数节点
		methods: {
			// getplaytype(node){
      //         this.form.propertyRentWayTypeKeyId=node.id;
			//   this.form.propertyRentWayTypeName=node.name;
			// },
			getusetype(node){
               this.form.propertyUseTypeKeyId=node.id;
			   this.form.propertyUseTypeName=node.name;
			},
			dialogClose() {
				this.dialogVisible = false
				this.$refs.formRef.resetFields()
			},
			submitFormData() {
				//this.$refs.formRef.validate(valid => {
				this.$emit('getFormData', this.$myfunction.copyData(this.form))
			    this.dialogClose()
				//})
			},
			openDialog(data) {
				this.form=data;
				this.dialogVisible = true
			}
		}
	}
</script>
<style lang='less' scoped>
	.btn-right {
		float: right;
		margin-right: 0 !important;
	}
</style>
