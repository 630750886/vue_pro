<template>
  <div>
    <div class="table">
<!--      <div class="table-head">-->
<!--        <el-row>-->
<!--          <el-col :span="2">-->
<!--            <span>下载档案类型：</span>-->
<!--          </el-col>-->
<!--          <el-col :span="20">-->
<!--            <el-checkbox-group v-model="checkList">-->
<!--              <el-checkbox label="1">招标文件</el-checkbox>-->
<!--              <el-checkbox label="2">投标文件</el-checkbox>-->
<!--              <el-checkbox label="3">报价函</el-checkbox>-->
<!--              <el-checkbox label="4">中标结果截图</el-checkbox>-->
<!--              <el-checkbox label="5">中标通知书</el-checkbox>-->
<!--            </el-checkbox-group>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </div>-->
      <el-table
              ref="tableRef"
              :data="dataList.dataList"
              style="width: 100%"
              align="center"
              height="7.5rem"
              highlight-current-row
              :header-cell-style="{fontSize:'14px'}" border>
        <el-table-column width="60" label="序号" type="index" align="center"></el-table-column>
        <el-table-column width="100" label="创建日期" align="center">
          <template slot-scope="scope">
            {{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}
          </template>
        </el-table-column>
        <el-table-column width="100px" prop="syscreatepersonname" label="创建人" align="center"></el-table-column>
        <el-table-column width="200px" prop="projectname" label="项目名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column width="100" prop="tenderee" label="甲方信息" align="center">
          <template slot-scope="scope">
            <com-popover
                data-type="obj"
                :label-prop="partyAObject"
                :data="scope.row"
            ></com-popover>
          </template>
        </el-table-column>
        <el-table-column width="120" prop="isHasCustomer" label="是否为既有客户" align="center"></el-table-column>
        <el-table-column prop="biddingAddress" label="开标场地" align="center">
          <template slot-scope="scope">
<!--            <el-popover-template title="详细" :p-object="{show:true,labelPropList:biddingAddress,data:scope.row.biddingAddress}"></el-popover-template>-->
          </template>
        </el-table-column>
        <el-table-column prop="applicantdatetime" label="报名时间" width="180" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.applicantdelaydateTime !== ''">
              {{ scope.row.applicantbegindatetime|datefmt('YYYY/MM/DD') }}-{{
              scope.row.applicantdelaydateTime|datefmt('YYYY/MM/DD')
              }}
            </template>
            <template v-else>
              <template v-if="scope.row.applicantbegindatetime !== ''">
                {{ scope.row.applicantbegindatetime|datefmt('YYYY/MM/DD') }}-{{
                scope.row.applicantenddatetime|datefmt('YYYY/MM/DD')
                }}
              </template>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="bidopeningdateTime" width="100px" label="开标时间" align="center">
          <template slot-scope="scope">
            {{scope.row.bidopeningdateTime|datefmt('YYYY/MM/DD')}}
          </template>
        </el-table-column>
        <el-table-column prop="biddingFileAnalysis" label="招标文件分析" align="center">
          <template slot-scope="scope">
<!--            <el-popover-template title="详细" :p-object="{show:true,labelPropList:biddingFileAnalysis,data:scope.row.biddingFileAnalysis}"></el-popover-template>-->
          </template>
        </el-table-column>
        <el-table-column prop="formtendername" label="投标形式" align="center"></el-table-column>
        <el-table-column prop="biddingleading" label="投标负责人" align="center"></el-table-column>
        <el-table-column prop="istenderbond" label="保证金情况" align="center">
         <template slot-scope="scope">
           <template v-if="scope.row.istenderbond">
             <com-popover
                 title="是"
                 data-type="obj"
                 :label-prop="depositInfo"
                 :data="scope.row"
             ></com-popover>
           </template>
           <template v-else>
             否
           </template>
         </template>
        </el-table-column>
        <el-table-column prop="iswinbidding" label="中标情况" align="center">
          <template slot-scope="scope">
            <com-popover
                :label-prop="winBid"
                :data="scope.row.winBid"
            ></com-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300px" fixed="right">
          <template slot-scope="scope">
<!--            <table-button :scope="scope.row" @click="tableBtnClick"></table-button>-->
            <el-button type="primary" plain size="mini" @click="$refs.downRef.openDialog()">下载</el-button>
            <el-button type="primary" plain size="mini" @click="$refs.notesRef.openDialog()">档案备注</el-button>
            <el-button type="primary" plain size="mini" @click="$refs.modifyRef.openDialog()">修改档案</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!--分页-->
      <pagination
              :pageTotal="dataList.total"
              @handleCurrentChange="handleCurrentChange"
              @handleSizeChange="handleSizeChange"></pagination>
    </div>
    <div class="dialog">
      <downDialog title="下载档案类型：" ref="downRef" @getFormData="getFormData"></downDialog>
      <fileNotesDialog ref="notesRef" @getFormData="getFormData"></fileNotesDialog>
      <ModifyFile ref="modifyRef" @getFormData="getFormModifyData"></ModifyFile>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import pagination from '../../../../../components/pagination/index.vue'
  // import TableButton from "../../../../policies/template/components/button/TableButton.vue";
  import downDialog from "../dialog/downDialog.vue";
  import fileNotesDialog from "../dialog/fileNotesDialog.vue";
  import ModifyFile from "../dialog/ModifyFile.vue";
  export default {
    components: {
      pagination,
      // TableButton,
      downDialog,
      fileNotesDialog,
      ModifyFile,
    },
    props: {
      dataList:{
        type:Object
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        pageInfo: {
          page: 1,
          limit: 30
        },
        pageShow: {
          page: 1,
          limit: 30,
          filter: '1=1'
        },
        checkList:[],
        partyAObject: [
          { label: "项目业主", prop: "proprietor" },
          { label: "招标人", prop: "tenderee" },
          { label: "负责人", prop: "tendereeleading" },
          { label: "联系电话", prop: "tendereeleadingphone" },
          { label: "招标代理机构", prop: "biddingagency" },
          { label: "负责人", prop: "biddingagencyleading" },
          { label: "联系电话", prop: "biddingagencyleadingphone" }
        ],
        depositInfo: [
          { label: "保证金(元)", prop: "tenderbondsum" },
          { label: "缴纳时间", prop: "tbbegindateTime" }
        ],
        winBid: [
          { label: "分包编号", prop: "tenderCode",width:'140px'},
          { label: "分包名称", prop: "bidsectionname",width:'200px' },
          { label: "保证金(元)", prop: "proCautionMoney" },
          { label: "中标单位", prop: "companyname" ,width:'100px'},
          { label: "中标价", prop: "winbiddingsum",width:'200px' }
        ]
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      getFormData(formData){
        console.log(formData)
      },
      getFormModifyData(data){
        console.log(data)
      },
      tableBtnClick(btn,data){
        switch (btn) {
          case 1:
            break
        }
      },
      handleCurrentChange(val) {
        this.pageInfo.page = val;
        this.$emit("getPageInfo", this.pageInfo);
      },
      handleSizeChange(val) {
        this.pageInfo.limit = val;
        this.$emit("getPageInfo", this.pageInfo);
      },
    }
  }
</script>
<style lang='less' scoped>
  .table-head{
    height: 30px;
    line-height: 30px;
    margin-bottom: 15px;
    span{
      font-size: 16px;
    }
  }
</style>
