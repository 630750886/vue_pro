<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">新增</el-button>
    <div>
      <el-table :data="data" stripe :show-header="false" border>
        <el-table-column width="100px" align="right">
          单位名称
        </el-table-column>
        <el-table-column
          prop="signUpName"
          min-width="150px"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="附件"
          width="75px"
          align="right"
        ></el-table-column>
        <el-table-column prop="tenderFile" min-width="75px" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.tenderFile"></download-button>
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
          <el-form-item label="单位名称" prop="signUpName">
            <rea-query-input
              v-model="form.signUpName"
              url="/pro/tabiddingfilesalelist/findwhere"
              filter-key="companyname"
              :filter-obj="{ fileSalekeyid: filterKeyid }"
            ></rea-query-input>
          </el-form-item>
          <el-form-item label="附件" prop="tenderFile">
            <upload-button v-model="form.tenderFile"></upload-button>
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
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  props: {
    title: { type: String },
    filterKeyid: [String],
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
  created() {
    this.networkGetOrgAndPost();
  },
  mounted() {
    this.data = this.model;
  },
  watch: {
    model(newValue) {
      this.data = newValue;
    },
    vuexOrganizeList(newValue) {
      this.organizeList = newValue;
    }
  },
  computed: {
    ...mapState("loadType", {
      vuexOrganizeList: "organizeList"
    })
  },
  //数据节点
  data() {
    return {
      isContent: false,

      data: [],
      dialogVisible: false,
      form: {
        signUpName: "",
        tenderFile: ""
      },
      formRules: {},
      organizeList: []
    };
  },

  //自定义函数节点
  methods: {
    ...mapActions("loadType", {
      networkGetOrgAndPost: "networkGetOrgAndPost"
    }),
    remObj(index) {
      let ref = this.data.splice(index, 1);
      if (!this.$myfunction.isEmpty(ref[0].keyid)) {
        this.$emit("removeData", this.$myfunction.copyData(ref[0]));
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
      this.removeData = this.$options.data().removeData;
    }
  }
};
</script>
<style lang="less" scoped></style>
