<template>
  <div id="control-form">
    <el-form ref="form"  label-width="80px">
     <template v-for="(item,index) in formData">
        <div v-show="item.controlID=='input_sign'" :key="index">
          <el-form-item :label="item.html_name" >
            <el-input class="myvalue" v-model="item.html_id"></el-input>
          </el-form-item>
        </div>
        <div v-show="item.controlID=='input_date'" :key="index">
          <el-form-item :label="item.html_name">
            <el-date-picker type="date" placeholder="选择日期" class="myvalue" v-model="item.html_id"></el-date-picker>
          </el-form-item>
        </div>
        <div v-show="item.controlID=='input_dateArea'" :key="index">
          <el-form-item :label="item.html_name">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="开始时间" v-model="item.html_id" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="结束时间" v-model="item.html_id" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          
        </div>
        <div v-show="item.controlID=='input_attachment'" :key="index">
          <el-form-item :label="item.html_name">
            <el-upload
              class="upload-demo"
              :action="getupload()"             
              :on-remove="handleRemove"             
              :before-upload="beforeUpload"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :on-success="handleSuccess"             
              :file-list="fileList"
            >
              <el-button size="small" type="primary" >点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传PDF文件，且不超过10M</div>
            </el-upload>
          </el-form-item>
        </div>
      </template>
     
  <el-form-item>
  <el-button type="primary" @click="onSubmit()">立即创建</el-button>
    <el-button >取消</el-button>
  </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { GetUploadURL } from "../../utils/http";
export default {
  name: "controlForm",
  data() {
    return {
      formList: this.formData,
      fileList:[]
    };
  },
  props: {
    formData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {
    getupload(){
      return GetUploadURL("back_get");
    },
   
    handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeUpload(file){
         const isPDF = file.type === 'application/pdf';
        const isLt10M = file.size / 1024 / 1024 < 10;

        if (!isPDF) {
          this.$message.error('上传文件只能是 pdf 格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传文件大小不能超过 10MB!');
        }
        return isJPG && isLt10M;
      },
      handleSuccess(response, file, fileList){
        getList(fileList);
      },
      handleRemove(file,fileList){
        getList(fileList);
      },
      getList(mylist){
        this.fileList=[];
        mylist.forEach((item,index)=>{
          let al = {keyid:item.response.keyid,path:item.response.filepath}
          this.fileList.push(al);
        })
      },
      onSubmit(){
        let error=false;
          this.formData.forEach((item,index)=>{
            if(item.allowNull==1&&item.html_id==''){
              error=true;
              this.$message.warning(`${item.html_name} 不能为空！`);
              return false;
            }
          })
          if(!error){
            this.$message.success('ok');
          }
          //this.$message.success('提交成功');
      }
  }
};
</script>