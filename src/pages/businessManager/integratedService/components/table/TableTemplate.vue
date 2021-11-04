<template>
  <div class="body">
    <div class="table">
      <el-table
        ref="tableRef"
        :data="materialInfo"
        style="width: 100%"
        align="left"
        height="500px"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        :span-method="objectSpanMethod"
        border
      >
        <el-table-column
          prop="contractCode"
          label="合同编号"
          align="left"
          width="130"
        ></el-table-column>
        <el-table-column
          prop="contractName"
          label="合同名称"
          align="left"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="contractbase.contractBurchaser"
          label="客户方名称"
          align="left"
          width="180"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.contractbase.contractBurchaser !== ''">
              <el-popover trigger="click" placement="top">
                <!--<p>客户方名称: {{ scope.row.contractBurchaser }}</p>-->
                <p>第三方名称: {{ scope.row.contractbase.thirdparty }}</p>
                <div slot="reference">
                  <el-tag size="medium">{{
                    scope.row.contractbase.contractBurchaser
                  }}</el-tag>
                </div>
              </el-popover>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="contractbase.projectSum"
          label="项目总投资(万元)"
          align="left"
          width="150"
        ></el-table-column>

        <el-table-column
          prop="contractVocationalTypeName"
          label="业务类型"
          align="left"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          label="项目编号"
          align="left"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          align="left"
          width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createddateTime"
          label="创建时间"
          align="left"
          width="150"
        ><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
        <el-table-column
          prop="syscreatepersonname"
          label="创建人"
          align="left"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="projectMajorName"
          label="专业工程分类"
          align="left"
          width="130"
        ></el-table-column>
        <el-table-column
          prop="projectTypeName"
          label="项目类型"
          align="left"
          width="130"
        ></el-table-column>
        <el-table-column label="工作组成员" align="left" width="100">
          <template slot-scope="scope">
            <com-popover
              data-type="ky"
              :data="scope.row.groupWorks"
              label="projectJobName"
              prop="projectPersonName"
            ></com-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="contactPerson"
          label="委托联系人"
          align="left"
          width="100"
        >
          <template slot-scope="scope">
            <com-popover
              :data="scope.row.projectcontact"
              :label-prop="clientTemplate"
            ></com-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="projectOrgName"
          label="项目归属"
          align="left"
          width="80"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="80" fixed="right">
          <template slot-scope="scope">
            <public-button
              name="JIN4RU4XIANG4MU"
              title="进入项目"
              type="text"
              @click="inWorkbench(scope.row)"
            ></public-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import { mapActions, mapMutations } from "vuex";

export default {
  components: {},
  props: {
    dataList: [Array]
  },
  watch: {
    dataList(newValue) {
      this.init();
    }
  },
  //数据节点
  data() {
    return {
      //委托人模板
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
      materialInfo: [],
      OrderIndexArr: []
    };
  },
  //生命周期函数节点
  created() {
    this.init();
  },
  //自定义函数节点
  methods: {
    ...mapMutations({
      updateWorkbenchKeyid: "workbench/updateWorkbenchKeyid",
      workbenchCurrentItem: "workbench/updateCurrentItem",
      aStageCurrentItem: "workbench/aStage/updateCurrentItem",
      cStageCurrentItem: "workbench/cStage/updateCurrentItem"
    }),
    init() {
      this.materialInfo = this.dataList;
      this.OrderIndexArr = [];
      this.getOrderNumber("contractCode");
    },
    inWorkbench(data) {
      //根据业务类型跳转哪种工作台
      switch (data.contractVocationalTypeKeyId) {
        case "402880fa74c3492d0174d45ebe360015": //工程咨询
          this.updateWorkbenchKeyid("402880fa75fcce490175fea4c804006e");
          break;
        case "402880fa74c3492d0174d45ef5b80016": //造价
          this.updateWorkbenchKeyid("402880fa75fcce490175fea520830071");
          break;
        case "402880fa74c3492d0174d45f629c0018": //监理
          this.updateWorkbenchKeyid("402880fa75fcce490175fea539420072");
          break;
        case "402880fa74c3492d0174d45f2e8f0017": //招标
          this.updateWorkbenchKeyid("402880fa75fcce490175fea4ffe70070");
          break;
        case "402880fa74c3492d0174d45f82380019": //项目
          this.updateWorkbenchKeyid("402880fa75fcce490175fea4e559006f");
          break;
      }
      //更新工作组的项目
      this.workbenchCurrentItem(data);
      this.aStageCurrentItem(data);
      this.cStageCurrentItem(data);
      this.$router.push({ path: "workbench" });
    },
    //合并项计算方法
    getOrderNumber(firstColumn) {
      let OrderObj = {};
      this.materialInfo.forEach((element, index) => {
        element.rowIndex = index;
        if (OrderObj[element[firstColumn]]) {
          OrderObj[element[firstColumn]].push(index);
        } else {
          OrderObj[element[firstColumn]] = [];
          OrderObj[element[firstColumn]].push(index);
        }
      });
      // 将数组长度大于1的值 存储到this.OrderIndexArr（也就是需要合并的项）
      for (let k in OrderObj) {
        if (OrderObj[k].length > 1) {
          this.OrderIndexArr.push(OrderObj[k]);
        }
      }
    },
    objectSpanMethod: function({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 4) {
        for (let i = 0; i < this.OrderIndexArr.length; i++) {
          let element = this.OrderIndexArr[i];
          for (let j = 0; j < element.length; j++) {
            let item = element[j];
            if (rowIndex == item) {
              if (j == 0) {
                return {
                  rowspan: element.length,
                  colspan: 1
                };
              } else if (j != 0) {
                return {
                  rowspan: 0,
                  colspan: 0
                };
              }
            }
          }
        }
      }
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
</style>
