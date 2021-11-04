<template>
    <div> 
     <div>
         <public-button name="FREE" type="primary" icon="el-icon-plus" size="mini" @click="networkAddData()" title="新建分包"></public-button>
     </div>
     <div class="tdtable">
        <el-table ref="tableRef"
                      :data="dataList"
                      style="width: 100%"
                      align="left"
                      height="7.5rem"
                      highlight-current-row
                      :header-cell-style="{fontSize:'12px'}"
                      border>
              <el-table-column prop="statuscode" label="状态" fixed="left" width="50px">
                <template slot-scope="scope">
                    {{scope.row.statuscode?"正常":"取消"}}
                </template>
              </el-table-column>
              <el-table-column prop="bidsectioncode" label="分包编号"  width="145px" fixed="left"></el-table-column>
              <el-table-column prop="bidsectionname" label="分包名称" show-overflow-tooltip width="240px" fixed="left"></el-table-column>
              <el-table-column prop="bidopeningdateTime" label="开标时间" width="145px"></el-table-column>
              <el-table-column prop="delaydateTime" label="投标/报价资料" width="120px">
               <template slot-scope="scope">
                 <download-button :value="scope.row.bidsectionfile"></download-button>
               </template>
              </el-table-column>
              <el-table-column  label="保证金" width="100px">
              <template slot-scope="scope">
                  <el-popover trigger="click" placement="top">
                  <p>保证金(元)：{{scope.row.proCautionMoney}} </p>
                  <p>缴纳时间：{{scope.row.bondpaydateTime}} </p>
                  <p>缴纳凭证：<download-button :value="scope.row.bondpayfile"></download-button></p>
                  <p>退回时间：{{scope.row.bondbackdateTime}} </p>
                  <p>退回凭证：<download-button :value="scope.row.bondbackfile"></download-button></p>
                  <div slot="reference">
                   <el-tag size="medium">详细</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="sceneimagefile" label="现场图片">
                <template slot-scope="scope">
                  <download-button :value="scope.row.sceneimagefile"></download-button>
                </template>
              </el-table-column>
              <el-table-column label="公司报价">
                <template slot-scope="scope">
                  <el-popover trigger="click" placement="top">
                    <p>1次报价：{{scope.row.companyquotationsum1}} </p>
                    <p>2次报价：{{scope.row.companyquotationsum2}} </p>
                    <p>3次报价：{{scope.row.companyquotationsum3}} </p>
                    <div slot="reference">
                      <el-tag size="medium">详细</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="otherlist" label="其他报价" align="center">
                <template slot-scope="scope">
                  <el-popover trigger="click" placement="top">
                    <el-table :data="scope.row.otherlist" border>
                      <el-table-column label="单位名称" prop="othercompanyname" show-overflow-tooltip width="240px"></el-table-column>
                      <el-table-column label="一次报价" prop="otherquotationsum1" show-overflow-tooltip width="180px"></el-table-column>
                      <el-table-column label="二次报价" prop="otherquotationsum2" show-overflow-tooltip width="180px"></el-table-column>
                      <el-table-column label="三次报价" prop="otherquotationsum3" show-overflow-tooltip width="180px"></el-table-column>
                    </el-table>
                    <div slot="reference">
                      <el-tag size="medium">详细</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="tendernumber" label="投标家数" ></el-table-column>
              <el-table-column prop="iswinbidding" label="是否中标">
                <template slot-scope="scope">
                  {{scope.row.iswinbidding===true?'是':scope.row.iswinbidding===false?'否':''}}
                </template>
              </el-table-column>
              <el-table-column prop="winbiddingsum" label="中标价" show-overflow-tooltip width="240px">
                <!--
                <template slot-scope="scope">
                  {{scope.row.winbiddingsum===0?'':scope.row.winbiddingsum}}
                </template>
                -->
              </el-table-column>
              <el-table-column prop="winbiddingfile" label="中标通知书">
                <template slot-scope="scope">
                  <download-button :value="scope.row.winbiddingfile"></download-button>
                </template>
              </el-table-column>
              <el-table-column prop="winbidlist" label="其他中标情况">
                <template slot-scope="scope">
                  <el-popover trigger="click" placement="top">
                    <el-table :data="scope.row.winbidlist" border>
                      <el-table-column label="单位名称" prop="othercompanyname" show-overflow-tooltip width="240px"></el-table-column>
                      <el-table-column label="中标价" prop="winbiddingsum" show-overflow-tooltip width="100px"></el-table-column>
                    </el-table>
                    <div slot="reference">
                      <el-tag size="medium">详细</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="bidopeningimagefile" label="中标结果截图" width="120px">
                <template slot-scope="scope">
                  <download-button :value="scope.row.bidopeningimagefile"></download-button>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="220px" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" @click="$refs.upRef.openDialog(scope.row)">完善分包</el-button>
                  <el-button type="text" icon="el-icon-delete" size="mini" @click="delbidopen(scope.row)">取消分包</el-button>
                  <el-button type="text" @click="$refs.upresRef.openDialog(scope.row)">完善中标</el-button>
                </template>
              </el-table-column>
            </el-table>
     </div>
     <div class="dialog">
      <add-open-bid-dialog ref="addRef"></add-open-bid-dialog>
      <up-open-bid-dialog ref="upRef" @getFormData="submitFormData" @delOtherCom="networkDelOtherCom"></up-open-bid-dialog>
      <up-result-dialog  ref="upresRef" @getFormData="ressubmitFormData"></up-result-dialog>
    </div>
    </div>
