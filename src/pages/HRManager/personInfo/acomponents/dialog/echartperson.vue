<template>
  <el-dialog title="" :visible.sync="dialogVisible" v-if="dialogVisible" width="90%" @close="dialogClose" :close-on-click-modal="false" :fullscreen="false" class="myPicShowDialogClass" :destroy-on-close="true">
    <div class="flex-container">
      <div class="flex-item-head">
        <div class="headleft">
          <div class="itemico">
              <el-date-picker v-model="hdAnalydes.dateyear" type="year" placeholder="请选择年份" format="yyyy" value-format="yyyy" @blur="changeevent" disabled>
              </el-date-picker>
          </div>
        </div>
        <div class="headcontext">
          <div>
            <span>人员统计分析</span>
          </div>
        </div>
      </div>
      <div class="flex-item-context">
        <div class="flex-itemtree">
          <el-scrollbar style='height:100%'>
              <el-tree 
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="andata" 
              :props="defaultProps" 
              @node-click="handleNodeClick"
              ></el-tree>
          </el-scrollbar>
        </div>
        <div class="flex-itemcontext">
          <echartpersonbar :showdata="echartsdata" v-if="echartbar"></echartpersonbar>
          <echartpersonpie :showdata="echartsdata" v-else></echartpersonpie>
        </div>
        <div class="flex-itemabutton">
          <public-button classhd="hd" :plain="true" name="FREE" title="人员类型" @click="drawlien('person')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="男女构成" @click="drawlien('gender')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="学历构成" @click="drawlien('education')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="年龄构成" @click="drawlien('age')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="工龄构成" @click="drawlien('workAge')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="岗位人数" @click="drawlien('jobNum')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="初级职称" @click="drawlien('earlyPostName')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="中级职称" @click="drawlien('middlePostName')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="高级职称" @click="drawlien('highPostName')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="监理执业" @click="drawlien('supPractice')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="造价执业" @click="drawlien('costPractice')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="招标执业" @click="drawlien('tenderPractice')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="咨询执业" @click="drawlien('consultPractice')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="其它执业" @click="drawlien('otherPractice')"></public-button>
        </div>
      </div>
    </div>
    <div class="dialog-footer"></div>
  </el-dialog>
