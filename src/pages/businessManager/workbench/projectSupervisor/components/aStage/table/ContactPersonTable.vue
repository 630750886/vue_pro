<template>

		<div class="column">

			<head-right-button title="新增联系人" @click="$refs.addContactsRef.openDialog()"></head-right-button>
			<el-table
							:data="itemContacts"
							style="width: 100%"
							align="center"
							highlight-current-row
							:header-cell-style="{fontSize:'14px'}"
            >
				<el-table-column prop="contactname" label="客户联系人" align="center"></el-table-column>
				<el-table-column prop="contactphone" label="联系人电话" align="center"></el-table-column>
				<el-table-column prop="contactdepartment" label="联系人部门" align="center"></el-table-column>
				<el-table-column prop="contactpost" label="联系人职务" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="mini" @click="$refs.reviseContactsRef.openDialog(scope.row)">修改</el-button>
						<el-button type="text" size="mini" @click="delContact(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<div class="dialog">
				<add-contacts-dialog ref="addContactsRef" title="联系人" width="30%" @getFormData="submitAddContact"></add-contacts-dialog>
				<add-contacts-dialog ref="reviseContactsRef" title="修改联系人" width="30%" @getFormData="submitUpContact"></add-contacts-dialog>
			</div>
		</div>

</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
	import HeadRightButton from "../button/HeadRightButton.vue"
	import AddContactsDialog from '../dialog/AddContactsDialog.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('workbench/aStage')

  export default {
    components: {
      HeadRightButton,
			AddContactsDialog,
    },
    props: {

		},
    watch: {},
		computed:{
      ...mapState({
        itemContacts:'itemContacts',
      })
		},
    //数据节点
    data() {
      return {
      }
    },
    //生命周期函数节点
    created() {
			this.networkGetItemContacts()
    },
    //自定义函数节点
    methods: {
      ...mapActions({
        networkGetItemContacts:'networkGetItemContacts',
        networkAddContact:'networkAddContact',
        networkDelContact:'networkDelContact',
        networkUpContact:'networkUpContact'
      }),
      submitAddContact(formData){
        this.networkAddContact(formData)
      },
      submitUpContact(formData){
        this.networkUpContact(formData)
      },
      delContact(data){
        this.$msgbox.confirm('是否删除该联系人？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.networkDelContact(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        })
      }
    }
  }
</script>
<style lang='less' scoped>
  .main{
    padding: 5px 20px;
  }
</style>
