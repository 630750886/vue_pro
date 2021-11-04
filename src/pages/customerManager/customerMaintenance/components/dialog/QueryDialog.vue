<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width">
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="120px"
        :close-on-click-modal="false"
      >
        <el-form-item label="回访客户名称" prop="customerName">
          <el-input v-model="form.customerName" clearable></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="回访方式" prop="way">
              <rea-select
                v-model="form.way"
                prop="listname"
                :data="returnWay.list"
              ></rea-select>
            </el-form-item>
            <el-form-item label="回访类型" prop="types">
              <rea-select
                v-model="form.types"
                prop="listname"
                :data="returnTypes.list"
              ></rea-select>
            </el-form-item>
            <el-form-item label="回访年份" prop="returnTime">
              <rea-datepicker
                v-model="form.returnTime"
                type="year"
                placeholder="选择年"
              ></rea-datepicker>
            </el-form-item>
            <el-form-item label="业务类型" prop="business">
              <rea-select
                v-model="form.business"
                prop="listname"
                :data="serviceBusiness.list"
              ></rea-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="技术质量评价等级" prop="technologyQuality">
              <rea-select
                v-model="form.technologyQuality"
                prop="listname"
                :data="serviceLevel.list"
              ></rea-select>
            </el-form-item>
            <el-form-item label="服务质量评价等级" prop="serverQuality">
              <rea-select
                v-model="form.serverQuality"
                prop="listname"
                :data="serviceLevel.list"
              ></rea-select>
            </el-form-item>
            <el-form-item label="是否有投诉" prop="complaints">
              <com-truefalse v-model="form.complaints"></com-truefalse>
            </el-form-item>
            <el-form-item label="是否有表扬" prop="praise">
              <com-truefalse v-model="form.praise"></com-truefalse>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <dialog-button
        ok-btn="筛 选"
        :cancelBtn="{show:false}" 
        @resetBtn="resetForm"
        @cancelBtn="dialogClose"
        @okBtn="submitFormData"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("loadType");
export default {
  components: {},
  props: {
    title: { type: String },
    width: {
      type: String,
      default: "50%"
    }
  },
  watch: {},
  computed: {
    ...mapState({
      returnTypes: "returnTypes",
      returnWay: "returnWay",
      serviceBusiness: "serviceBusiness",
      organizeList: "organizeList",
      serviceLevel: "serviceLevel"
    })
  },
  //数据节点
  data() {
    return {
      dialogVisible: false,
      form: {
        customerName: "",
        way: "",
        types: "",
        returnTime: "",
        business: "",
        technologyQuality: "",
        serverQuality: "",
        complaints: "",
        praise: ""
      },
      formRules: {}
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
    },
    submitFormData() {
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    }
  }
};
</script>
<style lang="less" scoped></style>
