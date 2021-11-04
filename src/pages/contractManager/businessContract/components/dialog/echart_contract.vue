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
            <span>合同统计分析</span>
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
          <showechart-data :showdata="echartsdata"></showechart-data>
        </div>
        <div class="flex-itemabutton">
          <public-button classhd="hd" :plain="true" name="FREE" title="全部合同" @click="drawlien('HTTOTAL')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="咨询合同" @click="drawlien('HT001')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="造价合同" @click="drawlien('HT002')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="招标合同" @click="drawlien('HT003')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="监理合同" @click="drawlien('HT004')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="项管合同" @click="drawlien('HT005')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="全咨合同" @click="drawlien('HT006')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="综合合同" @click="drawlien('HT007')"></public-button>
          <public-button classhd="hd" :plain="true" name="FREE" title="框架合同" @click="drawlien('HT008')"></public-button>
        </div>
      </div>
    </div>
    <div class="dialog-footer"></div>
  </el-dialog>
</template>
<script>
import * as analy from "@/api/webapi-contract.js";
import showechartData from "./showechartData.vue"
export default {
name:"echart_customer",
components:{
  showechartData
},
data(){
    return{
        dialogVisible:false,
        loading:false,
        andata:{
          analyOrgKeyid:'',
          analyOrgName:"",
          analyOrgPkeyid:"",
          analysisData:{},
          analysum:0,
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
          data:{},
          title:""
        },
        currEchartdata:{}
    }
},

created(){
  this.hdAnalydes.dateyear=new Date().getFullYear().toString();
},
mounted(){
  console.log(this.hdAnalydes.dateyear);
  this.getanalysisdata();
},
methods:{
      drawlien(tcode){
         switch(tcode){
           case "HT006":
             this.echartsdata.data=this.currEchartdata.analysisData.analy.HT006;
             this.echartsdata.title=this.currEchartdata.analyOrgName+">全过程咨询合同";
            break;
           case "HT001":
             this.echartsdata.data=this.currEchartdata.analysisData.analy.HT001;
             this.echartsdata.title=this.currEchartdata.analyOrgName+">工程咨询合同";
            break;
           case "HT004":
             this.echartsdata.data=this.currEchartdata.analysisData.analy.HT004;
             this.echartsdata.title=this.currEchartdata.analyOrgName+">工程监理合同";
            break;
           case "HT003":
             this.echartsdata.data=this.currEchartdata.analysisData.analy.HT003;
             this.echartsdata.title=this.currEchartdata.analyOrgName+">招标代理合同";
            break;
           case "HT008":
             this.echartsdata.data=this.currEchartdata.analysisData.analy.HT008;
             this.echartsdata.title=this.currEchartdata.analyOrgName+">框架或入库合同";
            break;
           case "HT007":
             this.echartsdata.data=this.currEchartdata.analysisData.analy.HT007;
             this.echartsdata.title=this.currEchartdata.analyOrgName+">综合业务合同";
            break;
           case "HT002":
             this.echartsdata.data=this.currEchartdata.analysisData.analy.HT002;
             this.echartsdata.title=this.currEchartdata.analyOrgName+">造价咨询合同";
            break;
           case "HT005":
             this.echartsdata.data=this.currEchartdata.analysisData.analy.HT005;
             this.echartsdata.title=this.currEchartdata.analyOrgName+">项目管理合同";
            break;
          case "HTTOTAL":
             this.echartsdata.data=this.currEchartdata.analysisData.analy.HTTOTAL;
             this.echartsdata.title=this.currEchartdata.analyOrgName+">全部合同";
            break;
         }
      },
      getanalysisdata()
      {
        this.loading=true;
        analy.dbc_analydes(this.hdAnalydes)
        .then(item => {
          this.loading=false;
          if (item.code==200)
            {
              this.andata=item.data;
              this.currEchartdata=item.data[0];
              this.echartsdata.data=this.currEchartdata.analysisData.analy.HTTOTAL;
              this.echartsdata.title=this.currEchartdata.analyOrgName+">全部合同";
            }
        })
        .catch((error) => {
          this.loading=false;
          console.log("有问题！！");
        });
      },
      handleNodeClick(data) {
        this.currEchartdata=data;
        this.echartsdata.data=data.analysisData.analy.HTTOTAL;
        this.echartsdata.title=data.analyOrgName+">全部合同";
      },
      changeevent(){
          this.getanalysisdata();
      },
      openDialog(){
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