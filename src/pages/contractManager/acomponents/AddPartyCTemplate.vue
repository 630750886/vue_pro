<template>
  <div>
    <public-button classhd="hd" :plain="true" type="primary" icon="el-icon-plus" @click="dialogVisible = true" name="FREE" title=新增></public-button>
    <div>
      <el-table :data="data" stripe :show-header="false" border>
        <el-table-column prop="name" min-width="100px" align="left">
          <template slot-scope="scope"> 名称：{{ scope.row }} </template>
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
          <el-form-item label="名称" prop="name">
            <rea-query-input
              v-if="isSelectCustomerName"
              v-model="form.name"
              url="crm/consumer/autofindwhere"
              filter-obj="{}"
              filter-key="contextname"
            ></rea-query-input>
            <el-input v-else v-model="form.name"></el-input>
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
    isSelectCustomerName: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
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
    this.data = this.model;
  },
  watch: {
    model(newValue) {
      if (Array.isArray(newValue)) {
        this.data = newValue;
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
<style lang="less" scoped>
</style>
