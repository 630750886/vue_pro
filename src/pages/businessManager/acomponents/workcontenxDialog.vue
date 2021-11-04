<template>
<div>
    <div class="workcontent">
       <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="专业工程分类" prop="projectMajorCode">
          <rea-select
            v-model="form.projectMajorCode"
            :data="MajorProjectType"
            @getLabel="
              item => {
                form.projectMajorName = item;
              }
            "
          ></rea-select>
        </el-form-item>
        <el-form-item label="项目类型" prop="projectTypeCode" v-if="projecttypeflag">
          <rea-cascader
            v-model="form.projectTypeCode"
            :data="projectType"
            @getLabel="
              item => {
                form.projectTypeName = item;
              }
            "
            @getObject="
              item => {
                form.serviceCode = item.staticsCode;

              }
            "
          ></rea-cascader>
        </el-form-item>
      </el-form>
    </div>
    <div class="workcontService">
      <com-service-content v-model="form.serviceContent" :service-type="serviceType"></com-service-content>
    </div>
    <div>
      <el-row  :gutter="20">
        <el-col :span="4"  :offset="16">
          <public-button classhd="hd" :plain="true" type="primary" name="FREE" title="确定" @click="savecontservice"></public-button>
          </el-col>
      </el-row>
    </div>
 </div>
</template>
<script>
import * as basetype from "@/api/webapi-sys.js";
import * as gop from "@/api/webapi-itemWorkGroup.js"
import * as editpro from "@/api/webapi-business.js"
import {mapState,mapActions} from 'vuex'
export default {
    name:"jobcontent",
    data(){
        return {
            MajorProjectType:[],
            projectType:[],
            serviceType:[],
            form:{
                keyid:"",
                projectCode:"",
                projectName:"",
                projectMajorCode:"",
                projectMajorName:"",
                projectTypeCode:"",
                projectTypeName:"",
                serviceCode:"",
                serviceContent:[]
            },
            formRules:{
                projectMajorCode:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
            }
        }
    },
    props: {
        basedatact:{}
    },
    created(){
        this.getMajorProjectType(); //专业工程分类
        this.projecttypeinfo(this.basedatact.contractVocationalTypeCode);//
        this.ProjectType(this.basedatact.contractVocationalTypeCode) // 项目分类
    },
    watch: {
      'form.serviceCode': function (newValue,oldValue){
        if(newValue=="TYPE-093"){
          newValue="TYPE-094"
        }
        console.log(newValue);
         this.networkGetSelectByCode(newValue).then(item=>{
                  this.serviceType=item
              })
      },
      'form.serviceContent':function (newValue,oldValue) {
        let newNum=0
        newValue.forEach(item=>{
          if (item.planServiceDays !== '') {
            newNum+=parseInt(item.planServiceDays)
          }
        })
        this.serviceListDay=newNum
      },
    },
    methods:{
        ...mapActions('loadType',{
          networkGetSelectByCode:'networkGetSelectByCode'
        }),
        ProjectType(typevalue){
        switch (typevalue) {
            case "TYPE-064":
              //TYPE-051
              this.getProjectType("TYPE-059");
              break;
            case "TYPE-070":
              //TYPE-051
              this.getProjectType("TYPE-068");
              break;
            case "TYPE-082":
              //'TYPE-047'
              this.getProjectType("TYPE-072");
              break;
          }
        },
        projecttypeflag(){
          if(this.basedatact.contractVocationalTypeCode==="TYPE-064"||this.basedatact.contractVocationalTypeCode==="TYPE-070"||this.basedatact.contractVocationalTypeCode==="TYPE-082") {return true;}
          else{return false;}
        },
        projecttypeinfo(typecode)
        {
            //招标代理 TYPE-082 项目管理 TYPE-084 工程咨询 TYPE-064  造价咨询TYPE-070 工程监理 TYPE-083
            switch (typecode) {
            case "TYPE-084":
              //项目管理 服务工作内容
              this.networkGetSelectByCode('TYPE-051').then(item=>{
                  this.serviceType=item
              })
              break;
            case "TYPE-064":
              //项目管理 服务工作内容
              this.networkGetSelectByCode('TYPE-047').then(item=>{
                  this.serviceType=item
              })
              break;
            case "TYPE-083":
              //工程监理 服务工作内容
               this.networkGetSelectByCode('TYPE-075').then(item=>{
                  this.serviceType=item
                })
              break;
          }
        },
        getProjectType(typecode){
             //项目类型   code:'',
              basetype.getCascaderType({code:typecode}).then(item => {
                if (item.code === 200){
                    this.projectType=item.data;
                    }
                }).catch(() => {
                console.log('loadType:获取异常')
                })
        },
        getprojectService()
        {
          basetype.getTypeListByCode({code: this.currentItem.serviceCode}).then(item=>{
            if (item.code === 200){
            this.serviceType=item.data;
            }
          })
        },
      getMajorProjectType()
      {
          this.javaHttp("systypelist/findbycode",{code:"TYPE-057"}).then(repitem=>{
              if (repitem.code===200)
              {this.MajorProjectType=repitem.data;}
          });
      },
      savecontservice(){
        if (this.form.projectMajorCode.length>10 &&this.form.serviceContent.length>0)
        {
           this.basedatact.projectMajorCode=this.form.projectMajorCode;
           this.basedatact.projectMajorName=this.form.projectMajorName;
           this.basedatact.projectTypeCode=this.form.projectTypeCode;
           this.basedatact.projectTypeName=this.form.projectTypeName;
           editpro.upItem(this.basedatact).then(titem=>{
             if (titem.code ===200)
             {
                this.$message.success("更新项目完成！")
                let ref = {
                        projectKeyid: this.basedatact.keyid,
                        projectCode: this.basedatact.projectCode,
                        projectName: this.basedatact.projectName,
                }
                 //添加工作计划的服务类容
                gop.delWorkPlanpkid(ref).then(ditem=>{
                  console.log(ditem);
                  if(ditem.code===200)
                  {
                    this.form.serviceContent.forEach(item => {
                          Object.assign(item,ref)
                          console.log(item);
                          gop.addWorkPlanDataList(item)
                      })
                  }
                });
             }
             else{
               this.$message.error("数据处理异常！");
             }
           });
        }
        else
        {
          this.$message.error("请完善录入信息！");
        }
      }
    }
}
</script>
<style lang="less" scoped>
.workcontent{
    margin-top: 10px;
    width: 600px;
}
.workcontService{
  margin: 0px 5px;
  width: 80%;
}
</style>
