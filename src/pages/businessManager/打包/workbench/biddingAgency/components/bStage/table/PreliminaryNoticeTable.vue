<template>
  <div>

    <div>
    	<head-right-button @click="$refs.addRef.openDialog()"  title="新增编制及发布"></head-right-button>
    </div>
    <div>
    	<el-table :data="dataList" style="width: 100%" align="center"  height="400px" highlight-current-row
    	 :header-cell-style="{fontSize:'10px'}" border>
    		<el-table-column prop="createddateTime" label="创建时间" align="center"><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
    		<el-table-column prop="attachFile" label="附件" align="center">
					<template slot-scope="scope">
						<download-button :value="scope.row.attachFile"></download-button>
					</template>
				</el-table-column>
				<el-table-column prop="needAttachFile" label="盖章扫描件" align="center">
					<template slot-scope="scope">
						<download-button :value="scope.row.needAttachFile"></download-button>
					</template>
				</el-table-column>

				<el-table-column label="发布情况" align="center">
					<template slot-scope="scope">
						<com-popover :label-prop="[
              {label:'发布日期',prop:'publicitydateTime'},
              {label:'发布网站',prop:'publicityWebName'},
              {label:'截图',prop:'publicityImageFile',type:'file'},
              {label:'更正截图',prop:'publicityChangeImageFile',type:'file'},
            ]"
												 url="/pro/publicitylist/findwhere"
												 :filter="{pkeyid:scope.row.keyid}"></com-popover>
					</template>
				</el-table-column>

				<el-table-column prop="isdissent" label="是否有异议" align="center">
					<template slot-scope="scope">
						<switch-button prop="isdissent" :data="scope.row" @change="networkUpData"></switch-button>
					</template>
				</el-table-column>
				<el-table-column prop="dissentSubmitFile" label="提出异议的文件" align="center" width="150">
					<template slot-scope="scope">
						<download-button :value="scope.row.dissentSubmitFile"></download-button>
					</template>
				</el-table-column>
				<el-table-column prop="dissentDoWay" label="异议回复处理" align="center"></el-table-column>
				<el-table-column prop="dissentResultFile" label="异议驳回文件" align="center">
					<template slot-scope="scope">
						<download-button :value="scope.row.dissentResultFile"></download-button>
					</template>
				</el-table-column>

    		<el-table-column label="操作" align="center" width="200" fixed="right">
    			<template slot-scope="scope">
    				<el-button type="text" @click="$refs.updateRef.openDialog(scope.row)">修改</el-button>
    				<el-button type="text" @click="$refs.perfectRef.openDialog(scope.row)">完善发布信息</el-button>
    				<el-button type="text" @click="$refs.handingRef.openDialog(scope.row)">异议处理登记</el-button>
    			</template>
    		</el-table-column>

    	</el-table>
    </div>
		<div class="dialog">
			<add-establishment-dialog title="新增编制及发布" width="30%" ref="addRef" @getFormData="networkAddData"></add-establishment-dialog>
			<add-establishment-dialog title="修改" width="30%" ref="updateRef" @getFormData="networkUpData"></add-establishment-dialog>
			<perfect-info-dialog title="完善发布信息" width="50%" ref="perfectRef" @getFormData="networkUpData"></perfect-info-dialog>
			<objection-handling-dialog title="异议处理登记" width="30%" ref="handingRef" @getFormData="networkUpData"></objection-handling-dialog>

		</div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from "../button/HeadRightButton.vue"
  import AddEstablishmentDialog from "../dialog/PreliminaryNoticeTable/AddEstablishmentDialog.vue"
  import PerfectInfoDialog from "../dialog/PreliminaryNoticeTable/PerfectInfoDialog.vue"
  import ObjectionHandlingDialog from "../dialog/PreliminaryNoticeTable/ObjectionHandlingDialog.vue"

  import {mapState} from 'vuex'
  import {getDemand,addDemand,upDemand,delDemand} from '../../../../../../../api/workbench/webapi-biddingAgency.js'


  export default {
    components: {
      HeadRightButton,
			AddEstablishmentDialog,
			PerfectInfoDialog,
			ObjectionHandlingDialog,
    },
    props: {
      typeCode:[String]
    },
    watch: {},
    computed:{
      ...mapState('workbench',{
        currentItem:'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        dataList:[]
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetDataList()
			},
    //自定义函数节点
    methods: {
      networkGetDataList() {
        let ref={
          projectKeyid:this.currentItem.keyid,
          publicityTypeKeyid:this.typeCode,
        }
        getDemand(ref).then(item=>{
          this.dataList=item.data
        })
      },
      networkAddData(formData) {
        formData.projectKeyid=this.currentItem.keyid
        formData.publicityTypeKeyid=this.typeCode
        addDemand(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataList()
          }
        })
      },
      networkUpData(formData) {
        upDemand(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataList()
          }
        })
      },
      networkDelData(formData) {
        delDemand(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataList()
          }
        })
      },
      networkAdjustmentData(formData) {
        formData.pkeyid=this.$myfunction.copyData(formData.keyid)
        formData.keyid=''
        addDemand(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataList()
          }
        })
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