</template>
<script>
import {person_analydes} from "@/api/webapi-hr.js"
import echartpersonbar from "./echartpersonBar.vue"
import echartpersonpie from "./echartpersonpie.vue"
export default {
name:"echart_customer",
components:{
echartpersonbar,
echartpersonpie
},
data(){
    return{
        dialogVisible:false,
        money:false,
        loading:false,
        echartbar:false,
        andata:{
          analyAllOrgKeyid:'',
          analyOrgKeyid:"",
          analyOrgName:"",
          analyOrgPkeyid:"",
          analysum:0,
          analycount:0,
          analysisData:{},
          persiondata:{},
          children:[]
        },
        formRules:[],
        defaultProps: {
          children: 'children',
          label: 'analyOrgName'
        },
        hdAnalydes:{
          orgkeyid:"0000",
          orgname:"",
          allorgkeyid:"",
          dateyear:"2021",
          option:""
        },
        echartsdata:{
          edata:{},
          piedata:[],
          data:[],
          datalabel:[],
          etitle:"",
          title:""
        },
        currEchartdata:{
          edata:{},
          etitle:""
        }
    }
},

created(){
  this.hdAnalydes.dateyear=new Date().getFullYear().toString();
},
mounted(){
  this.getanalysisdata();
},
methods:{
      //parseInt(val.edata.mon08.tenderCount)
      drawlien(tcode){
         switch(tcode){
           case "person":
             this.echartsdata.edata=this.currEchartdata.edata.person;
             this.echartsdata.data=[parseInt(this.echartsdata.edata.HT001),
             parseInt(this.echartsdata.edata.HT002),
             parseInt(this.echartsdata.edata.HT003),
             parseInt(this.echartsdata.edata.HT004),
             parseInt(this.echartsdata.edata.HT005),
             parseInt(this.echartsdata.edata.HT006),
             parseInt(this.echartsdata.edata.Other)];
             this.echartsdata.datalabel=["编内-合同-社保","编内-劳务-退休","编内-劳务","编外-合同-社保","编外-劳务-退休","编外","其它"];
             this.echartsdata.etitle=this.currEchartdata.etitle+">人员类型";
             this.echartsdata.title="人员类型";
             this.echartbar=true;
            break;
           case "gender":
             this.echartsdata.edata=this.currEchartdata.edata.gender;
             this.echartsdata.piedata=[{value:parseInt(this.echartsdata.edata.male),name:"男"},{value:parseInt(this.echartsdata.edata.Female),name:"女"},{value:parseInt(this.echartsdata.edata.Other),name:"其它"}];
             this.echartsdata.etitle=this.currEchartdata.etitle+">男女构成";
             this.echartsdata.title="男女构成";
             this.echartbar=false;
            break;
           case "education":
             this.echartsdata.edata=this.currEchartdata.edata.education;
              this.echartsdata.piedata=[
                {value:parseInt(this.echartsdata.edata.EDU01),name:"博士"},
                {value:parseInt(this.echartsdata.edata.EDU02),name:"研究生"},
                {value:parseInt(this.echartsdata.edata.EDU03),name:"本科"},
                {value:parseInt(this.echartsdata.edata.EDU04),name:"大专"},
                {value:parseInt(this.echartsdata.edata.EDU05),name:"大专以下"},
                {value:parseInt(this.echartsdata.edata.Other),name:"其它"}];
             this.echartsdata.etitle=this.currEchartdata.etitle+">学历构成";
             this.echartsdata.title="学历构成";
             this.echartbar=false;
            break;
           case "age":
             this.echartsdata.edata=this.currEchartdata.edata.age;
             //、、、、
             this.echartsdata.piedata=[
                {value:parseInt(this.echartsdata.edata.Age01),name:"16-25"},
                {value:parseInt(this.echartsdata.edata.Age02),name:"26-35"},
                {value:parseInt(this.echartsdata.edata.Age03),name:"36-45"},
                {value:parseInt(this.echartsdata.edata.Age04),name:"46-50"},
                {value:parseInt(this.echartsdata.edata.Age05),name:"50以上"}];
             this.echartsdata.etitle=this.currEchartdata.etitle+">年龄构成";
             this.echartsdata.title="年龄构成";
             this.echartbar=false;
            break;
          case "workAge":
             this.echartsdata.edata=this.currEchartdata.edata.workAge;
             //、、、、、
             this.echartsdata.piedata=[
                {value:parseInt(this.echartsdata.edata.WorkAge01),name:"半年"},
                {value:parseInt(this.echartsdata.edata.WorkAge02),name:"半年-1年"},
                {value:parseInt(this.echartsdata.edata.WorkAge03),name:"1-3年"},
                {value:parseInt(this.echartsdata.edata.WorkAge04),name:"3-5年"},
                {value:parseInt(this.echartsdata.edata.WorkAge05),name:"5-10年"},
                {value:parseInt(this.echartsdata.edata.WorkAge06),name:"10年以上"},
                {value:parseInt(this.echartsdata.edata.Other),name:"其它"}];
             this.echartsdata.etitle=this.currEchartdata.etitle+">工龄构成";
             this.echartsdata.title="工龄构成";
             this.echartbar=false;
            break;
           case "jobNum":
             this.echartsdata.edata=this.currEchartdata.edata.jobNum;
             this.echartsdata.data=[
             parseInt(this.echartsdata.edata.JobNum01),
             parseInt(this.echartsdata.edata.JobNum02),
             parseInt(this.echartsdata.edata.JobNum03),
             parseInt(this.echartsdata.edata.JobNum04),
             parseInt(this.echartsdata.edata.JobNum05)];
             this.echartsdata.datalabel=["项目经理","专员","总监理工程师","专业监理工程师","监理员"];
             this.echartsdata.etitle=this.currEchartdata.etitle+">岗位人数";
             this.echartsdata.title="岗位人数";
             this.echartbar=true;
            break;
           case "earlyPostName":
             this.echartsdata.edata=this.currEchartdata.edata.earlyPostName;
             this.echartsdata.data=[
             parseInt(this.echartsdata.edata.EarlyPost),
             parseInt(this.echartsdata.edata.EarlyEngineering),
             parseInt(this.echartsdata.edata.EarlyEconomics),
             parseInt(this.echartsdata.edata.EarlyOther)];
             this.echartsdata.datalabel=["初级职称","工程类","经济类","其他"];
             this.echartsdata.etitle=this.currEchartdata.etitle+">初级职称";
             this.echartsdata.title="初级职称";
             this.echartbar=true;
            break;
           case "middlePostName":
             this.echartsdata.edata=this.currEchartdata.edata.middlePostName;
             this.echartsdata.data=[
             parseInt(this.echartsdata.edata.MiddlePost),
             parseInt(this.echartsdata.edata.MiddleEngineering),
             parseInt(this.echartsdata.edata.MiddleEconomics),
             parseInt(this.echartsdata.edata.MiddleOther)];
             this.echartsdata.datalabel=["中级职称","工程类","经济类","其他"];
             this.echartsdata.etitle=this.currEchartdata.etitle+">中级职称";
             this.echartsdata.title="中级职称";
             this.echartbar=true;
            break;
             case "highPostName":
             this.echartsdata.edata=this.currEchartdata.edata.highPostName;
             this.echartsdata.data=[
             parseInt(this.echartsdata.edata.HighPost),
             parseInt(this.echartsdata.edata.HighEngineering),
             parseInt(this.echartsdata.edata.HighEconomics),
             parseInt(this.echartsdata.edata.HighOther)];
             this.echartsdata.datalabel=["高级职称","工程类","经济类","其他"];
             this.echartsdata.etitle=this.currEchartdata.etitle+">高级职称";
             this.echartsdata.title="高级职称";
             this.echartbar=true;
            break;
             case "supPractice":
             this.echartsdata.edata=this.currEchartdata.edata.supPractice;
             this.echartsdata.data=[
             parseInt(this.echartsdata.edata.Sup001),
             parseInt(this.echartsdata.edata.Sup002),
             parseInt(this.echartsdata.edata.Sup003),
             parseInt(this.echartsdata.edata.Sup004),
             parseInt(this.echartsdata.edata.Sup005)];
             this.echartsdata.datalabel=["监理工程师","安全监理工程师","专业监理工程师","专职安全监理员","监理员"];
             //、、、、
             this.echartsdata.etitle=this.currEchartdata.etitle+">监理执业";
             this.echartsdata.title="监理执业";
             this.echartbar=true;
            break;
             case "costPractice":
             this.echartsdata.edata=this.currEchartdata.edata.costPractice;
              this.echartsdata.data=[
             parseInt(this.echartsdata.edata.Cost001),
             parseInt(this.echartsdata.edata.Cost002),
             parseInt(this.echartsdata.edata.Cost003),
             parseInt(this.echartsdata.edata.Cost004),
             parseInt(this.echartsdata.edata.Cost005)];
             this.echartsdata.datalabel=["一级造价工程师","二级造价工程师","一级水利造价工程师","二级水利造价工程师","通信建设工程管理培训证"];
             //、、、、
             this.echartsdata.etitle=this.currEchartdata.etitle+">造价执业";
             this.echartsdata.title="造价执业";
             this.echartbar=true;
            break;
             case "tenderPractice":
             this.echartsdata.edata=this.currEchartdata.edata.tenderPractice;
             this.echartsdata.data=[
             parseInt(this.echartsdata.edata.Tender001),
             parseInt(this.echartsdata.edata.Tender002),
             parseInt(this.echartsdata.edata.Tender003),
             parseInt(this.echartsdata.edata.Tender004),
             parseInt(this.echartsdata.edata.Tender005)];
             this.echartsdata.datalabel=["招标师","招标专职人员","招标从业人员","招标采购专职从业人员","水利交易员"];
            //招标执业：、、、、
             this.echartsdata.etitle=this.currEchartdata.etitle+">招标执业";
             this.echartsdata.title="招标执业";
             this.echartbar=true;
            break;
             case "consultPractice":
             this.echartsdata.edata=this.currEchartdata.edata.consultPractice;
             this.echartsdata.data=[
             parseInt(this.echartsdata.edata.Consult001)];
             this.echartsdata.datalabel=["咨询工程师"];
             //咨询执业：咨询工程师
             this.echartsdata.etitle=this.currEchartdata.etitle+">咨询执业";
             this.echartsdata.title="咨询执业";
             this.echartbar=true;
            break;
             case "otherPractice":
             this.echartsdata.edata=this.currEchartdata.edata.otherPractice;
             this.echartsdata.data=[
             parseInt(this.echartsdata.edata.Other001),
             parseInt(this.echartsdata.edata.Other001),
             parseInt(this.echartsdata.edata.Other001),
             parseInt(this.echartsdata.edata.Other001),
             parseInt(this.echartsdata.edata.Other001)];
             this.echartsdata.datalabel=["一级建造师","二级建造师","中级注册安全工程师"];
             //其他执业：、、
             this.echartsdata.etitle=this.currEchartdata.etitle+">其它执业";
             this.echartsdata.title="其它执业";
             this.echartbar=true;
            break;
         }
      },
      getanalysisdata()
      {
        this.loading=true;
        person_analydes(this.hdAnalydes)
        .then(item => {
          this.loading=false;
          this.money=false;
          if (item.code==200)
            {
              this.andata=item.data;
              //console.log(this.andata);
              this.currEchartdata.edata=item.data[0].analysisData.baseEntity;
              this.currEchartdata.etitle=item.data[0].analyOrgName;
              this.echartsdata.edata=item.data[0].analysisData.baseEntity.person;
              this.echartsdata.etitle=item.data[0].analyOrgName+">人员类型";
            }
        })
        .catch((error) => {
          this.loading=false;
          //console.log("有问题！！");
        });
      },
      handleNodeClick(data) {
        this.currEchartdata.edata=data.analysisData.baseEntity;
        this.currEchartdata.etitle=data.analyOrgName;
        this.echartsdata.edata=data.analysisData.baseEntity.person;
        this.echartsdata.etitle=data.analyOrgName+">人员类型";
      },
      changeevent(){
         this.getanalysisdata();
      },
      openDialog(){
        this.money=false;
        this.dialogVisible=true
      },
      dialogClose(){
        this.dialogVisible=false
      },
      submitFormData(){
        this.dialogVisible=false
      }
 }
}
</script>
<style lang="less">
.el-tree-node:focus > .el-tree-node__content {
    background-color: #66b1ff87 !important;
  }
  .el-tree-node__content:hover {    background-color: #66b1ff87;
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #66b1ff87;
  }

