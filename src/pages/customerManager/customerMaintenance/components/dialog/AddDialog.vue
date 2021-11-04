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
        <el-form-item label="回访客户名称" prop="customerName">
        <el-autocomplete
            class="inline-input"
            v-model="form.customerName"
            :popper-append-to-body="false"
            :fetch-suggestions="querySearch"
            placeholder="请输入客户名称"
            :trigger-on-focus="false"
            popper-class="selectoption"
            @select="handleSelect"
          >
          <i
            class="el-icon-edit el-input__icon"
            slot="suffix"
            @click="handleIconClick">
          </i>
          <template slot-scope="{ item }">
            <div class="selectoptiondiv">{{ item.contextname }}</div>
          </template>
          </el-autocomplete>
        </el-form-item>
      </el-form>
      <dialog-button
        :reset-btn="{ show: false }"
        :cancelBtn="{show:false}"
        @cancelBtn="dialogClose"
        @okBtn="submitFormData"
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
        customerName: ""
      },
      formRules:[],
    };
  },
  //生命周期函数节点
  created() {
    if (this.session.getItem("auto_consumer")==null)
      {
        this.getallcocoume();
      }
    
  },
  //自定义函数节点
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    submitFormData() {
      this.$refs.formRef.validate(valid => {
        if (!valid) return;
        this.$emit("getFormData", this.$myfunction.copyData(this.form));
        this.dialogClose();
      });
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
    getallcocoume()
        {
          this.javaHttp("crm/consumer/autofindwhere",{customerName:""}).then(reqdata=>{  
              this.session.setItem("auto_consumer", reqdata.data);
          });
        },
      querySearch(queryString, cb) {
        console.log(queryString);
        var restaurants=this.session.getItem("auto_consumer");
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        //调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
          return (restaurant) => {
            return (restaurant.customerName.toLowerCase().includes(queryString.toLowerCase()));
          };
      },
      handleIconClick(ev) {
        console.log(ev);
      },
      handleSelect(item) {
        this.form.customerName=item.customerName;
      },
  }
};
</script>
<style lang="less" scoped>
.selectoption{
  div{
    width:500px;
  }
}
</style>
