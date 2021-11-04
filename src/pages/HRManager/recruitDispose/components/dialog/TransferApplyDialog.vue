<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <transfer-apply-table ref="tableRef" v-model="form" :key="componentKey"></transfer-apply-table>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}" ok-btn="提 交"
                     @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import TransferApplyTable from '../table/TransferApplyTable.vue'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    components: {
      TransferApplyTable
    },
    props: {
      title: '',
      width: '',
      labelWidth: {
        type: String,
        default: '100px'
      }
    },
    watch: {},
    computed: {
      ...mapState({
        currentUser: state => state.currentUser,
      })
    },
    //数据节点
    data() {
      return {
        componentKey: 0,
        form: {},
        dialogVisible: false,
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog() {
        this.componentKey++
        this.dialogVisible = true
        this.form.oldOrganize = this.currentUser.orgName
        this.form.orgId = this.currentUser.orgId
        this.form.personName = this.currentUser.personName
        this.form.oldPost = this.currentUser.postName
      },
      dialogClose() {
        this.dialogVisible = false
        this.form = this.$options.data().form
      },
      submitForm() {
        this.$refs.tableRef.getFormData()
        this.$emit('getFormData', this.form)
        //console.log(this.form)
        //this.dialogClose()
      },
      submitExamine() {
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