.flex-container
{
   display:flex;
   width: 100%;
   height: 700px!important;
   background: #fafafa;
   flex-direction: column;
   justify-content:center;
   padding: 0px;
   margin-bottom: 31px;
}
.flex-container .flex-item-context{
  display: flex;
  width: 100%;
  height: 595px!important;
  border-top: 2px solid rgb(3, 142, 197);
  border-bottom: 2px solid rgb(3, 119, 165);
  margin: 1px;
  flex-direction: row;
  align-content: center;
  justify-content:center;
  .flex-itemtree{
      margin: 2px;
      border: 2px solid rgb(235, 237, 238);
      border-radius: 2px;
      height: 590;
      width: 20%;
  }
  .flex-itemcontext{
    margin: 1px;
    padding: 0px;
    border: 2px solid rgb(235, 237, 238);
    border-radius: 2px;
    height: 590;
    width: 74%;
  }
  .flex-itemabutton{
    display: flex;
    margin: 2px;
    border: 2px solid rgb(235, 237, 238);
    border-radius: 2px;
    flex-direction: column;
    height: 590;
    width: 5%;
    justify-content:flex-start;
    align-content: flex-start;
    background-color: #fafbfc;
  }
}

.flex-container .flex-item-head {
    display: flex;
    background-color: #f5f6fa;
    width: 100%;
    height: 100px;
    flex-direction: row;
    align-content: center;
    justify-content:center;
    margin: 1px;
    .headleft{
      height: 100px;
      width: 30%;
      display: flex;
      -webkit-flex-direction: row;
      flex-direction: row;
      justify-content:flex-start;
      align-items: center;
      .item{
        margin-left: 10px;
        height: 24px;
        line-height:24px ;
        font-size: 24px;
      }
      .itemico{
        margin-left: 30px;
        height: 60px;
        width: 150px;
      }
    };
    .headcontext{
      height: 100px;
      width: 69%;
      text-align: center;
      span{
        width: 99%;
        line-height: 99px;
        font-size: 45px;
        letter-spacing:10px
      }
    };
}
// /*蒙层部分*/
.myPicShowDialogClass{
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.219);
  z-index: 101;
  overflow: hidden;
}
.myPicShowDialogClass .el-dialog{
  margin: 0px!important;
  padding: 0px!important;
}

/*框体部分*/
.myPicShowDialogClass .el-dialog .el-dialog__header{
  background: #3fbfee!important;
  background-image: linear-gradient(to top,#3fbfee,#047199 #3fbfee)!important;
  color: #fff!important;
  height:30px;
  padding:1px;
  .el-dialog__headerbtn{
    top:6px!important;
    .el-icon{
       color: #fff!important;
    }
  }
}
.myPicShowDialogClass .dialog-footer{
    position: absolute;
    bottom: 0px;
    left:0px;
    width: 100%!important;
    background: #3fbfee!important;
    background-image: linear-gradient(to top,#3fbfee,#047199 #3fbfee)!important;
    height:30px!important;
    margin: 0px!important;
}

/*head 部分*/
.myPicShowDialogClass .el-dialog .el-dialog__body{
   border: 2px solid #faf9fa!important;
   padding:1px;
   height: 99%;
}
</style>