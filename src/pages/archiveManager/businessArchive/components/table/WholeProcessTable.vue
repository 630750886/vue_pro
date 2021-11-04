<template>
  <div class="logContainer">
    <div class="table">
      <div class="table-head">
        <el-row>
          <el-col :span="2">
            <span>下载档案类型：</span>
          </el-col>
          <el-col :span="20">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="1">公告截图</el-checkbox>
              <el-checkbox label="2">公示截图</el-checkbox>
              <el-checkbox label="3">中标通知书</el-checkbox>
              <el-checkbox label="4">评价意见函</el-checkbox>
              <el-checkbox label="5">成交合同</el-checkbox>
              <el-checkbox label="6">全过程工程咨询评价意见函</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </div>
      <el-table
              ref="tableRef"
              :data="dataList"
              style="width: 100%"
              align="center"
              height="6.8rem"
              highlight-current-row
              :header-cell-style="{fontSize:'14px'}"
              border>
        <el-table-column type="expand">
          <template slot-scope="props">
            <contract-carry-out-template></contract-carry-out-template>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" align="center"></el-table-column>
        <el-table-column prop="contractType" label="合同类型" align="center"></el-table-column>
        <el-table-column prop="contractCode" label="合同编号" align="center" width="130"></el-table-column>
        <el-table-column prop="contractName" label="合同名称" align="center"></el-table-column>
        <el-table-column prop="itemCode" label="项目编号" align="center"></el-table-column>
        <el-table-column prop="itemName" label="项目名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="projectType" label="专业工程分类" align="center"></el-table-column>
        <el-table-column prop="workGroup" label="工作组" align="center">
          <template slot-scope="scope">
            <el-popover-template :p-object="{show:true,labelPropList:workGroupTemplate,
                                 data:scope.row.workGroup[0]}"></el-popover-template>
          </template>
        </el-table-column>
        <el-table-column prop="contactPerson" label="委托联系人" align="center">
          <template slot-scope="scope">
            <el-popover-template :table-object="{show:true,labelPropList:contactPersonTemplate,
                                 data:scope.row.contactPerson}"></el-popover-template>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300px" fixed="right">
          <template slot-scope="scope">
            <table-button :scope="scope.row" @click="tableBtnClick"></table-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <!--分页-->
      <pagination
              :pageTotal="total"
              @handleCurrentChange="handleCurrentChange"
              @handleSizeChange="handleSizeChange"></pagination>
    </div>
    <div class="dialog">

    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import pagination from '../../../../../components/pagination/index.vue'
  import TableButton from '../button/TableButton.vue'
  import ElPopoverTemplate from '../../../acomponents/ElPopoverTemplate.vue'
  export default {
    components: {
      pagination,
      TableButton,
      ElPopoverTemplate,
    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        checkList:[],
        dataList:[
          {
            contractType:'单合同',
            contractCode:'HDJL-2020-001',
            contractName:'监理一',
            itemCode:'HDJL-2020-001-001',
            itemName:'监理项目一',
            projectType:'房屋建筑工程',
            type:'公开招标-工程建设-工程类-施工',
            workGroup:[
              {
                vicePresident:'张三',
                technicalDirector:'李四',
                manager:'王五',
                itemManager:'赵六',
                member:'赵桥，王菲',
              }
            ],
            contactPerson: [
              {
                name: '张三',
                phone: '18208798458',
                depName: '招标一部',
                posName: '项目经理',
              },
              {
                name: '李四',
                phone: '18208798458',
                depName: '招标一部',
                posName: '项目总监',
              }

            ],
            money:[
              {name:'遵义分公司',money:'2000000'},
              {name:'重庆分公司',money:'4000000'},
            ],

            status: '备案中'
          }
        ],
        total:0,
        pageShow: {
          page: 1,
          limit: 30,
          filter: '1=1'
        },
        workGroupTemplate: [
          {label: '分管副总', prop: 'vicePresident'},
          {label: '经理', prop: 'manager'},
          {label: '项目经理', prop: 'itemManager'},
          {label: '成员', prop: 'member'},
        ],
        contactPersonTemplate: [
          {label: '姓名', prop: 'name'},
          {label: '电话', prop: 'phone'},
          {label: '部门', prop: 'depName'},
          {label: '职务', prop: 'posName'},
        ],
        moneyGroupTemplate:[
          {label: '单位名称', prop: 'name'},
          {label: '中标金额', prop: 'money'},
        ]
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
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
        this.pageShow.page = val;

      },
      handleSizeChange(val) {
        this.pageShow.limit = val;

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
