<template>
	<div class="b-main">
		<div>
			<head-right-button @click="$refs.addRef.openDialog()" title="新建"></head-right-button>
		</div>
		<div>
			<el-table :data="dataList" style="width: 100%" align="center" height="430px" highlight-current-row
			 :header-cell-style="{fontSize:'10px'}" border>
				<el-table-column prop="publicityCount" label="发布次数" align="center" width="80px"></el-table-column>
				<el-table-column label="发布网站" align="center">
					<template slot-scope="scope"><getWeb :pkeyid="scope.row.keyid" :isNameItem="2"></getWeb></template>
				</el-table-column>
				<el-table-column label="网站截图" align="center" width="80px">
					<template slot-scope="scope">
						<getWeb :pkeyid="scope.row.keyid" :isNameItem="3"></getWeb>
					</template>
				</el-table-column>
				<el-table-column label="更正截图" align="center" width="120px">
					<template slot-scope="scope">
						<getWeb :pkeyid="scope.row.keyid" :isNameItem="4"></getWeb>
					</template>
				</el-table-column>
<!--				<el-table-column prop="createddateTime" label="创建时间" align="center"><template slot-scope="scope">-->
<!--					{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template>-->
<!--				</el-table-column>-->
<!--				<el-table-column prop="attachFile" label="附件" align="center">-->
<!--					<template slot-scope="scope">-->
<!--						<download-button :value="scope.row.attachFile"></download-button>-->
<!--					</template>-->
<!--				</el-table-column>-->
<!--				<el-table-column prop="needAttachFile" label="盖章扫描件" align="center">-->
<!--					<template slot-scope="scope">-->
<!--						<download-button :value="scope.row.needAttachFile"></download-button>-->
<!--					</template>-->
<!--				</el-table-column>-->

<!--				<el-table-column label="发布情况" align="center">-->
<!--					<template slot-scope="scope">-->
<!--						<com-popover :label-prop="[-->
<!--              {label:'发布日期',prop:'publicitydateTime'},-->
<!--              {label:'发布网站',prop:'publicityWebName'},-->
<!--              {label:'截图',prop:'publicityImageFile',type:'file'},-->
<!--              {label:'更正截图',prop:'publicityChangeImageFile',type:'file'},-->
<!--            ]"-->
<!--												 url="/pro/publicitylist/findwhere"-->
<!--												 :filter="{pkeyid:scope.row.keyid}"></com-popover>-->
<!--					</template>-->
<!--				</el-table-column>-->
<!--				<el-table-column prop="isdissent" label="是否有异议" align="center" width="130">-->
<!--					<template slot-scope="scope">-->
<!--						<switch-button prop="isdissent" :data="scope.row" @change="networkUpData"></switch-button>-->
<!--					</template>-->
<!--				</el-table-column>-->
<!--				<el-table-column prop="dissentSubmitFile" label="提出异议的文件" align="center" width="150">-->
<!--					<template slot-scope="scope">-->
<!--						<download-button :value="scope.row.dissentSubmitFile"></download-button>-->
<!--					</template>-->
<!--				</el-table-column>-->
				<el-table-column prop="dissentDoWay" label="异议处理结果" align="center" width="100"></el-table-column>
				<el-table-column prop="dissentResultFile" label="异议处理相关资料" align="center" width="150">
					<template slot-scope="scope">
						<download-button :value="scope.row.dissentResultFile"></download-button>
					</template>
				</el-table-column>
<!--				<el-table-column label="异议接受处理" align="center" width="100">-->
<!--					<template slot-scope="scope">-->
<!--						<com-popover data-type="obj" :label-prop="failActionTemplate" :data="scope.row"></com-popover>-->
<!--					</template>-->
<!--				</el-table-column>-->
<!--				<el-table-column prop="resultFile" label="公示公告截图" align="center" width="100">-->
<!--					<template slot-scope="scope">-->
<!--						<download-button :value="scope.row.resultFile"></download-button>-->
<!--					</template>-->
<!--				</el-table-column>-->
				<el-table-column label="操作" align="center" fixed="right" width="200">
					<template slot-scope="scope">
