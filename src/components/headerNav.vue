<template>
  <el-row class="header_top">
    <el-col :span="4" class="sys_title">
      项目管理系统后台
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :span="16" class="menu_top wflex rflex">
      <el-menu
        default-active="1"
        class="el-menu-demo rflex el-scrollbar2 top-scrollbar2"
        mode="horizontal"
        background-color="rgb(0, 125, 95)"
        text-color="#fff"
        active-text-color="#ff6428"
      >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-menu-item index="2" @click="getpush('/login')"
          >调试中心</el-menu-item
        >
        <el-menu-item index="3" @click="getpush('/')">应急中心</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="4">
      <div class="right_meun">
        你好！管理员
        <el-avatar
          class="avatar"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        ></el-avatar>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "headerNav",
  data() {
    return {};
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getpush(str) {
      this.$router.push({ path: str });
    }
  }
};
</script>
<style lang="less" scoped>
.header_top {
  //background: linear-gradient(to right, rgb(0, 105, 70), rgb(0, 125, 95));
  background-color: rgb(0, 125, 95);
  color: #fff;

  .sys_title {
    font-size: 24px;
    line-height: 60px;
    padding-left: 12px;
  }
  .right_meun {
    justify-content: space-between;
    padding: 0 10px;
    line-height: 60px;
    text-align: right;
  }
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;
  }
  .center_meun {
    line-height: 60px;
  }
  .menu_top {
    // width:calc(100% - 350px);
    .el-menu-demo {
      border: none;
      overflow-y: hidden;
      flex: 1;
    }
    .el-menu-item:focus,
    .el-menu-item:hover {
      outline: 0;
      background-color: #ceeda8;
    }
  }
  .sub2 {
    color: #fff;
    background: none;
    border-color: none;
  }
  .sub2:active {
    background: #3a8ee6;
    border-color: #3a8ee6;
    color: #3a8ee6;
  }
  .sub2:hover {
    background: none;
    border-bottom-color: orange;
    color: #fff;
  }
  .sub2:visited {
    background: orange;
    color: #fff;
  }
}
</style>
