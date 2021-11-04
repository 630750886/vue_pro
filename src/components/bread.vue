<template>
  <div class="bread_container" id="bread_container">
    <span @click="setleftmenuShow()" class="bars"
      ><i :class="collapseStyle"></i
    >
    </span>
    <div class="btn">
      <el-button-group>
        <el-button plain size="mini" @click="routerGo(-1)"
        >&lt;&lt;-返回</el-button>
       <el-button plain size="mini" @click="routerGo(+1)"
        > 前进-&gt;&gt;</el-button>
       </el-button-group>
    </div>

    <!--<el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item class="breadcrumb-item">
      </el-breadcrumb-item>
    </el-breadcrumb>-->
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "bread",
  watch: {},
  data() {
    return {
      changeBarDirection: false
    };
  },
  computed: {
    ...mapGetters(["collapseStyle", "sidebarWidth"])
  },
  methods: {
    ...mapMutations("menu", {
      updateCurrSubMenu: "updateCurrSubMenu",
      updateCurrMenuItem: "updateCurrMenuItem"
    }),
    setleftmenuShow() {
      this.$store.dispatch("setLeftMenu");
      this.changeBarDirection = !this.changeBarDirection;
    },
    routerGo(index) {
      this.$router.go(index);
    }
  }
};
</script>
<style lang="less">
.bread_container {
  position: relative;
  background-color: #e1dfdf;
  border-bottom: 1px solid #fff;
  height:36px;
  line-height:32px;
  width: 100%;
  .bars {
    float: left;
    cursor: pointer;
    margin: auto 5px; 
    font-size: 30px;
    .isactive {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
      transition: 0.38s;
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
  }
  .btn {
    background: #e1dfdfad;
    position: absolute;
    top: 0;
    right: 5px; 
    .el-button{
      background: #e1dfdfad;
    }
  }
  .htmy{
    color:rgb(133, 130, 130);
  }
  .breadcrumb {
    height: 30px;
    line-height: 30px;
    .breadbutton {
      float: left;
      margin: 4px 5px 0 0;
    }
  }
}
</style>
