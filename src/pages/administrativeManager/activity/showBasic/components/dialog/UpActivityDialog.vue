<template>
  <div>
    <el-dialog :title="title" :visible.sync="addDialogVisible" v-if="addDialogVisible" width="30%" @close="addDialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
        <el-form-item label="主办方名称" prop="userName">
          <el-input v-model="form.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="活动举办地点" prop="userName">
          <el-input v-model="form.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="活动举办时间" prop="userName">
          <date-picker-scope></date-picker-scope>
        </el-form-item>
        <el-form-item label="活动持续时间" prop="userName">
          0小时
        </el-form-item>
        <el-form-item label="活动规模" prop="userName">
          <el-input v-model="form.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="公司活动负责人" prop="userName">
          <query-input></query-input>
        </el-form-item>
        <el-form-item label="协助人员" prop="userName">
          <query-input></query-input>
        </el-form-item>
        <el-form-item label="负责工作" prop="userName">
          <el-textarea-template></el-textarea-template>
        </el-form-item>
        <el-form-item label="活动相关图片资料" prop="userName">
          <el-button type="text">附件上传</el-button>
        </el-form-item>
        <el-form-item label="是否有签订相关合同" prop="userName">
          <yes-or-no-template v-model="form.isContract"></yes-or-no-template>
        </el-form-item>
        <template v-model="form.isContract==='是'">
          <el-form-item label="合同名称" prop="userName">
            <el-input v-model="form.userName" clearable></el-input>
          </el-form-item>
          <el-form-item label="合同附件" prop="userName">
            <el-button type="text">附件上传</el-button>
          </el-form-item>
        </template>
        <el-form-item label="是否有奖项" prop="userName">
          <yes-or-no-template v-model="form.isPrize"></yes-or-no-template>
        </el-form-item>
        <template v-if="form.isPrize==='是'">
          <el-form-item label="奖项名称" prop="userName">
            <el-input v-model="form.userName" clearable></el-input>
          </el-form-item>
          <el-form-item label="奖项图片" prop="userName">
            <el-button type="text">附件上传</el-button>
          </el-form-item>
        </template>
      </el-form>
      <dialog-button resetBtn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="addDialogClose"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import DialogButton from '../../../../acomponents/DialogButton.vue'
  import DatePickerScope from '../../../../acomponents/DatePickerScope.vue'
  import QueryInput from '../../../../acomponents/QueryInput.vue'
  import ElTextareaTemplate from '../../../../acomponents/ElTextareaTemplate.vue'
  import YesOrNoTemplate from '../../../../acomponents/YesOrNoTemplate.vue'


  export default {
    components: {
      DialogButton,
      DatePickerScope,
      QueryInput,
      ElTextareaTemplate,
      YesOrNoTemplate
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
          isContract:'',
          isPrize:'',
        },
        //表单验证规则
        formRules: {
          userName: [
            {
              required: true,
              message: '请输入名字',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 4,
              message: '长度在2～4个字符之间',
              trigger: 'blur'
            }
          ],
          idCard: [
            {
              required: true,
              message: '请输入身份证号码',
              trigger: 'blur'
            },
            {
              validator: IDCard,
              trigger: 'blur'
            }
          ],
          phone: [
            {
              required: true,
              message: '亲输入手机号',
              trigger: 'blur'
            },
            {
              validator: checkPhone,
              trigger: 'blur'
            }
          ],
        },
        activityType:[
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
      addDialogClose() {
        this.addDialogVisible = false
        this.$refs.formRef.resetFields()
        this.$refs.station.resetForm()
      },
      submitFormData() {
        this.$refs.formRef.validate(valid => {
          if (!valid) return
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.addDialogClose()
        })
      },
      getStationData(data) {
        let str = ''
        if (data.length > 0) {
          data.forEach(val => {
            str = str + val + '/'
          })
        }
        this.$set(this.form, 'organize', str)
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
