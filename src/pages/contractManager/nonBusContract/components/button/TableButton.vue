<template>
  <div class="nontab-box">
    <div class="nontabitem"><public-button classhd="hd" :plain="true" type="primary" name="CHA2KAN" title="查看" @click="$emit('click',1,data)"></public-button></div>
    <div class="nontabitem"><public-button classhd="hd" :plain="true" type="primary" name="YI2JIAO" title="移交" @click="$emit('click',3,data)"></public-button></div>
    <div class="nontabitem"><public-button v-if="parseInt(data.allstatuscode)<2" classhd="hd" :plain="true" type="primary" name="QU3XIAO" title="取消" @click="$emit('click',2,data)"></public-button></div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      scope:'',
    },
    watch: {
      scope(){
        this.data=this.scope
      }
    },
    //数据节点
    data() {
      return {
        data:this.scope
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {}
  }
</script>
<style lang='less' scoped>
.nontab-box {
    display: -webkit-flex !important;
    display: flex!important;
    flex-direction: row!important;
    justify-content:space-around !important;
    align-content: center;
    width: 125px!important;
    height: 40px!important;
}
.nontabitem {
    width:40px!important;
    height:36px!important;
    margin-top: 4px;
    margin-right: 5px!important;
}

.el-tag{

  margin-left: 10px;
}
</style>
