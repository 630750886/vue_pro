<template>
    <div>
      <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
        <quit-apply-table ref="tableRef" v-model="form" :key="componentKey"></quit-apply-table>
        <dialog-button reset-btn="false" ok-btn="提 交" :cancelBtn="{show:false}"
                       @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
      </el-dialog>
    </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import QuitApplyTable from '../table/QuitApplyTable.vue'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    components: {
      QuitApplyTable
    },
    props: {
      title:'',
      width:'',
      labelWidth:{
        type:String,
        default:'90px'
      }
    },
    watch: {},
    computed:{
      ...mapState({
        currentUser:state=>state.currentUser,
      })
    },
    //数据节点
    data () {
      return {
        componentKey:0,
        dialogVisible:false,
        form:{

        },
      }
    },
    //生命周期函数节点
    created () {
    },
    //自定义函数节点
    methods: {
      openDialog(){
        this.componentKey++
        this.dialogVisible=true
        this.form.department=this.currentUser.orgName
        this.form.orgId=this.currentUser.orgId
        this.form.applyPerson=this.currentUser.personName
        this.form.postName=this.currentUser.postName
      },
      dialogClose(){
        this.dialogVisible=false
        this.form=this.$options.data().form
      },
      submitForm(){
        this.$refs.tableRef.getFormData()
        this.$emit('getFormData',this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
      submitExamine(){

      }
    },

  }
</script>
<style lang='less' scoped>

</style>
