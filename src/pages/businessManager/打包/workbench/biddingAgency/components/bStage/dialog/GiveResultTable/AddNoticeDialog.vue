<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
       v-if="dialogVisible"
      :width="width"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="120px"
      >
        <el-form-item label="分包/分标段名称" prop="filesalename">
          <!--perqualification 查询资格预审里的分包-->
          <rea-query-input
            v-model="form.filesalename"
            url="/pro/tabiddingfilesale/findwhere"
            filter-key="filesalename"
            :filter-obj="{
              projectKeyid: currentItem.keyid,
              typecode: 'prequalification'
            }"
            @getObject="
              item => {
                form.filesalekeyid = item.keyid;
              }
            "
          ></rea-query-input>
        </el-form-item>
        <el-form-item label="通知书" prop="noticeFile">
          <upload-button v-model="form.noticeFile"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button
        reset-btn="false" :cancelBtn="{show:false}"
        @okBtn="submitForm"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import { mapState } from "vuex";
export default {
  components: {},
  props: {
    title: { type: String },
    width: { type: String },
    labelWidth: {
      type: String,
      default: "130px"
    },
    data: {}
  },
  watch: {},
  computed: {
    ...mapState("workbench", {
      currentItem: "currentItem"
    })
  },
  //数据节点
  data() {
    return {
      dialogVisible: false,
      num: 1,
      form: {
        noticeFile: ""
      },
      formRules: {
        filesalename:[
            { required: true, message: '请输入必填项', trigger: 'blur' }
          ],
        noticeFile:[
            { required: true, message: '请输入必填项', trigger: 'blur' }
          ]
      }
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    openDialog(data) {
      if (!this.$myfunction.isEmpty(data)) {
        this.form = this.$myfunction.copyData(data);
      }
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.form = this.$options.data().form;
    },
    submitForm() {
      this.$refs.formRef.validate((valid) => {
          if (valid) {
              this.$emit("getFormData", this.$myfunction.copyData(this.form));
              this.dialogClose();
          }else
          {
            this.$message.success("数据录入完不完整!请确认!")
          }
        });

    }
  }
};
</script>
<style lang="less" scoped></style>
