<template>
	<div class="b-main">
		<div>
			<head-right-button @click="$refs.addSiteRef.openDialog()" title="新增踏勤"></head-right-button>
		</div>
		<div class="plan btn">
			<el-table :data="dataList" style="width: 100%" align="center" height="430px" highlight-current-row
			
			 :header-cell-style="{fontSize:'10px'}">
				<el-table-column fixed prop="tripdateTime" label="踏勘时间" align="center"></el-table-column>
				<el-table-column prop="workPersonName" label="踏勘人" align="center"></el-table-column>
				<el-table-column prop="tripDataFile" label="相关资料" align="center">
					<template slot-scope="scope">
						<download-button :value="scope.row.tripDataFile"></download-button>
					</template>
				</el-table-column>
				<el-table-column prop="tripImageFile" label="图片或影像资料" align="center">
					<template slot-scope="scope">
						<download-button :value="scope.row.tripImageFile"></download-button>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="mini" @click="$refs.reviceSiteRef.openDialog(scope.row)">修改</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="dialog">
			<add-site-dialog title="新增踏勤" width="30%" ref="addSiteRef" @getFormData="networkAddData"></add-site-dialog>
			<add-site-dialog title="修改" width="30%" ref="reviceSiteRef" @getFormData="networkUpData"></add-site-dialog>
		</div>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import AddSiteDialog from "../dialog/siteSurvey/AddSiteDialog.vue"
	import HeadRightButton from "../button/HeadRightButton.vue"
	import {mapState} from 'vuex'
  import {getSiteSurveys,addSiteSurvey,delSiteSurvey,upSiteSurvey} from '../../../../../../../api/workbench/webapi-projectConsult.js'

  export default {
		components: {
			AddSiteDialog,
			HeadRightButton,
		},
		props: {
		  title:[String]
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
        dataList: [],
			}
		},
		//生命周期函数节点
		created() {
		  this.networkGetDatas()
		},
		//自定义函数节点
		methods: {
      networkGetDatas(){
        let ref={
          projectKeyid:this.currentItem.keyid,
          typecodename:this.title?this.title+'/勘验':'勘验'
        }
        getSiteSurveys(ref).then(item=>{
          this.dataList= item.data
        })
      },
      networkAddData(formData){
        formData.projectKeyid=this.currentItem.keyid
				formData.typecodename=this.title?this.title+'/勘验':'勘验'
        addSiteSurvey(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkDelData(formData){
        delSiteSurvey(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData){
        upSiteSurvey(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
		}
	}
</script>
<style lang='less' scoped>
	.b-main {
		height: 80%;
	}
</style>
