<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">新增</el-button>
    <div style="height: 350px">
      <el-table
        :data="data"
        stripe
        :show-header="false"
        highlight-current-row
        border
      >
        <el-table-column
          prop="projectJobName"
          min-width="75px"
          align="right"
        ></el-table-column>
        <el-table-column
          prop="projectPersonName"
          min-width="100px"
          align="left"
        ></el-table-column>
        <el-table-column  min-width="75px" align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.jobDesc !== ''">备注</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="jobDesc"
          min-width="100px"
          align="left"
        ></el-table-column>
        <el-table-column align="right" width="100px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="remObj(scope.$index)"
              >移除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <el-dialog
        :visible.sync="dialogVisible"
         v-if="dialogVisible"
        :append-to-body="true"
        width="300px"
        @close="dialogClose"
         :close-on-click-modal="false"
      >
        <el-form
          :model="form"
          ref="formRef"
          :rules="formRules"
          label-width="75px"
        >
          <el-form-item label="职务名称" prop="projectJobKeyid">
            <rea-select
              v-model="form.projectJobKeyid"
              :data="typeList"
              @getObject="
                item => {
                  form.projectJobName = item.listname;
                  form.projectJobNumber = parseInt(item.staticsCode);
                  isContent = item.isplanitemtime;
                }
              "
            ></rea-select>
          </el-form-item>
          <el-form-item label="人员名称" prop="projectPersonName">
            <rea-query-input
              v-model="form.projectPersonName"
              url="hr/basicinfo/autofindwhere"
              filter-obj="{}"
              filter-key="contextname"
              @getObject="
                item => {
                  form.projectPersonKeyid = item.keyid;
                }
              "
            ></rea-query-input>
          </el-form-item>
          <el-form-item
            v-if="isContent"
            :label="
              form.projectJobName === '其他人员' ? '工作备注' : '专业备注'
            "
            prop="jobDesc"
          >
            <rea-textarea v-model="form.jobDesc"></rea-textarea>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="submitData"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {
    title: { type: String },
    model: {
      type: Array,
      default: () => {
        return [];
      }
    },
    typeList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  model: {
    prop: "model",
    event: "getData"
  },
  //生命周期函数节点
  created() {},
  mounted() {
    this.data = this.model;
  },
  watch: {
    model(newValue) {
      this.data = newValue;
    }
  },
  computed: {},
  //数据节点
  data() {
    return {
      isContent: false,
      data: [],
      dialogVisible: false,
      form: {
        projectJobKeyid: "",
        projectJobName: "",
        projectJobNumber: 1,
        projectPersonKeyid: "",
        projectPersonName: "",
        projectPersonPhone: "",
        currStatus: "",
        jobDesc: ""
      },
      formRules: {
        projectJobKeyid:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
        projectPersonName:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
        jobDesc:[{ required: true, message: '请输入必填项', trigger: 'blur' }]
      }
    };
  },

  //自定义函数节点
  methods: {
    remObj(index) {
      this.data.splice(index, 1);
      this.$emit("getData", this.$myfunction.copyData(this.data));
    },
    submitData() {
       this.$refs.formRef.validate((valid) => {
          if (valid) {
              this.data.push(this.$myfunction.copyData(this.form));
              this.dialogClose();
          }else
          {
            this.$message.success("数据录入不完整!请确认!")
          }
         });
    },
    openDialog() {
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    resetForm() {
      this.form = this.$options.data().form;
    }
  }
};
</script>
<style lang="less" scoped></style>
