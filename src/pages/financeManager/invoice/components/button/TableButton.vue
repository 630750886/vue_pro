<template>
  <div>
    <public-button
      name="WAN2SHAN4XIN4XI"
      title="完善信息"
      classhd="hd"
      plain
      type="primary"
      v-show="scope.billType == 1"
      @click="$emit('click', 1, scope)"
    ></public-button>
    <public-button
      name="ZUO4FEI4CHU3LI"
      title="作废处理"
      classhd="hd"
      plain
      type="primary"
      v-show="scope.billType == 1"
      @click="$emit('click', 2, scope)"
    ></public-button>
    <!-- <el-button
      type="text"
      size="mini" @click="$emit('click',1,scope)"  v-show="scope.instanceId">完善信息</el-button
    >
    <el-button
      type="text"
      size="mini" @click="$emit('click',2,scope)"  v-show="(!scope.cancelInstaceId)&&(scope.billType==1)">申请作废</el-button> -->
    <!-- 只有登记状态下没有发起作废申请的票才能发起作废申请 -->
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件

import { updateBill } from '../../../../../api/webapi-fin.js';
import { startFlow } from '../../../../../api/webapi-flow.js';
import { mapState } from 'vuex';
export default {
  components: {},
  props: {
    user: {
      type: String,
      default: 'admin',
    },
    scope: '',
  },
  // 数据节点
  data () {
    return {};
  },
  computed: {
    ...mapState({
      currentUser: 'currentUser',
    })
  },
  // 生命周期函数节点
  created () {},
  // 自定义函数节点
  methods: {
    regBill (data) {},
    cancelBill (data) {
      this.$refs.invalidRef.openDialog();
    },
  },
};
</script>
<style lang="less" scoped>
.el-tag {
  margin-left: 10px !important;
}
</style>
