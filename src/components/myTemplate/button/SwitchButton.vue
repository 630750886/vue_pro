<template>
  <el-switch :value="value"
             :active-color="rightColor"
             :inactive-color="leftColor"
             :active-text="rightTitle"
             :inactive-text="leftTitle"
             @change="change"></el-switch>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    /**
     * prop 绑定对象的键 Boolean
     * data 绑定的对象
     */
    props: {
      prop:{
        type:String,
        default:''
      },
      data:{
        type:Object,
        default:()=>{
          return {}
        }
      },
      rightColor:{
        type:String,
        default:'#13ce66'
      },
      leftColor:{
        type:String,
        default:'#ff4949'
      },
      rightTitle:{
        type:String,
        default:'是'
      },
      leftTitle:{
        type:String,
        default:'否'
      },
      messageTitle:{
        type:String,
        default:'是否更改状态'
      }
    },
    //生命周期函数节点
    created() {

    },
    mounted() {
      if (!this.$myfunction.isEmpty(this.data)) {
        this.value=this.data[this.prop]
        this.newData=this.data
      }
    },
    watch: {
      data(newValue){
        this.value=newValue[this.prop]
        this.newData=newValue
      },
      value(newValue){
        if (newValue === '') {
          this.value=false
        }
      }
    },
    //数据节点
    data() {
      return {
        value:false,
        newData:{}
      }
    },

    //自定义函数节点
    methods: {
      change(){
        this.$msgbox.confirm(this.messageTitle,'提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          let ref=this.$myfunction.copyData(this.data)
          ref[this.prop]=!ref[this.prop]
          this.$emit('change',ref)
        }).catch(()=>{
          this.$message.info('已放弃此次操作')
        })
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
