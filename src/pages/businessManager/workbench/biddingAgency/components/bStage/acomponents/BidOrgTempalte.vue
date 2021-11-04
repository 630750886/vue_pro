<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">新增</el-button>
    <div>
      <el-table :data="data" stripe :show-header="false" border>
        <el-table-column prop="name" min-width="100px" align="left">
          <template slot-scope="scope"> 单位名称：{{ scope.row }} </template>
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
          <el-form-item label="单位名称">
            <rea-query-input
              v-model="form.name"
              url="/pro/tabiddingfilesalelist/findwhere"
              filter-key="companyname"
              :filter-obj="{ fileSalekeyid: filterKeyid }"
            ></rea-query-input>
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
    filterKeyid: [String],
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
        name: ""
      },
      formRules: {}
    };
  },

  //自定义函数节点
  methods: {
    remObj(index) {
      this.data.splice(index, 1);
      this.$emit("getData", this.$myfunction.copyData(this.data));
    },
    submitData() {
      this.data.push(this.$myfunction.copyData(this.form.name));
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
