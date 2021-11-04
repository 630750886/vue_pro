<template>
  <div class="body">
    <div class="head-button">
      <head-button @click="headButtonClick"></head-button>
    </div>
    <div style="clear:both;"></div>
    <el-tabs v-model="activeName">
      <el-tab-pane name="1">
        <span slot="label">手机号信息</span>
        <phone-table @updataPhone="updataPhone" :dataList="dataListphone" :pageShow="pageShow" @pageInfoChangePhone="getPageInfoPhone(val)"></phone-table>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label">各大网站信息</span>
        <website-info-table @updataWeb="updataWeb" :dataList="dataListweb" :pageShow="pageShow" @pageInfoChange="getPageInfo" ></website-info-table>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span slot="label">各大协会管理</span>
        <society-table @updataListisoc="updataListisoc" :dataList="dataListisoc" :pageShow="pageShow" @pageInfoChangeListisoc="getPageInfoListisoc"></society-table>
      </el-tab-pane>
      <el-tab-pane name="4">
        <span slot="label">社会角色管理</span>
        <social-role-table @updataListrole="updataListrole" :dataList="dataListrole" :pageShow="pageShow" @pageInfoChangeRole="getPageInfoRole"></social-role-table>
      </el-tab-pane>
    </el-tabs>
    <div class="dialog">
      <information-dialog title="" ref="addPhoneRef"  @getFormData="addPhone"></information-dialog>
      <website-info-dialog  title=""  ref="addWebsiteRef"  @getFormData="addWebsite"></website-info-dialog>
      <society-info-dialog title="" ref="addSocietyRef"  @getFormData="addaddSociety"></society-info-dialog>
      <social-role-dialog title="" ref="addSocialRef"  @getFormData="addaddSocial"></social-role-dialog>
      <query-item-dialog title="" :activeName="activeName" ref="queryRef"  @getFormData="avequery" ></query-item-dialog>
    </div>
    <el-dialog
        title=""
        :visible.sync="dialog"
        width="30%">
      <el-form :model="form" ref="addFormRef" :rules="formRules" label-width="90px">
        <el-form-item label="网站名称" prop="webName">
          <el-input v-model="form.webName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="webUrl">
          <el-input v-model="form.webUrl" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addWeb">新建</el-button>
      </span>
    </el-dialog>
