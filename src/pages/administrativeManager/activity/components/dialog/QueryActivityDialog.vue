<template>
  <div>
    <el-dialog :title="title" :visible.sync="addDialogVisible" v-if="addDialogVisible" width="33%" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
        <el-form-item label="活动名称" prop="activityName">
          <rea-query-inputa
              v-model="form.activityName"
              url="xz/ActivityInfo/autofindwhere"
              filter-key="contextname"
              @getObject="getItem"
            ></rea-query-inputa>
        </el-form-item>
        <el-form-item label="活动类型" prop="activityType">
          <el-select v-model="form.activityType" placeholder="请选择">
            <el-option
              v-for="item in activityTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="举办时间" prop="beginDateTime">
          <rea-datescope
              v-model="form.beginDateTime"
              value-type="array"
          ></rea-datescope>
        </el-form-item>
        <el-form-item label="主办方名称" prop="activityMain">
          <rea-query-inputa
              v-model="form.activityMain"
              url="xz/ActivityInfo/autofindwhere"
              filter-key="contextcode"
              @getObject="getItem"
            ></rea-query-inputa>
        </el-form-item>
        <el-form-item  label="是否签订相关合同" prop="isContract">
          <el-radio v-model="form.isContract" label="true">是</el-radio>
        </el-form-item>
        <el-form-item label="是否有奖项" prop="isPrize"> 
          <el-radio v-model="form.isPrize" label="true">是</el-radio>
        </el-form-item>
      </el-form>
      <dialog-button resetBtn="true" ok-btn="筛 选" :cancelBtn="{show:false}" @resetBtn="resetForm"  @okBtn="submitFormData"  @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import DialogButton from '../../../acomponents/DialogButton.vue'
  import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue'
  import QueryInput from '../../../acomponents/QueryInput.vue'
  import DatePickerScope from '../../../acomponents/DatePickerScope.vue'
  import YesOrNoTemplate from '../../../acomponents/YesOrNoTemplate.vue'
  import NumberScope from '../../../acomponents/NumberScope.vue'

  export default {
    components: {
      DialogButton,
      ElSelectTemplate,
      QueryInput,
      DatePickerScope,
      YesOrNoTemplate,
      NumberScope
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
    watch: {},
    //数据节点
    data() {
      return {
        addDialogVisible: false,
        //表单对象
        form: {
          isContract:"",//是否签订相关合同
          isPrize:"",//是否有奖项
          activityName:"" ,//活动名称
          activityType:"",//活动类型
          beginDateTime:[],//举办时间
          activityMain:"",//主办方名称
        },
        //表单验证规则
        formRules: {
        },
        activityTypes:[
          {id:1,name:'年会'},
          {id:2,name:'旅游'},
          {id:3,name:'拓展'},
          {id:4,name:'节日'},
          {id:5,name:'协会'},
          {id:6,name:'文体'},
          {id:7,name:'公益'},
          {id:8,name:'其他'},
        ]
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      getItem(item){
        console.log(item);
      },
      resetForm(){
        console.log("resetFields");
        this.$refs.formRef.resetFields();
      },
      dialogClose() {
        this.addDialogVisible = false;
        this.$refs.formRef.resetFields();
      },
      submitFormData() {
        this.$refs.formRef.validate(valid => {
          if (valid) {
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
          }else
          {
            this.$message.success("数据录入完不完整!请确认!")
          }
        })
      },
      openDialog() {
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
