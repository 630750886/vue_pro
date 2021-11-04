<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="formRef" label-width="110px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="费用大类" prop="typeClassId_Name">
              <el-select
                v-model="form.typeClassId_Select"
                placeholder="请选择"
                @change="showChange"
              >
                <el-option
                  v-for="item in typeClass_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="归属部门" prop="deptName">
              <el-input v-model="form.tables.deptName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="form.tables.projectName" clearable></el-input>
            </el-form-item>
            <el-form-item label="合同名称" prop="contractName">
              <el-input v-model="form.tables.contractName" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>费用子项</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="addItem()"
                  >添 加</el-button
                >
              </div>
              <div
                v-for="(item, index) in form.tables.detail"
                :key="index"
                class="demo-form-inline"
              >
                <el-row :gutter="20" style="margin-top:8px">
                  <el-col :span="8">
                    <el-cascader
                      v-model="item.typeClassName"
                      :props="optionProps"
                      :options="form.typeClassId_Options"
                      @change="
                        val => {
                          handleChange(val, index);
                        }
                      "
                    ></el-cascader>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="item.expense" clearable></el-input>
                  </el-col>
                  <el-col
                    :span="8"
                    style="font-size:22px;text-align:center;line-height:15px"
                  >
                    <!-- <i
                        class="el-icon-circle-plus-outline"
                        @click="addItem()"
                      ></i> -->
                    <i
                      class="el-icon-remove-outline"
                      @click="removeItem(index)"
                    ></i>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关 闭</el-button>
      <el-button @click="$emit('submitFormData')">提 交</el-button>
    </div> -->
      <dialog-button
        reset-btn="false"
        ok-btn="提 交"
         :cancelBtn="{show:false}"
        @okBtn="submitFormData"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
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
  //数据节点
  data() {
    return {
      activeNames: "1",
      dialogVisible: false,
      typeClass_options: [
        { label: "投标费用", value: "ReimbursReimbursement_bid" },
        { label: "业务费用", value: "Reimbursement_Business" },
        { label: "部门费用", value: "Reimbursement_dept" },
        { label: "公司费用", value: "Reimbursement_commpany" },
        { label: "刘总费用", value: "Reimbursement_liu" },
        { label: "陈总费用", value: "Reimbursement_zheng" }
      ],
      optionProps: {
        value: "keyid",
        label: "label",
        children: "children"
      },
      form: {
        tables: {
          typeClassId_Name: "",
          typeClassId: "",
          deptName: "",
          projectName: "",
          projectId: "",
          contractName: "",
          contractId: "",
          detail: []
        },
        typeClassId_Select: {},
        typeClassId_Options: []
      },
      formRules: {}
    };
  },
  //生命周期函数节点
  created() {
    //console.log(this.signs);
  },
  mounted() {
    //console.log(this.currentUser);
  },
  computed: {
    ...mapGetters({
      attachpath: "flowManager/attachmentUploadStr"
    }),
    ...mapState({
      myfilter: state => state.loadType
    })
  },
  //自定义函数节点
  methods: {
    ...mapActions({
      GetAttachment: "flowManager/networkGetAttachment"
    }),
    showChange(sel) {
      this.form.tables.typeClassId_Name = sel.label;
      this.form.tables.typeClassId = sel.value;

      this.form.typeClassId_Options = this.myfilter[
        this.form.tables.typeClassId
      ].list;
      this.form.tables.detail = [];
      //this.form.tables.detail.push({});
      //console.log(this.form);
    },
    openDialog() {
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.$refs.formRef.resetFields();
    },
    addItem() {
      if (this.form.tables.typeClassId == "") {
        this.$message.warning("请先选择费用大类！！！");
      } else {
        this.form.tables.detail.push({ typeClassName: [], expense: 0 });
        // this.activeNames = "1";
      }
    },
    removeItem(index) {
      this.form.tables.detail.splice(index, 1);
    },
    handleChange(ops, index) {
      //console.log(this.form.tables.detail);
    },
    attachUp() {
      this.GetAttachment();
    },

    checkValid() {
      if (this.form.documentName == "") {
        this.$message.info("文件名称不能为空");
        return false;
      }
      if (this.form.contentDesc == "") {
        this.$message.info("文件描述不能为空");
        return false;
      }
      let attpath = this.attachpath;

      let keys = Object.keys(attpath);
      if (keys.length == 0) {
        this.$message.info("附件不能为空");
        return false;
      }
      return true;
    },
    submitFormData() {
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    }
  }
};
</script>
<style lang="less" scoped></style>
