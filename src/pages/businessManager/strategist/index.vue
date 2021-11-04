<template>
    <div class="flex-container">
      <div class="flex-item-head">
        <div class="headleft">
          <div class="itemico">
              <el-date-picker v-model="hdAnalydes.dateyear" type="year" placeholder="请选择年份" format="yyyy" value-format="yyyy" @blur="changeevent">
              </el-date-picker>
          </div>
        </div>
        <div class="headcontext">
          <div>
            <span>业务数据统计</span>
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
          <component :is="currcomps" :showdata="echartsdata"></component>
        </div>
        <div class="flex-itemabutton">
          <el-radio-group v-model="btnmoney" size="mini">
            <el-radio-button :label="false" size="mini">总量</el-radio-button>
            <el-radio-button :label="true" size="mini">产值</el-radio-button>
          </el-radio-group>
          <public-button classhd="hd" :plain="true" name="FREE" title="开展情况" @click="drawlien('XM006')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="工程咨询" @click="drawlien('XM001')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="造价咨询" @click="drawlien('XM002')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="项目管理" @click="drawlien('XM003')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="工程监理" @click="drawlien('XM004')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="招标代理" @click="drawlien('XM005')"></public-button>
        </div>
      </div>
    </div>
</template>
<script>
//战略 统计 运筹 分布 布局
import * as dataanaly from "@/api/echart_businessmanager.js";
import echartBusiness from "./components/echartBusiness.vue"
import echartBusinessMony from "./components/echartBusinessMony.vue"
export default {
name:"echart_businessmanager",
components:{
  echartBusinessMony,
  echartBusiness
},
data(){
    return{
        dialogVisible:false,
        btnmoney:false,
        currcomps:"echartBusiness",
        loading:false,
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
          etitle:"",
          money:false
        },
        currEchartdata:{
          edata:{},
          etitle:""
        }
    }
},
watch:{
  btnmoney(val, oldVal){
    console.log(val)
    if(val){
      this.currcomps="echartBusinessMony";
      }
    else{
      this.currcomps="echartBusiness";
    }
    console.log(this.currcomps);
  }
},
created(){
  this.hdAnalydes.dateyear=new Date().getFullYear().toString();
},
mounted(){
  this.getanalysisdata();
},
methods:{
      drawlien(tcode){
         switch(tcode){
           case "XM001":
             this.echartsdata.edata=this.currEchartdata.edata.XM001;
             this.echartsdata.etitle=this.currEchartdata.etitle+">工程咨询";
            break;
           case "XM002":
             this.echartsdata.edata=this.currEchartdata.edata.XM002;
             this.echartsdata.etitle=this.currEchartdata.etitle+">造价咨询";
            break;
           case "XM003":
             this.echartsdata.edata=this.currEchartdata.edata.XM003;
             this.echartsdata.etitle=this.currEchartdata.etitle+">项目管理";
            break;
           case "XM004":
             this.echartsdata.edata=this.currEchartdata.edata.XM004;
             this.echartsdata.etitle=this.currEchartdata.etitle+">工程监理";
            break;
           case "XM005":
             this.echartsdata.edata=this.currEchartdata.edata.XM005;
             this.echartsdata.etitle=this.currEchartdata.etitle+">招标代理";
            break;
           case "XM006":
             this.echartsdata.edata=this.currEchartdata.edata.XM006;
             this.echartsdata.etitle=this.currEchartdata.etitle+">开展情况";
            break;
         }
      },
      getanalysisdata()
      {
        this.loading=true;
        dataanaly.allanalysprocontractdata(this.hdAnalydes)
        .then(item => {
          this.loading=false;
          if (item.code==200)
            {
              this.andata=item.data;
              this.currEchartdata.edata=this.andata[0].analysisData.analy;
              this.currEchartdata.etitle=this.andata[0].analyOrgName;
              this.echartsdata.edata=this.andata[0].analysisData.analy.XM006;
              this.echartsdata.etitle=this.andata[0].analyOrgName;
            }
        })
        .catch((error) => {
          this.loading=false;
          console.log("统计有问题！！"+error);
        });
      },
      handleNodeClick(data) {
        this.money=false;
        if (data.flage==='org')
        {
          this.currEchartdata.edata=data.analysisData.analy;
          this.currEchartdata.etitle=data.analyOrgName;
          this.echartsdata.edata=data.analysisData.analy.XM006;
          this.echartsdata.etitle=data.analyOrgName+">开展情况";;
        }
        if (data.flage==='per')
        {
          this.currEchartdata.edata=data.analysisData.persionpro;
          this.currEchartdata.etitle=data.analyOrgName;
          this.echartsdata.edata=data.analysisData.persionpro.XM006;
          this.echartsdata.etitle=data.analyOrgName+">开展情况";;
        }
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
    width: 70%;
  }
  .flex-itemabutton{
    display: flex;
    margin: 2px;
    border: 2px solid rgb(235, 237, 238);
    border-radius: 2px;
    flex-direction: column;
    height: 590;
    width: 10%;
    justify-content:flex-start;
    align-content: flex-start;
    vertical-align: middle;
    background-color: #fcfcfa;
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