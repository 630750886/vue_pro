<template>
  <div>
    <show-template :data-base="dataInfo" @function="submitForm"></show-template>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import ShowTemplate from './components/ShowTemplate.vue'
  import {getBusByid,upBusContract} from '../../../../../api/webapi-contract.js'

  export default {
    components: {
      ShowTemplate
    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        dataInfo:{}
      }
    },
    //生命周期函数节点
    created() {
      this.getDataInfo()
    },
    //自定义函数节点
    methods: {
      async getDataInfo(){
        const ref = await getBusByid(this.$route.query.id)
        this.dataInfo=ref
      },
      submitForm(name,data){
        switch (name) {
          case 'upForm':
            this.networkSubmitUpForm(data)
            break
        }
      },
      async networkSubmitUpForm(data){
        const ref=await upBusContract({row:JSON.stringify(data)})
        console.log(ref)
        if (ref.sucess) {
          this.$message.success('修改成功')
          this.getDataInfo()
        }else {
          this.$message.error('修改失败')
        }
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
