<template>
  <div class="body">
    <div class="head-button">
      <head-button @click="headButtonClick"></head-button>
    </div>
    <div class="table">
      <el-tabs style="margin: 0 5px" v-model="activeName">
        <el-tab-pane name="1">
          <span slot="label">物业</span>
          <property-table @updataProperty="updataProperty" :pageShow="pageShow" :dataList="dataListProperty"></property-table>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label">车辆</span>
          <vehicle-table :pageShow="pageShow" @updataCar="updataCar" :dataList="dataListvehicleinfo"></vehicle-table>
        </el-tab-pane>
<!--				<el-tab-pane name="3">-->
<!--          <span slot="label">车位</span>-->
<!--          <parking-table :dataList="dataListvehicleparking"></parking-table>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane name="4">-->
<!--          <span slot="label">用车</span>-->
<!--          <use-vehicle-table :dataList="dataListUseVehicleApp"></use-vehicle-table>-->
<!--        </el-tab-pane>-->
      </el-tabs>
    </div>
    <div class="dialog">
<!--       title="新增物业"-->
      <add-property-dialog ref="addPropertyRef" @getFormData="addProperty"></add-property-dialog>
<!--      title="新增车辆"-->
      <add-vehicle-dialog ref="addVehicleRef" @getFormData="addVehicle"></add-vehicle-dialog>
<!--      <add-parking-dialog ref="addParkingRef" title="车位管理" @getFormData="addParking"></add-parking-dialog>-->
<!--      <use-vehicle-apply-dialog ref="useVehicleRef" title="用车申请" @getFormData="useVehicle"></use-vehicle-apply-dialog>-->
    </div>
  </div>
