<template>
  <el-dialog title="" :visible.sync="dialogVisible" v-if="dialogVisible" width="90%" @close="dialogClose" :close-on-click-modal="false" :fullscreen="false" class="myPicShowDialogClass" :destroy-on-close="true">
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
            <span>投标数据统计</span>
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
          <echatrmoney :showdata="echartsdata" v-if="money"></echatrmoney>
          <echatrshow :showdata="echartsdata" v-else></echatrshow>
        </div>
        <div class="flex-itemabutton">
          <public-button classhd="hd" :plain="true" name="FREE" title="全部投标" @click="drawlien('tender')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="自主投标" @click="drawlien('autonomy')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="其它投标" @click="drawlien('otherTender')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="分支投标" @click="drawlien('branch')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="自主报价" @click="drawlien('freeQuotation')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="其它报价" @click="drawlien('otherQuotation')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="保证金" @click="drawlien('cautionMoney')"></public-button>
        </div>
      </div>
    </div>
    <div class="dialog-footer"></div>
  </el-dialog>
</template>
<script>
import * as bidanaly from "@/api/webapi-bidRecord.js";
import echatrshow from "./echart_show.vue"
import echatrmoney from "./echart_money.vue"
export default {
name:"echart_customer",
components:{
  echatrshow,
  echatrmoney
},
data(){
    return{
        dialogVisible:false,
        money:false,
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
          etitle:""
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
      drawlien(tcode){
         switch(tcode){
           case "tender":
             this.echartsdata.edata=this.currEchartdata.edata.All;
             this.echartsdata.etitle=this.currEchartdata.etitle+">全部投标";
             this.money=false;
            break;
           case "autonomy":
             this.echartsdata.edata=this.currEchartdata.edata.Autonomy;
             this.echartsdata.etitle=this.currEchartdata.etitle+">自主投标";
             this.money=false;
            break;
           case "otherTender":
             this.echartsdata.edata=this.currEchartdata.edata.OtherTender;
             this.echartsdata.etitle=this.currEchartdata.etitle+">其它投标";
             this.money=false;
            break;
           case "branch":
             this.echartsdata.edata=this.currEchartdata.edata.Branch;
             this.echartsdata.etitle=this.currEchartdata.etitle+">分支投标";
             this.money=false;
            break;
           case "freeQuotation":
             this.echartsdata.edata=this.currEchartdata.edata.FreeQuotation;
             this.echartsdata.etitle=this.currEchartdata.etitle+">自主报价";
             this.money=false;
            break;
           case "otherQuotation":
             this.echartsdata.edata=this.currEchartdata.edata.OtherQuotation;
             this.echartsdata.etitle=this.currEchartdata.etitle+">其它报价";
             this.money=false;
            break;
           case "cautionMoney":
             this.echartsdata.edata=this.currEchartdata.edata.CautionMoney;
             this.echartsdata.etitle=this.currEchartdata.etitle+">保证金";
             this.money=true;
            break;
         }
      },
      getanalysisdata()
      {
        this.loading=true;
        bidanaly.getanalysisdata(this.hdAnalydes)
        .then(item => {
          this.loading=false;
          this.money=false;
          if (item.code==200)
            {
              this.andata=item.data;
              console.log(this.andata);
              this.currEchartdata.edata=item.data[0].analysisData.baseCount;
              this.currEchartdata.etitle=item.data[0].analyOrgName;
              this.echartsdata.edata=item.data[0].analysisData.baseCount;
              this.echartsdata.etitle=item.data[0].analyOrgName+">全部投标";
            }
        })
        .catch((error) => {
          this.loading=false;
          console.log("有问题！！");
        });
      },
      handleNodeClick(data) {
        this.money=false;
        if (data.flage==='org')
        {
            this.currEchartdata.edata=data.analysisData.baseCount;
            this.currEchartdata.etitle=data.analyOrgName;
            this.echartsdata.edata=data.analysisData.baseCount.All;
            this.echartsdata.etitle=data.analyOrgName+">全部投标";
        }
        if (data.flage==='per')
        {
            this.currEchartdata.edata=data.persiondata;
            this.currEchartdata.etitle=data.analyOrgName;
            this.echartsdata.edata=data.persiondata.All;
            this.echartsdata.etitle=data.analyOrgName+">全部投标";
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