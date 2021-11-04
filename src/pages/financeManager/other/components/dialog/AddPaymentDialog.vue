<template>
  <el-dialog :visible.sync="dialogVisible" width="40%" title="" :close-on-click-modal="false">
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="20%">
      <!-- <el-form-item label="完税类型">
				<el-select-template v-model="form.type" :data="[{id:1,name:'月度'},{id:2,name:'年度'}]">
				</el-select-template>
			</el-form-item> -->
      <el-form-item label="所属公司" prop="commpanyId">
        <rea-select
          v-model="form.commpanyId"
          :data="commpanyList"
          label="commpanyName"
          prop="keyid"
        ></rea-select>
      </el-form-item>
      <el-form-item label="完税类型" v-show="title == '完税凭证'" prop="timeType">
        <el-select v-model="form.timeType" placeholder="请选择" @change="changeTime">
          <el-option
            v-for="item in Options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="label_form.label_time" prop="createTime">
        <el-date-picker
          v-model="form.createTime"
          :type="label_form.type"
          :value-format="label_form.v_format"
        >
        </el-date-picker>
        <!-- <rea-datepicker v-model="form.createTime" :type="label_form.type"></rea-datepicker> -->
      </el-form-item>
      <el-form-item :label="label_form.label_attr" prop="attachId">
        <upload-button v-model="form.attachId"></upload-button>
      </el-form-item>
    </el-form>
    <dialog-button
      resetBtn="false"
      :cancelBtn="{show:false}"
      ok-btn="新 建"
      @okBtn="submitFormData"
      @cancelBtn="dialogClose"
    ></dialog-button>
  </el-dialog>
</template>

<script>
import DialogButton from "../../../acomponents/DialogButton.vue";
import { mapState } from "vuex";

export default {
  components: {
    DialogButton,
  },
  props: {
    title: {
      type: String,
      dealt: "",
    },
    action: "",
    dataList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    title(newValue) {
      this.title1 = newValue;
      switch (newValue) {
        case "审计报告":
          this.label_form = {
            label_time: "审计年份",
            label_attr: "审计报告",
            type: "year",
            v_format: "yyyy",
          };
          break;
        case "完税凭证":
          this.label_form = {
            label_time: "完税时间",
            label_attr: "完税凭证",
            type: "year",
            v_format: "yyyy",
          };
          break;
        case "社保缴费凭证":
          this.label_form = {
            label_time: "缴纳时间",
            label_attr: "缴纳凭证",
            type: "month",
            v_format: "yyyy-MM",
          };
          break;
      }
    },
    dataList(newValue, oldvalue) {
      // console.log('newValue');
      // 	console.log(newValue);
      // 	console.log('oldValue');
      // 	console.log(oldvalue);
      // if(newValue===oldvalue){
      // 	console.log('same');
      // }else{
      // 	console.log('not same');
      // }
      //if(newValue)
    },
  },
  mounted() {
    //this.title=this.title1
    //console.log('commpanyList');
    //console.log(this.commpanyList);
  },
  data() {
    return {
      //父窗口传递的弹窗标题
      title1: "",
      //弹窗显示控制
      dialogVisible: false,
      //开票类型
      typeOptions: [
        //总公司、自营分公司、协议分公司、项目分公司
        { id: 1, name: "总公司" },
        { id: 2, name: "自营分公司" },
        { id: 3, name: "协议分公司" },
        { id: 4, name: "项目分公司" },
      ],
      values: "年度",
      Options: [
        {
          value: "年度",
          label: "年度",
        },
        {
          value: "月度",
          label: "月度",
        },
      ],
      //表单对象
      form: {
        attach_Type: "tax",
      },
      label_form: {},
      //表单验证规则
      formRules: {
        commpanyId: [
            { required: true, message: '请填写完整信息', trigger: 'blur' }
          ],
        createTime: [
            { required: true, message: '请填写完整信息', trigger: 'blur' }
          ],
        attachId: [
            { required: true, message: '请填写完整信息', trigger: 'blur' }
          ]
      },
    };
  },
  computed: {
    ...mapState({
      commpanyList: (state) => state.loadType.commpanyList,
    }),
    mylist() {
      return Object.assign({}, this.dataList);
    },
  },
  methods: {
    openDialog(val) {
      this.form = {};
      this.form.attach_Type = val;
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    submitFormData() {
      //console.log(this.form);
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
    changeTime(val) {
      //console.log(val);
      let mytype = "month";
      let vf = "yyyy-MM";
      if (val === "年度") {
        mytype = "year";
        vf = "yyyy";
      }

      this.label_form.type = mytype;
      this.label_form.v_format = vf;
    },
  },
};
</script>

<style scoped>
</style>
	