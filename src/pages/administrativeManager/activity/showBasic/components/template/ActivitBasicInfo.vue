<template>
  <div>
    <div class="head-button">
      <head-button></head-button>
    </div>
    <div class="main">
      <basic-info-template :label-prop-list="labelProp"></basic-info-template>
    </div>
    <div class="dialog">

    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadButton from '../button/HeadButton.vue'
  import BasicInfoTemplate from '../../../../../../components/BasicInfoTemplate.vue'
  export default {
    components: {
      HeadButton,
      BasicInfoTemplate
    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        labelProp:[
          {key:'',value:'活动名称'},
          {key:'',value:'活动类型'},
          {key:'',value:'主办方名称'},
          {key:'',value:'活动举办地点'},
          {key:'',value:'活动举办开始时间'},
          {key:'',value:'活动举办结束时间'},
          {key:'',value:'活动持续时间'},
          {key:'',value:'活动规模'},
          {key:'',value:'公司活动负责人'},
          {key:'',value:'协助人员'},
          {key:'',value:'负责工作'},
          {key:'',value:'活动相关图片资料',type:'file'},
          {key:'',value:'是否有签订相关合同'},
          {key:'',value:'合同名称'},
          {key:'',value:'合同附件',type:'file'},
          {key:'',value:'是否有奖项'},
          {key:'',value:'奖项名称'},
          {key:'',value:'奖项图片',type:'file'},
        ]
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

</style>