</template>
<script>
  //import __ from  '__' // __是需要手动引入的文件
  import HeadButton from './button/HeadButton.vue'
  import VehicleTable from './table/VehicleTable.vue'
  // import UseVehicleTable from './table/UseVehicleTable.vue'
  import PropertyTable from './table/PropertyTable.vue'
  import ParkingTable from './table/ParkingTable.vue'
  import KilometreTable from './table/KilometreTable.vue'

  import AddPropertyDialog from './dialog/AddPropertyDialog.vue'
  import AddVehicleDialog from './dialog/AddVehicleDialog.vue'
  // import AddParkingDialog from './dialog/AddParkingDialog.vue'
  // import UseVehicleApplyDialog from './dialog/UseVehicleApplyDialog.vue'
  import KilometreSubsidyDialog from './dialog/KilometreSubsidyDialog.vue'
  /* import StopVehiclePlaceDialog from './dialog/StopVehiclePlaceDialog.vue' */
  import * as Property from "@/api/administration/Property.js"
  import * as vehicleinfo from "@/api/administration/vehicleinfo.js"
  // import * as UseVehicleApp from "@/api/administration/UseVehicleApp.js"//获取用车
  // import * as vehicleparking from "@/api/administration/vehicleparking.js" //获取车位
  import * as VehicleChecked from "@/api/administration/VehicleChecked.js"
  import * as vehiclevafe from "@/api/administration/vehiclevafe.js"

  export default {
    inject: ["reload"],
    components: {
      HeadButton,
      VehicleTable,
      // UseVehicleTable,
      PropertyTable,
			ParkingTable,
      KilometreTable,
      AddPropertyDialog,
      AddVehicleDialog,
			// AddParkingDialog,
      // UseVehicleApplyDialog,//用车对话框
      KilometreSubsidyDialog,
      /* StopVehiclePlaceDialog */
    },
    props: {},
    watch: {
      activeName(newVal){
        this.pageShow= {
          pageInfo: {
            page: 1,
            limit: 30
          },
          advancedQuery: {

          }
        }
        switch (newVal) {
          case "1":
            this.dataListvehicleinfo =[];
            this.getPropertyData(this.pageShow);
            break
          case "2":
            this.dataListProperty = [];
            this.getCarData(this.pageShow)
        }
      }
    },
    //数据节点
    data() {
      return {
        pageShow: {
          pageInfo: {
            page: 1,
            limit: 30
          },
          advancedQuery: {

          }
        },
        activeName: '1',
        dataListProperty:{},
        dataListvehicleinfo: {},
        // dataListUseVehicleApp: [],//用车
        // dataListvehicleparking: [],//车位
        dataListVehicleChecked: [],
        dataListvehiclevafe:{},
      }
    },
    //生命周期函数节点
    created() {

      //获取用车
      // UseVehicleApp.findall_object({}).then(item=>{
      //   if (item.code === 200) {
      //     //this.$message.success("查询完成!");
      //     this.dataListUseVehicleApp=item.data;
      //   }
      // });
      this.getPropertyData(this.pageShow)
      //获取车位
      // vehicleparking.findall_object({}).then(item=>{
      //   if (item.code === 200) {
      //     //this.$message.success("查询完成!");
      //     this.dataListvehicleparking=item.data;
      //   }
      // });
      VehicleChecked.findall_object({}).then(item=>{
        if (item.code === 200) {
          //this.$message.success("查询完成!");
            this.dataListVehicleChecked=item.data;
        }
      });
      vehiclevafe.findall_object({}).then(item=>{
        if (item.code === 200) {
          //this.$message.success("查询完成!");
          this.dataListvehiclevafe=item.data;
        }
      });
    },
    //自定义函数节点
    methods: {
      //更新车辆数据
      updataCar(data){
        this.reload();
        this.getCarData(data)
      },
      //更新物业数据
      updataProperty(data){
        this.reload();
        this.getPropertyData(data)
      },
      //获取车位
      getCarData(data){
        vehicleinfo.advancedquery_object(data).then(item=>{
          if (item.code === 200) {
            if(!item.data.content.length==0){
              this.dataListvehicleinfo=item.data;
            }
          }

        })
      },
      //获取物业信息Property
      getPropertyData(data){
        Property.advancedquery_object(data).then(item=>{
          if (item.code === 200) {
            if(!item.data.content.length==0){
              this.dataListProperty=item.data;
            }

          }

        })
      },

      addProperty(data){
          Property.adds_object(data).then(item=>{
                  if (item.code === 200) {
                    this.getPropertyData(this.pageShow)
                    this.$message.success("新增完成!");
                    //this.dataListVehicleChecked=item.data;
                  }
                });
      },
      addVehicle(data){
          vehicleinfo.adds_object(data).then(item=>{
                  if (item.code === 200) {
                    this.getCarData(this.pageShow)
                    this.$message.success("新增完成!");
                    //this.dataListVehicleChecked=item.data;
                  }
                });
      },
      // 车位管理
      // addParking(data){
      //   vehicleparking.adds_object(data).then(item=>{
      //           if (item.code === 200) {
      //             this.$message.success("新增完成!");
      //             //this.dataListVehicleChecked=item.data;
      //           }
      //         });
      // },

      //用车申请
      // useVehicle(data){
      //     UseVehicleApp.adds_object(data).then(item=>{
      //             if (item.code === 200) {
      //               this.$message.success("新增完成!");
      //             }
      //           });
      // },
      headButtonClick(btn){
        switch (btn) {
          case 1:
            this.$refs.addPropertyRef.openDialog()
            break
          case 2:
            this.$refs.addVehicleRef.openDialog()
            break
          // case 3:
          //   this.$refs.useVehicleRef.openDialog()
          //   break
          case 4:
            this.$refs.kilometreRef.openDialog(this.kilometreSubsidy)
            break
          // case 5:
          //   this.$refs.addParkingRef.openDialog()
          //   break
          case 9:
          this.reload();
          break;
        }
      },
      handleSelectionChange(val) {
        this.kilometreSubsidy = val;
      },

    }
  }
</script>
<style lang='less' scoped>
  .head-button {
    height: 35px;
    line-height: 35px;
    padding: 4px 5px;
    margin-left: 1px;
  }
</style>
