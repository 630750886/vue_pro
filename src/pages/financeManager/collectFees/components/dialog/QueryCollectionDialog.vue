<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="40%"
    :title="title"
    :close-on-click-modal="false"
  >
    <el-form :model="form" ref="formRef" label-width="20%">
      <el-form-item label="明细状态">
        <el-radio-group v-model="form.detail.value">
          <el-radio :label="'0'">未登记</el-radio>
          <el-radio :label="'1'">已登记</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="应收状态">
        <el-radio-group v-model="form.recive.value">
          <el-radio :label="'1'">已收</el-radio>
          <el-radio :label="'0'">未收</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="收款时间">
        <el-date-picker
          v-model="form.billTime_recive1.value"
          value-format="yyyy/MM/dd"
          type="date"
          placeholder="请选择日期"
        ></el-date-picker
        >-<el-date-picker
          v-model="form.billTime_recive2.value"
          value-format="yyyy/MM/dd"
          type="date"
          placeholder="请选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="退款时间">
        <el-date-picker
          v-model="form.billTime_back1.value"
          value-format="yyyy/MM/dd"
          type="date"
          placeholder="请选择日期"
        >
        </el-date-picker
        >-<el-date-picker
          v-model="form.billTime_back2.value"
          value-format="yyyy/MM/dd"
          type="date"
          placeholder="请选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="付款类型">
        <el-select v-model="form.payType.value" placeholder="请选择">
          <el-option label="公账" value="company"></el-option>
          <el-option label="现金" value="cash"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="付款人">
        <el-input placeholder="请输入" v-model="form.payer.value"></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input
          placeholder="请输入"
          v-model="form.createMan.value"
        ></el-input>
      </el-form-item>
      <el-form-item label="金额(元)">
        <el-input-number
          size="small"
          v-model="form.money1.value"
          :controls="false"
          style="width: 30%"
        ></el-input-number
        >-
        <el-input-number
          size="small"
          v-model="form.money2.value"
          :controls="false"
          style="width: 30%"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="收款类型">
        <el-select-template
          v-model="form.collType.value"
          :data="CollTypeOptions"
        >
        </el-select-template>
      </el-form-item>
      <el-form-item label="编号">
        <el-input
          placeholder="请输入"
          v-model="form.childCode.value"
        ></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input
          placeholder="请输入"
          v-model="form.childName.value"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否发生退款">
        <el-checkbox true-label="1" v-model="form.isBack.value" false-label=""
          >是</el-checkbox
        >
      </el-form-item>
    </el-form>

    <dialog-button
      reset-btn="false"
      okBtn="筛 选"
      @okBtn="submitFormData"
      :cancelBtn="{ show: false }"
      @cancelBtn="dialogClose"
    ></dialog-button>
  </el-dialog>
</template>

