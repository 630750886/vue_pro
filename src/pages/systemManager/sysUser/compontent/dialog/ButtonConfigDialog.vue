<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
      <div class="table">
        <el-table
          :data="dataList"
          style="width: 100%;font-size:10px;"
          align="center"
          :fit="true"
          height="7.5rem"
          border
          highlight-current-row
          :header-cell-style="{ fontSize: '14px' }"
        >
          <el-table-column
            prop="posName"
            label="按钮代码"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="orgName"
            label="按钮名称"
            align="center"
          ></el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            width="250"
          >
            <template slot-scope="scope">
              <delete-button :data="scope.row"></delete-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <dialog-button
        reset-btn="false"
         :cancelBtn="{show:false}"
        @okBtn="submitFormData"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
    <add-post-dialog
      ref="addPostRef"
      width="30%"
    ></add-post-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import AddPostDialog from "./AddPostDialog.vue";
export default {
  components: {
    AddPostDialog
  },
  props: {
    title: "",
    width: {
      type: String,
      default: "50%"
    }
  },
  watch: {},
  //数据节点
  data() {
    return {
      show: true,
      dialogVisible: false,
      dataList: []
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    submitFormData: function() {
      this.$refs.formRef.validate(valid => {
        if (!valid) return;
      });
    },
    dialogClose() {
      this.dialogVisible = false;
      this.form = this.$options.data().form;
    },
    openDialog(data) {
      if (!this.$myfunction.isEmpty(data)) {
        this.dataList = data;
      }
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="less" scoped></style>
