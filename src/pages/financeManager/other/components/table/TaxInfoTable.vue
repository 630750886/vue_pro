<template>
  <!--银行信息台账-->
  <div class="body">
    <el-tabs v-model="activeName" tab-position="left">
      <template v-for="(item, index) in mydataList">
        <el-tab-pane :name="item.name" :key="index">
          <span slot="label">{{ item.name }}</span>
          <div class="table">
            <!-- <head-right-button title="新增" @click="openDialog"></head-right-button> -->
            <el-table
              :data="item.dataList"
              align="left"
              height="7.5rem"
              highlight-current-row
              :header-cell-style="{ fontSize: '14px' }"
              :default-sort = "{prop: 'createTime', order: 'descending'}"
              border
            >
              <el-table-column
                prop="createTime"
                :label="table_label"
                align="left"
              ></el-table-column>
              <el-table-column
                prop="timeType"
                label="完税类型"
                align="left"
                v-if="types == 'Tax'"
              ></el-table-column>
              <el-table-column label="附件" align="left">
                <template slot-scope="scope">
                  <download-button
                    :value="scope.row.attachId"
                  ></download-button>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                min-width="100px"
              >
                <template slot-scope="scope">
                  <el-button type="text" @click="del(scope.row.keyid)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </template>
    </el-tabs>
    <!-- <div class="dialog">
			<add-report-dialog title="新增审计报告信息" ref="addReportRef"></add-report-dialog>
			<add-payment-dialog title="新增审完税信息" ref="addPayRef"></add-payment-dialog>
			<add-security-dialog title="新增社保缴纳信息" ref="addSecRef"></add-security-dialog>
		</div> -->
  </div>
</template>
<script>
/*<<<<<<< HEAD
	// import __ from '__' // __是需要手动引入的文件
	// import HeadRightButton from '../button/HeadRightButton.vue'
	// import TaxationInfoDialog from '../dialog/TaxationInfoDialog.vue'
	// import addReportDialog from '../dialog/addReportDialog.vue'
	// import AddPaymentDialog from '../dialog/AddPaymentDialog.vue'
	// import AddSecurityDialog from '../dialog/AddSecurityDialog.vue'
	export default {
		components: {
	// 		TaxationInfoDialog,
	// 		addReportDialog,
	// 		AddPaymentDialog,
	// 		AddSecurityDialog,
    //   HeadRightButton
		},
		props: {
			type:'',
			mydataList:{
				type:Array,
				default:()=>[{name:'贵阳分公司',dataList:[]}]
			},
		},
		watch: {},
		//数据节点
		data() {
			return {
        activeName:'贵阳分公司'//mydataList[0].name,
        // companyList:[
		// 			{name:'重庆分公司',dataList:[]},
		// 			{name:'广西分公司',dataList:[]},
		// 			{name:'北京分公司',dataList:[]},
		// 			{name:'上海分公司',dataList:[]},
		// 			{name:'广州分公司',dataList:[]},
		// 		]
=======*/
// import __ from '__' // __是需要手动引入的文件
//import TableButton from '../button/TableButton.vue'
// import HeadRightButton from '../button/HeadRightButton.vue'
// import TaxationInfoDialog from '../dialog/TaxationInfoDialog.vue'
// import addReportDialog from '../dialog/addReportDialog.vue'
// import AddPaymentDialog from '../dialog/AddPaymentDialog.vue'
// import AddSecurityDialog from '../dialog/AddSecurityDialog.vue'
import { delTaxAttach } from "../../../../../api/webapi-fin.js";
export default {
  components: {
    //		TableButton
    // 		TaxationInfoDialog,
    // 		addReportDialog,
    // 		AddPaymentDialog,
    // 		AddSecurityDialog,
    //   HeadRightButton
  },
  props: {
    types: { Type: String },
    table_label: { Type: String },
    mydataList: {
      type: Array,
      default: () => [{ name: "贵阳分公司", dataList: [] }]
    }
  },
  watch: {},
  //数据节点
  data() {
    return {
      activeName: ""
      // companyList:[
      // 			{name:'重庆分公司',dataList:[]},
      // 			{name:'广西分公司',dataList:[]},
      // 			{name:'北京分公司',dataList:[]},
      // 			{name:'上海分公司',dataList:[]},
      // 			{name:'广州分公司',dataList:[]},
      // 		]
    };
  },
  //生命周期函数节点
  created() {
    let _this = this;
    setTimeout(() => {
      if (this.mydataList.length > 0) {
        this.activeName = this.mydataList[0].name;
      }
    }, 600);
  },
  //自定义函数节点
  methods: {
    openDialog() {
      // console.log(this.type)
      switch (this.types) {
        case "1":
          this.$refs.addReportRef.openDialog();
          break;
        case "2":
          this.$refs.addPayRef.openDialog();
          break;
        case "3":
          this.$refs.addSecRef.openDialog();
          break;
      }
    },
    del(keyid) {
      let pa = { jsondata: JSON.stringify({ keyid: keyid }) };
      delTaxAttach(pa).then(res => {
        if (res.code == 200) {
          this.$message.success("删除成功");
          this.$parent.$parent.$parent.getallTax();
        }
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
