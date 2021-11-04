<template>
  <div class="no">
    <div class="no-hd">
      <div>123453</div>
      <div>453454</div>
    </div>
    <div class="no-bd">
      <div>男</div>
      <div>女</div>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {

    },
    watch: {},
    //数据节点
    data() {
      return {}
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {}
  }
</script>
<style lang='less' scoped>
  @font-face {
    font-family: electronicFont;
    src: url("../../../../../../public/font/NUMBER.TTF");
  }
  .no {
    background: rgba(101, 132, 226, 0.1);
    padding: 0.202rem;
    .no-hd {
      position: relative;
      border: 1px solid rgba(25, 186, 139, 0.17);
      display: flex;
      &::before{
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 30px;
        height: 10px;
        border-top: 2px solid #02a6b5;
        border-left: 2px solid #02a6b5;
      }
      &::after{
        position: absolute;
        bottom: 0;
        right: 0;
        content: "";
        width: 30px;
        height: 10px;
        border-bottom: 2px solid #02a6b5;
        border-right: 2px solid #02a6b5;
      }
      div {
        position: relative;
        flex: 1;
        line-height: 1rem;
        color: #ffeb7b;
        font-size: 0.875rem;
        text-align: center;
        font-family: electronicFont;
        &::after{
          position: absolute;
          top: 25%;
          right: 0;
          height: 50%;
          width: 1px;
          background: rgba(225,225,225,0.2);
          content: "";
        }
      }

    }
    .no-bd{
      display: flex;
      div{
        flex: 1;
        text-align: center;
        color: rgba(225,225,225,0.7);
        font-size: 0.225rem;
        height: 0.3rem;
        line-height: 0.5rem;
        padding-top: 0.135rem;
      }
    }
  }
</style>
