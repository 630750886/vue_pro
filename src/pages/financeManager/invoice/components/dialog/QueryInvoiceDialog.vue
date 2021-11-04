<template>
	<el-dialog :visible.sync="dialogVisible" width="40%" :title="title" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%" >


			<el-form-item label="开票状态" prop="costType.value">
				 <el-checkbox-group v-model="form.costType.value">
      <el-checkbox label="1">未回款</el-checkbox>
      <el-checkbox label="2">未回款完整</el-checkbox>
      <el-checkbox label="3">已回款</el-checkbox>
      <el-checkbox label="0">已作废</el-checkbox>
    </el-checkbox-group>
	 <!-- <el-checkbox v-model="form.t1" true-label="1" false-label="">未回款</el-checkbox>
      <el-checkbox v-model="form.t2" true-label="2" false-label="">未回款完整</el-checkbox>
      <el-checkbox v-model="form.t3" true-label="3" false-label="">已回款</el-checkbox>
      <el-checkbox v-model="form.t4" true-label="0" false-label="">已作废</el-checkbox> -->
			</el-form-item>

			<el-form-item label="开票日期">				
						<el-date-picker v-model="form.billTime1.value" value-format="yyyy/MM/dd" type="date" placeholder="请选择日期">
				</el-date-picker>-<el-date-picker v-model="form.billTime2.value" value-format="yyyy/MM/dd" type="date" placeholder="请选择日期"></el-date-picker>
			</el-form-item>
			<el-form-item label="开票金额(元)">
				<el-input-number aria-placeholder="请输入整数" v-model="form.sumMoney1.value" style="width: 30%;"></el-input-number>-
				<el-input-number aria-placeholder="请输入整数" v-model="form.sumMoney2.value" style="width: 30%;"></el-input-number>
			</el-form-item>
			<el-form-item label="发票号" prop="billNo.value">
				<el-input v-model="form.billNo.value"></el-input>
			</el-form-item>
			<el-form-item label="付款单位全称">
				<el-input placeholder="请输入" v-model="form.payer.value"></el-input>
			</el-form-item>
			<el-form-item label="创建组织">
				<rea-cascader
                  v-model="form.orgId.value"
                  :data="orgTree"
                  :props="optionProps"                
                ></rea-cascader>
			</el-form-item>
			<el-form-item label="创建人">
				<el-input v-model="form.createBy_name.value" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="编号">
				<el-input v-model="form.contractId.value" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="名称">
				<el-input v-model="form.contractName.value" placeholder="请输入"></el-input>
			</el-form-item>

		</el-form>

		<dialog-button resetBtn="true" ok-btn="筛选" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>

	</el-dialog>
</template>

<script>
	import DialogButton from "../../../acomponents/DialogButton.vue"
	import { mapState } from 'vuex';
	export default {
		components: {
			DialogButton
		},
		props: {
			title: {
				type: String,
				dealt: ''
			},
			action:'',
		},
		watch: {
			// title(newValue) {
			// 	this.title1 = newValue
			// }
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

				optionProps: {
        			value: 'keyid',
        			label: 'label',
        			children: 'children',
       				emitPath: false
      			},
				//开票类型
				typeOptions:[
					//服务费、中标服务费、文件费、管理费、其他收款
					{id:1,name:'服务费'},
					{id:3,name:'文件费'},
					{id:4,name:'管理费'},
					{id:5,name:'其他收款'},
				],
				mytype:[],
				//表单对象
				form: {								
					costType:{key:"costType",value:[],op:CekinFunction.equmoreOP},					
					billTime1: {key:'billTime',value:'',op:CekinFunction.morethanequOP,types:'date'},
					billTime2: {key:'billTime',value:'',op:CekinFunction.lessthanequOP,types:'date'},
					sumMoney1:{key:'sumMoney',value:'',op:CekinFunction.morethanequOP,types:'int'},
					sumMoney2:{key:'sumMoney',value:'',op:CekinFunction.lessthanequOP,types:'int'},
					billNo: {key:'billNo',value:'',op:CekinFunction.equOP},
					payer: {key:'payer',value:'',op:CekinFunction.equOP},
					orgId: {key:'orgId',value:'',op:CekinFunction.equOP},
					createBy_name: {key:'createBy_name',value:'',op:CekinFunction.equOP},
					contractId: {key:'contractId',value:'',op:CekinFunction.equOP},
					contractName: {key:'contractName',value:'',op:CekinFunction.equOP}
				},
				//表单验证规则
				formRules: {

				}
			}
		},
		computed: {   
    ...mapState({
      orgTree: (state) => state.loadType.organizeList, // state.orgAndPost.orgTree
    }),
  },
		methods: {
			openDialog() {
				this.dialogVisible = true;
				this.$nextTick(()=>{
					this.form={
					costType:{key:"costType",value:[],op:CekinFunction.equmoreOP},					
					billTime1: {key:'billTime',value:'',op:CekinFunction.morethanequOP,types:'date'},
					billTime2: {key:'billTime',value:'',op:CekinFunction.lessthanequOP,types:'date'},
					sumMoney1:{key:'sumMoney',value:'',op:CekinFunction.morethanequOP,types:'int'},
					sumMoney2:{key:'sumMoney',value:'',op:CekinFunction.lessthanequOP,types:'int'},
					billNo: {key:'billNo',value:'',op:CekinFunction.equOP},
					payer: {key:'payer',value:'',op:CekinFunction.equOP},
					orgId: {key:'orgId',value:'',op:CekinFunction.equOP},
					createBy_name: {key:'createBy_name',value:'',op:CekinFunction.equOP},
					contractId: {key:'contractId',value:'',op:CekinFunction.equOP},
					contractName: {key:'contractName',value:'',op:CekinFunction.equOP}
					};
					//this.$refs.formRef.resetFields();
				})
				
			},
			dialogClose() {
				this.dialogVisible = false
				this.resetForm()
			},
			submitFormData() {
				let keys = Object.keys(this.form);
				let  queryForm = keys.map(s=>{return this.form[s]});
			
     			var myfilterData = this.$myfunction.deepClone(queryForm);
				this.$emit('getFormData', myfilterData);
				this.dialogClose()
			},
			resetForm() {
				this.form={
						costType:{key:"costType",value:[],op:"equ"},					
					billTime1: {key:'billTime',value:'',op:'lessthanequ'},
					billTime2: {key:'billTime',value:'',op:'morethanequ'},
					sumMoney1:{key:'sumMoney',value:'',op:'lessthanequ'},
					sumMoney2:{key:'sumMoney',value:'',op:'morethanequ'},
					billNo: {key:'billNo',value:'',op:'equ'},
					payer: {key:'payer',value:'',op:'equ'},
					orgId: {key:'orgId',value:'',op:'equ'},
					createBy_name: {key:'createBy_name',value:'',op:'equ'},
					contractId: {key:['structData','contractId'],value:'',op:'equ'},
					contractName: {key:['structData','contractName'],value:'',op:'equ'}
					};
			}
		}
	}
</script>

<style scoped>

</style>
