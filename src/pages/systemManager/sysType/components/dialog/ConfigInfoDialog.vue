<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="45px">
        <rea-divider :title="form.code+'明细配置详细'"></rea-divider>
        <el-tabs v-model="activeName" tab-position="top">
          <template v-for="item in configKey">
            <el-tab-pane :label="item.key+'功能'" :name="item.id">
              <rea-textarea v-model="text[item.key]" max-height="20" min-height="20"></rea-textarea>
            </el-tab-pane>
          </template>
        </el-tabs>
      </el-form>
      <dialog-button reset-btn="false"
       :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
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
      },
    },
    watch: {

    },
    //数据节点
    data() {
      return {
        show:true,
        dialogVisible:false,
        form: {
          allstatusname:'',
        },
        text:{
          staticsCode:'无',
          contractCode:'无',
          isplanitemtime:'无',
          urladdress:'无',
        },
        formRules: {
        },
        activeName:'1',
        configKey:[
          {id:'1',key:'staticsCode'},
          {id:'2',key:'contractCode'},
          {id:'3',key:'isplanitemtime'},
          {id:'4',key:'urladdress'},
        ]
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      submitFormData: function () {
        this.$refs.formRef.validate(valid => {
          if (!valid) return
          this.form.allstatusname=this.text.staticsCode+'-&-'+this.text.contractCode+'-&-'+this.text.isplanitemtime+'-&-'+this.text.urladdress
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
        })
      },
      dialogClose() {
        this.dialogVisible=false
        this.form=this.$options.data().form
        this.text=this.$options.data().text
      },
      openDialog(data){
        if (!this.$myfunction.isEmpty(data)){
          this.form=this.$myfunction.copyData(data)
          if (this.form.allstatusname) {
            if (this.form.allstatusname.indexOf('-&-')!==-1) {
              let arr=this.form.allstatusname.split('-&-')
              this.text.staticsCode=arr[0]
              this.text.contractCode=arr[1]
              this.text.isplanitemtime=arr[2]
              this.text.urladdress=arr[3]
            }
          }

        }
        this.dialogVisible=true
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
