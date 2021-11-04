<template>
  <div>
    <div class="button"></div>
    <div class="table">
      <el-table :key="tableKey"
                ref="pTableRef"
                :data="fileList"
                stripe
                :show-header="false"
                row-key="keyid"
                :expand-row-keys="expands"
                @row-click="rowClick"
                @expand-change="networkGetDataList"
                border>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table ref="tableRef"
                      :data="dataList"
                      style="width: 100%"
                      align="center"
                      height="7.5rem"
                      highlight-current-row
                      :header-cell-style="{fontSize:'12px'}"
                      border>
              <!--<el-table-column prop="tenderDocName" label="文件名称" align="center"></el-table-column>-->
              <el-table-column prop="bidsectioncode" label="分包/分标编号" align="center" width="150px"></el-table-column>
              <el-table-column prop="bidsectionname" label="分包/分标段名称" align="center" width="150px"></el-table-column>
              <el-table-column prop="bidopeningdateTime" label="开标时间" align="center"></el-table-column>
              <el-table-column prop="delaydateTime" label="延期时间" align="center"></el-table-column>
              <el-table-column prop="sceneimagefile" label="开标现场图片" align="center">
                <template slot-scope="scope">
                  <download-button :value="scope.row.sceneimagefile"></download-button>
                </template>
              </el-table-column>
              <el-table-column label="公司报价" align="center">
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
                      <el-table-column label="单位名称" prop="othercompanyname"></el-table-column>
                      <el-table-column label="一次报价" prop="otherquotationsum1"></el-table-column>
                      <el-table-column label="二次报价" prop="otherquotationsum2"></el-table-column>
                      <el-table-column label="三次报价" prop="otherquotationsum3"></el-table-column>
                    </el-table>
                    <div slot="reference">
                      <el-tag size="medium">详细</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="tendernumber" label="投标家数" align="center"></el-table-column>
              <el-table-column prop="statuscode" label="状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.statuscode?"正常":"取消"}}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="150px">
                <template slot-scope="scope">
                  <el-button type="text" @click="$refs.upRef.openDialog(scope.row)">完善分包</el-button>
                  <el-button type="text" icon="el-icon-delete" size="mini" @click="delbidopen(scope.row)">取消分包</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="tenderdocumentsname" min-width="100px" align="left"></el-table-column>
        <el-table-column align="center" width="200px">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-plus" size="mini" @click="networkAddData(scope.row)">新建分包</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <add-open-bid-dialog ref="addRef"></add-open-bid-dialog>
      <up-open-bid-dialog ref="upRef" @getFormData="submitFormData"
                          @delOtherCom="networkDelOtherCom"></up-open-bid-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import AddOpenBidDialog from '../dialog/AddOpenBidDialog.vue'
  import UpOpenBidDialog from '../dialog/UpOpenBidDialog.vue'
  import {mapState} from 'vuex'
  import {
    getBidItemFile,
    getSubcontract,
    addSubcontract,
    upSubcontract,
    delSubcontract,
    getOtherCom,
    addOtherCom,
    delOtherCom
  } from '../../../../../api/webapi-bidRecord.js'

  export default {
    components: {
      AddOpenBidDialog,
      UpOpenBidDialog
    },
    props: {
      typeCode: [String]
    },
    watch: {},
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
    //生命周期函数节点
    created() {
      this.networkGetFileDataList()
    },
    //自定义函数节点
    methods: {
      rowClick(row, event, column) {

      },
      //查找审核通过的投标文件
      networkGetFileDataList() {
        //状态为 审核通过后的文件
        let statusArray=['2','4','5','6']
        let ref = {
          tenderkeyid: this.item.keyid,
          typeCode: this.typeCode,
        }
        getBidItemFile(ref).then(item => {
          this.fileList = item.data.filter(item=>{
            return statusArray.indexOf(item.allstatuscode)!==-1
          })
        })
      },
      //当行展开时执行
      networkGetDataList(row, expandedRows) {
        if (expandedRows.length > 1) {
          let ref=expandedRows[0]
          this.$refs.pTableRef.toggleRowExpansion(ref,false)
        }
        if (expandedRows.indexOf(row)!==-1) {
          let ref = {
            tenderkeyid: this.item.keyid,
            typeCode: this.typeCode,
            tenderDocKeyid: row.keyid
          }
          getSubcontract(ref).then(item => {
            this.dataList = item.data
          })
        }
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
              });
          }).catch((action) => {this.$message({type: "info",message: "已取消！"});});
      },
      //新增分包
      networkAddData(formData) {
        this.$msgbox.prompt('分包/分标段名称', '新增分包/分标段名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S+/,
          inputErrorMessage: '不能为空'
        }).then(({value}) => {
          let ref = {
            tenderkeyid: formData.tenderkeyid,
            typeCode: formData.typeCode,
            tenderDocKeyid: formData.keyid,
            tenderDocName: formData.tenderdocumentsname,
            bidsectionname: value
          }
          addSubcontract(ref).then(item => {
            if (item.code === 200) {
              this.$message.success(item.message)
              this.tableKey++
            }
          })
        })
      },
      networkUpData(formData) {
        upSubcontract(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
          }
        })
      },
      networkDelData(formData) {
        delSubcontract(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
          }
        })
      },
      submitFormData(formData) {
        upSubcontract(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            formData.otherlist.forEach(other => {
              other.bidopenkeyid = item.data.keyid
              addOtherCom(other)
            })
            let ref = {
              tenderkeyid: this.item.keyid,
              typeCode: this.typeCode,
              tenderDocKeyid: formData.tenderDocKeyid
            }
            getSubcontract(ref).then(item => {
              this.dataList = item.data
            })
          }
        })
      },
      networkDelOtherCom(dataList) {
        dataList.forEach(item => {
          delOtherCom(item)
        })
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
