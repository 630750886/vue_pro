<template>
	<div class="b-main">


		<div>
			<head-right-button title="新增现场签证表" @click="$refs.addRef.openDialog()"></head-right-button>
			<el-table :data="dataList" style="width: 100%" align="center" highlight-current-row :header-cell-style="{fontSize:'14px'}"
			>
				<el-table-column prop="createddateTime" label="创建时间" align="center"><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
				<el-table-column prop="meetingFile" label="附件" align="center">
					<template slot-scope="scope">
						<el-button type="text">下载</el-button>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<delete-button :data="scope.row" @click="networkDelData"></delete-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="dialog">
			<add-by-company-dialog title="新增现场签证表" width="30%" ref="addRef" @getFormData="networkAddData"></add-by-company-dialog>
		</div>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import HeadRightButton from "../button/HeadRightButton.vue"
	import AddByCompanyDialog from "../dialog/AddByCompanyDialog.vue"
  import {mapState} from 'vuex'
  import {getMeeting,addMeeting,upMeeting,delMeeting} from '../../../../../../../api/workbench/webapi-projectSupervisor.js'

  export default {
		components: {
			HeadRightButton,
			AddByCompanyDialog,
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
          meetingDesc:'进度造价文件'
        }
        getMeeting(ref).then(item=>{
          this.dataList=item.data
        })
      },
      networkAddData(formData){
        let ref=this.$myfunction.copyData(formData)
        ref.projectKeyid=this.currentItem.keyid
        ref.meetingDesc='进度造价文件'
        addMeeting(ref).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData){
        upMeeting(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkDelData(formData){
        delMeeting(formData).then(item=>{
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
