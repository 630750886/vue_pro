<template>
  <div>
    <div>
    	<head-right-button @click="$refs.addRef.openDialog()"  title="新建"></head-right-button>
    </div>
    <div>
    	<el-table :data="dataList" style="width: 100%" align="center"  height="400px" highlight-current-row
    	 :header-cell-style="{fontSize:'10px'}" border>
<!--				<el-table-column prop="createddateTime" label="创建时间" align="center"><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>-->
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
<!--				<el-table-column  label="发布情况" align="center">-->
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
<!--				<el-table-column prop="isdissent" label="是否有异议" align="center" width="120px">-->
<!--					<template slot-scope="scope">-->
<!--						<switch-button prop="isdissent" :data="scope.row" @change="networkUpData"></switch-button>-->
<!--					</template>-->
<!--				</el-table-column>-->

				<el-table-column label="发布时间" align="center" width="120px">
					<template slot-scope="scope"><getWeb :pkeyid="scope.row.keyid" :isNameItem="1"></getWeb></template>
				</el-table-column>
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

<!--				<el-table-column prop="dissentSubmitFile" label="提出异议的文件" align="center" width="150">-->
<!--					<template slot-scope="scope">-->
<!--						<download-button :value="scope.row.dissentSubmitFile"></download-button>-->
<!--					</template>-->
<!--				</el-table-column>-->
				<el-table-column prop="dissentDoWay" label="异议处理结果" align="center"></el-table-column>
				<el-table-column prop="dissentResultFile" label="异议处理相关资料" align="center">
					<template slot-scope="scope">
						<download-button :value="scope.row.dissentResultFile"></download-button>
					</template>
				</el-table-column>

    		<el-table-column label="操作" align="center" width="200" fixed="right">
    			<template slot-scope="scope">
<!--    				<el-button type="text" @click="$refs.updateRef.openDialog(scope.row)">修改</el-button>-->
<!--    				<el-button type="text" @click="$refs.perfectRef.openDialog(scope.row)">完善发布信息</el-button>-->
    				<el-button type="primary"  plain size="mini" @click="$refs.handingRef.openDialog(scope.row)">异议处理登记</el-button>
						<el-button type="primary"  plain size="mini" @click="delInvitation(scope.row)">删除</el-button>
    			</template>
    		</el-table-column>

    	</el-table>
    </div>
		<div class="dialog">
			<add-invitation-letter-dialog title="新增编制及发布" width="30%" ref="addRef" @getFormData="networkAddData"></add-invitation-letter-dialog>
			<add-invitation-letter-dialog title="修改" width="30%" ref="updateRef" @getFormData="networkUpData"></add-invitation-letter-dialog>
			<perfect-info-dialog title="完善发布信息" width="50%" ref="perfectRef"></perfect-info-dialog>
			<objection-handling-dialog title="异议处理登记" width="30%" ref="handingRef" @getFormData="networkUpData"></objection-handling-dialog>
		</div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from "../button/HeadRightButton.vue"
  import AddInvitationLetterDialog from "../dialog/InvitationLetterTable/AddInvitationLetterDialog.vue"
  import PerfectInfoDialog from "../dialog/InvitationLetterTable/PerfectInfoDialog.vue"
  import ObjectionHandlingDialog from "../dialog/InvitationLetterTable/ObjectionHandlingDialog.vue"
  import {mapState} from 'vuex'
  import {getPretrial,addPretrial,upPretrial,delPretrial} from '../../../../../../../api/workbench/webapi-biddingAgency.js'
	import getWeb from "../dialog/NoticeAndInvitationTag/getWeb.vue";
	import {GetHttp} from "../../../../../../../utils/http";

  export default {
    components: {
      HeadRightButton,
			AddInvitationLetterDialog,
			PerfectInfoDialog,
			ObjectionHandlingDialog,
			getWeb,
    },
    props: {
      title: '',
      width: '',
      labelWidth: {
        type: String,
        default: '130px'
      },
			data:{},
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
      this.networkGetDataList()
			},
    //自定义函数节点
    methods: {
			delInvitation(data){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delPretrial({keyid:data.keyid}).then(item => {
						if (item.code === 200) {
							this.networkGetDataList()
						}
					})
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
      networkGetDataList() {
        let ref={
          projectKeyid:this.currentItem.keyid,
          publicityTypeKeyid:'invitation'
        }
        getPretrial(ref).then(item=>{
          this.dataList=item.data
        })
      },
      networkAddData(formData) {
        formData.projectKeyid=this.currentItem.keyid
        formData.ordernum=this.maxOrder+1
        formData.publicityTypeKeyid='invitation'
        addPretrial(formData).then(item=>{
          if (item.code === 200) {
						let getData= {pkeyid:item.data.keyid,publicityChangeImageFile:''}
						getData.publicitydateTime=formData.publicitydateTime
						getData.publicityWebName=formData.publicityWebName
						getData.publicityImageFile=formData.publicityImageFile
						console.log(getData)
						GetHttp('java_post','/pro/publicitylist/adds','post',getData).then(res => {
							this.networkGetDataList()
						})
            this.networkGetDataList()
          }
        })
      },
      networkUpData(formData) {
        upPretrial(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataList()
          }
        })
      },
      networkDelData(formData) {
        delPretrial(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataList()
          }
        })
      },
      networkAdjustmentData(formData) {
        formData.pkeyid=this.$myfunction.copyData(formData.keyid)
        formData.keyid=''
        addPretrial(formData).then(item=>{
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
