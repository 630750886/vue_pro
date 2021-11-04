<template>
  <div class="body">
    <div class="head-button">
      <head-button @click="headButtonClick"></head-button>
    </div>
    <div class="table">
      <template v-if="true">
        <el-tabs v-model="activeName">
          <el-tab-pane name="1">
            <span slot="label">印章</span>
            <seal-table :dataList="dataListAigStamper"></seal-table>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label">电子印章</span>
            <electron-seal-table :dataList="dataListAigElectronicSeal"></electron-seal-table>
          </el-tab-pane>
          <el-tab-pane name="3">
            <span slot="label">CA锁</span>
            <ca-lock-table :dataList="dataListAigCaLockInfo"></ca-lock-table>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
    <div class="dialog">
		<add-seal-dialog title="新增印章" ref="addSealRef" @getFormData="addSeal"></add-seal-dialog>
		<add-elec-seal-dialog title="新增电子印章" ref="addElecSealRef" @getFormData="addElecSeal"></add-elec-seal-dialog>
		<AddCALockDialog title="新增CA锁" ref="addCalockRef" @getFormData="addCalock"></AddCALockDialog>
		<query-dialog title="高级查询" ref="queryRef"></query-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadButton from './button/HeadButton.vue'
  import SealTable from './table/SealTable.vue'
  import ElectronSealTable from './table/ElectronSealTable.vue'
  import CaLockTable from './table/CALockTable.vue'
  import SealCaLockApplyTable from './table/SealCALockApplyTable.vue'
  import AddSealDialog from './dialog/AddSealDialog.vue'
  import AddElecSealDialog from './dialog/AddElecSealDialog.vue'
  import AddCALockDialog from './dialog/AddCALockDialog.vue'
  import ApplySealDialog from './dialog/ApplySealDialog.vue'
  import ApplyCALockDialog from './dialog/ApplySealCALockDialog.vue'
  import QueryDialog from './dialog/QueryDialog.vue'

  import * as AigStamper from "@/api/administration/AigStamper.js"
  import * as AigElectronicSeal from "@/api/administration/AigElectronicSeal.js"
  import * as AigCaLockInfo from "@/api/administration/AigCaLockInfo.js"

  export default {
    inject: ["reload"],
    components: {
      HeadButton,
      SealTable,
      ElectronSealTable,
      CaLockTable,
      SealCaLockApplyTable,
      AddSealDialog,
      AddElecSealDialog,
      AddCALockDialog,
      ApplySealDialog,
      ApplyCALockDialog,
      QueryDialog,
    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        activeName: '1',
        dataListAigStamper: [],
        dataListAigElectronicSeal: [],
        dataListAigCaLockInfo: []
      }
    },
    //生命周期函数节点
    created() {
      AigStamper.findall_object({}).then(item=>{
        if (item.code === 200) {
          //this.$message.success("查询印章!");
          this.dataListAigStamper=item.data;
        }
      });
      AigElectronicSeal.findall_object({}).then(item=>{
        if (item.code === 200) {
          //this.$message.success("查询电子印章!");
          this.dataListAigElectronicSeal=item.data;
        }
      });
      AigCaLockInfo.findall_object({}).then(item=>{
        if (item.code === 200) {
          //this.$message.success("查询CA锁!");
          this.dataListAigCaLockInfo=item.data;
        }
      });
    },
    //自定义函数节点
    methods: {
    addSeal(data){
      AigStamper.adds_object(data).then(item=>{
        if (item.code === 200) {
          this.$message.success("新增印章成功!");
        }
      });
    },
    addElecSeal(data){
      AigElectronicSeal.adds_object(data).then(item=>{
        if (item.code === 200) {
          this.$message.success("新增电子印章成功!");
        }
      });
    },
    addCalock(data){
      AigCaLockInfo.adds_object(data).then(item=>{
        if (item.code === 200) {
          this.$message.success("新增CA锁成功!");
        }
      });
    },
		headButtonClick(btn){
			switch(btn){
				case 1:
				this.$refs.addSealRef.openDialog();
				break;
				case 2:
				this.$refs.addElecSealRef.openDialog();
				break;
				case 3:
				this.$refs.addCalockRef.openDialog();
				break;
				case 5:
				this.$refs.applyCalockRef.openDialog();
				break;
				case 6:
				this.$refs.queryRef.openDialog();
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
