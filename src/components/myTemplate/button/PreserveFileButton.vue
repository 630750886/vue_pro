<template>
  <el-button v-if="!$myfunction.isEmpty(data[fileKey])" type="text" @click="preserveFile">存档</el-button>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      data:[Object],
      fileKey:[String],
      messageTitle:{
        type:String,
        default:'是否永久保存该文件？'
      }
    },
    //生命周期函数节点
    created() {
      console.log(this.data,this.fileKey)
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
      preserveFile(){
        this.$msgbox.confirm(this.messageTitle,'提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          let ref=this.$myfunction.copyData(this.data)
          ref[this.fileKey]=''
          this.$emit('click',ref)
          this.$message.success('存档成功')
        }).catch(()=>{
          this.$message.info('已放弃此次操作')
        })
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
