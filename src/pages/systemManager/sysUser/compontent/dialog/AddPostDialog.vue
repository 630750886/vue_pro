<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="所属组织" prop="orgId">
          <rea-cascader
            v-model="form.orgId"
            :data="organizeList"
            prop="keyid"
            label="label"
            checkStrictly
            @getLabel="
              item => {
                form.orgName = item;
              }
            "
          ></rea-cascader>
        </el-form-item>
        <el-form-item label="岗位名称" prop="posId">
          <rea-select
            v-model="form.posId"
            :data="getPostList(form.orgId)"
            @getLabel="
              item => {
                form.posName = item;
              }
            "
            prop="keyid"
            label="posName"
          ></rea-select>
        </el-form-item>
      </el-form>
      <dialog-button
        reset-btn="false"
         :cancelBtn="{show:false}"
        @okBtn="submitFormData"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import { getOrgTree, getPost } from "../../../../../api/webapi-sys.js";
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
      dialogVisible: false,
      form: {
        orgId: "",
        orgName: "",
        posId: "",
        posName: ""
      },
      formRules: {
        orgId: [
          {
            required: true,
            message: "必填",
            trigger: "blur"
          }
        ],
        posId: [
          {
            required: true,
            message: "必填",
            trigger: "blur"
          }
        ]
      },
      organizeList: [],
      positionList: []
    };
  },
  //生命周期函数节点
  created() {
    getOrgTree({ keyid: "0000" }).then(item => {
      this.organizeList = item.data;
    });
    getPost().then(item => {
      this.positionList = item.data;
    });
  },
  //自定义函数节点
  methods: {
    getPostList(value) {
      if (value !== "") {
        return this.positionList.filter(item => {
          if (item.orgId === value) return item;
        });
      } else {
        return this.positionList;
      }
    },
    submitFormData: function() {
      this.$refs.formRef.validate(valid => {
        if (!valid) return;
        this.$emit("getFormData", this.$myfunction.copyData(this.form));
        this.dialogClose();
      });
    },
    dialogClose() {
      this.dialogVisible = false;
      this.form = this.$options.data().form;
    },
    openDialog(data) {
      if (!this.$myfunction.isEmpty(data)) {}
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="less" scoped></style>
