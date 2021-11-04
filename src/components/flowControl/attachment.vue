<template>
  <el-dialog
    title="附件上传"
    :visible.sync="dialogVisible"
    v-if="dialogVisible"
    :width="width"
    @close="dialogClose"
    :close-on-click-modal="false"
  >
    <el-form :model="form" ref="formRef" label-width="110px">
      <el-form-item
        v-for="(item, index) in arrs"
        :label="item.name"
        :key="index"
      >
        <el-button type="text" @click="attachUp(index)">附件上传</el-button>
      </el-form-item>
    </el-form>
    <dialog-button
      reset-btn="false"
      ok-btn="提 交"
      :cancelBtn="{show:false}"
      @okBtn="submitFormData"
      @cancelBtn="dialogClose"
    ></dialog-button>
  </el-dialog>
</template>
<script>
import { filter } from "jszip";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  props: {
    title: "",
    width: {
      type: String,
      default: "50%"
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        arrs: [],
        attachments: []
      },
      data:''
    };
  },
  computed: {
    ...mapGetters({
      attachpath: "flowManager/attachmentUploadStr",
      attachData: "flowManager/getAttachData"
    })
  },
  methods: {
    ...mapActions({
      GetAttachment: "flowManager/networkGetAttachment",
      getAttachByMore: "flowManager/networkGetAttachment_new",
      setAttach:"flowManager/networkSetAttach"
    }),
    openDialog(arrObj,data) {
      console.log(data)
      if (!data) {
        this.data=data
      }
    if (!arrObj) {
      this.$message.error("请先传入必要的参数");
      return;
    }
    if (!arrObj instanceof Array) {
      this.$message.error("请先传入数组");
      return;
    }
    this.arrs = arrObj;
    this.setAttach();//置空对象
    this.dialogVisible = true;
  },
  dialogClose() {
    this.dialogVisible = false;
    // this.$refs.formRef.resetFields();
  },
  attachUp(index) {
    this.getAttachByMore(index);
  },

  submitFormData() {
    let keys = Object.keys(this.attachData);
    if(keys.length<this.arrs.length){
      this.$message.warning("附件内容不能为空");
      return;
    }
    this.arrs.forEach((item,index) => {
      item.value = this.attachData[index];
    });
    this.$emit("submitAttach", this.arrs,this.data);
    this.dialogVisible = false;
  }

  }

};
</script>
