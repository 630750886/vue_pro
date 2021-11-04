<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="dialogWidth" @close="dialogClose" :close-on-click-modal="false">
      <div style="text-align: center;margin-bottom: 30px">
        <upload-button v-model="file" :data="data"></upload-button>
      </div>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="dialogClose" :okBtn="{title:'新建'}"></dialog-button>
    </el-dialog>

  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('loadType')
  export default {
    components: {
    },
    props: {
      title:'',
      dialogWidth:'',
    },
    watch: {
    },
    computed:{
        ...mapState({
          education:'education'
        })
    },
    //数据节点
    data() {
      return {
        dialogVisible:false,
        file:'',
        data:{}
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      submitFormData: function () {
        this.$emit('getFormData', this.$myfunction.copyData(this.file))
        this.dialogClose()
      },
      dialogClose() {
        this.dialogVisible=false
        this.file=''
      },
      openDialog(data){
        if (!this.$myfunction.isEmpty(data)){
          this.data=this.$myfunction.copyData(data)
        }
        this.dialogVisible=true
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
