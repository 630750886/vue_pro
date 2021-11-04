<template>
  <div>
    <div class="table">
      <el-table
              :data="dataList"
              style="width: 100%"
              align="center"
              height="6.8rem"
              highlight-current-row
              :header-cell-style="{fontSize:'14px'}"
              border>

        <el-table-column label="序号"  fixed="left" type="index" width="60" align="center"></el-table-column>
        <el-table-column prop="personName" fixed="left"  label="姓名" width="80" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" width="60" align="center"></el-table-column>
        <el-table-column prop="idCard" label="身份证号"  align="center" width="250px"></el-table-column>
        <el-table-column prop="birthday" label="出生年月" align="center" width="100px"></el-table-column>
        <el-table-column prop="age" label="年龄" align="center" width="60"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120px" align="center"></el-table-column>
        <el-table-column prop="personType" label="人员分类" align="center"></el-table-column>
        <el-table-column prop="orgName" label="所属组织" align="center"></el-table-column>
        <el-table-column prop="posName" width="150" label="岗位名称"  show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="highesteducation" width="150" label="最高学历" align="center"></el-table-column>
        <el-table-column label="学历情况" width="80" prop="education" align="center">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <el-table :data="scope.row.education" border>
                <el-table-column width="200" prop="type" label="学历类型" align="center"></el-table-column>
                <el-table-column width="200" prop="school" label="毕业院校" align="center"></el-table-column>
                <el-table-column width="200" prop="graduateTime" label="毕业时间" align="center"></el-table-column>
                <el-table-column width="200" prop="major" label="所学专业" align="center"></el-table-column>
              </el-table>
              <div slot="reference">
                <el-tag size="medium">详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column width="80" label="荣誉情况" align="center">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <el-table :data="scope.row.honor" border>
                <el-table-column width="200"  prop="honorName" label="荣誉名称" align="center"></el-table-column>
                <el-table-column width="200"  prop="obtainTime" label="获取时间" align="center"></el-table-column>
              </el-table>
              <div slot="reference">
                <el-tag size="medium">详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column width="80" label="职称情况" align="center">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <el-table :data="scope.row.title" border>
                <el-table-column width="200"  prop="titleLevel" label="职称类别" align="center"></el-table-column>
                <el-table-column width="200"  prop="titleLevel" label="职称级别" align="center"></el-table-column>
                <el-table-column width="200"  prop="titleMajor" label="职称专业" align="center"></el-table-column>
              </el-table>
              <div slot="reference">
                <el-tag size="medium">详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column width="80" label="执业情况" align="center">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <el-table :data="scope.row.practice" border>
                <el-table-column width="200" prop="practiceType" label="执业类型" align="center"></el-table-column>
                <el-table-column width="200" prop="majorA" label="专业一" align="center"></el-table-column>
                <el-table-column width="200" prop="majorB" label="专业二" align="center"></el-table-column>
              </el-table>
              <div slot="reference">
                <el-tag size="medium">详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column width="100" prop="isBuySocial" label="是否购买社保" align="center"></el-table-column>
        <el-table-column width="120" prop="isSignLaborContract" label="是否签订劳动合同" align="center"></el-table-column>
        <el-table-column width="120" prop="isSignLabourServiceContract" label="是否签订劳务合同" align="center"></el-table-column>
        <el-table-column width="120" prop="isSignSecrecyTreaty" label="是否签订保密协议" align="center"></el-table-column>
        <el-table-column width="120" prop="isSignStationDutyConfirmation" label="是否签订岗位职责书" align="center"></el-table-column>
        <el-table-column width="120" prop="isSignProhibitionTreaty" label="是否签订禁业合同" align="center"></el-table-column>
        <el-table-column prop="isBuyInsurance" label="是否购买其他保险" align="center"></el-table-column>
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
              :pageTotal="total"
              @handleCurrentChange="handleCurrentChange"
              @handleSizeChange="handleSizeChange">
      </pagination>
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
  import TableButton from '../button/TableButton.vue'
  import pagination from '../../../../../components/pagination/index.vue'
  import downDialog from "../dialog/downDialog.vue";
  import fileNotesDialog from "../dialog/fileNotesDialog.vue";
  import ModifyFile from "../dialog/ModifyFile.vue";
  export default {
    components: {
      TableButton,
      pagination,
      downDialog,
      fileNotesDialog,
      ModifyFile,
    },
    props: {
      dataList: '',
      total: '',
    },
    watch: {},
    //数据节点
    data() {
      return {
        downDialog:false,
        pageShow: {
          page: 1,
          limit: 30,
          filter: '1=1'
        },
        // checkList: []
      }
    },
    //生命周期函数节点
    created() {
      console.log(this.dataList);
    },

    //自定义函数节点
    methods: {
      getFormData(formData){
        console.log(formData)
      },
      getFormModifyData(data){
        console.log(data)
      },
      getPageShow() {
        this.$emit('getPageShow', this.pageShow)
      },
      handleCurrentChange(val) {
        this.pageShow.page = val;
        this.$emit("getPageInfo", this.pageShow);
      },
      handleSizeChange(val) {
        this.pageShow.limit = val;
        this.$emit("getPageInfo", this.pageShow);
      },
      tableBtnClick(val, data) {
        switch (val) {
          case 1:
            break
          case 2:
            break

        }
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
