<template>
	<div class="b-main">
		<div >
			<head-right-button @click="$refs.addReviewRef.openDialog()" title="新增评审"></head-right-button>
		</div>
		<div >
			<el-table :data="materialInfo" style="width: 100%" align="center" height="430px" highlight-current-row
			 :header-cell-style="{fontSize:'10px'}">
				<el-table-column prop="reviewingdateTime" label="评审时间" align="center"></el-table-column>
				<el-table-column prop="reviewingTitle" label="评审名称" align="center"></el-table-column>
				<el-table-column prop="reviewingPersonName" label="评审组织人" align="center"></el-table-column>
				<el-table-column prop="reviewingDatafile" label="评审资料" align="center">
					<template slot-scope="scope">
						<download-button :value="scope.row.reviewingDatafile"></download-button>
					</template>
				</el-table-column>
				<el-table-column prop="reviewingImageVideo" label="图片或影像记录" align="center">
					<template slot-scope="scope">
						<download-button :value="scope.row.reviewingImageVideo"></download-button>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="mini" @click="$refs.reviceReviewRef.openDialog(scope.row)">修改</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="dialog">
			<add-review-dialog title="新增评审" width="30%" ref="addReviewRef" @getFormData="networkAddData"></add-review-dialog>
			<add-review-dialog title="修改" width="30%" data="data" ref="reviceReviewRef" @getFormData="networkUpData"></add-review-dialog>
		</div>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import AddReviewDialog from "../dialog/AddReviewDialog.vue"
	import HeadRightButton from "../button/HeadRightButton.vue"
  import {mapState,mapMutations,mapActions} from 'vuex'
  import {getReviews,addReview,delReview,upReview} from '../../../../../../../api/workbench/webapi-projectConsult.js'
	export default {
		components: {
			AddReviewDialog,
			HeadRightButton
		},
		props: {},
		watch: {},
    computed:{
      ...mapState('workbench',{
        currentItem:'currentItem'
      })
    },
		//数据节点
		data() {
			return {
				materialInfo: [],

			}
		},
		//生命周期函数节点
		created() {
      this.networkGetDatas()
		},
		//自定义函数节点
		methods: {
      networkGetDatas(){
        let ref={projectKeyid:this.currentItem.keyid}
        getReviews(ref).then(item=>{
          this.materialInfo= item.data
        })
      },
      networkAddData(formData){
        formData.projectKeyid=this.currentItem.keyid
        addReview(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkDelData(formData){
        delReview(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData){
        upReview(formData).then(item=>{
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
