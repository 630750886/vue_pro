<template>
  <div class="logContainer">
<!--    <div class="table-head">-->
<!--      <el-row>-->
<!--        <el-col :span="2">-->
<!--          <span>下载档案类型：</span>-->
<!--        </el-col>-->
<!--        <el-col :span="20">-->
<!--          <el-checkbox-group v-model="checkList">-->
<!--            <el-checkbox label="1">合同电子版</el-checkbox>-->
<!--            <el-checkbox label="2">合同</el-checkbox>-->
<!--            <el-checkbox label="3">补充协议</el-checkbox>-->
<!--          </el-checkbox-group>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </div>-->
    <el-table
            :data="dataList"
            style="width: 100%"
            align="center"
            height="530px"
            highlight-current-row
            :header-cell-style="{fontSize:'14px'}"
            border>

      <el-table-column prop="contractCode" label="合同编号" align="center" width="130" show-overflow-tooltip></el-table-column>
      <el-table-column prop="contractName" width="200" label="合同名称" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" align="center" width="120">
        <template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template>
      </el-table-column>
      <el-table-column prop="orgName" label="签订部门" show-overflow-tooltip align="center" width="120"></el-table-column>
      <el-table-column prop="contractTypename" width="120" label="合同类型" align="center">
<!--        <template slot-scope="scope">-->
<!--          {{scope.row.types}}/{{scope.row.category}}-->
<!--        </template>-->
      </el-table-column>
      <el-table-column label="合同协议各方情况" width="120"  align="center">
<!--        <template slot-scope="scope">-->
<!--          <el-popover trigger="click" placement="top">-->
<!--            <p>甲方: {{ scope.row.partyA}}</p>-->
<!--            <p>乙方: {{ scope.row.partyB}}</p>-->
<!--            <p>第三方: {{ scope.row.partyC}}</p>-->
<!--            <div slot="reference">-->
<!--              <el-tag size="medium">详细</el-tag>-->
<!--            </div>-->
<!--          </el-popover>-->
<!--        </template>-->
        <template slot-scope="scope">
          <el-popover trigger="click" placement="top">
            <p>甲方名称: {{ scope.row.contractBurchaser }}</p>
            <p>乙方名称: {{ scope.row.contractSeller }}</p>
            <p>第三方名称: {{ scope.row.thirdparty }}</p>
            <div slot="reference">
              <el-tag size="medium">详细</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="concludesigndateTime" width="120" label="签订时间" align="center"></el-table-column>
      <el-table-column prop="isexpiryDate" label="是否有有效期" width="120" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.isexpiryDate">
            <el-popover trigger="click" placement="top">
              <p>{{ scope.row.expiryDate }}</p>
              <div slot="reference">
                <el-tag size="medium">是</el-tag>
              </div>
            </el-popover>
          </template>
          <template v-else>
            否
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="isdeposit" label="收取风险（履约）保证金情况" width="200" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.isdeposit">
            <el-popover trigger="click" placement="top">
              <p>收取金额(元)：{{ scope.row.depositsum }}</p>
              <p>收取时间：{{ scope.row.depositdateTime }}</p>
              <p>退回时间：{{ scope.row.indepositdateTime }}</p>
              <div slot="reference">
                <el-tag size="medium">是</el-tag>
              </div>
            </el-popover>
          </template>
          <template v-else>
            否
          </template>
        </template>
      </el-table-column>
      <el-table-column width="200" prop="isgather" label="缴纳风险（履约）保证金情况" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.isgather">
            <el-popover trigger="click" placement="top">
              <p>缴纳金额(元)：{{ scope.row.depositsum }}</p>
              <p>缴纳时间：{{ scope.row.depositdateTime }}</p>
              <p>退回时间：{{ scope.row.indepositdateTime }}</p>
              <div slot="reference">
                <el-tag size="medium">是</el-tag>
              </div>
            </el-popover>
          </template>
          <template v-else>
            否
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="expiryDate" label="原件情况" align="center">
        <template slot-scope="scope">
          <el-popover :trigger="tagType" placement="top">
            <div>
              <el-table :data="scope.row.turnOvers" border>
                <el-table-column
                    prop="resourcename"
                    label="资料名称"
                    align="left"
                    width="100px"
                ></el-table-column>
                <el-table-column
                    prop="outOrgName"
                    label="移交组织"
                    align="left"
                    width="100px"
                ></el-table-column>
                <el-table-column
                    prop="outperson"
                    label="移交人"
                    align="left"
                    width="100px"
                ></el-table-column>
                <el-table-column
                    prop="inturnoverdate"
                    label="接收时间"
                    align="left"
                    width="100px"
                ></el-table-column>
                <el-table-column
                    prop="copies"
                    label="份数"
                    align="left"
                    width="100px"
                ></el-table-column>
              </el-table>
            </div>
            <div slot="reference">
              <el-tag size="medium">详细</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250px" fixed="right">
        <template slot-scope="scope">
