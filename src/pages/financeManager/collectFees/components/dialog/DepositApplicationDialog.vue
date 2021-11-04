<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="40%"
    :title="title1"
    :close-on-click-modal="false"
  >
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="220px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="支付金额(元)" prop="collMoney" :rules="[
                  {
                    required: true,
                    message: '支付金额必选项',
                    trigger: 'blur',
                  },
                ]">
            <el-input v-model="form.collMoney"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="支付类型" prop="collType">
        <el-select v-model="form.collType">
          <el-option
            v-for="item in paymentTypeOptions"
            :label="item.name"
            :key="item.id"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <div v-if="form.collType == 5">
        <!-- <el-form-item label="类型" prop="riskType">
						<el-select-template :data="[{id:'项目',name:'项目'},{id:'非项目',name:'非项目'}]" v-model="form.riskType"></el-select-template>
					</el-form-item> -->
        <el-form-item label="合同编号" prop="contractId">
          <rea-query-input
            v-model="form.contractId"
            url="agr/busicontractbase/findall"
            filter-obj="{}"
            filter-key="contractCode"
            @getObject="
              (item) => {
                //form.agreementkeyid = item.keyid;
                //form.contractItem=item;
                form.contract_name = item.contractName;
                form.contractId = item.contractCode;
                form.orgName =
                  item.allSysOrgName.split('/')[
                    item.allSysOrgName.split('/').length - 1
                  ];
                  form.orgId =
                  item.allSysOrgKeyid.split('/')[
                    item.allSysOrgKeyid.split('/').length - 1
                  ];
              }
            "
          ></rea-query-input>
        </el-form-item>

        <el-form-item label="合同名称">
          <el-input v-model="form.contract_name" readonly></el-input>
        </el-form-item>
      </div>

      <div v-if="form.collType == 6">
        <el-form-item label="保证金类型">
          <el-select v-model="form.depositType">
            <el-option
              v-for="item in depositTypeOptions"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <template v-if="form.depositType == '投标'">
          <el-row>
             <el-col :span="24">
              <el-form-item label="分包编号" prop="contractId" :rules="[
                  {
                    required: true,
                    message: '分包编号为必填项',
                    trigger: 'blur',
                  },
                ]">
                <rea-query-input
                  v-model="form.contractId"
                  url="tender/bidopeningevaluation/findallcode"
                  filter-obj="{}"
                  filter-key="bidsectioncode"
                  @getObject="
                    (item) => {
                      form.contract_name = item.bidsectionname;                      
                    }
                  "
                ></rea-query-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="分包名称">
                <el-input v-model="form.contract_name" readonly></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24">
              <el-form-item label="项目名称" prop="project_name" :rules="[
                  {
                    required: true,
                    message: '项目名称必选项',
                    trigger: 'blur',
                  },
                ]">
                <rea-query-input
                  v-model="form.project_name"
                  url="tender/tenderinfo/findall"
                  filter-obj="{}"
                  filter-key="projectname"
                  @getObject="
                    (item) => {
                      //form.project_name = item.projectName;
                    }
                  "
                ></rea-query-input>
              </el-form-item>
            </el-col> -->
          </el-row>
        </template>
        <template v-if="form.depositType == '招标'">
          <el-row>
            <el-col :span="12">
              <el-form-item label="合同编号" prop="contractId">
                <rea-query-input
                  v-model="form.contractId"
                  url="agr/busicontractbase/findall"
                  filter-obj="{}"
                  filter-key="contractCode"
                  @getObject="
                    (item) => {
                      form.contract_name = item.contractName;
                      form.orgName =
                        item.allSysOrgName.split('/')[
                          item.allSysOrgName.split('/').length - 1
                        ];
                    }
                  "
                ></rea-query-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同名称">
                <el-input v-model="form.contract_name" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!---->
          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="项目编号" prop="projectId">
                <rea-query-input
                  v-model="form.projectId"
                  url="pro/cmbaseproject/findwhere"
                  filter-key="projectCode"
                  :filter-obj="{ contractCode: form.contractId }"
                  @getObject="
                    (item) => {
                      form.project_name = item.projectName;
                    }
                  "
                ></rea-query-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目名称">
                <el-input v-model="form.project_name" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
        </template>
      </div>

      <div v-if="form.collType == 7">
        <el-form-item label="所属组织" prop="orgId">
          <rea-cascader
            v-model="form.orgId"
            :data="typeList.organizeList"
            @getLabel="
              (item) => {
                form.orgName = item.split('/')[item.split('/').length - 1];
              }
            "
          ></rea-cascader>
        </el-form-item>
      </div>
      <el-form-item label="支付证明表">
        <upload-button v-model="form.payProveAttach"></upload-button>
      </el-form-item>
      <el-form-item label="支付申请表" prop="payApplyAttach">
        <upload-button v-model="form.payApplyAttach"></upload-button>
      </el-form-item>
      <!-- <rea-divider title="填写支付信息"></rea-divider>
      <el-form-item label="账户名" prop="bankAccout">
        <el-input v-model="form.bankAccout"></el-input>
      </el-form-item>
      <el-form-item label="账户开户行" prop="bank">
        <el-input v-model="form.bank"></el-input>
      </el-form-item>
      <el-form-item label="账户号" prop="bankAccoutId">
        <el-input v-model="form.bankAccoutId"></el-input>
      </el-form-item> -->

      <!-- <el-form-item label="递交截至时间" prop="cutoffTime">
					<el-data-picker-template type="datetime" v-model="form.cutoffTime" value-type="yyyy/MM/DD HH:mm" format="yyyy/MM/DD HH:mm"></el-data-picker-template>
				</el-form-item>
				<el-form-item label="附言或用途" prop="remark">
					<el-textarea-template v-model="form.remark"></el-textarea-template>

				</el-form-item> -->
    </el-form>

    <dialog-button
      :resetBtn="{ show: false }"
      :cancelBtn="{ show: false }"
      okBtn="登 记"
      @okBtn="submitFormData"
      @cancelBtn="dialogClose"
    ></dialog-button>
  </el-dialog>