<!--    协会-->
    <el-dialog
        title=""
        :visible.sync="dialogSocial"
        width="30%">
      <el-form :model="formSocial" ref="addFormRef" :rules="formRulesSocial" label-width="90px">
        <el-form-item label="协会名称" prop="isocName">
          <el-input v-model="formSocial.isocName" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSocial">新建</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadButton from './button/HeadButton.vue'
  import PhoneTable from './table/PhoneTable.vue'
  import WebsiteInfoTable from './table/WebsiteInfoTable.vue'
  import SocietyTable from './table/SocietyTable.vue'
  import QueryItemDialog from './dialog/QueryDialog.vue'
  import InformationDialog from './dialog/InformationDialog.vue'
  import WebsiteInfoDialog from './dialog/WebsiteInfoDialog.vue'
  import SocietyInfoDialog from './dialog/SocietyInfoDialog.vue'
  import SocialRoleDialog from './dialog/SocialRoleDialog.vue'
  import SocialRoleTable from "./table/SocialRoleTable.vue";

  import * as MessageWeb from "@/api/administration/MessageWeb.js"
  import * as MessageSocialRole from "@/api/administration/MessageSocialRole.js"
  import * as MessagePhone from "@/api/administration/MessagePhone.js"
  import * as Messageisoc from "@/api/administration/Messageisoc.js"


  export default {
    inject: ["reload"],
    components: {
      SocialRoleTable,
      HeadButton,
      PhoneTable,
      WebsiteInfoTable,
      SocietyTable,
      QueryItemDialog,
      InformationDialog,
      WebsiteInfoDialog,
      SocietyInfoDialog,
      SocialRoleDialog
    },
    props: {

    },
    watch: {
      activeName(newValue) {
        this.pageShow={
          pageInfo: {
            page: 1,
            limit: 30
          },
          advancedQuery: {
          }
        };
        switch (newValue) {
          case '1':
            this.dataListphone={}
            this.getPhoneData(this.pageShow)

            break;
          case '2':
            this.dataListweb={}
            this.getWebData(this.pageShow)

            break;
          case '3':
            this.dataListisoc={}
            this.getListisocData(this.pageShow)
            break;
          case '4':
            this.dataListrole={}
            this.getSocialRoleData(this.pageShow)
            break;
          default:
            return
            break;

        }
      },
    },
    //数据节点
    data() {
      return {
        dialogSocial:false,
        form:{
          webName:'',
          webUrl:''
        },
        formSocial:{
          isocName:""
        },
        pageShow: {
          pageInfo: {
            page: 1,
            limit: 30
          },
          advancedQuery: {
          }
        },
        formRules: {
          webName:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
          webUrl:[{  pattern:/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/, required: true, message: '网址格式不正确', trigger: 'blur' }],
        },
        formRulesSocial:{
          isocName:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
        },
        dialog:false,
        activeNametest:"",
        activeName: '1',
        dataListweb: {},
        dataListrole: {},
        dataListphone: {},
        dataListisoc: {},
      }
    },
    //生命周期函数节点
    created() {
      this.getPhoneData(this.pageShow)
    },
    //自定义函数节点
    methods: {
      updataPhone(){
        this.getPhoneData(this.pageShow)

      },
      updataWeb(){
        this.getWebData(this.pageShow)
      },
      updataListisoc(){

        this.getListisocData(this.pageShow)
      },
      updataListrole(){
        this.getSocialRoleData(this.pageShow)
      },
      //添加网站
      addWeb(){
        this.$refs.addFormRef.validate(valid=> {
            if (!valid) return this.$message.error('请填写表单必要项')
            //执行业务逻辑
            this.addWebsite(this.form)
            this.form={}
            this.getWebData(this.pageShow)
            this.dialog=false
          }
        )
      },
      //添加协会
      addSocial(){
        this.$refs.addFormRef.validate(valid=> {
          if (!valid) return this.$message.error('请填写表单必要项')
          //执行业务逻辑
          this.addaddSociety(this.formSocial)
          this.formSocial={}
          this.getSocialRoleData(this.pageShow)
          this.dialogSocial=false
        })
      },
      //获取网站信息
      getWebData(datas){
        MessageWeb.advancedquery_object(datas).then(item=>{
          if (item.code === 200) {
            //this.$message.success("查询完成!");
            console.log(item.data);
            this.dataListweb=item.data;
          }
        });
      },
      getPageInfo(pageInfo){
        this.pageShow.pageInfo=pageInfo.pageInfo
        this.getWebData(this.pageShow)
      },
      //获取社会信息
      getSocialRoleData(datas){
        MessageSocialRole.advancedquery_object(datas).then(item=>{
          if (item.code === 200) {
            //this.$message.success("查询完成!");
            this.dataListrole=item.data;
          }
        });
      },
      getPageInfoRole(pageInfo){
        this.pageShow.pageInfo=pageInfo.pageInfo
        this.getSocialRoleData(this.pageShow)
      },
      //获取各大协会管理
      getListisocData(datas){
        Messageisoc.advancedquery_object(datas).then(item=>{
          if (item.code === 200) {
            //this.$message.success("查询完成!");
            this.dataListisoc=item.data;
          }
        });
      },
      getPageInfoListisoc(pageInfo){
        this.pageShow.pageInfo=pageInfo.pageInfo
        this.getListisocData(this.pageShow)
      },
      //获取手机信息
      getPhoneData(datas){
        MessagePhone.advancedquery_object(datas).then(item=>{
          if (item.code === 200) {
            //this.$message.success("查询完成!");
            console.log(item);
            this.dataListphone=item.data;
          }
        });
      },
      getPageInfoPhone(pageInfo){
        this.pageShow.pageInfo=pageInfo.pageInfo
        this.getPhoneData(this.pageShow)
      },
      headButtonClick(btn){
        switch (btn) {
          case 1:
            this.$refs.addPhoneRef.openDialog()
            break
          case 2:
            this.dialog=true
            break
          case 3:
            this.dialogSocial=true
            // this.$refs.addSocietyRef.openDialog()
            break
          case 4:
            this.$refs.addSocialRef.openDialog()
            break
          case 5:
            this.$refs.queryRef.openDialog()
            break
          case 9:
            this.reload();
            break;
        }
      },
      addPhone(formData){
        console.info(formData);
        MessagePhone.adds_object(formData).then(item => {
          if (item.code === 200) {
            this.$message.success("增加成功!")
            this.getPhoneData(this.pageShow)
          }
        });
      },
      addWebsite(formData){
        MessageWeb.adds_object(formData).then(item => {
          if (item.code === 200) {
            this.$message.success("增加成功!")
            this.getWebData(this.pageShow)
          }
        });
      },
      addaddSociety(formData){
        Messageisoc.adds_object(formData).then(item => {
          if (item.code === 200) {
            this.$message.success("增加成功!")
            this.getListisocData(this.pageShow)
          }
        });
      },
      addaddSocial(formData){
        MessageSocialRole.adds_object(formData).then(item => {
          console.log(item)
          if (item.code === 200) {
            this.$message.success("增加成功!")
            this.getSocialRoleData(this.pageShow)
          }
        });
      },
      avequery(formData){
        this.pageShow.advancedQuery=formData
        switch (this.activeName) {
          case "1":
            this.getPhoneData(this.pageShow)
            break
          case "2":
            this.getWebData(this.pageShow)
            break
          case "3":
            this.getListisocData(this.pageShow)
            break
          case "4":
            this.getSocialRoleData(this.pageShow)
            break
        }
        this.pageShow.advancedQuery={}
      }
    }
  }
</script>
<style lang='less' scoped>
  .head-button {
    height:35px;
    line-height:36px;
    padding:0px 20px;
  }
  .el-tabs{
    padding-left: 5px;
  }
  .body{
    margin: 0px;
    padding: 0px;
  }
</style>
