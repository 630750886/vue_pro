<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <recruit-apply-table ref="tableRef" v-model="form" :key="componentKey"></recruit-apply-table>
      <dialog-button reset-btn="false" ok-btn="提 交" :cancelBtn="{show:false}"
                     @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import RecruitApplyTable from '../table/RecruitApplyTable.vue'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    components: {
      RecruitApplyTable
    },
    props: {
      title: '',
      width: ''
    },
    watch: {},
    computed:{
      ...mapState({
        currentUser:state=>state.currentUser,
      })
    },
    //数据节点
    data() {
      return {
        componentKey:0,
        dialogVisible: false,
        form:{
        }
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      submitForm() {
        this.$refs.tableRef.getFormData()
        this.$emit('getFormData', this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
      dialogClose() {
        this.dialogVisible = false
        this.$refs.tableRef.resetForm()
        this.form=this.$options.data().form
      },
      openDialog() {
        this.componentKey++
        this.form.applyDepartment=this.currentUser.orgName
        this.form.orgId=this.currentUser.orgId
        this.dialogVisible = true
      },
      submitExamine() {

      }
    }
  }
</script>
<style lang='less' scoped>

</style>
