<template>
  <div>
    <el-dialog :title="title" :visible.sync="addDialogVisible" width="25%" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
        <el-form-item label="离职原因" prop="personName" label-width="">
          <rea-select v-model="form.separationcausesid" :data="quitTypeList" label="name" prop="id"></rea-select>
        </el-form-item>
      </el-form>
      <dialog-button :resetBtn="{show:false}" :cancelBtn="{show:false}" okBtn="确 定" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>

  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件

  export default {
    components: {
    },
    props: {
      title: '',
      station: {
        type: Object,
        default: () => {
          return {
            organize: [],
          }
        }
      }
    },
    watch: {
      'form.separationcausesid':function(newValue) {
        if (!this.$myfunction.isEmpty(newValue)) {
          this.form.separationcausesname=this.quitTypeList.find(item=>{
            if (item.id === newValue) {
              return item
            }
          }).name
        }
      }
    },
    //数据节点
    data() {
      return {
        addDialogVisible: false,
        //表单对象
        form: {
          personId:'',
          separationcausesid:'',
          separationcausesname:'',
        },
        //表单验证规则
        formRules: {
        },
        quitTypeList:[
          {id:1,name:'家庭'},
          {id:2,name:'个人发展'},
          {id:3,name:'公司平台'},
          {id:4,name:'工资'},
          {id:5,name:'上下级关系'},
          {id:6,name:'团队氛围'},
          {id:7,name:'福利'},
          {id:8,name:'其他'}
        ]
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      dialogClose() {
        this.addDialogVisible = false
        this.$refs.formRef.resetFields()
      },
      submitFormData() {
        this.$refs.formRef.validate(valid => {
          if (!valid) return
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
        })
      },
      openDialog(person) {
        if (person !== undefined) {
          this.form=person
        }
        this.addDialogVisible = true
      }
    }
  }
</script>
<style lang='less' scoped>
  .btn-right {
    float: right;
    margin-right: 0 !important;
  }
</style>
