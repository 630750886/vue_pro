<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" :close-on-click-modal="false">
      <div class="head-button">
        <el-button v-if="type !== '4'" type="text" @click="downloadTable">下载电子表格</el-button>
      </div>
      <div class="main-box">
        <recruit-apply-table v-if="type === '0'" v-model="applyRef"></recruit-apply-table>
        <become-apply-table v-if="type === '1'" v-model="applyRef"></become-apply-table>
        <quit-apply-table v-if="type === '2'" v-model="applyRef"></quit-apply-table>
        <transfer-apply-table v-if="type === '3'" v-model="applyRef"></transfer-apply-table>
        <template v-if="type === '4'">
          <el-form :model="applyRef" ref="formRef" label-width="100px">
            <el-form-item label="申请金额(元)" prop="applyMoney">
              <el-input v-model="applyRef.applyMoney" readonly></el-input>
            </el-form-item>
            <el-form-item label="申请理由" prop="applyReason">
              <rea-textarea v-model="applyRef.applyReason"></rea-textarea>
            </el-form-item>
          </el-form>
        </template>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import BecomeApplyTable from '../table/BecomeApplyTable.vue'
  import QuitApplyTable from '../table/QuitApplyTable.vue'
  import RecruitApplyTable from '../table/RecruitApplyTable.vue'
  import TransferApplyTable from '../table/TransferApplyTable.vue'
  import {exportWord} from '../../../../../utils/export-word.js'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('recruitDispose')
  export default {
    components: {
      BecomeApplyTable,
      QuitApplyTable,
      RecruitApplyTable,
      TransferApplyTable
    },
    props: {
      title:'',
    },
    watch: {
      type(newValue){
        if (newValue === '3') {
          this.width='50%'
        }else{
          this.width='45%'
        }
      },
    },
    computed:{
        ...mapState({
          applyRef:'applyRef'
        })
    },
    //数据节点
    data() {
      return {
        type:'0',
        dialogVisible:false,
        width:'',
        dialogButtonShow:true,
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
        ...mapActions({
          networkGetRecruit:'networkGetRecruit',
          networkGetBecome:'networkGetBecome',
          networkGetQuit:'networkGetQuit',
          networkGetTransfer:'networkGetTransfer',
          networkGetSubsidy:'networkGetSubsidy',
        }),
      openDialog(data){
        if (!this.$myfunction.isEmpty(data)) {
          this.type=data.applytypeid
        }
        this.dialogVisible=true
      },
      downloadTable(){
        switch (this.showData.groupType) {
          case '员工转正':
            exportWord(this.dataTest,'员工转正申请表','BecomeApplyTable.docx')
            break
          case '员工离职':
            exportWord(this.showData,'员工离职申请表','QuitApplyTable.docx')
            break
          case '招聘需求':
            exportWord(this.showData,'招聘需求申请表','RecruitApplyTable.doc')
            break
          case '转岗晋级':
            exportWord(this.showData,'员工调岗晋升申请表','TransferApplyTable.docx')
            break
        }
      },
      submitForm () {
        this.$refs.tableRef.getFormData()
        this.$emit('getFormData', this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
      dialogClose(){
        this.dialogVisible=false
        this.$refs.tableRef.resetForm()
      },
      submitExamine(){

      }
    }
  }
</script>
<style lang='less' scoped>
.head-button{
  height: 45px;
  .el-button{
    float: right;
  }
}
</style>
