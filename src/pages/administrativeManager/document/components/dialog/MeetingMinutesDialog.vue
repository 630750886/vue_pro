<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="34%" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="70px" size="small">
        <el-form-item label="会议类型" prop="userName">
          <el-select v-model="form.fileTypeKeyId" placeholder="请选择" @change="getsealType">
					<el-option
					v-for="item in MeetType"
					:key="item.id"
					:label="item.name"
					:value="item.id">
					</el-option>
				</el-select>
        </el-form-item>
        <el-form-item label="会议编号" prop="documentCode">
          <el-input v-model="form.documentCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="会议名称" prop="documentName">
          <el-input v-model="form.documentName" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容摘要" prop="documentDesc">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入"
            v-model="form.documentDesc">
          </el-input>
        </el-form-item>
        <el-form-item label="主办单位" prop="userName">
          <el-input
            placeholder="请输入内容"
            v-model="form.conferenceOrganizers"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="会议时间" prop="userName">
          <el-date-picker
					v-model="form.meetingBeginDate"
					type="date"
					placeholder="选择日期"
					format="yyyy/MM/dd"
					value-format="yyyy/MM/dd">
					</el-date-picker>
        </el-form-item>
        <el-form-item label="会议地点" prop="userName">
          <el-input
              placeholder="请输入"
              v-model="form.meetingAddress"
              clearable>
            </el-input>
        </el-form-item>
        <el-form-item label="参会情况表" prop="userName">
          <upload-button v-model="form.meetingSignAttachFile"></upload-button>
        </el-form-item>
        <el-form-item label="会议纪要" prop="documentAttachFile">
          <upload-button v-model="form.documentAttachFile"></upload-button>
        </el-form-item>
        <el-form-item label="会议图片" prop="userName">
          <upload-button v-model="form.meetingAllAttachFile"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button resetBtn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" ok-btn="保存" @cancelBtn="dialogClose()"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import DialogButton from '../../../acomponents/DialogButton.vue'
  import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue'
  import QueryInput from "../../../acomponents/QueryInput.vue";
  import TextButton from "../../../acomponents/TextButton.vue";
  import ElTextareaTemplate from "../../../acomponents/ElTextareaTemplate.vue";
  import ElDataPickerTemplate from "../../../acomponents/ElDataPickerTemplate.vue";
  import MultipleInput from "../../../acomponents/MultipleInput.vue";
  import {getTypeListByCode} from "@/api/webapi-sys.js"
  export default {
    components: {
      QueryInput,
      DialogButton,
      ElSelectTemplate,
      TextButton,
      ElTextareaTemplate,
      ElDataPickerTemplate,
      MultipleInput
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
        dialogVisible: false,
        //表单对象
        form: {
            keyid:"",//;
            documentCode:"",//文档编号
            documentTypeKeyId:"",//
            documentTypeName:"",//文档类型
            fileTypeKeyId:"",//
            fileTypeName:"",//文件类型
            documentName:"",//文件名称
            documentDesc:"",//文件摘要
            documentAttachFile:"",//文件附件
            documentIssueDate:"",//签发日期
            documentIssuePersonKeyId:"",//
            documentIssuePersonName:"",//签发人
            documentBeginDate:"",//启用时间
            documentAuditDate:"",//审核日期
            documentSignAttachFile:"",//盖章文件附件
            gzaboutorgDesc:"",//制度涉及相关组织

            conferenceOrganizers:"",////主办单位会议；
            meetingSignAttachFile:"",//签到表;
            meetingAbsenteeism:"",//缺勤人员
            meetingAddress:"",//
            meetingBeginDate:"",//启用时间
            meetingAllAttachFile:""//资料 图 video等等;
        },
        //表单验证规则
        formRules: {

        },
        MeetType:[
        ],
      }
    },
    //生命周期函数节点
    created() {
       getTypeListByCode({code:"TYPE-302"}).then(res => {
        res.data.forEach(list => {
          let obj={}
          obj={id:list.keyid,name:list.listname}
          this.MeetType.push(obj)
        })
      })
    },
    //自定义函数节点
    methods: {
       getsealType(data){
        let ditem= this.MeetType.find((item,index)=>{
          if(item.id=== data){
          return item;
        }})
        this.form.fileTypeKeyId=ditem.id;
        this.form.fileTypeName=ditem.name;
        console.log(this.form);
        },
      dialogClose() {
        this.dialogVisible = false
        this.$refs.formRef.resetFields()
      },
      submitFormData() {
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
      },
      openDialog(data) {
        if (data !== undefined) {
          this.form=data
        }
        this.dialogVisible = true
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
