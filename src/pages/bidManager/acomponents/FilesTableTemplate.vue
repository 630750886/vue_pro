<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">新增</el-button>
    <div>
      <el-table :data="data" stripe :show-header="false" border>
        <el-table-column min-width="150px" align="left">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}次澄清及修改
          </template>
        </el-table-column>
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
          <el-form-item label="附件" prop="file">
            <upload-button v-model="form.file"></upload-button>
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
    title: { Type: String },
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
        file: ""
      },
      formRules: {
        file: [{ required: true, message: "请上传文件", trigger: "blur" }]
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
      this.$refs.formRef.validate(valid => {
        if (!valid) return;
        this.data.push(this.$myfunction.copyData(this.form.file));
        this.dialogClose();
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
