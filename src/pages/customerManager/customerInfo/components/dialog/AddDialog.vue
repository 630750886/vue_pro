<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="80px">
        <el-form-item label="客户名称" prop="customerName">
          <el-autocomplete
            class="inline-input"
            v-model="form.customerName"
            :fetch-suggestions="querySearch"
            placeholder="请输入客户名称"
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
      <dialog-button :reset-btn="{show:false}" :cancelBtn="{show:false}" @cancelBtn="dialogClose" @okBtn="submitFormData" :okBtn="{title:'新建'}"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件

  export default {
    components: {
    },
    props: {
      title:'',
      width:{
        type:String,
        default:'50%'
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible:false,
        form:{
          customerName:'',
        },
        formRules:this.requiredFormRules({trigger:[
            'customerName'
          ],change:[]}),
      }
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
      openDialog(){
        this.dialogVisible=true
      },
      dialogClose(){
        this.dialogVisible=false
        this.resetForm()
      },
      submitFormData(){
        this.$refs.formRef.validate(valid => {
              if (!valid) return
          this.$emit('getFormData',this.$myfunction.copyData(this.form))
          this.dialogClose()
        })

      },
      resetForm(){
        this.$refs.formRef.resetFields()
      },
      getallcocoume()
      {   console.log("run...");
          this.javaHttp("crm/consumer/autofindwhere",{customerName:""}).then(reqdata=>{
              this.selectcosume=reqdata.data;
              //console.log(this.selectcosume);
              this.session.setItem("auto_consumer", this.selectcosume);
          });
      },
      querySearch(queryString, cb) {
        var restaurants=this.session.getItem("auto_consumer");
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
          return (restaurant) => {
            return (restaurant.contextname.toLowerCase().includes(queryString.toLowerCase()));
          };
      },
      handleIconClick(ev) {
        console.log(ev);
      },
      handleSelect(item) {
        this.form.customerName=item.contextname;
      },
    }
  }
</script>
<style lang='less' scoped>
  .inline-input {
      width: 300px;
    }
</style>
