<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="50%"
    :title="title"
    :close-on-click-modal="false"
  >
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <span slot="label"
              ><i class="el-icon-circle-plus-outline" @click="addBill"></i
              >发票构成:</span
            >
          </el-form-item>
        </el-col>
      </el-row>

      <template v-for="(item, index) in form.billList">
        <el-row :key="index">
          <el-col :span="12">
            <el-form-item
              label="开票金额(元)"
              :prop="'billList.' + index + '.money'"
              :rules="[
                { required: true, message: '金额为必选项', trigger: 'blur' },
              ]"
            >
              <el-input v-model="item.money"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="开票类型"
              :prop="'billList.' + index + '.categoryType'"
              :rules="[
                {
                  required: true,
                  message: '开票类型为必选项',
                  trigger: 'blur',
                },
              ]"
            >
              <el-select-template
                v-model="item.categoryType"
                :data="typeOptions"
              >
              </el-select-template>
            </el-form-item>
          </el-col>
        </el-row>

        <template
          v-if="
            item.categoryType == 1 ||
            item.categoryType == 2 ||
            item.categoryType == 3
          "
        >
          <el-row :key="index">
            <el-col :span="12">
              <el-form-item
                label="合同编号"
                :prop="'billList.' + index + '.contractId'"
                :rules="[
                  {
                    required: true,
                    message: '合同编号为必选项',
                    trigger: 'blur',
                  },
                ]"
              >
                <rea-query-input
                  v-model="item.contractId"
                  url="agr/busicontractbase/findall"
                  filter-obj="{}"
                  filter-key="contractCode"
                  @getObject="
                    (tt) => {
                      //form.agreementkeyid = item.keyid;
                      item.contractName = tt.contractName;
                      item.contractId = tt.contractCode;
                      item.orgName =
                        tt.allSysOrgName.split('/')[
                          tt.allSysOrgName.split('/').length - 1
                        ];
                    }
                  "
                ></rea-query-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同名称">
                <el-input v-model="item.contractName" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <!-- 选择后二 -->
        <template v-if="item.categoryType == 4 || item.categoryType == 8">
          <el-row :key="index">
            <el-col :span="24">
              <el-form-item
                label="所属组织"
                :prop="'billList.' + index + '.orgId'"
                :rules="[
                  {
                    required: true,
                    message: '所属组织为必选项',
                    trigger: 'blur',
                  },
                ]"
              >
                <rea-cascader
                  v-model="item.orgId"
                  :data="orgTree"
                  :props="optionProps"
                  @getLabel="
                    (s) => {
                      item.orgName = s.split('/')[s.split('/').length - 1];
                    }
                  "
                ></rea-cascader>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </template>

      <el-row>
        <el-col :span="12">
          <el-form-item label="付款单位全称" prop="payer">
            <el-input v-model="form.payer"></el-input>
          </el-form-item>
          <el-form-item
            label="开票日期"
            prop="billTime"
            v-if="form.billload == 'reg'"
          >
            <rea-datepicker v-model="form.billTime"></rea-datepicker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开票总金额(元)">
            {{ sumAll }}
            <!-- <query-input  v-model="form.sumAll"></query-input> -->
          </el-form-item>
          <el-form-item
            label="发票号"
            prop="billNo"
            v-if="form.billload == 'reg'"
          >
            <el-input v-model="form.billNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="上传发票扫描件"
        v-if="form.billload == 'reg'"
        prop="billAttach"
      >
        <upload-button v-model="form.billAttach"></upload-button>
      </el-form-item>
      <el-form-item
        label="上传开票信息"
        v-if="form.billload == 'app'"
        prop="openBillAttach"
      >
        <upload-button v-model="form.openBillAttach"></upload-button>
      </el-form-item>
      <el-form-item label="支付证明" v-if="form.billload == 'app'">
        <upload-button v-model="form.payProveAttach"></upload-button>
      </el-form-item>
    </el-form>

    <dialog-button
      resetBtn="false"
      ok-btn="登 记"
      :cancelBtn="{ show: false }"
      @okBtn="submitFormData"
      @cancelBtn="dialogClose"
    ></dialog-button>
  </el-dialog>
