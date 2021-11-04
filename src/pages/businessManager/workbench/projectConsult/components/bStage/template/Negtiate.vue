<template>
	<div class="b-main">

		<div>
			<head-right-button @click="$refs.addNegRef.openDialog()" title="新增会商"></head-right-button>
		</div>

		<div>
			<el-table :data="materialInfo" style="width: 100%" align="center" height="430px" highlight-current-row
			 :header-cell-style="{fontSize:'10px'}">
				<el-table-column prop="negotiationsdateTime" label="会商时间" align="center"></el-table-column>
				<el-table-column prop="negotiationsTitle" label="会商主题" align="center"></el-table-column>
				<el-table-column prop="negotiationsPersons" label="谈判人" align="center"></el-table-column>
				<el-table-column prop="negotiationsDataFile" label="相关资料" align="center">
					<template slot-scope="scope">
						<download-button :value="scope.row.negotiationsDataFile"></download-button>
					</template>
				</el-table-column>
				<el-table-column prop="negotiationsImageVideoFile" label="图片或影像记录" align="center">
					<template slot-scope="scope">
						<download-button :value="scope.row.negotiationsImageVideoFile"></download-button>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="mini" @click="$refs.reviceNegeRef.openDialog(scope.row)">修改</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="dialog">
			<add-negtiate-dialog title="新增会商" width="30%" ref="addNegRef" @getFormData="networkAddData"></add-negtiate-dialog>
			<add-negtiate-dialog title="修改" width="30%" data="data" ref="reviceNegeRef" @getFormData="networkUpData"></add-negtiate-dialog>
		</div>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import AddNegtiateDialog from "../dialog/AddNegtiateDialog.vue"
	import HeadRightButton from "../button/HeadRightButton.vue"
  import {mapState,mapMutations,mapActions} from 'vuex'
  import {getNegtiates,addNegtiate,delNegtiate,upNegtiate} from '../../../../../../../api/workbench/webapi-projectConsult.js'
	export default {
		components: {
			AddNegtiateDialog,
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
        getNegtiates(ref).then(item=>{
          this.materialInfo= item.data
        })
      },
      networkAddData(formData){
        formData.projectKeyid=this.currentItem.keyid
        addNegtiate(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkDelData(formData){
        delNegtiate(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData){
        upNegtiate(formData).then(item=>{
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
