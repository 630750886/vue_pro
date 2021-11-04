<template>
  <div class="body">
    <div class="table">
      <el-table
        :data="dataList.content"
        align="left"
        height="6.8rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          prop="vehicleCardId"
          label="车牌号"
          fixed="left"
          width="90px"
        >
          <template slot-scope="scope">
            <div class="vehicleCardId"  @click="$refs.updateRef.openDialog(scope.row)">{{scope.row.vehicleCardId}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="vehicleTypeName"
          label="车辆型号"
        ></el-table-column>
        <el-table-column prop="vehicleOwnerName" label="车主" width="100"></el-table-column>
        <el-table-column
          prop="vehicleCount"
          label="驾乘人数"
          width="100"
        ></el-table-column>
        <el-table-column label="车辆详情" width="100">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>购买日期：{{scope.row.buyDate}}</p>
              <p>车身颜色：{{scope.row.vehicleColor}}</p>
              <p>轮胎型号：{{scope.row.vehicleShoeTypeCode}}</p>
              <p>排量：{{scope.row.vehicleVolume}}</p>
              <p>燃油型号：{{scope.row.vehiclefuelTypeCode}}</p>
              <p>发动机号：{{scope.row.vehicleMotorCode}}</p>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="年检情况" width="100">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <el-table :data="scope.row.vehiclecheckeds" border>
                <el-table-column
                  prop="checkedDate"
                  label="年检日期"
                  width="100"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="checkedVehiclePersonName"
                  label="年检经办人"
                  width="100"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="checkedEndDate"
                  label="年检有效期"
                  width="100"
                  align="left"
                ></el-table-column>
                <el-table-column
                  label="操作"
                  align="center"
                  width="70"
                >
                  <template slot-scope="scope2">
                    <el-button v-if="btnListIndexOf('SHAN1CHU')" type="primary" plain size="mini" @click="delChecked(scope2.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="保险情况" width="100">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <el-table :data="scope.row.vehicleSafes" border>
                <el-table-column
                  prop="safeTypeName"
                  label="保险类型"
                  align="left"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="safeCompanyName"
                  label="保险公司名称"
                  width="150"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="safeCompanyPerson"
                  label="保险公司联系人"
                  width="100"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="safeCompanyPhone"
                  label="保险公司联系人电话"
                  width="120"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="safeSum"
                  label="保险金额(元)"
                  width="80"
                  align="left"
                ></el-table-column>
                <el-table-column prop="safeVehicleAttachFile" label="保险扫描件" width="80" align="left">
                  <template slot-scope="scope">
                    <download-button :value="scope.row.safeVehicleAttachFile">下载</download-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="safeEndDate"
                  label="保险有效期"
                  width="100"
                  align="left"
                ></el-table-column>
                <el-table-column
                  label="操作"
                  align="center"
                  width="70"
                >
                  <template slot-scope="scope3">
                    <el-button v-if="btnListIndexOf('SHAN1CHU')" type="primary" plain size="mini" @click="delSafes(scope3.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230px" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="btnListIndexOf('XIN1JIAN')" type="primary" plain size="mini"  @click="$refs.addInspection.openDialog(scope.row)">新增年检</el-button>
            <el-button v-if="btnListIndexOf('XIN1JIAN')" type="primary" plain size="mini" @click="$refs.addInsurance.openDialog(scope.row)">新增保险</el-button>
            <el-button v-if="btnListIndexOf('SHAN1CHU')" type="primary" plain size="mini" @click="delVehicle(scope.row)">删除</el-button>
<!--            <table-button-->
<!--              :scope="scope.row"-->
<!--              @click="tableButtonClick"-->
<!--            ></table-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
<!--title="完善信息"-->
      <update-vehicle-dialog  ref="updateRef" @getFormData="updatevehicle"></update-vehicle-dialog>
<!--       title="新增年检信息" -->
      <vehicle-inspection-dialog ref="addInspection" comman="adds" @getFormData="addInspection"></vehicle-inspection-dialog>
<!--      title="修改年检信息"-->
      <vehicle-inspection-dialog ref="upInspection" comman="edits" @getFormData="upInspection"></vehicle-inspection-dialog>
<!--      title="新增保险信息"-->
      <vehicle-insurance-dialog ref="addInsurance" comman="adds" @getFormData="addInsurance"></vehicle-insurance-dialog>
<!--      title="修改保险信息" -->
      <vehicle-insurance-dialog ref="upInsurance" comman="edits" @getFormData="upInsurance"></vehicle-insurance-dialog>
    </div>
    <!--分页 -->
    <pagination
        :pageTotal="dataList.totalElements"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
    ></pagination>
  </div>
</template>
<script>
//import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/VehicleTableButton.vue";
import UpdateVehicleDialog from "../dialog/UpdateVehicleDialog.vue";
import VehicleInspectionDialog from "../dialog/VehicleInspectionDialog.vue";
import VehicleInsuranceDialog from "../dialog/VehicleInsuranceDialog.vue";
import TextButton from "../../../acomponents/TextButton.vue";

import * as vehicleinfo from "@/api/administration/vehicleinfo"
import * as VehicleChecked from "@/api/administration/VehicleChecked"
import * as vehiclevafe from "@/api/administration/vehiclevafe"

export default {
  components: {
    TableButton,
    UpdateVehicleDialog,
    VehicleInspectionDialog,
    VehicleInsuranceDialog,
    TextButton
  },
  props: {
    dataList: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pageShow:{
      type: Object,
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
    //删除车辆
    delVehicle(data){
      if(data.vehicleSafes.length==0 && data.vehiclecheckeds.length==0){
        this.$confirm(`此操作将永久删除${data.vehicleCardId}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vehicleinfo.deletes_object({keyid:data.keyid}).then(res =>{
            this.$message.success("删除成功!");
            this.$emit("updataCar",this.pageShow);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }else {
        this.$message.error(`请先删除${data.vehicleCardId}的年检信息和保险信息!`);
      }

    },
    //删除年检
    delChecked(data){
      console.log(data);
      this.$confirm(`此操作将永久删除${data.checkedVehiclePersonName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        VehicleChecked.deletes_object({keyid:data.keyid}).then(res =>{
          this.$message.success("删除成功!");

          this.$emit("updataCar",this.pageShow);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //删除保险
    delSafes(data){
      console.log(data);
      this.$confirm(`此操作将永久删除${data.safeTypeName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vehiclevafe.deletes_object({keyid:data.keyid}).then(res =>{
          this.$message.success("删除成功!");

          this.$emit("updataCar",this.pageShow);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //分页
    handleCurrentChange(val) {
      this.pageShow.pageInfo.page = val;
      this.$emit("updataCar", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.$emit("updataCar", this.pageShow);
    },
    addInspection(data){
      VehicleChecked.adds_object(data).then(item=>{
        console.log(item);
        if (item.code === 200) {
                          this.$message.success("新增年检完成!");
                        }
        this.$emit("updataCar", this.pageShow);
                      });
    },
    upInspection(data){
      console.log(data)
      VehicleChecked.edits_object(data).then(item=>{
                        if (item.code === 200) {
                          this.$message.success("修改完成!");
                        }
                      });
      this.$emit("updataCar", this.pageShow);
    },
    addInsurance(data)
    {
      vehiclevafe.adds_object(data).then(item=>{
                        if (item.code === 200) {
                          this.$message.success("新增保险完成!");
                        }
                      });
      this.$emit("updataCar", this.pageShow);
    },
    upInsurance(data)
    {
      vehiclevafe.edits_object(data).then(item=>{
                  if (item.code === 200) {
                    this.$message.success("修改完成!");
                  }
                });
      this.$emit("updataCar", this.pageShow);
    },
    updatevehicle(data)
    {
       vehicleinfo.edits_object(data).then(item=>{
                  if (item.code === 200) {
                    this.$message.success("修改完成!");
                  }
                });
      this.$emit("updataCar", this.pageShow);
    },
    tableButtonClick(btn,data) {
      switch (btn) {
        case 1:
          // this.$refs.updateRef.openDialog(data);
          break;
        case 2:
          this.$refs.addInspection.openDialog(data);
          break;
        case 3:
          this.$refs.addInsurance.openDialog(data);
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
  .vehicleCardId{
    cursor: pointer;
    color: #009bff;
  }
</style>
