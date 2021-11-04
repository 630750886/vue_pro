<template>
  <el-menu
    ref="menuRef"
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :default-openeds="defaultOpeneds"
    :show-timeout="200"
    background-color="#FFFF"
    text-color="#020204"
    active-text-color="#409eff"
    style="{width:160px;height:685px;}"
    :uniqueOpened="true"
    router
    @select="handleSelect"
  >
    <el-menu-item index="/index" class="dropItem">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <template v-for="(menu, indexs) in menuList">
      <el-submenu
        v-if="menu.showflage"
        :index="indexs + ''"
        v-bind:key="indexs"
      >
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{ menu.name }}{{ menu.authflage }}</span>
        </template>
        <template v-for="(item, index) in menu.children">
          <el-menu-item-group v-if="item.showflage" v-bind:key="index">
            <el-menu-item :index="item.path" @click="menuItemClick(item)">
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "leftmenu",
  data() {
    return {
      menuKey: 1,
      defaultActive: "",
      defaultOpeneds: [],
      menuList: [
        {
          path: "",
          name: "客户管理",
          icon: "el-icon-location",
          children: [
            { path: "/customer/customerManager", name: "客户信息管理" },
            { path: "/customer/upkeepManager", name: "客户维护管理" }
          ]
        },
        {
          path: "",
          name: "市场管理",
          icon: "el-icon-menu",
          children: [{ path: "/bid/record_manager", name: "投标管理" }]
        },
        {
          path: "",
          name: "合同管理",
          icon: "el-icon-document",
          children: [
            { path: "/contract/business", name: "业务合同管理" },
            { path: "/contract/non_business", name: "非业务合同管理" }
          ]
        },
        {
          path: "",
          name: "业务管理",
          icon: "el-icon-s-data",
          children: [
            { path: "/business/project_consult", name: "工程咨询" },
            { path: "/business/project_cost", name: "造价咨询" },
            { path: "/business/bidding_agency", name: "招标代理" },
            { path: "/business/project_supervisor", name: "工程监理" },
            { path: "/business/item_manager", name: "项目管理" },
            { path: "/business/whole_process", name: "全过程咨询" },
            { path: "/business/integrated_service", name: "综合业务" }
          ]
        },
        {
          path: "",
          name: "账务管理",
          icon: "el-icon-money",
          children: [
            { path: "/finance/collect_fees", name: "收款管理" },
            { path: "/finance/invoice", name: "发票管理" },
            { path: "/finance/other", name: "其他管理" },
            { path: "/shared/card_fy", name: "费用报销" }
          ]
        },
        {
          path: "",
          name: "行政管理",
          icon: "el-icon-office-building",
          children: [
            { path: "/administrative/activity", name: "活动管理" },
            { path: "/administrative/information", name: "信息管理" },
            { path: "/administrative/document", name: "文件管理" },
            { path: "/administrative/qualification", name: "资质荣誉工商管理" },
            { path: "/administrative/seal_ca_lock", name: "印章及CA锁管理" },
            { path: "/administrative/purchase_use", name: "采购领用管理" },
            { path: "/administrative/logistics", name: "后勤管理" }
          ]
        },
        {
          path: "",
          name: "档案管理",
          icon: "el-icon-view",
          children: [
            { path: "/archive/hr_archive", name: "人事档案" },
            { path: "/archive/administration_archive", name: "行政档案" },
            { path: "/archive/finance_archive", name: "财务档案" },
            { path: "/archive/bid_archive", name: "投标档案" },
            { path: "/archive/contract_archive", name: "合同档案" },
            { path: "/archive/business_archive", name: "业务档案" }
          ]
        },
        {
          path: "",
          name: "系统管理",
          icon: "el-icon-setting",
          children: [
            { path: "/sys/sys_user", name: "系统用户" },
            { path: "/sys/sys_menu", name: "菜单列表" },
            { path: "/sys/org_manager", name: "组织和岗位" },
            { path: "/sys/sys_type", name: "系统分类管理" },
            { path: "/sys/flow_manager", name: "流程管理" }
          ]
        },
        {
          path: "",
          name: "人力资源管理",
          icon: "el-icon-user",
          children: [
            { path: "/HR/base_manager", name: "人员信息管理" },
            { path: "/HR/recruit_manager", name: "招聘与配置" }
          ]
        },
        {
          path: "",
          name: "共享管理",
          icon: "el-icon-paperclip",
          children: [{ path: "/shared/card_manager", name: "其他资料盖章" }]
        }
      ]
    };
  },
  watch: {
    "$route.path": function(newValue) {
      this.menuList.forEach(item => {
        if (item.children) {
          let ref = item.children.find(item => {
            return item.path === newValue;
          });
          if (ref) {
            this.defaultActive = newValue;
            this.session.setItem("currItem", newValue);
          }
        }
      });
    },
    "$store.getters.getCurrentuser.token": function(newValue) {
      if (!this.$myfunction.isEmpty(newValue)) {
        this.menuList = this.$store.getters.getCurrentuser.menu;
      } else {
        this.$router.push("/login");
      }
    },
    "$store.getters.getCurrentuser.postName": function(newValue) {
      if (!this.$myfunction.isEmpty(newValue)) {
        this.menuList = this.$store.getters.getCurrentuser.menu;
        this.session.removeItem("currItem");
        this.defaultActive = "";
        this.defaultOpeneds = [];
      } else {
        this.$router.push("/login");
      }
    }
  },
  computed: {
    ...mapGetters(["isCollapse", "sidebarWidth"])
  },
  created() {
    if (this.$myfunction.isEmpty(this.$store.getters.getCurrentuser.token)) {
      this.$router.push("/login");
    } else {
      this.menuList = this.$store.getters.getCurrentuser.menu;
    }
  },
  mounted() {
    if (!this.$myfunction.isEmpty(this.session.getItem("currItem"))) {
      this.defaultActive = this.session.getItem("currItem");
    }
  },
  methods: {
    handleSelect(index, indexPath) {
      this.session.setItem("currItem", index);
    },
    menuItemClick(item) {
      this.session.setItem("currItem", item.path);
      this.session.setItem("btnList", item.listbutton);
      this.session.setItem("listtabs", item.listtabs);
    }
  }
};
</script>
<style lang="less" scoped>
.dropItem{
  color: #fff!important;
  background-color:#6eb7e5 !important; 
  margin-bottom:0px!important;}
.dropItem i{ color: #fff!important;}
</style>
