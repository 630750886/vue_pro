<template>
	<div class="b-main">

		<div>
			<div class="head-button">
				<el-button class="el-button" type="primary" size="mini" @click="$refs.addFirstRef.openDialog()">新增会议</el-button>
			</div>

			<el-table :data="dataList" style="width: 100%" align="center" highlight-current-row :header-cell-style="{fontSize:'14px'}"
			>
				<el-table-column prop="meetingTypeName" label="会议类型" align="center"></el-table-column>
				<el-table-column prop="meetingDateTime" label="会议时间" align="center"></el-table-column>
				<el-table-column prop="meetingFile" label="会议纪要" align="center">
					<template slot-scope="scope">
						<download-button :value="scope.row.meetingFile"></download-button>
					</template>
				</el-table-column>
				<el-table-column prop="meetingVideoImage" label="图片或影像记录" align="center">
					<template slot-scope="scope">
						<download-button :value="scope.row.meetingVideoImage"></download-button>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="mini" @click="$refs.updateFirstRef.openDialog(scope.row)">修改</el-button>
						<delete-button :data="scope.row" @click="networkDelData"></delete-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="dialog">
				<add-meeting-dialog title="新增会议" width="30%" ref="addFirstRef" @getFormData="networkAddData"></add-meeting-dialog>
				<add-meeting-dialog title="修改" width="30%" ref="updateFirstRef" @getFormData="networkUpData"></add-meeting-dialog>
			</div>
		</div>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件

  import AddMeetingDialog from "../dialog/AddMeetingDialog.vue"
  import {mapState} from 'vuex'
  import {getMeeting,addMeeting,upMeeting,delMeeting} from '../../../../../../../api/workbench/webapi-projectSupervisor.js'
  export default {
		components: {
			AddMeetingDialog,
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
			this.networkGetDatas();
		},
		//自定义函数节点
		methods: {
      networkGetDatas(){
        let ref={
          projectKeyid:this.currentItem.keyid,
          meetingDesc:'会议工作'
        }
        getMeeting(ref).then(item=>{
          this.dataList=item.data
        })
      },
      networkAddData(formData){
        let ref=this.$myfunction.copyData(formData)
        ref.projectKeyid=this.currentItem.keyid
        ref.meetingDesc='会议工作'
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

		.head-button {
			width: 100%;
			margin-bottom: 10px;

			.el-button {
				margin: 10px 10px;
				float: right;
			}
		}
	}
</style>
