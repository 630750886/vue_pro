<template>
  <el-tabs v-model="activeName" tab-position="left" style="height: 500px;">
    <template v-for="item in agencyType.list">
      <el-tab-pane :label="item.listname" :name="item.keyid" :key="item.keyid">
        <filing-institution-table></filing-institution-table>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import FilingInstitutionTable from "../table/FilingInstitutionTable.vue";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  components: {
    FilingInstitutionTable
  },
  props: {},
  //生命周期函数节点
  created() {
    this.networkGetAgencies({ orgTypeKeyid: this.activeName });
  },
  mounted() {
    this.getSelectByCode("081").then(item => {
      this.activeName = item.data[0].keyid;
    });
  },
  watch: {
    activeName(newValue) {
      this.networkGetAgencies({ orgTypeKeyid: newValue });
    }
  },
  computed: {
    ...mapState("loadType", {
      agencyType: "agencyType"
    })
  },
  //数据节点
  data() {
    return {
      activeName: ""
    };
  },

  //自定义函数节点
  methods: {
    ...mapActions("biddingPlatform", {
      networkGetAgencies: "networkGetAgencies"
    })
  }
};
</script>
<style lang="less" scoped></style>
