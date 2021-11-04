<template>
  <div>
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
      height="500px"
      highlight-current-row
      :header-cell-style="{ fontSize: '14px' }"
      border
    >
      <el-table-column
        prop="contractCode"
        label="合同编号"
        align="center"
        width="120px"
      ></el-table-column>
      <el-table-column
        prop="contractName"
        label="合同名称"
        width="200"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="businessType" label="客户方名称" width="150" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.contractBurchaser !== ''">
            <el-popover trigger="click" placement="top">
              <p>第三方名称: {{ scope.row.thirdparty }}</p>
              <div slot="reference">
                <el-tag size="medium">{{
                  scope.row.contractBurchaser.length>35?scope.row.contractBurchaser.substring(0,32)+'...':scope.row.contractBurchaser
                  }}</el-tag>
              </div>
            </el-popover>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        prop="projectHead"
        label="合同上客户方项目负责人"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <template v-if="scope.row.contractBurchaserPerson !== ''">
            <el-popover trigger="click" placement="top">
              <p>电话: {{ scope.row.contractBurchaserPhone }}</p>
              <div slot="reference">
                <el-tag size="medium">{{
                  scope.row.contractBurchaserPerson
                  }}</el-tag>
              </div>
            </el-popover>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        prop="concludesigndateTime"
        label="合同签订时间"
        align="center"
        width="150px"
      ></el-table-column>
      <template v-if="type === '框架或入库'">
        <el-table-column
          label="是否有有效期"
          align="center"
          width="180px"
        >
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
      </template>
      <el-table-column
        label="合同上公司项目负责人"
        prop="contractSellerPerson"
        width="150"
        align="center"
      ></el-table-column>
      <template v-if="type === '综合业务' || type === '框架或入库'">
        <el-table-column
          prop="contractVocationalTypeName"
          label="涉及业务"
          align="center"
          width="180px"
        ></el-table-column>
      </template>
      <template v-if="type !== '招标代理'">
        <el-table-column
          prop="projectSum"
          label="项目总投资(万元)"
          align="center"
          width="150px"
        ></el-table-column>
        <el-table-column
          label="项目规模"
          align="center"
          width="100px"
        >
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <div style="width: 300px;min-height:200px;">
                <p>{{scope.row.projectScale}}</p>
              </div>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </template>
      <template v-if="type === '招标代理'">
        <el-table-column
          prop="projectSum"
          label="项目总投资/采购预算(万元)"
          align="center"
          width="200px"
        ></el-table-column>
        <el-table-column
          label="项目规模/采购内容"
          align="center"
          width="100px"
        >
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <div style="width: 300px;min-height:200px;">
                <p>{{scope.row.projectScale}}</p>
              </div>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </template>
      <template v-if="type === '造价咨询'">
        <el-table-column
          label="计价标准"
          align="center"
          width="250px"
        >
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <div style="width:300px;min-height:200px;">
                <p>{{scope.row.projectStandard}}</p>
              </div>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </template>
      <template v-if="type === '工程监理'">
        <el-table-column
          prop="installsum"
          label="建筑安装工程费(万元)"
          align="center"
          width="150px"
        ></el-table-column>
        <el-table-column
            prop="projectAddress"
          label="工程建设地"
          align="center"
          width="150px"
        ></el-table-column>
        <el-table-column
          prop="proTimeLimit"
          label="监理工期(天)"
          align="center"
          width="130px"
        ></el-table-column>
        <el-table-column
          prop="enPersonName"
          label="总监理工程师"
          align="center"
          width="130px"
        ></el-table-column>
      </template>
      <el-table-column
        label="收费标准"
        align="center"
      >
        <template slot-scope="scope">
          <el-popover trigger="click" placement="top">
            <div style="width:300px;min-height:200px;">
              <p>{{scope.row.projectStandard}}</p>
            </div>
            <div slot="reference">
              <el-tag size="medium">详细</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <template v-if="type === '工程监理'">
        <el-table-column
          label="延期收费标准"
          align="center"
        >
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <div style="width:300px;min-height: 200px;">
                <p>{{scope.row.deferredCharges}}</p>
              </div>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        prop="contractSum"
        label="合同酬金(元)"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="isPayDeposit"
        label="是否缴纳风险（履约）保证金"
        align="center"
        width="100px"
      >
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
          <el-popover trigger="click" placement="top">
            <div>
              <el-table :data="scope.row.turnOvers" style="width: 542px" border>
                <el-table-column
                    prop="resourcename"
                    label="资料名称"
                    align="left"
                    width="150px"
                ></el-table-column>
                <el-table-column
                    prop="outOrgName"
                    label="移交组织"
                    align="left"
                    width="150px"
                ></el-table-column>
                <el-table-column
                    prop="outperson"
                    label="移交人"
                    align="left"
                    width="80px"
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
                    width="60px"
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
      @handleSizeChange="handleSizeChange"
    >
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
// import TableButton from "../button/TableButton.vue";
import pagination from "../../../../../components/pagination/index.vue";
import downDialog from "../dialog/downDialogContract.vue";
import fileNotesDialog from "../dialog/fileNotesDialogContract.vue";
import ModifyFile from "../dialog/ModifyFileContract.vue";
export default {
  components: {
    // TableButton,
    pagination,
    downDialog,
    fileNotesDialog,
    ModifyFile,
  },
  props: {
    dataBase: {
      type: Object,
    },
    pageShow:{
      type: Object,
    }
  },
  watch: {
    dataBase(newValue) {
      // console.log(newValue)
      this.type = newValue.type;
      this.dataList = newValue.dataList;
      this.total = newValue.total
    }
  },
  //数据节点
  data() {
    return {
      checkList: [],
      tagType: "click",
      type: "",
      dataList: [],
      total: 0,
    };
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
    handleCurrentChange(val) {
      this.pageShow.pageInfo.page = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    tableBtnClick(btn, data) {
      this.$emit("tableBtnClick", btn, data);
    }
  }
};
</script>
<style lang="less" scoped>
.el-table {
  .el-tag {
    cursor: pointer;
  }
}
.table-head {
  height: 30px;
  line-height: 30px;
  margin-bottom: 15px;
  span {
    font-size: 16px;
  }
}

</style>