</template>
<script>
 import {
    upBidRecord,
    getBidItemFile,
    getSubcontract,
    addSubcontract,
    upSubcontract,
    delSubcontract,
    getOtherCom,
    addOtherCom,
    delOtherCom
  } from '../../../../api/webapi-bidRecord.js'
import {mapState, mapActions} from 'vuex'
  import AddOpenBidDialog from './dialog/AddOpenBidDialog.vue'
  import UpOpenBidDialog from './dialog/UpOpenBidDialog.vue'
  import UpResultDialog from './dialog/UpResultDialog.vue'
export default {
    components: {
      AddOpenBidDialog,
      UpOpenBidDialog,
      UpResultDialog
    },
    computed: {
      ...mapState('bidManager', {
        item: 'item'
      })
    },
    //数据节点
    data() {
      return {
        tableKey: 1,
        fileList: [],
        dataList: [],
        // 要展开的行，数值的元素是row的key值
        expands: []
      }
    },
 created() {
      this.initdata();
    },
methods: {
      initdata()
      {
        let ref = {
            tenderkeyid: this.item.keyid,
        }
        getSubcontract(ref).then(respitem => {
            this.dataList = respitem.data
        })
    },
    //新增分包
      networkAddData() {
        this.$msgbox.prompt('分包名称', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S+/,
          inputErrorMessage: '不能为空'
        }).then(({value}) => {
          let ref = {
            tenderkeyid:this.item.keyid,
            typeCode:this.item.formtendername,
            bidsectionname:value
          };
          addSubcontract(ref).then(item => {
            this.initdata();
            if (item.code === 200) {
              this.$message.success(item.message)
            }
          })
        })
      },
     delbidopen(biddata)
      {
        this.$confirm("是否确定?","提示!",
        {distinguishCancelAndClose: true,confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(() => 
          {
              biddata.statuscode=false;
              upSubcontract(biddata).then(item => {
                if (item.code === 200) {
                  this.$message.success(item.message)
                }
                this.initdata();
              });
          }).catch((action) => {this.$message({type: "info",message: "已取消！"});});
      },
     submitFormData(formData) {
        upSubcontract(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            formData.otherlist.forEach(other => {
              other.bidopenkeyid = item.data.keyid
              addOtherCom(other)
            })
            this.initdata();
          }
        })
      },
    networkDelOtherCom(dataList) {
        dataList.forEach(item => {
          delOtherCom(item)
        })
        this.initdata();
     },
    ressubmitFormData(formData,delWinbidlist) {
        // formData分包数据
        upSubcontract(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            //从数据库中删除，移除的中标单位
            delWinbidlist.forEach(ref=>{
              delOtherCom(ref)
            })
            //如果是本公司中标，则移除所有其他中标单位
            if (formData.iswinbidding===true){
              if (formData.winbidlist.length > 0) {
                formData.winbidlist.forEach(ref => {
                  if (ref.keyid) {
                    delOtherCom(ref).then(()=>{
                      let ref = {
                        tenderkeyid: this.item.keyid,
                        //typeCode: this.typeCode,
                        //tenderDocKeyid: formData.tenderDocKeyid
                      }
                      getSubcontract(ref).then(item => {
                        this.dataList = item.data
                      })
                    })
                  }
                })
              }
            } else {
              formData.winbidlist.forEach(ref => {
                //判断是否有新增的中标单位，有就添加进库
                if (!ref.keyid) {
                  Object.assign(ref, {bidopenkeyid: formData.keyid})
                  addOtherCom(ref).then(()=>{
                    let ref = {
                      tenderkeyid: this.item.keyid,
                      //typeCode: this.typeCode,
                      //tenderDocKeyid: formData.tenderDocKeyid
                    }
                    getSubcontract(ref).then(item => {
                      this.dataList = item.data
                    })
                  })
                }
              })
            }
            let ref={
              tenderkeyid: this.item.keyid,
              //typeCode: this.typeCode,
              //tenderDocKeyid:formData.tenderDocKeyid
            }
            getSubcontract(ref).then(item => {
              this.dataList = item.data
              //console.log(ref)
              let statusArray=[]
              let yesWinBidding=item.data.find(ref=>{
                return ref.iswinbidding===true
              })
              let noWinBidding=item.data.find(ref=>{
                return ref.iswinbidding===false
              })
              if (yesWinBidding) {
                statusArray.push('3')
              }
              if (noWinBidding) {
                statusArray.push('4')
              }
              let bidItem=this.$myfunction.copyData(this.item)
              bidItem.tenderstatuskeyid=statusArray.join(',')
              upBidRecord(bidItem)
            })
          }
        })
      }
}
}
</script>
<style lang="less" scoped>

</style>