<template>
  <el-dialog :visible.sync="dialogVisible" v-if="dialogVisible" width="300px" @close="dialogClose"  :close-on-click-modal="false">
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="75px">
      <el-form-item label="资料名称" prop="resourcename">
        <el-input v-model="form.resourcename" :readonly="true" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="份数" prop="copies">
        <el-input-number
          style="width: 100%"
          v-model="form.copies"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="接收人" prop="inperson">
        <rea-query-input
          v-model="form.inperson"
          url="hr/basicinfo/autofindwhere"
          filter-obj="{}"
          filter-key="contextname"
          @getObject="getItem"
        ></rea-query-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="submitData"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {},
  //生命周期函数节点
  created() {},
  mounted() {},
  watch: {},
  //数据节点
  data() {
    return {
      readonly: false,
      dialogVisible: false,
      form: {
        resourcename: "",
        copies: "",
        inpersonkeyid: "",
        inperson: "",
        inOrgkeyid: "",
        inOrgName: ""
      },
      formRules: {
        resourcename: [
            { required: true, message: '请输入资料名称', trigger: 'blur' }
          ],
        copies: [
            { required: true, message: '请输入份数', trigger: 'blur' }
          ],
        inperson: [
            { required: true, message: '请输入接收人', trigger: 'blur' }
          ],
      }
    };
  },

  //自定义函数节点
  methods: {
    getItem(item) {
      this.form.inpersonkeyid = item.keyid;
      this.form.inOrgkeyid = item.orgId;
      this.form.inOrgName = item.orgName;
    },
    submitData() {
      this.$refs.formRef.validate((valid) => {
          if (valid) {
              this.$emit("getFormData", this.$myfunction.copyData(this.form));
              this.dialogClose();
          }else
          {
            this.$message.success("数据录入完不完整!请确认!")
          }
         });

    },
    openDialog(data) {
      if (!this.$myfunction.isEmpty(data)) {
        this.readonly = true;
        this.form.resourcename = this.$myfunction.copyData(data);
      }
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    resetForm() {
      this.readonly = false;
      this.form = this.$options.data().form;
    }
  }
};
</script>
<style lang="less" scoped></style>
