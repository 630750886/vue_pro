<template>
	<div class="column">
		<div class="btn">
			<head-right-button  @click="$refs.addMeansRef.openDialog()" title="新增资料"></head-right-button>
		</div>
		<el-table
						:data="materialList"
						style="width: 100%"
						align="center"
						highlight-current-row
						:header-cell-style="{fontSize:'14px'}">
			<el-table-column prop="dataName" label="资料名称" align="center"></el-table-column>
			<el-table-column prop="dataName" label="附件" align="center">
				<template slot-scope="scope">
					<el-button type="text">下载</el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="mini" @click="delMeans(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="dialog">
			<add-means-dialog ref="addMeansRef" title="新增资料" width="30%" @getFormData="submitAddMeans"></add-means-dialog>
		</div>
	</div>

</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import HeadRightButton from "../../../../button/HeadRightButton.vue"
	import AddMeansDialog from '../dialog/AddMeansDialog.vue'
	import {mapState,mapActions} from 'vuex'
	import {getMaterials,addMaterial,delMaterial} from '../../../../../../../../../../api/webapi-itemWorkGroup.js'
	export default {
		components: {
			HeadRightButton,
			AddMeansDialog,
		},
		props: {

		},
		watch: {
		},
		computed:{
      ...mapState('workbench/aStage', {
        currentItem: 'currentItem',
        vuexMaterialList:'materialList'
      })
		},
		//数据节点
		data() {
			return {
        materialList:[]
			}
		},
		mounted(){
      this.networkGetMaterials()
		},
		//生命周期函数节点
		created() {

		},
		//自定义函数节点
		methods: {
      networkGetMaterials(){
        let ref={
          projectTypeKeyId: 'ord',
          projectKeyId: this.currentItem.keyid
        }
        getMaterials(ref).then(item=>{
         this.materialList=item.data
        })
      },
      networkAddMaterial(formData){
        formData.projectKeyId = this.currentItem.keyid
        formData.projectCode = this.currentItem.projectCode
        formData.projectName = this.currentItem.projectName
        addMaterial(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetMaterials()
          }
        })
      },
      networkDelMaterial(formData){
        delMaterial(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetMaterials()
          }
        })
      },
      delMeans(data){
        this.$msgbox.confirm('是否删除资料？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.networkDelMaterial(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        })
      },
      submitAddMeans(formData){
        let ref = {
          projectTypeKeyId: 'ord',
          projectTypeName: '收集资料',
        }
        Object.assign(formData, ref)
        this.networkAddMaterial(formData)
      },
		}
	}
</script>
<style lang='less' scoped>
	.main {
		padding: 5px 20px;
	}
</style>
