<!-- 交易平台管理 -->
<template>
  <tag-list></tag-list>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TagList from "./components/TagList.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {
    TagList,
  },
  props: {},
  watch: {},
  //数据节点
  data() {
    return {};
  },
  //生命周期函数节点
  created() {
    this.networkGetSelect(["biddingPlatform", "agencyType"]);
  },
  //自定义函数节点
  methods: {
    ...mapActions("loadType", {
      networkGetSelect: "networkGetSelect"
    })

  }
};
</script>
<style lang="less" scoped></style>
