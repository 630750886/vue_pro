<template>
  <div>
    <el-dialog
      title="投标报名费"
      :visible.sync="dialogVisible"
       v-if="dialogVisible"
      :width="width"
      @close="dialogClose"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="formRef" label-width="110px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="报销申请表">
              <upload-button v-model="form.fileAttach"></upload-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报销证明">
              <upload-button v-model="form.proveAttach"></upload-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="2"
                v-model="form.mark"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>费用项</span>
                <span style="margin-left: 40px">费用合计(元):{{ sumAll }}</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="addItem()"
                  >添 加</el-button
                >
              </div>
              <div
                v-for="(item, index) in form.tables"
                :key="index"
                class="demo-form-inline"
              >
                <el-row :gutter="20" style="margin-top: 8px">
                  <el-col :span="12">
                    <el-form-item label="费用类别">
                      <el-cascader
                        v-model="item.selectedAll"
                        :props="optionProps"
                        :options="typelist"
                        style="width:260px"
                        :show-all-levels="false"
                        @change="
                          val => {
                            handleChange(val, item);
                          }
                        "
                      ></el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="费用(元)">
                      <el-input v-model="item.expense" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <template v-if="item.totalClass === '业务费用'">
                  <el-row :gutter="20" style="margin-top: 8px">
                    <el-col :span="12">
                      <el-form-item label="合同编号">
                        <rea-query-input
                          v-model="item.contractId"
                          url="agr/busicontractbase/findall"
                          filter-obj="{}"
                          filter-key="contractCode"
                          @getObject="
                            it => {
                              item.contractName = it.contractName;
                            }
                          "
                        ></rea-query-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="合同名称">
                        <el-input
                          v-model="item.contractName"
                          readonly
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20" style="margin-top: 8px">
                    <el-col :span="12">
                      <el-form-item label="项目编号">
                        <rea-query-input
                          v-model="item.projectId"
                          url="pro/cmbaseproject/findwhere"
                          filter-key="projectCode"
                          :filter-obj="{ contractCode: item.contractId }"
                          @getObject="
                            it => {
                              item.projectName = it.projectName;
                            }
                          "
                        ></rea-query-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="项目名称">
                        <el-input
                          v-model="item.projectName"
                          readonly
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </template>
                <template v-if="item.totalClass === '部门费用'">
                  <el-row :gutter="20" style="margin-top: 8px">
                    <el-col :span="12">
                      <el-form-item label="所属组织">
                        <el-cascader
                          v-model="item.orgId"
                          :props="optionProps_org"
                          :options="orgTree"
                          style="width:260px"
                          :show-all-levels="false"
                          @change="
                            val => {
                              handleChange_org(val, item);
                            }
                          "
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </template>
                <template v-if="item.totalClass === '投标费用'">
                  <el-row :gutter="20" style="margin-top: 8px">
                    <el-col :span="12">
                      <el-form-item label="项目名称">
                        <rea-query-input
                          v-model="item.projectName"
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
                    <el-col :span="12">
                      <el-form-item label="所属组织">
                        <el-cascader
                          v-model="item.orgId"
                          :props="optionProps_org"
                          :options="orgTree"
                          style="width:260px"
                          :show-all-levels="false"
                          @change="
                            val => {
                              handleChange_org(val, item);
                            }
                          "
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </template>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-form>
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
    UploadButtonle: {},
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
      totalClass111: "",
      optionProps: {
        value: "keyid",
        label: "label",
        children: "children",
        emitPath: true
      },
      optionProps_org: {
        value: "keyid",
        label: "label",
        children: "children",
        emitPath: false
      },

      form: {
        tables: []
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
    ...mapState({
      typelist: state => state.shareManager.typeList,
      orgTree: state => state.loadType.organizeList
    }),
    sumAll() {
      let sums = this.form.tables.reduce((sum, n) => {
        return parseFloat(sum) + parseFloat(n.expense);
      }, 0);
      return sums;
    }
  },
  //自定义函数节点
  methods: {
    showChange(sel) {
      this.form.tables.typeClassId_Name = sel.label;
      this.form.tables.typeClassId = sel.value;

      this.form.typeClassId_Options = this.myfilter[
        this.form.tables.typeClassId
      ].list;
      this.form.tables.detail = [];
    },
    openDialog(val) {
      this.form = val;
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.$refs.formRef.resetFields();
    },
    addItem() {
      this.form.tables.push({ expense: 0, totalClass: "" });
    },
    removeItem(index) {
      this.form.tables.splice(index, 1);
    },
    handleChange(ops, item) {
      let that = this;
      that.$myfunction.findStr(this.typelist, ops[0]);
      let pt = localStorage.getItem("findStr");
      item.totalClass = pt;
      let selected = ops.map(e => {
        that.$myfunction.findStr(this.typelist, e);
        let fs = localStorage.getItem("findStr");
        return { keyid: e, name: fs };
      });
      item.selectedItem = selected;
    },
    handleChange_org(val, item) {
      this.$myfunction.findStr(this.orgTree, val);
      let pt = localStorage.getItem("findStr");
      console.log(pt);
      item.orgName = pt;
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
      if (this.form.tables.length == 0) {
        this.$message.error("报销明细项不能为空!!!");
        return;
      }
      this.form.sumall = this.sumAll;

      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    }
  }
};
</script>
<style lang="less" scoped></style>