</template>

<script>
import DialogButton from "../../../acomponents/DialogButton.vue";
import ElSelectTemplate from "../../../acomponents/ElSelectTemplate.vue";
import ElTextareaTemplate from "../../../acomponents/ElTextareaTemplate.vue";
import ElDataPickerTemplate from "../../../acomponents/ElDataPickerTemplate.vue";
// import UploadButton from "../../../acomponents/UploadButton.vue"
import Divider from "../../../acomponents/Divider.vue";
import Station from "../../../acomponents/Station.vue";
import { mapState } from "vuex";

export default {
  components: {
    DialogButton,
    // UploadButton,
    Divider,
    ElSelectTemplate,
    ElTextareaTemplate,
    ElDataPickerTemplate,
    Station
  },
  props: {
    title: {
      type: String,
      dealt: "",
    }
  },
  watch: {
    title(newValue) {
      this.title = newValue;
    }
  },
  mounted() {
    // console.log('orgList');
    // console.log(this.typeList);
  },
  data: function () {
    return {
      // 父窗口传递的弹窗标题
      title1: this.title,
      // 弹窗显示控制
      dialogVisible: false,
      // 类型
      depositTypeOptions: [
        { id: "招标", name: "招标" },
        { id: "投标", name: "投标" },
      ],
      // 缴纳类型
      paymentTypeOptions: [
        // 风险（履约）保证金、投标保证金、其他往来款
        {
          id: 5,
          name: "风险（履约）保证金",
        },
        {
          id: 6,
          name: "投标保证金",
        },
        {
          id: 7,
          name: "其他往来款",
        }
      ],
      // 合同编号集
      contractNumOptions: [],
      // 上传按钮显示控制
      showUpload: false,
      // 文件列表
      fileList: [
        {
          name: "food.jpeg",
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        }
      ],

      fileList2: [],
      // 系统表单对象
      form: {
        // paymentType: '',
        // projectType:'',
        // contractNum:'',
        // contractName:'',
        // projectName:'',
        // organization:'',
        // payType:'',
      },
      // 表单验证规则
      formRules: {
        // contractCode: [
        //   { required: true, message: "合同编号为必填项", trigger: "blur" },
        // ],
        // collType: [
        //   { required: true, message: '收款类型为必选项', trigger: 'blur' }
        // ],
        // collMoney: [
        //   { required: true, message: '支付金额为必选项', trigger: 'blur' }
        // ],
        // orgId: [{ required: true, message: '组织为必填项', trigger: 'blur' }],
        // projectId: [
        //   { required: true, message: '项目编号为必填项', trigger: 'blur' }
        // ],
        // project_name: [
        //   { required: true, message: '项目名称为必填项', trigger: 'blur' }
        // ],
        // bankAccoutId: [
        //   { required: true, message: '账户号为必填项', trigger: 'blur' }
        // ],
        // bank: [
        //   { required: true, message: '开户银行为必填项', trigger: 'blur' }
        // ],
        // bankAccout: [
        //   { required: true, message: '账户名为必填项', trigger: 'blur' }
        // ],
        payApplyAttach: [
          { required: true, message: '支付申请表为必填项', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      typeList: "loadType",
    })
  },
  methods: {
    // 文件上传相关
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    // 设置弹窗显示
    openDialog(forms) {
      this.form = forms;
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    submitFormData() {
      //  if(!this.form.collType){
      //     this.$message.warning("支付类型不能为空");
      //     return false;
      // }

      // if(this.form.collType==5){
      //   if(!this.form.contractId){
      //     this.$message.warning("合同编号不能为空");
      //     return false;
      //   }
      // }
      // if(this.form.collType===6){
      //   if(!this.form.depositType){
      //     this.$message.warning("保证金类型不能为空");
      //     return false;
      //   }else{
      //     if(this.form.depositType==="招标"){
      //         if(!this.form.contractId){
      //           this.$message.warning("合同编号不能为空");
      //           return false;
      //         }
      //     }else{
      //         if(!this.form.project_name){
      //           this.$message.warning("项目名称不能为空");
      //           return false;
      //         }
      //     }
      //   }
      // }
      // if(this.form.collType==7){
      //   if(this.form.orgId===""){
      //     this.$message.warning("所属组织不能为空");
      //     return false;
      //   }
      // }

      // if(!this.form.payProveAttach){
      //     this.$message.warning("支付证明表不能为空");
      //     return false;
      // }
      //  if(!this.form.collMoney){
      //     this.$message.warning("支付金额不能为空");
      //     return false;
      // }else{
      //   if(!parseFloat(this.form.collMoney)){
      //      this.$message.warning("请输入正确的数字");
      //     return false;
      //   }
      // }
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$emit("getFormData", this.$myfunction.copyData(this.form));
          this.dialogClose();
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    }
  }
};
</script>

<style scoped></style>
