<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">新增</el-button>
    <div>
      <el-table :data="data" stripe border>
        <el-table-column
          prop="publicitydateTime"
          label="发布日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="publicityWebName"
          label="发布公示网站"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="publicityImageFile"
          label="公示截图"
          align="center"
        >
          <template slot-scope="scope">
            <download-button
              :value="scope.row.publicityImageFile"
            ></download-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="publicityChangeImageFile"
          label="更正截图"
          align="center"
        >
          <template slot-scope="scope">
            <download-button
              :value="scope.row.publicityChangeImageFile"
            ></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="right" width="100px">
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
        width="400px"
        @close="dialogClose"
        :close-on-click-modal="false"
      >
        <el-form
          :model="form"
          ref="formRef"
          :rules="formRules"
          label-width="100px"
        >
          <el-form-item label="发布日期" prop="publicitydateTime">
            <rea-datepicker v-model="form.publicitydateTime"></rea-datepicker>
          </el-form-item>
          <el-form-item label="发布网站" prop="publicityWebName">
            <rea-query-input
              v-model="form.publicityWebName"
              url="/pro/tawebsite/findall"
              filter-obj="{}"
              filter-key="webSiteName"
            ></rea-query-input>
          </el-form-item>
          <el-form-item label="截图" prop="publicityImageFile">
            <upload-button v-model="form.publicityImageFile"></upload-button>
          </el-form-item>
          <el-form-item label="更正截图" prop="publicityChangeImageFile">
            <upload-button
              v-model="form.publicityChangeImageFile"
            ></upload-button>
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
    model: [Array, String],
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
    if (Array.isArray(this.model)) {
      this.data = this.model;
    } else if (this.model !== "") {
      this.data.push(this.model);
    }
  },
  watch: {
    model(newValue) {
      if (Array.isArray(newValue)) {
        this.data = newValue;
      } else if (newValue !== "") {
        this.data.push(newValue);
      }
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
        publicitydateTime: "",
        publicityWebName: "",
        publicityImageFile: "",
        publicityChangeImageFile: ""
      },
      formRules: {}
    };
  },

  //自定义函数节点
  methods: {
    remObj(index) {
      let delRef = this.data.splice(index, 1);
      if (!this.$myfunction.isEmpty(delRef[0].keyid)) {
        this.$emit("delData", this.$myfunction.copyData(delRef[0]));
      }
      this.$emit("getData", this.$myfunction.copyData(this.data));
    },
    submitData() {
      this.data.push(this.$myfunction.copyData(this.form));
      this.dialogClose();
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
