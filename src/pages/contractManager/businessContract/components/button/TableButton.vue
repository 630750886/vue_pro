<template>
  <div class="hdbody">
        <div class="div-inline"><public-button  classhd="hd" name="CHA2KAN" :plain="true" type="primary"  title="查看" @click="$emit('click',1,data)"></public-button></div>
        <div class="div-inline"><public-button classhd="hd" :plain="true" type="primary" name="YI2JIAO" title="移交" @click="$emit('click',3,data)"></public-button></div>
        <div class="div-inline">
          <public-button v-if="parseInt(data.allstatuscode)<2" classhd="hd" :plain="true" type="primary" name="QU3XIAO" title="取消" @click="$emit('click',2,data)"></public-button>
        </div>
         <div class="div-inline">
             <public-button v-if="parseInt(data.allstatuscode)<2" classhd="hd" :plain="true" type="primary" name="WAN2CHENG2SHEN1QING" title="完成申请" @click="$emit('click',4,data)"></public-button>
             <el-tag v-if="parseInt(data.allstatuscode)==2" size="mini" closable>审核中</el-tag>
        </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      scope: '',
    },
    watch: {
      scope() {
        this.data = this.scope
      }
    },
    //数据节点
    data() {
      return {
        data: this.scope
      }
    }
  }
</script>
<style lang='less' scoped>
.div-inline{ display:inline} 
span{
    color: #409EFF;
    margin: 0 5px;
}
</style>
