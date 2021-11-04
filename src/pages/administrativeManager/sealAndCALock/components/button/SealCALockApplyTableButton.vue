<template>
  <div>
    <text-button title="修改" @click="$emit('click',1,data)"></text-button>
    <submit-button title="提交审核" @click="$emit('click',2,data)"></submit-button>
    <submit-button title="办理盖章" @click="$emit('click',3,data)"></submit-button>
    <status-button :title="status"></status-button>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import TextButton from '../../../acomponents/TextButton.vue'
  import SubmitButton from '../../../acomponents/SubmitButton.vue'
  import StatusButton from '../../../acomponents/StatusButton.vue'
  export default {
    components:{
      TextButton,
      SubmitButton,
      StatusButton
    },
    props: {
      user: {
        type: String,
        default: "admin"
      },
      scope: '',
    },
    //数据节点
    data() {
      return {
        currentUser: this.user,
        data: this.scope,
        status:'使用中'
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      handleCommand(command) {
        this.$emit('click', parseInt(command), this.data)
      }
    }
  }
</script>
<style lang='less' scoped>
  .el-tag {
    margin-left: 10px !important;
  }
</style>