<script>
import DialogButton from '../../../acomponents/DialogButton.vue';
import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue';
export default {
  components: {
    DialogButton,
    ElSelectTemplate
  },
  props: {
    title: {
      type: String,
      dealt: '',
    }
  },
  watch: {
    title (newValue) {
      this.title = newValue;
    }
  },
  mounted () {},
  data: function () {
    return {
      // 父窗口传递的弹窗标题
      title1: this.title,
      // 弹窗显示控制
      dialogVisible: false,
      // 收款类型
      CollTypeOptions: [
        // 服务费、文件费、管理费、其他收款
        { id: 1, name: '服务费' },
        { id: 3, name: '文件费' },
        { id: 4, name: '管理费' },
        { id: 8, name: '其他收款' },
        { id: 5, name: '风险（履约）保证金' },
        { id: 6, name: '投标保证金' },
        { id: 7, name: '其他往来款' }
      ],
      // 表单对象
      form: {
        detail: {
          key: "detailStatus",
          value: "",
          ct: [1, 2],
          op: CekinFunction.equOP,
        },
        recive: {
          key: "reciveStatus",
          value: "",
          op: CekinFunction.equOP,
          ct: [4],
        },
        billTime_recive1: {
          key: 'reciveTime',
          value: '',
          op: CekinFunction.morethanequOP,
          ct: [1, 2, 4],
          types: "date",
        },
        billTime_recive2: {
          key: 'reciveTime',
          value: '',
          op: CekinFunction.lessthanequOP,
          ct: [1, 2, 4],
          types: 'date',
        },
        billTime_back1: {
          key: 'backTime',
          value: '',
          op: CekinFunction.morethanequOP,
          ct: [1, 2],
          types: "date",
        },
        billTime_back2: {
          key: 'backTime',
          value: '',
          op: CekinFunction.lessthanequOP,
          ct: [1, 2],
          types: "date",
        },
        payType: {
          key: "sumType",
          value: "",
          op: CekinFunction.equOP,
          ct: [1, 2],
        },
        payer: {
          key: "payer",
          value: "",
          op: CekinFunction.equOP,
          ct: [1, 2],
        },
        createMan: {
          key: 'createBy_name',
          value: '',
          op: CekinFunction.equOP,
          ct: [1, 2, 4]
        },
        money1: {
          key: 'sumMoney',
          value: '',
          op: CekinFunction.morethanequOP,
          ct: [1, 2, 4],
          types: "int",
        },
        money2: {
          key: 'sumMoney',
          value: '',
          op: CekinFunction.lessthanequOP,
          ct: [1, 2, 4],
          types: "int",
        },
        collType: {
          key: "collType",
          value: "",
          op: CekinFunction.equOP,
          ct: [1, 2],
        },
        childCode: {
          key: "contractId",
          value: "",
          op: CekinFunction.equOP,
          ct: [1, 2],
        },
        childName: {
          key: "contract_name",
          value: "",
          op: CekinFunction.equOP,
          ct: [1, 2],
        },
        isBack: {
          key: "isBack",
          value: "",
          op: CekinFunction.equOP,
          ct: [1, 2],
        },
      }
    };
  },

  methods: {
    // 设置弹窗显示
    openDialog () {
      this.dialogVisible = true;
      this.$nextTick(()=>{
        this.form={
        detail: {
          key: "detailStatus",
          value: "",
          ct: [1, 2],
          op: CekinFunction.equOP,
        },
        recive: {
          key: "reciveStatus",
          value: "",
          op: CekinFunction.equOP,
          ct: [4],
        },
        billTime_recive1: {
          key: 'reciveTime',
          value: '',
          op: CekinFunction.morethanequOP,
          ct: [1, 2, 4],
          types: "date",
        },
        billTime_recive2: {
          key: 'reciveTime',
          value: '',
          op: CekinFunction.lessthanequOP,
          ct: [1, 2, 4],
          types: 'date',
        },
        billTime_back1: {
          key: 'backTime',
          value: '',
          op: CekinFunction.morethanequOP,
          ct: [1, 2],
          types: "date",
        },
        billTime_back2: {
          key: 'backTime',
          value: '',
          op: CekinFunction.lessthanequOP,
          ct: [1, 2],
          types: "date",
        },
        payType: {
          key: "sumType",
          value: "",
          op: CekinFunction.equOP,
          ct: [1, 2],
        },
        payer: {
          key: "payer",
          value: "",
          op: CekinFunction.equOP,
          ct: [1, 2],
        },
        createMan: {
          key: 'createBy_name',
          value: '',
          op: CekinFunction.equOP,
          ct: [1, 2, 4]
        },
        money1: {
          key: 'sumMoney',
          value: '',
          op: CekinFunction.morethanequOP,
          ct: [1, 2, 4],
          types: "int",
        },
        money2: {
          key: 'sumMoney',
          value: '',
          op: CekinFunction.lessthanequOP,
          ct: [1, 2, 4],
          types: "int",
        },
        collType: {
          key: "collType",
          value: "",
          op: CekinFunction.equOP,
          ct: [1, 2],
        },
        childCode: {
          key: "contractId",
          value: "",
          op: CekinFunction.equOP,
          ct: [1, 2],
        },
        childName: {
          key: "contract_name",
          value: "",
          op: CekinFunction.equOP,
          ct: [1, 2],
        },
        isBack: {
          key: "isBack",
          value: "",
          op: CekinFunction.equOP,
          ct: [1, 2],
        },
      }
      })
    },
    dialogClose () {
      this.dialogVisible = false;
      this.resetForm();
    },
    submitFormData () {
      const keys = Object.keys(this.form);
      const queryForm = keys.map((s) => {
        return this.form[s];
      });
      // console.log('queryForm');
      // console.log(queryForm); this.$myfunction.copyData(queryForm)
      var myfilterData = this.$myfunction.deepClone(queryForm);
      // console.log(myfilterData);
      this.$emit("getFormData", myfilterData);
      this.dialogClose();
    },
    resetForm () {
      this.$refs.formRef.resetFields();
    }
  }
};
</script>
<style scoped></style>
