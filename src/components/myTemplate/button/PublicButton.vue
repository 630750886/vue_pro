<template>
  <el-button
    v-if="btnListIndexOf(name)"
    :class="classhd? 'btn_colorhd' : 'btn_color'"
    :type="type ? type : 'primary'"
    size="mini"
    :icon="icon"
    :plain="plain"
    :disabled="disable"
    @click="$emit('click')"
    >{{ title }}</el-button
  >
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {
    icon: [String],
    type: [String],
    name: [String],
    title: [String],
    classhd:[String],
    plain:{type:Boolean,default:false},
    disable:{type:Boolean,default:false}
  },
};
</script>
<style lang="less" scoped>
.btn_colorhd{
  margin: 3px 1px;
  padding: 3px 3px;
  color:rgb(16, 175, 248);
}
</style>
