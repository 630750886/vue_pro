<template>
  <div class="body">
    <div class="table">
      <el-table
        :data="dataList"
        align="center"
        height="7.5rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          prop="createddateTime"
          label="申请日期"
          align="center"
        >
        <template slot-scope="scope">
          {{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}
        </template>
        </el-table-column>
        <el-table-column
          prop="sysorgadminname"
          label="申请组织"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="syscreatepersonname"
          label="申请人"
          align="center"
        ></el-table-column>
        <el-table-column prop="purchaseTypeName" label="类型" align="center"></el-table-column>
        <el-table-column
          prop="purchaseAppUse"
          label="用途说明"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="purchaseAppreason"
          label="采购申请理由"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="purchaseAppSum"
          label="申请采购数量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="purchaseAppCost"
          label="申请采购预估总金额(元)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="purchaseEquipmentDesc"
          label="固定资产备注"
          align="center"
        >
        <template slot-scope="scope">
          <ul>
            <li v-for="item in scope.row.purchases" :key="item.keyid">{{item.purchaseEquipmentDesc}}</li>
          </ul>
        </template>
        </el-table-column>
        <el-table-column label="采购情况" align="center">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <el-table
                  :data="scope.row.purchases"
                  style="width: 100%" border>
                  <el-table-column
                    prop="purchaseNum"
                    label="采购数量"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="purchasePrice"
                    label="采购单价"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="purchaseSum"
                    label="采购总价">
                  </el-table-column>
                </el-table>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="供应商情况" align="center">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <el-table
                  :data="scope.row.purchases"
                  style="width: 100%" border>
                  <el-table-column
                    prop="supplierName"
                    label="供应商名称"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="supplierPerson"
                    label="供应商联系人"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="supplierPhone"
                    label="联系电话">
                  </el-table-column>
                </el-table>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="采购总价(元)" align="center">
          <template slot-scope="scope">
              {{getsum(scope.row.purchases)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300px">
          <template slot-scope="scope">
            <table-button
              :scope="scope.row"
              @click="tableButtonClick"
            ></table-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <fixed-assets-request-info-dialog
        ref="upRef"
        title="完善信息"
        @getFormData="editfixedassets"
      ></fixed-assets-request-info-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/TableButton.vue";
import FixedAssetsRequestInfoDialog from "../dialog/FixedAssetsRequestInfoDialog.vue";
import * as PurchaseInfo from "@/api/administration/PurchaseInfo.js"
export default {
  components: {
    TableButton,
    FixedAssetsRequestInfoDialog
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {},
  //数据节点
  data() {
    return {};
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
   getsum(data)
   {
     let sum=0;
     data.forEach(item=>{
         sum=sum+item.purchaseSum;
     });
     return sum;
   },
   editfixedassets(data)
   {console.log("begin... updata...");
    console.log(data);
      data.purchases.forEach(item=>{
          PurchaseInfo.adds_object(item).then(item=>{
                  if (item.code === 200) {
                    this.$message.success("修改完成!");
                  }
                });
      });
     
   },
   tableButtonClick(btn,data) {
      switch (btn) {
        case 1:
          break;
        case 2:
          this.$refs.upRef.openDialog(data);
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-tag {
  cursor: pointer;
}
</style>
