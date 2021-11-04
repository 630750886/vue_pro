<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
      <el-tree
        :data="form.authorizejob"
        :props="defaultProps"
        default-expand-all
        show-checkbox
        check-strictly
        node-key="keyid"
        ref="treeRef"
        :filter-node-method="
          (value, data, node) => {
            if (data.authflage === true) {
              node.checked = true;
            }
          }
        "
        :default-checked-keys="defaultChecked"
        @check="checkClick"
      >
      </el-tree>
      <dialog-button
        :reset-btn="{ show: false }"
         :cancelBtn="{show:false}"
        ok-btn="保 存"
        @cancelBtn="dialogClose"
        @okBtn="submitFormData"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import {
  getPostPower,
  upPostPower
} from "../../../../../api/webapi-postPower.js";

export default {
  components: {},
  props: {
    title: { Type: String },
    width: { Type: Number }
  },
  watch: {
    "form.job": function(newValue) {
      getPostPower(newValue).then(item => {
        this.form.authorizejob = item.data;
        this.defaultChecked = [];
      });
    }
  },
  //数据节点
  data() {
    return {
      dialogVisible: false,
      postKeyid: "",
      defaultChecked: [],
      form: {
        job: {},
        authorizejob: []
      },
      defaultProps: {
        children: "children",
        label: (data, node) => {
          if (data.authflage) {
            node.checked = true;
          }
          return data.name;
        }
      }
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    openDialog(data) {
      if (data) {
        this.form.job = this.$myfunction.copyData(data);
      }
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    submitFormData() {
      upPostPower(this.form).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
        }
      });
      //this.dialogClose()
    },
    resetForm() {
      this.form = this.$options.data().form;
    },

    checkClick(data, node) {
      if (node.checkedKeys.indexOf(data.keyid) !== -1) {
        //选中本节点及所有父节点
        data.authflage = true;
        const _this = this;
        function addNode(keyid) {
          let no = _this.$refs.treeRef.getNode(keyid);
          no.checked = true;
          no.data.authflage = true;
          if (no.data.pkeyid !== "0000") {
            addNode(no.data.pkeyid);
          }
        }
        addNode(data.pkeyid);
      } else {
        //取消选中，则取消子节点的选中
        data.authflage = false;
        const _this = this;
        function delNode(array) {
          array.forEach(item => {
            let no = _this.$refs.treeRef.getNode(item.keyid);
            no.checked = false;
            no.data.authflage = false;
            if (item.children) {
              delNode(item.children);
            }
          });
        }
        delNode(data.children);
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