<!--          <table-button :scope="scope.row" @click="tableBtnClick"></table-button>-->
          <el-button type="primary" plain size="mini" @click="$refs.downRef.openDialog(scope.row)">下载</el-button>
          <el-button type="primary" plain size="mini" @click="$refs.notesRef.openDialog(scope.row)">档案备注</el-button>
          <el-button type="primary" plain size="mini" @click="$refs.modifyRef.openDialog(scope.row)">修改档案</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pagination
            :pageTotal="total"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange">
    </pagination>
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
  import HeadButton from '../button/HeadButton.vue'
  import downDialog from "../dialog/downDialogNoContract.vue";
  import fileNotesDialog from "../dialog/fileNotesDialogNoContract.vue";
  // import TableButton from "../../../../policies/standard/components/button/TableButton.vue";
  import ModifyFile from "../dialog/ModifyFileNoContract.vue";
  export default {
    components: {
      pagination,
      HeadButton,
      // TableButton,
      downDialog,
      fileNotesDialog,
      ModifyFile,


    },
    props: {
      model:'',
      myData: {
        type: Array,
        default: () => {
          return []
        }
      },
      pageTotal: {
        type: Number,
        default: 20
      },
      loadData: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    model:{
      prop:'model',
      event:'getPageShow'
    },
    watch: {
      myData() {
        this.dataList = this.myData
      },
      pageTotal() {
        this.total = this.pageTotal
      }
    },
    //数据节点
    data() {
      return {
        tagType: "click",
        checkList:[],
        //数据源
        dataList: this.myData,
        //条数
        total: this.pageTotal,
        pageShow: {
          page: 1,
          limit: 30,
          filter: '1=1'
        },
      }
    },
    //生命周期函数节点
    created() {
      this.getPageShowData()
    },
    //自定义函数节点
    methods: {
      getFormData(formData){
        console.log(formData)
      },
      getFormModifyData(data){
        console.log(data)
      },
      handleCurrentChange(val) {
        this.pageShow.page = val;
        this.getPageShowData()
      },
      handleSizeChange(val) {
        this.pageShow.limit = val;
        this.getPageShowData()
      },
      headBtnClick(btn) {
        switch (btn) {
          case 1:
            this.$refs.addRef.openDialog()
            break
          case 2:
            this.$refs.queryRef.openDialog()
            break
          case 3:
            this.$router.push({path:'/contract/original_script',query:{nav:'1'}})
            break

          case 4:
            this.$router.push({path:'/contract/original_script',query:{nav:'2'}})
            break
          case 5:
            this.$router.push({path:'/contract/template_manager'})
            break

        }
      },
      tableBtnClick(btn,data) {
        switch (btn) {
          case 1:
            this.$router.push({path:'/contract/basic_manager',query:{id:data.keyid}})
            break
          case 2:
            this.$refs.cancelRef.openDialog()
            break
          case 3:
            this.$refs.transferRef.openDialog()
            break
          case 4:
            break
          case 5:
            break
        }
      },
      submitAddContract(data){
        this.$emit('function','addContractForm',data)
      },
      getPageShowData(){
        this.$emit('getPageShow',this.pageShow)
      }
    }
  }
</script>
<style lang='less' scoped>
  .search_container {
    margin-bottom: 20px;
  }
  .searchArea {
    background: #e1dfdf;
    border-radius: 2px;
    padding: 18px 18px 0;
  }
  .el-tag{
    cursor: pointer
  }
  .table-head{
    height: 30px;
    line-height: 30px;
    margin-bottom: 15px;
    span{
      font-size: 16px;
    }
  }
  /deep/ .el-table__fixed-right-patch {
    background-color: transparent;
    height: 0;
    width: 0;
  }
</style>
