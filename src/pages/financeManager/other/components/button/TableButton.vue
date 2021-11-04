<template>
  <div>
    <public-button
      name="XIU1GAI3SHAN1CHU2WAN2SHAN"
      title="删除"
      classhd="hd"
      :plain="true"
      type="primary"
      @click="$emit('click', 1, scope)"
    ></public-button>
    <public-button
      name="XIU1GAI3SHAN1CHU2WAN2SHAN"
      title="完善税务信息"
      classhd="hd"
      :plain="true"
      type="primary"
      @click="$emit('click', 2, scope)"
    ></public-button>
    <public-button
      name="XIU1GAI3SHAN1CHU2WAN2SHAN"
      title="完善银行信息"
      classhd="hd"
      :plain="true"
      type="primary"
      @click="$emit('click', 3, scope)"
    ></public-button>

    <!-- <el-button type="text" size="mini" @click="$emit('click',1,scope)">修改</el-button>
      <el-button type="text" size="mini" @click="$emit('click',2,scope)">完善税务信息</el-button>
	  <el-button type="text" size="mini" @click="$emit('click',3,scope)">完善银行信息</el-button> -->
  </div>
</template>
<script>
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
  // 生命周期函数节点
  created () {},
  // 自定义函数节点
  methods: {}
};
</script>
<style lang="less" scoped>
.el-tag {
  margin-left: 10px !important;
}
</style>
