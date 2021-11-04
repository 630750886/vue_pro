<template>
  <div id="homes">
    <el-container ref="homepage">
      <el-header style="height:45px;padding:0">
        <headerNav_new></headerNav_new>
      </el-header>
      <el-container class="mainshow el-scrollbar">
        <el-aside :width="sidebarWidth + 'px'" class="mainshow el-scrollbar">
          <leftmenu></leftmenu>
        </el-aside>
        <el-main class="mainshow" ref="main" style="width:99.999%;margin: 0px;padding:0px;">
         <el-container style="width:100%;height:99.98%;margin: 0px;padding:0px;">
              <el-header style="height:30px;width:100%;margin: 0px;padding:0px;"><bread class="bread"></bread></el-header>
              <el-main class="mainshow el-scrollbar" style="width:100%;margin: 0px;padding:0px;height:100%;">
                  <router-view
                      v-if="isRouterAlive"
                      :key="routerKey"
                      style="{height:99.87%;width:99.7%;margin: 0px;padding:0px;}"
                      class="router"
                      ref="router"
                   ></router-view>
              </el-main>
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import headerNav_new from "../components/headerNav_new.vue";
import leftmenu from "../components/leftmenu.vue";
import bread from "../components/bread.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "home",
  components: {
    headerNav_new,
    leftmenu,
    bread
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  computed: {
    ...mapState({
      sidebarWidth: "sidebarWidth"
    })
  },
  data() {
    return {
      clientHeight: "",
      timer: false,
      routerKey: 1,
      routerHeight: "",
      isRouterAlive: true
    };
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`;
    this.onWindowResize.add(() => {
      this.clientHeight = window.innerHeight;
    });
  },
  methods: {
    ...mapActions({
      networkGetAllPerson: "hrStore/networkGetAllPerson",
      networkGetHrLoadData: "loadType/networkGetHrLoadData",
      networkGetRegion: "loadType/networkGetRegion",
      networkGetCusLoadData: "loadType/networkGetCusLoadData"
    }),
    changeFix(ch) {
      this.$refs.homepage.$el.style.height = ch - 0 + "px";
      this.$refs.main.$el.style.height ="98%";
      this.$refs.router.$el.style.height = ch - 50 + "px";
    },
    setleftmenuShow() {
      this.$store.dispatch("setLeftMenu");
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  watch: {
    clientHeight: function(newValue) {
      let _this = this;
      setTimeout(function() {
        _this.changeFix(newValue);
      }, 100);
    },
    "$route.path": function(newValue) {
      this.routerHeight = this.clientHeight - 50;
    }
  }
};
</script>
<style lang="less" scoped>
#homes {
  margin: 0px;
  padding-top: 0px;
  overflow-x: hidden;
  background-color: #e2e0e0;
}

.el-header {
  background-color: #e2e0e0;
  height: 45px;
}

.el-main {
  padding: 2px;
  background-color: #e1dfdfdc;
  overflow-x: hidden;
  overflow-y: auto;
  height:98%;
}

.el-aside {
  background-color: #e1dfdf;
  height:98%;
  overflow-y: auto;
  overflow-x: hidden;
}

.el-footer {
  color: blue;
  background-color: aqua;
  line-height: 60px;
}
.router {
  padding: 0px;
  margin: 0px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
