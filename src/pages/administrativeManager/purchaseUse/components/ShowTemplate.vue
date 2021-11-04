<template>
  <div class="body">
    <div class="head-button">
      <head-button @click="headButtonClick"></head-button>
    </div>
    <div class="table">
      <el-tabs v-model="activeName">
        <el-tab-pane name="1">
          <span slot="label">固定资产</span>
          <fixed-assets-table :dataList="dataListPurchaseApp"></fixed-assets-table>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label">物品入库</span>
          <storage-table :dataList="dataListPurchasePutin"></storage-table>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label">物品领用</span>
          <use-table :dataList="dataListEquipmentUseApp"></use-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="dialog">
		<fixed-assets-request-dialog title="固定资产采购申请" ref="fixedRequestRef" @getFormData="fixedRequest"></fixed-assets-request-dialog>
		<goods-request-dialog title="物品领用申请" ref="goodsRequestRef" @getFormData="goodsRequest"></goods-request-dialog>
		<goods-warehousing-dialog title="物品入库" ref="goodsWarehousingRef" @getFormData="goodsWarehousingRequest"></goods-warehousing-dialog>
		<query-dialog title="高级查询" ref="queryRef" @getFormData="queryRequest"></query-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  //采购领用管理
  import HeadButton from './button/HeadButton.vue'
  import PurchaseTable from './table/PurchaseTable.vue'
  import StorageTable from './table/StorageTable.vue'
  import UseTable from './table/UseTable.vue'
  import FixedAssetsTable from './table/FixedAssetsTable.vue'
  import FixedAssetsRequestDialog from './dialog/FixedAssetsRequestDialog.vue'
  import GeneralRequestDialog from './dialog/GeneralRequestDialog.vue'
  import GoodsRequestDialog from './dialog/GoodsRequestDialog.vue'
  import GoodsWarehousingDialog from './dialog/GoodsWarehousingDialog.vue'
  import QueryDialog from './dialog/QueryDialog.vue'

  import * as PurchaseInfo from "@/api/administration/PurchaseInfo.js"
  import * as PurchaseApp from "@/api/administration/PurchaseApp.js"
  import * as PurchasePutin from "@/api/administration/PurchasePutin.js"
  import * as EquipmentUseInfo from "@/api/administration/EquipmentUseInfo.js"
  import * as EquipmentUseApp from "@/api/administration/EquipmentUseApp.js"


  export default {
    inject: ["reload"],
    components: {
      HeadButton,
      FixedAssetsTable,
      PurchaseTable,
      StorageTable,
      UseTable,
      FixedAssetsRequestDialog,
      GeneralRequestDialog,
      GoodsRequestDialog,
      GoodsWarehousingDialog,
      QueryDialog,
    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        activeName: '1',
        dataListPurchaseApp: [],
        dataListstorage:[],
        dataListPurchaseInfo: [],
        dataListPurchasePutin: [],
        dataListEquipmentUseApp: [],
      }
    },
    //生命周期函数节点
    created() {
      //
      let fixquery={purchaseAppTypekeyid:'001',purchaseAppTypeName:' 固定资产'};
      PurchaseApp.findall_object(fixquery).then(item=>{
        if (item.code === 200) {
          //this.$message.success("查询完成!");
          this.dataListPurchaseApp=item.data;
        }
      });
      let storagequery={purchaseAppTypekeyid:'002',purchaseAppTypeName:'通用物品'};
      PurchaseApp.findall_object(storagequery).then(item=>{
        if (item.code === 200) {
          //this.$message.success("查询完成!");
          this.dataListstorage=item.data;
        }
      });
      //
      PurchaseInfo.findall_object({}).then(item=>{
        if (item.code === 200) {
          //this.$message.success("查询完成!");
          this.dataListPurchaseInfo=item.data;
        }
      });
      //
      PurchasePutin.findall_object({}).then(item=>{
        if (item.code === 200) {
          //this.$message.success("查询完成!");
          this.dataListPurchasePutin=item.data;
        }
      });
      //
      EquipmentUseApp.findall_object({}).then(item=>{
        if (item.code === 200) {
         // this.$message.success("查询完成!");
          this.dataListEquipmentUseApp=item.data;
        }
      });
    },
    //自定义函数节点
    methods: {
      fixedRequest(data){
        PurchaseApp.adds_object(data).then(item=>{
        if (item.code === 200) {
          this.$message.success("资产申请完成!");
        }
      });
      },
      goodsRequest(data){
          EquipmentUseApp.adds_object(data).then(item=>{
                  if (item.code === 200) {
                    this.$message.success("用品申请完成!");
                  }
                });
      },
      goodsWarehousingRequest(data){
        PurchasePutin.adds_object(data).then(item=>{
                          if (item.code === 200) {
                            this.$message.success("物品申请完成!");
                          }
                        });
      },
      queryRequest(data){

      },
		headButtonClick(btn){
			switch(btn){
				case 1:
				this.$refs.queryRef.openDialog();
				break;
				case 2:
				break;
				case 3:
				this.$refs.fixedRequestRef.openDialog();
				break;
				case 4:
				this.$refs.goodsWarehousingRef.openDialog();
				break;
				case 5:
				this.$refs.goodsRequestRef.openDialog();
				break;
        case 9:
          this.reload();
          break;
			}
		}
	}
  }
</script>
<style lang='less' scoped>
  .head-button {
    height: 50px;
    line-height: 50px;
    padding: 10px 20px;
  }
</style>
