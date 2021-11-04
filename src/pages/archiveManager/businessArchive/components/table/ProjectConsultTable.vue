<template>
  <div class="logContainer">
    <div class="table">
<!--      <div class="table-head">-->
<!--        <el-row>-->
<!--          <el-col :span="2">-->
<!--            <span>下载档案类型：</span>-->
<!--          </el-col>-->
<!--          <el-col :span="20">-->
<!--            <el-checkbox-group v-model="checkList">-->
<!--              <el-checkbox label="1">成果报告</el-checkbox>-->
<!--              <el-checkbox label="2">行政许可文件</el-checkbox>-->
<!--              <el-checkbox label="3">项目完成的相关证明</el-checkbox>-->
<!--              <el-checkbox label="4">评价意见函</el-checkbox>-->
<!--            </el-checkbox-group>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </div>-->
      <el-table
              ref="tableRef"
              :data="items.dataList"
              style="width: 100%"
              align="center"
              height="6.8rem"
              highlight-current-row
              :header-cell-style="{fontSize:'14px'}"
              border>
        <el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
        <el-table-column prop="contractTypeName" label="合同类型" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contractCode" label="合同编号" align="center" width="150"></el-table-column>
        <el-table-column prop="contractName" label="合同名称" align="center" width="200px"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="projectCode" label="项目编号" width="200px" align="center"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" width="200px" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="projectMajorName;" label="专业工程分类"  width="150px" align="center"></el-table-column>
        <el-table-column prop="projectTypeName" label="分类" align="center"></el-table-column>
<!--        <el-table-column prop="workGroup;" label="工作组成员" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <el-popover-template :p-object="{show:true,labelPropList:workGroupTemplate,-->
<!--                                 data:scope.row.workGroup}"></el-popover-template>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column prop="projectcontact" label="委托联系人" width="100" align="center">
          <template slot-scope="scope">
            <com-popover
                :data="scope.row.projectcontact"
                :label-prop="clientTemplate"
            ></com-popover>
          </template>
        </el-table-column>
        <el-table-column prop="datajson;" label="成果文件" width="100" align="center">
          <template slot-scope="scope">
            <template
                v-if="
                scope.row.projectTypeCode === '402880fa75f83ee40175f90b79c4000c'
              "
            >
              <com-popover
                  :label-prop="outcomeDocumentTemplateA"
                  url="/pro/ccappprobebook/findwhere"
                  :filter="{
                  projectKeyid: scope.row.keyid,
                  isclientSatisfy: true
                }"
              ></com-popover>
            </template>
            <template v-else>
              <com-popover
                  :label-prop="outcomeDocumentTemplateB"
                  url="/pro/ccreports/findwhere"
                  :filter="{
                  projectKeyid: scope.row.keyid,
                  isclientSatisfy: true
                }"
              ></com-popover>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250px" fixed="right">
          <template slot-scope="scope">
<!--            <table-button :scope="scope.row" @click="tableBtnClick"></table-button>-->
            <el-button type="primary" plain size="mini" @click="$refs.downRef.openDialog(scope.row)">下载</el-button>
            <el-button type="primary" plain size="mini" @click="$refs.notesRef.openDialog(scope.row)">档案备注</el-button>
            <el-button type="primary" plain size="mini" @click="$refs.modifyRef.openDialog(scope.row)">修改档案</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <!--分页-->
      <pagination
              :pageTotal="items.total"
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
  // import TableButton from '../button/TableButton.vue'
  import ElPopoverTemplate from '../../../acomponents/ElPopoverTemplate.vue'
  import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
  import downDialog from "../dialog/downDialogConsult.vue";
  import fileNotesDialog from "../dialog/fileNotesDialogConsult.vue";
  import ModifyFile from "../dialog/ModifyFileConsult.vue";

  export default {
    components: {
      pagination,
      // TableButton,
      ElPopoverTemplate,
      downDialog,
      fileNotesDialog,
      ModifyFile,
    },
    props: {
      pageShow:{
        type: Object
      }
    },
    watch: {},
    computed:{
      ...mapState({
        items: state => state.projectConsult.items,
      })
    },
    //数据节点
    data() {
      return {
        checkList:[],
        // workGroupTemplate: [
        //   {label: '分管副总', prop: 'vicePresident'},
        //   {label: '经理', prop: 'manager'},
        //   {label: '项目经理', prop: 'itemManager'},
        //   {label: '成员', prop: 'member'},
        // ],
        contactPersonTemplate: [
          {label: '姓名', prop: 'name'},
          {label: '电话', prop: 'phone'},
          {label: '部门', prop: 'depName'},
          {label: '职务', prop: 'posName'},
        ],
        moneyGroupTemplate:[
          {label: '单位名称', prop: 'name'},
          {label: '中标金额', prop: 'money'},
        ],
        clientTemplate: [
          {
            label: "姓名",
            prop: "contactname"
          },
          {
            label: "电话",
            prop: "contactphone"
          },
          {
            label: "部门",
            prop: "contactdepartment"
          },
          {
            label: "职务",
            prop: "contactpost"
          }
        ],
        outcomeDocumentTemplateB: [
          {
            label: "报告名称",
            prop: "reportsName"
          },
          {
            label: "报告出具时间",
            prop: "outPutdateTime"
          },
          {
            label: "造价工程师执业章",
            prop: "personName"
          },
          {
            label: "编制金额(元)",
            prop: "reportsSum"
          },
          {
            label: "送审金额(元)",
            prop: "sendAuditSum"
          },
          {
            label: "审定金额(元)",
            prop: "auditSignSum"
          },
          {
            label: "审减(增)金额(元)",
            prop: "auditUpSum"
          },
          {
            label: "审减(增)率",
            prop: "auditDownSum"
          }
        ],
      }
    },
    //生命周期函数节点
    created() {
      console.log(this.items.dataList)
    },
    //自定义函数节点
    methods: {
      getFormData(formData){
        console.log(formData)
      },
      getFormModifyData(data){
        console.log(data)
      },
      headBtnClick(btn,data){
        switch (btn) {
          case 1:
            this.$refs.addItemRef.openDialog()
            break
          case 2:
            this.$refs.queryItemRef.openDialog()
            break
          case 3:
            this.$refs.queryItemRef.openDialog()
            break
          case 4:
            this.$router.push({path: 'original_script', query: {nav: '1'}})
            break
          case 5:
            this.$router.push({path: 'original_script', query: {nav: '2'}})
            break
          case 6:
            this.$refs.addWordRef.openDialog()
            break
          case 8:
            this.$refs.infoDataRef.openDialog()
            break
        }
      },
      tableBtnClick(btn,data){
        switch (btn) {
          case 1:
            this.clickTable(data)
            break
          case 2:
            this.$router.push({path: 'workbench', query: {type: '造价咨询'}})
            break
          case 3:
            this.$refs.transferRef.openDialog()
            break
        }
      },
      handleCurrentChange(val) {
        this.pageShow.pageInfo.page = val;
        this.$emit("handlePageInfo", this.$myfunction.copyData(this.pageShow));
      },
      handleSizeChange(val) {
        this.pageShow.pageInfo.limit = val;
        this.$emit("handlePageInfo", this.$myfunction.copyData(this.pageShow));
      },
      clickTable(row,index,e){
        this.$refs.tableRef.toggleRowExpansion(row)
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
