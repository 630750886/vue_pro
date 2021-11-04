<template>
  <div class="body">
    <div class="button">
      <public-button icon="el-icon-plus" name="YUAN2JIAN4GUAN3LI" title="新增交易平台" @click="$refs.addPlatformRef.openDialog()"></public-button>
      <public-button icon="el-icon-plus" name="YUAN2JIAN4GUAN3LI" title="新增机构" @click="$refs.addInstitutionRef.openDialog()"></public-button>
      <public-button icon="el-icon-plus" name="YUAN2JIAN4GUAN3LI" title="新增网站" @click="$refs.addstationRef.openDialog()"></public-button>
    </div>
    <el-tabs v-model="activeName" tab-position="top" style="height: 600px;">
      <template v-for="item in biddingPlatform">
        <el-tab-pane :label="item.listname" :name="item.keyid" :key="item.keyid">
          <component :is="item.urladdress"></component>
        </el-tab-pane>
      </template>
    </el-tabs>
    <div class="dialog">
<!--           title="新增交易平台"-->
      <add-platform-dialog

        width="30%"
        ref="addPlatformRef"
        @getFormData="submitPlatForm"
      ></add-platform-dialog>
<!--       title="新增网站"-->
      <add-station-dialog
        width="30%"
        ref="addstationRef"
        @getFormData="submitWebsiteForm"
      ></add-station-dialog>
<!--         title="新增机构"-->
      <add-institution-dialog

        width="30%"
        ref="addInstitutionRef"
        @getFormData="submitAgencyForm"
      ></add-institution-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TradingTable from "./table/TradingTable.vue";
import StationTable from "./table/WebsiteTable.vue";
import Agency from "./template/agency.vue";

import AddPlatformDialog from "./dialog/AddPlatformDialog.vue";
import AddStationDialog from "./dialog/AddStationDialog.vue";
import AddInstitutionDialog from "./dialog/AddInstitutionDialog.vue";
import { mapState, mapActions, mapMutations } from "vuex";
// import HeadButton from "../button/HeadButton.vue";

export default {
  components: {
    TradingTable,
    StationTable,
    Agency,
    AddPlatformDialog,
    AddStationDialog,
    AddInstitutionDialog,
  },
  props: {},
  watch: {
    vuexActiveName(newValue) {
      this.activeName = newValue;
    },
    activeName(newValue) {
      this.updateActiveName(newValue);
    }
  },
  computed: {
    ...mapState("biddingPlatform", {
      vuexActiveName: "activeName"
    })
  },
  //数据节点
  data() {
    return {
      activeName: "",
      pageShow: {
        pageInfo: {
          page: 1,
          limit: 30
        },
        advancedQuery: {}
      },
      biddingPlatform: []
    };
  },
  mounted() {
    this.getSelectByCode("080").then(item => {
      this.biddingPlatform = item.data;
      this.updateActiveName(item.data[0].keyid);
    });
  },
  //生命周期函数节点
  created() {
    this.networkGetPlatforms();
    this.networkGetWebsites();
  },
  //自定义函数节点
  methods: {
    ...mapActions("biddingPlatform", {
      networkGetPlatforms: "networkGetPlatforms",
      networkGetAgencies: "networkGetAgencies",
      networkGetWebsites: "networkGetWebsites",

      networkAddPlatforms: "networkAddPlatforms",
      networkAddAgency: "networkAddAgency",
      networkAddWebsite: "networkAddWebsite"
    }),
    ...mapMutations("biddingPlatform", {
      updateActiveName: "updateActiveName"
    }),
    submitPlatForm(formData) {
      this.updateActiveName(this.biddingPlatform[0].keyid);
      this.networkAddPlatforms(formData);
    },
    submitWebsiteForm(formData) {
      this.updateActiveName(this.biddingPlatform[2].keyid);
      this.networkAddWebsite(formData);
    },
    submitAgencyForm(formData) {
      this.updateActiveName(this.biddingPlatform[1].keyid);
      this.networkAddAgency(formData);
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  .button {
    margin: 10px 10px;
  }
}
</style>
