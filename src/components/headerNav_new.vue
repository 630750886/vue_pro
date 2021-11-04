<template>
  <el-row class="header_top" type="flex">
    <el-col :span="8" class="sys_title">
      <div class="logo"></div>
      <div class="title">
        弘管理
        <el-divider direction="vertical"></el-divider>
      </div>
    </el-col>
    <el-col :span="8"> </el-col>
    <el-col :span="8">
      <div class="right_meun">
         欢迎您！{{ $store.getters.getCurrentuser.loginName }}
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "headerNav_new",
  data() {
    return {
      posName: this.$store.getters.getCurrentuser.postName,
      department: this.session.getItem("sysUser").department
    };
  },
  created() {},
  methods: {
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
    },
    getpush(str) {
      this.$router.push({ path: str });
    },
    changeSelect(item) {
      let ref = this.$myfunction.copyData(this.$store.getters.getCurrentuser);
      ref.orgId = item.orgInfo.allSysOrgKeyid;
      ref.orgName = item.orgInfo.orgname;
      ref.postId = item.keyid;
      ref.postName = item.posName;
      ref.menu = item.menulist[0].children;
      this.$store.commit("updateCurrentUser", ref);
      this.session.setItem("sysUser", ref);
    }
  }
};
</script>
<style lang="less" scoped>
.header_top {
  //background: linear-gradient(to right, rgb(0, 105, 70), rgb(0, 125, 95));
  background-color: #489BD1;
  color: rgb(250, 250, 250);

  .sys_title {
    font-size: 24px;
    line-height: 60px;
    padding-left: 12px;
    .logo {
      margin-left: 20px;
      margin-top: 10px;
      float: left;
      width: 40px;
      height: 40px;
      background-image: url("../../public/images/sys_logo.png");
      background-size: 100%;
    }
    .title {
      margin-left: 70px;
    }
  }
  .right_meun {
    justify-content: right;
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
