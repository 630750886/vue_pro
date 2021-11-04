<template>
  <el-menu
    mode="vertical"
    theme="dark"
    :show-timeout="200"
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :default-openeds="['1', '2']"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>客户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">客户信息管理</el-menu-item>
        <el-menu-item index="1-2">客户维护管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">投投管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">合同管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">选项1</el-menu-item>
        <el-menu-item index="3-2">选项2</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">项目管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1">选项1</el-menu-item>
        <el-menu-item index="4-2">选项2</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "leftmenu",
  data() {
    return {
      abc: "1"
    };
  },
  computed: {
    ...mapGetters(["isCollapse"])
  }
};
</script>