</template>

<script>
import DialogButton from '../../../acomponents/DialogButton.vue';
import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue';
import QueryInput from '../../../acomponents/QueryInput.vue';
import uploadDialog from '../dialog/uploadDialog.vue';

import { mapState } from 'vuex';

export default {
  components: {
    DialogButton,
    ElSelectTemplate,
    QueryInput,
    uploadDialog,
  },
  props: {
    title: {
      type: String,
      dealt: '',
    },
    action: {},
  },
  watch: {
    title (newValue) {
      this.title1 = newValue;
    },
  },
  mounted () {
    // this.title=this.title1
  },

  data () {
    return {
      // 父窗口传递的弹窗标题
      title1: '',
      optionProps: {
        value: 'keyid',
        label: 'label',
        children: 'children',
        emitPath: false,
      },
      ppa: [],
      poa: [],
      pba: [],
      // 弹窗显示控制
      dialogVisible: false,
      num: 1,
      // 开票类型
      typeOptions: [
        // 服务费、中标服务费、文件费、管理费、其他收款
        { id: 1, name: '服务费' },
        { id: 3, name: '文件费' },
        { id: 4, name: '管理费' },
        { id: 8, name: '其他收款' },
      ],
      // 表单对象
      form: {
        billList: [
          {
            categoryType: 0,
            money: 0,
            contractId: '',
            contractName: '',
            orgId: '',
          },
        ],
        sumMoney: 0
      },
      // 表单验证规则
      formRules: {
        payer: [
          { required: true, message: "付款单位为必填项", trigger: "blur" },
        ],
        billTime: [
          { required: true, message: "开票时间为必选项", trigger: "blur" },
        ],
        // money:[{ required: true, message: '金额为必选项', trigger: 'blur' }],
        // orgId:[{ required: true, message: '组织为必填项', trigger: 'blur' }],
        billNo: [
          { required: true, message: "发票号为必填项", trigger: "blur" },
        ],
        billAttach: [
          {
            required: true,
            message: "上传发票扫描件为必填项",
            trigger: "blur",
          },
        ],
        openBillAttach: [
          {
            required: true,
            message: "上传开票扫描件为必填项",
            trigger: "blur",
          },
        ],
        // categoryType:[{ required: true, message: '开票类型为必填项', trigger: 'blur' }],
        // contractId:[{ required: true, message: '合同编号为必填项', trigger: 'blur' }]
      },
    };
  },
  computed: {
    sumAll: function () {
      const sumall = this.form.billList.reduce((sums, n) => {
        return parseFloat(sums) + parseFloat(n.money);
      }, 0);
      this.form.sumMoney = sumall;
      return sumall;
    },
    ...mapState({
      orgTree: (state) => state.loadType.organizeList, // state.orgAndPost.orgTree
    }),
  },
  methods: {
    openDialog (forms) {
      (this.form = {
        billList: [
          {
            categoryType: 0,
            money: 0,
            contractId: '',
            contractName: '',
            orgId: '',
          },
        ],
        sumMoney: 0,
        billAttach: '',
        openBillAttach: '',
        payProveAttach: '',
      }),
      (this.form = Object.assign(this.form, forms));
      // this.form.billList=[];
      this.dialogVisible = true;
      // 第一次加载会得不到值 this.$refs.formRef为undefined，原因在于render
      // 	 if(this.$refs.formRef){
      // this.$refs.formRef.resetFields();
      // 	 }
    },
    dialogClose () {
      this.dialogVisible = false;
      this.resetForm();
    },
    addBill () {
      this.form.billList.push({
        categoryType: 0,
        money: 0,
        contractId: '',
        contractName: '',
        orgId: '',
      });
    },
    submitFormData () {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$emit('getFormData', this.$myfunction.copyData(this.form));
          this.dialogClose();
        } else {
          this.$message.success('数据录入完不完整!请确认!');
        }
      });
    },
    resetForm () {
      this.$refs.formRef.resetFields();
    },
  },
};
</script>

<style scoped></style>
