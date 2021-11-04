 <template>
    <el-dialog  :visible.sync="dialogVisible" v-if="dialogVisible" width="80%" @close="dialogClose" :close-on-click-modal="false" :fullscreen="false" class="myPicShowDialogClass" :destroy-on-close="true">
      <div class="flex-container">
            <div class="flex-item-head">
                    <div class="headleft">
                        <div class="itemico"><i class="fa fa-id-card fa-3x fa-fw"></i></div>
                        <span class="item">
                          客户({{this.andata.analysisData.baseEntitySum}})
                        </span>
                    </div>
                    <div class="headcontext">
                        <div>
                            <span>{{this.andata.analysisData.baseEntityName}}-地图分布</span>
                        </div>  
                    </div>
            </div>
            <div class="flex-item-context">
                <div class="flex-itemtree"></div>
                <div class="flex-itemcontext">
                  <echartmap></echartmap>
                </div>
                <div class="flex-itemabutton"></div>
            </div>
      </div>
    <div class="dialog-footer"></div>
    </el-dialog>
</template>
<script>
import * as analy from "@/api/webapi-customer.js";
import echartmap from "./echart_map.vue";
export default {
name:"echart_customer",
components:{
  echartmap
},
data(){
    return{
        dialogVisible:false,
        andata:{
          analyOrgKeyid:'',
          analyOrgName:"",
          analyOrgPkeyid:"",
          analysisData:{},
          analysum:0,
          children:[]
        },
        formRules:[]
    }
},
created(){
  this.getanalydata();
},
mounted(){
},
methods:{
      getanalydata()
      {
        analy.get_an_Customer({})
                .then(item => {
                  if (item.code==200)
                    {
                      this.andata=item.data;
                      console.log(this.andata);
                    }
                })
                .catch((error) => {
                  console.log("客户 统计分析 有问题！！");
                });
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
.flex-container
{
   display:flex;
   width: 100%;
   height: 650px!important;
   background: #f5f6fa;
   flex-direction: column;
   justify-content:center;
   padding: 0px;
   margin-bottom: 31px;
}
.flex-container .flex-item-context{
  display: flex;
  width: 100%;
  background-color: #f5f6fa!important;
  height: 545px!important;
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
      height: 500;
      width: 23%;
  }
  .flex-itemcontext{
    margin: 2px;
    border: 2px solid rgb(235, 237, 238);
    border-radius: 2px;
    height: 500;
    width: 74%;
  }
  .flex-itemabutton{
    margin: 2px;
    border: 2px solid rgb(235, 237, 238);
    border-radius: 2px;
    height: 500;
    width: 2%;
    background-color: #eeeff7;
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
      align-items:center;
      vertical-align: middle;
      .item{
        margin-left: 10px;
        height: 24px;
        line-height:24px ;
        font-size: 24px;
      }
      .itemico{
        margin-left: 25px;
        height: 40px;
        width: 60px;
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