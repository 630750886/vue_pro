<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <download-excel class="export-excel-wrapper" :data="json_data" :fields="json_fields" header="" name="客户信息表.xls">
        <el-button type="primary" size="small">导出</el-button>
      </download-excel>
      <dialog-button :reset-btn="{show:false}" :cancelBtn="{show:false}" @cancelBtn="dialogClose" @okBtn="submitFormData"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
     name:"customer_output_excel",
     props:{
       json_data:{type:Array,default:()=>[]},
       json_fields:{type:Object,default:()=>{}},
     },
    //数据节点
    data() {
      return {
        dialogVisible:false,
        json_meta: [
          [
            {
              " key ": " charset ",
              " value ": " utf- 8 "
            }
          ]
        ]
        }
    },
    //自定义函数节点
    methods: {
      openDialog(){
        this.dialogVisible=true
      },
      dialogClose(){
        this.dialogVisible=false
      },
      submitFormData(){
          this.dialogClose()
      },
      resetForm(){
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
