<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="65px">
        <el-form-item label="文件类型" prop="userName">
          <el-select v-model="form.fileTypeKeyId" placeholder="请选择" @change="getsealType">
					<el-option
					v-for="item in type==='readHead'?documentType1:documentType2"
					:key="item.id"
					:label="item.name"
					:value="item.id">
					</el-option>
				</el-select>
        </el-form-item>
        <el-form-item label="文件编号" prop="documentCode" >
          <el-input v-model="form.documentCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="文件名称" prop="documentName" >
          <el-input v-model="form.documentName" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容摘要" prop="documentDesc" >
          <el-input v-model="form.documentDesc" clearable type="textarea" :rows="1"></el-input>
        </el-form-item>
        <el-form-item label="签发人" prop="documentIssuePersonName">
          <el-input v-model="form.documentIssuePersonName" clearable></el-input>
        </el-form-item>
        <el-form-item label="签发日期" prop="documentIssueDate">
          <el-date-picker
					v-model="form.documentIssueDate"
					type="date"
					placeholder="选择日期"
					format="yyyy/MM/dd"
					value-format="yyyy/MM/dd">
					</el-date-picker>
        </el-form-item>
<!--        <el-form-item label="盖章扫描件" prop="documentSignAttachFile" label-width="120px">-->
<!--          <upload-button-->
<!--                v-model="form.documentSignAttachFile"-->
<!--                :data="{-->
<!--                  documentTypeName: '盖章扫描件',-->
<!--                  documentTypeListName: '盖章扫描件',-->
<!--                  entityKeyid: form.keyid-->
<!--                }"-->
<!--              ></upload-button>-->
<!--        </el-form-item>-->
        <el-form-item label="文件附件" prop="documentAttachFile">
          <upload-button
              v-model="form.documentAttachFile"
              :data="{
                  documentTypeName: '文件附件',
                  documentTypeListName: '文件附件',
                  entityKeyid: form.keyid
                }"
          ></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button resetBtn="false" :cancelBtn="{show:false}" ok-btn="保存" @okBtn="submitFormData" @cancelBtn="dialogClose()"></dialog-button>
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
 import {getTypeListByCode} from "@/api/webapi-sys.js"
  export default {
    components: {
      QueryInput,
      DialogButton,
      ElSelectTemplate,
      TextButton,
      ElTextareaTemplate,
      ElDataPickerTemplate
    },
    props: {
      title: '',
      type:'',
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
            // documentSignAttachFile:""//盖章文件附件
        },
        //表单验证规则
        formRules: {

        },
        documentType1:[
        ],
        documentType2:[
        ]
      }
    },
    //生命周期函数节点
    created() {
      getTypeListByCode({code:"TYPE-300"}).then(res => {
        res.data.forEach(list => {
          let obj={}
          obj={id:list.keyid,name:list.listname}
          this.documentType1.push(obj)
        })
      })
      getTypeListByCode({code:"TYPE-301"}).then(res => {
        res.data.forEach(list => {
          let obj={}
          obj={id:list.keyid,name:list.listname}
          this.documentType2.push(obj)
        })
      })
    },
    //自定义函数节点
    methods: {
      getsealType(data){
        console.log(data);
        let ditem={};
        if(this.type==='readHead')
        {
        ditem= this.documentType1.find((item,index)=>{
          if(item.id=== data){
          return item;
        }
          })
        }
        else
        {
          ditem= this.documentType2.find((item,index)=>{
            if(item.id=== data){
            return item;
          }
          })
        }
        console.log(ditem);
        this.form.fileTypeKeyId=ditem.id;
        this.form.fileTypeName=ditem.name;
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
