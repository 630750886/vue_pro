<template>
    <el-dialog :visible.sync="dialogVisible" width="55%" :title="title1" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="220px">
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
                item => {
                  //form.agreementkeyid = item.keyid;
                  //form.contractItem=item;
                  form.contract_name = item.contractName;
                  form.contractId = item.contractCode;
                }
              "
            ></rea-query-input>
          </el-form-item>
  
          <el-form-item label="合同名称" prop="contract_name">
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
                <el-form-item label="项目名称">
                  <rea-query-input
                    v-model="form.project_name"
                    url="tender/tenderinfo/findall"
                    filter-obj="{}"
                    filter-key="projectname"
                    @getObject="
                      item => {
                        //form.project_name = item.projectName;
                      }
                    "
                  ></rea-query-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <template v-if="form.depositType == '招标'">
            <el-row>
              <el-col :span="12">
                <el-form-item label="合同编号" prop="contractCode">
                  <rea-query-input
                    v-model="form.contractId"
                    url="agr/busicontractbase/findall"
                    filter-obj="{}"
                    filter-key="contractCode"
                    @getObject="
                      item => {
                        form.contract_name = item.contractName;
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
            <el-row>
              <el-col :span="12">
                <el-form-item label="项目编号">
                  <rea-query-input
                    v-model="form.projectId"
                    url="pro/cmbaseproject/findwhere"
                    filter-key="projectCode"
                    :filter-obj="{ contractCode: form.contractId }"
                    @getObject="
                      item => {
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
            </el-row>
          </template>
        </div>
  
        <div v-if="form.collType == 7">
          <el-form-item label="所属组织">
            <rea-cascader
              v-model="form.orgId"
              :data="typeList.organizeList"
              @getLabel="
                item => {
                  form.orgName = item;
                }
              "
            ></rea-cascader>
          </el-form-item>
        </div>
        <el-form-item label="支付证明表">
          <upload-button v-model="form.payProveAttach"></upload-button>
        </el-form-item>
        <el-form-item label="支付申请表">
          <upload-button v-model="form.payApplyAttach"></upload-button>
        </el-form-item>
        <rea-divider title="填写支付信息"></rea-divider>
        <el-form-item label="账户名" prop="bankAccout">
          <el-input v-model="form.bankAccout"></el-input>
        </el-form-item>
        <el-form-item label="账户开户行" prop="bank">
          <el-input v-model="form.bank"></el-input>
        </el-form-item>
        <el-form-item label="账户号" prop="bankAccoutId">
          <el-input v-model="form.bankAccoutId"></el-input>
        </el-form-item>
        <el-form-item label="支付金额(元)" prop="collMoney">
          <el-input v-model="form.collMoney"></el-input>
        </el-form-item>
        <!-- <el-form-item label="递交截至时间" prop="cutoffTime">
                      <el-data-picker-template type="datetime" v-model="form.cutoffTime" value-type="yyyy/MM/DD HH:mm" format="yyyy/MM/DD HH:mm"></el-data-picker-template>
                  </el-form-item>
                  <el-form-item label="附言或用途" prop="remark">
                      <el-textarea-template v-model="form.remark"></el-textarea-template>
  
                  </el-form-item> -->
      </el-form>
  
      <dialog-button
        :resetBtn="{ show: false }"
        :cancelBtn="{show:false}"
        okBtn="确 定"
        @okBtn="submitFormData"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
  </template>
  
  <script>
  import { mapState } from "vuex";
  
  export default {
    components: {
    },
    props: {
      title: {
        type: String,
        dealt: ""
      }
    },
    watch: {
      title(newValue) {
        this.title = newValue;
      }
    },
    mounted() {
      //console.log('orgList');
      //console.log(this.typeList);
    },
    data: function() {
      return {
        //父窗口传递的弹窗标题
        title1: this.title,
        //弹窗显示控制
        dialogVisible: false,
        //类型
        depositTypeOptions: [
          { id: "招标", name: "招标" },
          { id: "投标", name: "投标" }
        ],
        //缴纳类型
        paymentTypeOptions: [
          //风险（履约）保证金、投标保证金、其他往来款
          {
            id: 5,
            name: "风险（履约）保证金"
          },
          {
            id: 6,
            name: "投标保证金"
          },
          {
            id: 7,
            name: "其他往来款"
          }
        ],
        //合同编号集
        contractNumOptions: [],
        //上传按钮显示控制
        showUpload: false,
        //文件列表
        fileList: [
          {
            name: "food.jpeg",
            url:
              "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
          }
        ],
  
        fileList2: [],
        //系统表单对象
        form: {
          // paymentType: '',
          // projectType:'',
          // contractNum:'',
          // contractName:'',
          // projectName:'',
          // organization:'',
          // payType:'',
        },
        //表单验证规则
        formRules: {}
      };
    },
    computed: {
      ...mapState({
        typeList: "loadType"
      })
    },
    methods: {
      //文件上传相关
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${
            files.length
          } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        );
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
  
      //设置弹窗显示
      openDialog(forms) {
        this.form = forms;
        this.dialogVisible = true;
      },
      dialogClose() {
        this.dialogVisible = false;
        this.resetForm();
      },
      submitFormData() {
        this.$emit("getFormData", this.$myfunction.copyData(this.form));
        //this.$refs.formRef.resetFields();
        this.dialogClose();
      },
      resetForm() {
        this.$refs.formRef.resetFields();
      }
    }
  };
  </script>
  
  <style scoped></style>
  