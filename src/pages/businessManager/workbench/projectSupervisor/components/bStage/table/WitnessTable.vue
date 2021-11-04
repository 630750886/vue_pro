<template>
	<div class="column">
		<div class="btn">
			<head-right-button  @click="$refs.addMeansRef.openDialog()" title="新增见证记录" ></head-right-button>
		</div>
		<el-table :data="dataList" style="width: 100%" align="center" highlight-current-row :header-cell-style="{fontSize:'14px'}"
		>

			<el-table-column prop="meetingDateTime" label="见证时间" align="center"></el-table-column>
			<el-table-column prop="meetingName" label="见证人" align="center"></el-table-column>
			<el-table-column prop="meetingFile" label="附件" align="center">
				<template slot-scope="scope">
					<download-button :value="scope.row.meetingFile"></download-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<delete-button :data="scope.row" @click="networkDelData"></delete-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="dialog">
			<add-witness-dialog ref="addMeansRef" title="新增见证取样/送检记录" width="30%" @getFormData="networkAddData"></add-witness-dialog>
		</div>
	</div>

</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import HeadRightButton from "../button/HeadRightButton.vue"
	import AddWitnessDialog from '../dialog/AddWitnessDialog.vue'
  import {mapState} from 'vuex'
  import {getMeeting,addMeeting,upMeeting,delMeeting} from '../../../../../../../api/workbench/webapi-projectSupervisor.js'


  export default {
		components: {
			HeadRightButton,
			AddWitnessDialog,
		},
		props: {
			stage:{
				type:String,
				default:'见证'
			}
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
			this.networkGetDatas()
		},
		//自定义函数节点
		methods: {
      networkGetDatas(){
        let ref={
          projectKeyid:this.currentItem.keyid,
          meetingDesc:'见证取样'
        }
        getMeeting(ref).then(item=>{
          this.dataList=item.data
        })
      },
      networkAddData(formData){
        let ref=this.$myfunction.copyData(formData)
        ref.projectKeyid=this.currentItem.keyid
        ref.meetingDesc='见证取样'
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
	.main {
		padding: 5px 20px;
	}
</style>