<!--						<el-button type="text" size="mini" @click="$refs.updateRef.openDialog(scope.row)">修改</el-button>-->
<!--						<el-button type="text" size="mini" @click="$refs.perfectRef.openDialog(scope.row)">完善发布信息</el-button>-->
						<el-button type="primary" plain size="mini" @click="$refs.processingRef.openDialog(scope.row)">异议处理登记</el-button>
						<el-button type="primary" plain size="mini" @click="delPublish(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="dialog">
<!--			 title="新增发布及处理"-->
			<add-publish-dialog ref="addRef" width="30%" @getFormData="networkAddData"></add-publish-dialog>
<!--			 title="修改"-->
			<add-publish-dialog ref="updateRef" width="30%" @getFormData="networkUpData"></add-publish-dialog>
<!--			 title="异议登记处理"-->
			<processing-regist-dialog ref="processingRef" width="30%" @getFormData="networkUpData"></processing-regist-dialog>
<!--			 title="完善发布信息"-->
			<perfect-info-dialog width="50%" ref="perfectRef"></perfect-info-dialog>
		</div>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import AddPublishDialog from "../dialog/PublishResultsTable/AddPublishDialog.vue"
	import ProcessingRegistDialog from "../dialog/PublishResultsTable/ProcessingRegistDialog.vue"
	import HeadRightButton from "../button/HeadRightButton.vue"
  import PerfectInfoDialog from "../dialog/InvitationLetterTable/PerfectInfoDialog.vue"
  import {mapState} from 'vuex'
  import {getDemand,addDemand,upDemand,delDemand} from '../../../../../../../api/workbench/webapi-biddingAgency.js'
	import getWeb from "../dialog/PublishResultsTable/getWeb.vue";
	import {GetHttp} from "../../../../../../../utils/http";
	import {delPretrial} from "../../../../../../../api/workbench/webapi-biddingAgency";
	export default {
		components: {
			AddPublishDialog,
			ProcessingRegistDialog,
			HeadRightButton,
      PerfectInfoDialog,
			getWeb
		},
		props: {
		  typeCode:''
		},
		watch: {},
    computed: {
      ...mapState('workbench', {
        currentItem: 'currentItem'
      })
    },
		//数据节点
		data() {
			return {
			  dataList:[],
				failActionTemplate: [{
						label: '原因',
						prop: 'pubobjectionDoWay'
					},
					{
						label: '发布网站',
						prop: 'pubobjectionWeb'
					},
					{
						label: '发布日期',
						prop: 'pubobjectiondateTime'
					},
				],
			}
		},
		//生命周期函数节点
		created() {
		  this.networkGetDataList()

		},
		//自定义函数节点
		methods: {
			delPublish(data){

				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delPretrial({keyid:data.keyid}).then(item => {
						if (item.code === 200) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.networkGetDataList()
						}
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
      networkGetDataList() {
        let ref = {
          projectKeyid: this.currentItem.keyid,
          publicityTypeKeyid: this.typeCode,
        }
        getDemand(ref).then(item => {
          this.dataList = item.data
					console.log(this.dataList);
        })
      },
      networkAddData(formData) {
        formData.projectKeyid = this.currentItem.keyid
        formData.publicityTypeKeyid = this.typeCode
        addDemand(formData).then(item => {
          if (item.code === 200) {
						let getData= {pkeyid:item.data.keyid,publicityChangeImageFile:''}
						getData.publicitydateTime=formData.publicitydateTime
						getData.publicityWebName=formData.publicityWebName
						getData.publicityImageFile=formData.publicityImageFile
						console.log(getData)
						GetHttp('java_post','/pro/publicitylist/adds','post',getData).then(res => {
							this.networkGetDataList()
						})
            this.$message.success(item.message)
            this.networkGetDataList()
          }
        })
      },
      networkUpData(formData) {
        upDemand(formData).then(item => {
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
	.b-main {
		height: 80%;
	}
</style>
