<template>
	<div class="b-main">
		<div>
			<head-right-button @click="$refs.addWorkRef.openDialog()" title="新增工作"></head-right-button>
		</div>
		<div>
			<el-table :data="materialInfo" style="width: 100%" align="center" height="430px"
			 :header-cell-style="{fontSize:'10px'}">
				<el-table-column prop="workName" label="工作名称" align="center"></el-table-column>
				<el-table-column prop="workdateTime" label="记录时间" align="center"></el-table-column>
				<el-table-column prop="workContant" label="工作内容" align="center"></el-table-column>
				<el-table-column prop="workFile" label="相关资料" align="center">
					<template slot-scope="scope">
						<download-button :value="scope.row.workFile"></download-button>
					</template>
				</el-table-column>
				<el-table-column prop="workimagevideoFile" label="图片或影像记录" align="center">
					<template slot-scope="scope">
						<download-button :value="scope.row.workimagevideoFile"></download-button>
					</template>
				</el-table-column>
				<el-table-column prop="workattachFile" label="相关成果资料" align="center">
					<template slot-scope="scope">
						<download-button :value="scope.row.workattachFile"></download-button>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="mini" @click="$refs.reviceWorkeRef.openDialog(scope.row)">修改</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="dialog">
			<add-work-dialog title="新增工作" width="30%" ref="addWorkRef" @getFormData="networkAddData"></add-work-dialog>
			<add-work-dialog title="修改" width="30%" ref="reviceWorkeRef" @getFormData="networkUpData"></add-work-dialog>
		</div>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import AddWorkDialog from "../dialog/AddWorkDialog.vue"
	import HeadRightButton from "../button/HeadRightButton.vue"
  import {mapState,mapMutations,mapActions} from 'vuex'
  import {getOtherServicess,addOtherServices,delOtherServices,upOtherServices} from '../../../../../../../api/workbench/webapi-projectConsult.js'
	export default {
		components: {
			AddWorkDialog,
			HeadRightButton,
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
        getOtherServicess(ref).then(item=>{
          this.materialInfo= item.data
        })
      },
      networkAddData(formData){
        formData.projectKeyid=this.currentItem.keyid
        addOtherServices(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkDelData(formData){
        delOtherServices(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData){
        upOtherServices(formData).then(item=>{
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
