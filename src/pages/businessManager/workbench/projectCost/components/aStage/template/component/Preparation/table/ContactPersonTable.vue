<template>

	<div class="column">

		<head-right-button :title="'新增'+title" @click="openDialog"></head-right-button>
		<el-table
						:data="itemContacts"
						style="width: 100%"
						align="center"
						highlight-current-row
            
						:header-cell-style="{fontSize:'14px'}">
			<el-table-column v-if="isUnit" prop="enterprisename" label="单位名称" align="center"></el-table-column>
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
			<add-contacts-dialog :is-unit="isUnit" ref="addContactsRef" title="联系人" width="30%" @getFormData="submitAddContact"></add-contacts-dialog>
			<add-contacts-dialog :is-unit="isUnit" ref="reviseContactsRef" title="修改联系人" width="30%" @getFormData="submitUpContact"></add-contacts-dialog>
		</div>
	</div>

</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from "../../../../button/HeadRightButton.vue"
  import AddContactsDialog from '../dialog/AddContactsDialog.vue'
  import {getContacts,addContact,upContact,delContact} from '../../../../../../../../../../api/webapi-itemWorkGroup.js'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('workbench/aStage')

  export default {
    components: {
      HeadRightButton,
      AddContactsDialog,
    },
    props: {
      contactType:'',
      isUnit:{
        type:Boolean,
				default:false
			},
			title:'',
    },
    watch: {},
    computed:{
      ...mapState({
        currentItem:'currentItem',
      })
    },
    //数据节点
    data() {
      return {
        itemContacts:[]
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetItemContacts()
    },
    //自定义函数节点
    methods: {
      //获得项目联系人
      networkGetItemContacts() {
        let ref={
          code:'',
          projectKeyid: this.currentItem.keyid
				}
				if (this.contactType === '1') {
				  ref.code='0'
				}
        if (this.contactType === '2') {
          ref.code='1'
        }
        getContacts(ref).then(item => {
          this.itemContacts=item.data
        })
      },
      //新增项目联系人
      networkAddContact(formData) {
        formData.contactTypeKeyId=this.contactType
        addContact(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetItemContacts()
          }
        })
      },
      networkUpContact(formData) {
        upContact(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetItemContacts()
          }
        })
      },
      networkDelContact(formData) {
        delContact(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetItemContacts()
          }
        })
      },
      openDialog(){
				this.$refs.addContactsRef.openDialog()
			},
      submitAddContact(formData){
        let ref={
          code:'',
          projectKeyid: this.currentItem.keyid
        }
        if (this.contactType === '1') {
          ref.code='0'
        }
        if (this.contactType === '2') {
          ref.code='1'
        }
        Object.assign(formData,ref)
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
