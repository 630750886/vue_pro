<template>
  <section class="data_section" ref="data_section">
    <el-tabs v-model="activeName">
      <el-tab-pane name="1">
        <span slot="label">基本信息</span>
        <div class="content el-scrollbar ">
          <base-info></base-info>
        </div>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label">身份证件</span>
        <div class="content el-scrollbar">
          <credentials-info></credentials-info>
        </div>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span slot="label">合同情况</span>
        <div class="content el-scrollbar">
          <agreement-info></agreement-info>
        </div>
      </el-tab-pane>
      <el-tab-pane name="4">
        <span slot="label">学历情况</span>
        <div class="content el-scrollbar">
          <education></education>
        </div>
      </el-tab-pane>
      <el-tab-pane name="5">
        <span slot="label">荣誉情况</span>
        <div class="content el-scrollbar">
          <honor></honor>
        </div>
      </el-tab-pane>
      <el-tab-pane name="6">
        <span slot="label">职称情况</span>
        <div class="content el-scrollbar">
          <titles></titles>
        </div>
      </el-tab-pane>
      <el-tab-pane name="7">
        <span slot="label">执业情况</span>
        <div class="content el-scrollbar">
          <practice></practice>
        </div>
      </el-tab-pane>
      <el-tab-pane name="8">
        <span slot="label">其他保险</span>
        <div class="content el-scrollbar">
          <insurance></insurance>
        </div>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import BaseInfo from "./components/BaseInfo.vue";
import Education from "./components/Education.vue";
import Honor from "./components/Honor.vue";
import Insurance from "./components/Insurance.vue";
import Practice from "./components/Practice.vue";
import Titles from "./components/Title.vue";
import Station from "./components/Station.vue";
import  credentialsInfo from "./components/CredentialsInfo.vue";
import  agreementInfo from "./components/agreementInfo.vue";
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("hrStore");
export default {
  components: {
    BaseInfo,
    Education,
    Honor,
    Insurance,
    Practice,
    Titles,
    Station,
    agreementInfo,
    credentialsInfo
  },
  props: {},
  computed: {
    ...mapState({
      currentPersonId: "currentPersonId"
    }),
    ...mapGetters({
      personInfo: "personInfo"
    })
  },
  //数据节点
  data() {
    return {
      pageShow: {
        page: 1,
        limit: 30,
        filter: {}
      },
      userInfo: {
        person: { keyid: "" }
      },
      menu: 1,
      scrollTop: "",
      selectId: "content el-scrollbar-1",
      activeName: "1"
    };
  },
  mounted() {},
  destroy() {},
  //生命周期函数节点
  created() {
    this.getPersonInfo();
  },
  //自定义函数节点
  methods: {
    ...mapActions({
      getPersonInfo: "getPersonInfo"
    })
  }
};
</script>
<style lang="less" scoped>
.el-tabs {
  .content {
    height: 650px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
