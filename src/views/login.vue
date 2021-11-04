<template>
  <el-row
    class="login_page"
    v-loading="loading"
    :element-loading-text="message"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <transition name="el-fade-in-linear">
      <section class="form_contianer">
        <div class="titleArea rflex">
          <img class="logo" :src="logo" />
          <span class="title">
            <i>项目信息管理系统</i>
          </span>
        </div>
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          class="loginForm"
        >
          <el-form-item prop="username" class="login-item">
            <span class="loginTips">
              <i class="el-icon-edit"></i>
            </span>
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              class="area"
              type="text"
              placeholder="用户名"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <span class="loginTips"> </span>
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              class="area"
              type="password"
              placeholder="密码"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('loginForm')"
              class="submit_btn"
              >SIGN IN</el-button
            >
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </el-row>
</template>
<script>
import logoImg from "@/assets/img/logo.png";
import { GetToken, SetToken } from "../utils/auth";

import Mock from "mockjs";
import { GetHttp } from "../utils/http";

let List = [];
const count = 10;
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      sortnum: i + 1,
      username: Mock.Random.ctitle(2, 14),
      address: Mock.mock("@county(true)"),
      createTime: Mock.Random.datetime(),
      updateTime: Mock.Random.now(),
      ip: Mock.mock("@ip"),
      region: Mock.mock("@region"),
      areaId: /\d{7}/,
      email: Mock.Random.email(),
      city: Mock.Random.city(),
      shows: Mock.Random.boolean
    })
  );
}
export default {
  data() {
    const myuser = { username: "cgh", pwd: "ssss" };
    return {
      logo: logoImg,
      myusers: List,
      //gztbhdadministrator  QazXsw#@!312
      loginForm: {
        username: "18286105025",
        password: "12345678"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 8, max: 40, message: "长度在 8 到 40 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      loading: false,
      message: "登录中...",
      isPas: false
    };
  },
  mounted() {
    this.dingdingLogin();
  },
  methods: {
    showMessage(type, message) {
      this.$message({
        type: type,
        message: message
      });
    },
    submitForm(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (!valid) return;
        let ref = {
          accountcode: this.loginForm.username,
          accountpassword: this.loginForm.password
        };
        this.javaHttp("/sys/sysauth/login", ref).then(item => {
          if (item.code === 200) {
            let currUser = item.data;
            let copeUser = {
              token: currUser.token,
              dinCode: currUser.userDetail.dingTalkkeyid, //钉钉用户的钉钉编号
              userId: currUser.userDetail.account, //系统用户账号
              userName: currUser.userDetail.personName, //系统用户名
              department: currUser.userDetail.posinfolist, //所有岗位
              loginName: currUser.userDetail.personName, //用户登录名
              personId: currUser.userDetail.personId, //人员id
              personName: currUser.userDetail.personName, //人员名称
              orgId: currUser.userDetail.orgId, //当前组织id
              orgName: currUser.userDetail.orgName, //当前组织名称
              postId: "", //当前岗位id
              postName: "", //当前岗位名称
              menu: currUser.userDetail.usermenuList[0].children, //菜单 children
              corpId: "ding8d97ce4fb3a3cc41bc961a6cb783455b"
            };
            this.$store.commit("updateCurrentUser", copeUser);
            this.$message.success("登录成功");
            this.loading = false;
            this.session.setItem("sysUser", copeUser);
            //localStorage.setItem("sysUser", copeUser.token);
            if (this.$route.query.redirect) {
              //如果存在参数
              let redirect = this.$route.query.redirect;
              this.$router.push(redirect); // 则跳转至进入登录页前的路由
            } else {
              this.$router.push("/"); // 否则跳转至首页
            }
          } else {
            this.$message.error(item.message);
          }
        });
      });
    },
    dingdingLogin() {
      this.loading = true;
      if (this.session.getItem("sysUser")) {
        this.$store.commit(
          "updateCurrentUser",
          this.session.getItem("sysUser")
        );
        if (this.$route.query.redirect) {
          //如果存在参数
          let redirect = this.$route.query.redirect;
          this.$router.push(redirect); //则跳转至进入登录页前的路由
        } else {
          this.$router.push("/"); //否则跳转至首页
        }
      } else {
        this.ddPowerCode()
          .then(item => {
            GetHttp("java_post", "/sys/sysauth/dklogin", "post", {
              code: item
            }).then(user => {
              if (!this.$myfunction.isEmpty(user.data)) {
                let currUser = user.data;
                let copeUser = {
                  token: currUser.token,
                  dinCode: currUser.userDetail.dingTalkkeyid, //钉钉用户的钉钉编号
                  userId: currUser.userDetail.account, //系统用户账号
                  userName: currUser.userDetail.personName, //系统用户名
                  department: currUser.userDetail.posinfolist, //所有岗位
                  loginName: currUser.userDetail.personName, //用户登录名
                  personId: currUser.userDetail.personId, //人员id
                  personName: currUser.userDetail.personName, //人员名称
                  orgId: currUser.userDetail.orgId, //当前组织id
                  orgName: currUser.userDetail.orgName, //当前组织名称
                  postId: "", //当前岗位id
                  postName: "", //当前岗位名称
                  menu: currUser.userDetail.usermenuList[0].children, //菜单 children
                  corpId: "ding8d97ce4fb3a3cc41bc961a6cb783455b"
                };
                this.$store.commit("updateCurrentUser", copeUser);
                this.$message.success("登录成功");
                this.loading = false;
                this.session.setItem("sysUser", copeUser);
                if (this.$route.query.redirect) {
                  //如果存在参数
                  let redirect = this.$route.query.redirect;
                  this.$router.push(redirect); //则跳转至进入登录页前的路由
                } else {
                  this.$router.push("/"); //否则跳转至首页
                }
              } else {
                this.$message.info(user.message);
                this.message = user.message;
              }
            });
          })
          .catch(() => {
            this.$msgbox
              .confirm("当前不是钉钉环境，切换到口令登录？")
              .then(() => {
                this.loading = false;
              });
          });
      }
    }
  }
};
</script>

<style lang="less">
.login_page {
  position: absolute;
  width: 99%;
  height: 99%;
  background: url(../assets/img/bg9.jpg) no-repeat center center;
  background-size: 100% 100%;
}

.form_contianer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 370px;
  border-radius: 5px;
  padding: 25px;
  text-align: center;
  .titleArea {
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 22px;
    width: 100%;
    padding-bottom: 20px;
    .logo {
      width: 40px;
      margin-right: 10px;
    }
    .title {
      i {
        color: #ff6c60;
      }
    }
  }

  .loginForm {
    .submit_btn {
      width: 100%;
      padding: 13px 0;
      font-size: 16px;
    }
    .loginTips {
      position: absolute;
      left: 10px;
      z-index: 20;
      /* color: #FF7C1A; */
      font-size: 18px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.manage_tip {
  margin-bottom: 20px;
  .title {
    font-family: cursive;
    font-weight: bold;
    font-size: 26px;
    color: #fff;
  }
  .logo {
    width: 60px;
    height: 60px;
  }
}

.tiparea {
  text-align: left;
  font-size: 12px;
  color: #4cbb15;
  padding: 10px 0;
  .tip {
    margin-left: 54px;
  }
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}

.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}

.loginForm {
  .el-button--primary {
    background-color: #ff7c1a;
    border: 1px solid #ff7c1a;
  }
}

.sanFangArea {
  border-top: 1px solid #dcdfe6;
  padding: 10px 0;
  display: none;
  .title {
    font-size: 14px;
    color: #8b9196;
    margin-bottom: 10px;
  }
  ul {
    li {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
}
</style>
