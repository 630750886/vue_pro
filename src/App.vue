<template>
  <div id="app">
    <router-view></router-view>
    <scjs></scjs>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import store from "./store/index.js";
import scjs from "./scjs.vue";
export default {
  name: "app",
  components:{
    scjs
  },
  data() {
    return {
      clientHeight: ""
    };
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    localStorage.clear();
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("pagehide", () => {
      sessionStorage.setItem("store", JSON.stringify(store.state));
    });
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  mounted() {
    this.getWebSign();
    this.getUserInfoByCode();
  },
  methods: {
    ...mapActions({
      getsign: "flowManager/newworkGetSign",
      GetUserInfo: "flowManager/networkGetUserInfo"
    }),
    changeFix(ch) {
      this.$refs.homepage.$el.style.height = ch - 20 + "px";
    },
    getWebSign() {
      let url = location.href;
      this.getsign(url);
    },
    getUserInfoByCode() {
      this.GetUserInfo();
    }
  },
  watch: {}
};
</script>

<style lang="less">
@import "./style/variables";
@import "./style/element-ui";
@import "./style/common";
@import "./style/scrollBar";
@import "./style/ScrollBarExposure";
</style>
