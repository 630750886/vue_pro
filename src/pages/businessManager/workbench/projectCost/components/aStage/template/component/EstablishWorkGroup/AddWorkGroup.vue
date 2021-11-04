<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-form :model="form"
             ref="formRef"
             v-loading="loading"
             element-loading-text="审核中"
             element-loading-spinner="el-icon-s-custom"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             :rules="formRules"
             label-width="90px">
      <com-person-info v-model="submitDataArray" :type-list="workGroup"></com-person-info>
      <el-button style="width: 100%; margin-top: 20px" type="primary" size="mini" @click="submitFormData">
        <span style="margin-right: 100px">提</span><span>交</span>
      </el-button>
    </el-form>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {mapState,mapMutations,mapActions} from 'vuex'
  export default {
    components: {
    },
    props: {
      loading:{
        type:Boolean,
        default:false,
      }
    },
    watch: {

    },
    computed:{
    },
    //数据节点
    data() {
      return {
        workGroup:[],
        form: {

        },
        formRules: {},
        submitDataArray:[],
      }
    },
    //生命周期函数节点
    created() {
      this.getSelectByCode('TYPE-070').then(item=>{
        this.workGroup=item.data
      })
    },
    //自定义函数节点
    methods: {
      ...mapActions('loadType',{
        networkGetSelect:'networkGetSelect',
        networkGetSelectByCode:'networkGetSelectByCode'
      }),
      submitFormData() {
        this.$emit('getFormData', this.$myfunction.copyData(this.submitDataArray))
        this.resetForm()
      },
      resetForm() {
        this.form=this.$options.data().form
        this.submitDataArray=[]
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
