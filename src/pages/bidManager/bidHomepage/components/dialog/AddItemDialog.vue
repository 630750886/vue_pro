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
        label-width="75px"
      >
        <el-form-item label="项目名称" prop="projectname">
          <el-autocomplete
            class="inline-input"
            style="width:85%"
            v-model="form.projectname"
            :fetch-suggestions="querySearch"
            placeholder="请输入项目名称"
            :trigger-on-focus="false"
            @select="handleSelect"
          >
          <i
            class="el-icon-edit el-input__icon"
            slot="suffix"
            @click="handleIconClick">
          </i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.contextname }}</div>
          </template>
          </el-autocomplete>
        </el-form-item>
      </el-form>
      <dialog-button
        reset-btn="false"
        :okBtn="{title:'新建'}"
        :cancelBtn="{show:false}"
        @okBtn="submitForm"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件

export default {
  components: {},
  props: {
    title: { type: String },
    width: { type: String },
    labelWidth: {
      type: String,
      default: "130px"
    }
  },

  watch: {},
  //数据节点
  data() {
    return {
      dialogVisible: false,
      form: {
        projectname: "",
        tenderstatuskeyid: "0"
      },
      formRules:
        typeof this.requiredFormRules === "function"
          ? this.requiredFormRules({ trigger: ["projectname"], change: [] })
          : {}
    };
  },
  //生命周期函数节点
  created() {
  },
  //自定义函数节点
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.$refs.formRef.resetFields();
      this.form = this.$options.data().form;
    },
    submitForm() {
      this.$refs.formRef.validate(valid => {
        if (!valid) return;
        this.$emit("getFormData", this.$myfunction.copyData(this.form));
        this.dialogClose();
      });
    },
    getallcocoume()
      {
          this.javaHttp("tender/tenderinfo/autofindwhere",{projectname:"",allstatuscode:"0"}).then(reqdata=>{
              this.selectcosume=reqdata.data;
              //console.log(this.selectcosume);
              this.session.setItem("auto_tenderinfo", this.selectcosume);
          });
      },
      querySearch(queryString, cb) {
        this.javaHttp("tender/tenderinfo/autofindwhere",{projectname:"",allstatuscode:"0"}).then(reqdata=>{
              this.selectcosume=reqdata.data;
              //console.log(this.selectcosume);
               var restaurants=reqdata.data;
               var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
               cb(results);
          });
      },
      createFilter(queryString) {
          return (restaurant) => {
            return (restaurant.contextname.toLowerCase().includes(queryString.toLowerCase()));
          };
      },
      handleSelect(item) {
        this.form.projectname=item.contextname;
      },
    handleIconClick(ev) {
        console.log(ev);
      },

  }
};
</script>
<style lang="less" scoped></style>
