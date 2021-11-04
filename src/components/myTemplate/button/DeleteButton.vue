<template>
  <el-button type="text" @click="del">删除</el-button>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      data:{
        type:Object,
        default: ()=>{
          return {}
        }
      },
      messageTitle:{
        type:String,
        default:'是否确认删除该数据？'
      }
    },
    //生命周期函数节点
    created() {
    },
    mounted() {
    },
    watch: {},
    //数据节点
    data() {
      return {}
    },

    //自定义函数节点
    methods: {
      del(){
        this.$msgbox.confirm(this.messageTitle,'提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          let ref=this.$myfunction.copyData(this.data)
          this.$emit('click',ref)
        }).catch(()=>{
          this.$message.info('已放弃此次操作')
        })
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
