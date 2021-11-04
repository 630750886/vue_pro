<template>
	<div class="body el-scrollbar">
		<!-- 新建工作组 -->
		<div class="create" v-if="currentItem.projectGroupWorkStatus!=='1'">
			<add-work-group :loading="currentItem.projectGroupWorkStatus==='0'" @getFormData="submitWorkGroup"></add-work-group>
		</div>
		<!-- 展示工作组信息 -->
		<div v-if="currentItem.projectGroupWorkStatus==='1'">
			<show-work-group></show-work-group>
		</div>

	</div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import AddWorkGroup from './component/EstablishWorkGroup/AddWorkGroup.vue'
  import ShowWorkGroup from './component/EstablishWorkGroup/ShowWorkGroup.vue'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import attachDialog from "../../../../../../../components/flowControl/attachment.vue";
  import {startFlow} from "../../../../../../../api/webapi-flow.js";
  export default {
    components: {
      AddWorkGroup,
      ShowWorkGroup,
      attachDialog
    },
    props: {},
    watch: {
      'currentItem.projectGroupWorkStatus':function (newValue) {
        if (newValue==='审核通过'){
          this.networkCurrWorkGroupInfo()
        }
      }
    },
    computed:{
      ...mapState({
        currentUser:'currentUser'
      }),
      ...mapState('workbench/aStage',{
        currentItem:'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        isWork:false,
        changeData: [],
        addData: [],
      }
    },
    //生命周期函数节点
    created() {
      if (this.currentItem.projectGroupWorkStatus==='审核通过'){
        this.networkCurrWorkGroupInfo()
      }
    },
    //自定义函数节点
    methods: {
      ...mapMutations('workbench/aStage',{
        updateCurrentItem:'updateCurrentItem',
      }),
      ...mapActions('workbench/aStage',{
        networkAddWorkGroup:'networkAddWorkGroup',
        networkReplaceWorkGroupInfo:'networkReplaceWorkGroupInfo',
        networkCurrWorkGroupInfo:'networkCurrWorkGroupInfo',
        networkHistoryWorkGroupInfo:'networkHistoryWorkGroupInfo',
      }),
      ...mapActions('projectConsult',{
        networkGetItemByKeyId:'networkGetItemByKeyId',
        networkUpItem:'networkUpItem'
      }),
       submitWorkGroup(formDataArray){
        this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(() => 
	{
	 this.ddfile({titleMessage:'人员组建表'}).then(file=>{
          this.ddform('v_2020_ywgl_zbdl_zjgzz',{
            c:{code:this.currentItem.contractCode,name:this.currentItem.contractName},
            i:{code:this.currentItem.projectCode,name:this.currentItem.projectName},
            fileList:[{title:'人员组建表',file:file}]
          }).then(  flowId=>{
            //添加工作组成员
            formDataArray.forEach(async item=>{
              await this.networkAddWorkGroup(item)
            })
            let copeItem=this.$myfunction.copyData(this.currentItem)
            copeItem.projectGroupWorkStatus='0'
            this.networkUpItem(copeItem).then(ref=>{
              //更新项目状态
              this.updateCurrentItem(ref.data)
              this.ddflow(1,2,{
                baseId:copeItem.keyid,
                baseUrl:'pro/cmbaseproject',
                baseColumn:'projectGroupWorkStatus',
                flowId:flowId,
                fType:'组建工作组'
              })
            })
          })
        })
	}).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});
       
      },
    }
  }
</script>
<style lang='less' scoped>
	.body {
		height: 650px;
		overflow-y: auto;
		.create {
			width: 100%;
			.button {
				margin: 10px 10px;
			}
		}

		.mini-body {
			width: 50%;
			.head {
				position: relative;
				height: 50px;
				line-height: 50px;
				.el-button {
					position: absolute;
					top: 10px;
					left: 30%;
				}
			}
			.main {
				.head-table-button {
					height: 30px;
					line-height: 30px;
					margin-bottom: 10px;
					.el-button {
						float: right;
					}
				}
				table {
					tr {
						td {
							font-size: 16px;
							&:nth-child(1) {
								text-align: right;
							}
						}
					}
				}
			}
		}
	}
</style>
