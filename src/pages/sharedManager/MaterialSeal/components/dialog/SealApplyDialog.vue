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
        label-width="110px"
      >
        <el-form-item label="资料名称" prop="document_name">
          <el-input v-model="form.document_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="盖章申请说明" prop="content_desc">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8 }"
            v-model="form.content_desc"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="审核附件" prop="document_file_path">
          <upload-button v-model="form.document_file_path"></upload-button>
          <!-- <el-button type="text" @click="attachUp">附件上传</el-button> -->
        </el-form-item>
        <!-- <el-form-item label="审核附件1">
          <el-button type="text" @click="attachUpByImg">附件上传123</el-button>
        </el-form-item> -->
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关 闭</el-button>
      <el-button @click="$emit('submitFormData')">提 交</el-button>
    </div> -->
      <dialog-button
        reset-btn="false"
        ok-btn="提 交"
        :cancelBtn="{show:false}"
        @okBtn="submitFormData"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
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
        documentName: "",
        contentDesc: "",
        documentFilePath_value: []
      },
      formRules: {
         document_name: [
            { required: true, message: '请输入资料名称', trigger: 'blur' }
          ],
          content_desc:[
            { required: true, message: '请输入盖章申请说明', trigger: 'blur' }
          ],
          document_file_path:[
            { required: true, message: '请输入盖章申请说明', trigger: 'blur' }
          ],
      }
    };
  },
  //生命周期函数节点
  created() {
    //console.log(this.signs);
  },
  mounted() {
    //console.log(this.currentUser);
  },
  computed: {
    ...mapGetters({
      attachpath: "flowManager/attachmentUploadStr"
    })
  },
  //自定义函数节点
  methods: {
    ...mapActions({
      GetAttachment: "flowManager/networkGetAttachment"
    }),

    openDialog() {
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.$refs.formRef.resetFields();
    },
    attachUp() {
      this.GetAttachment();
      // setTimeout(() => {
      //   console.log(this.attachpath.data);
      // }, 1000);
    },
    attachUpByImg() {
      //this.$flow.attachmentByImg();
    },
    checkValid() {
      if (this.form.document_name=== "") {
        this.$message.info("文件名称不能为空");
        return false;
      }
      if (this.form.content_desc === "") {
        this.$message.info("文件描述不能为空");
        return false;
      }
      if (this.form.document_file_path === "") {
        this.$message.info("附件不能为空");
        return false;
      }
      return true;
    },
    submitFormData() {
       this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.$emit("getFormData", this.$myfunction.copyData(this.form));
            this.dialogClose();
          } 
          else
          {
            this.$message.info("请把信息录入完整");
          }
        });
  
    }
  }
};
</script>
<style lang="less" scoped></style>
