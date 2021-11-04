<template>
  <div>
    <el-row :gutter="20">
      <div class="btn-left">
        <public-button
          name="XIN1JIAN"
          icon="el-icon-plus"
          title="新建公司"
          @click="addTax()"
        ></public-button>
        <public-button
          name="XIN1JIAN"
          icon="el-icon-plus"
          title="新建审计"
          @click="addAudit()"
        ></public-button>
        <public-button
          name="XIN1JIAN"
          icon="el-icon-plus"
          title="新建完税凭证"
          @click="addPayTax()"
        ></public-button>
        <public-button
          name="XIN1JIAN"
          icon="el-icon-plus"
          title="新建社保凭证"
          @click="addSecurity()"
        ></public-button>

        <!-- <el-button class="btn_color" type="primary" size="mini" @click="addTax()">新增税务/银行信息</el-button>

        <el-button class="btn_color" type="primary" size="mini" @click="addAudit()">新增审计</el-button>
         <el-button class="btn_color" type="primary" size="mini" @click="addPayTax()">新增完税凭证</el-button>
          <el-button class="btn_color" type="primary" size="mini" @click="addSecurity()">新增社保凭证</el-button> -->
      </div>
      <div class="btn-right"></div>
    </el-row>
    <div class="dialog">
      <add-taxation-dialog
        :title="mytitle"
        label="新增税务信息"
        ref="addTaxaRef"
        @getFormData="sumitTax"
      ></add-taxation-dialog>
      <add-payment-dialog
        :title="mytitle"
        :dataList="mydatalist"
        ref="addPayRef"
        @getFormData="sumbitPay"
      ></add-payment-dialog>
      <!-- <add-taxation-dialog title="修改" ref="updateTaxaRef"></add-taxation-dialog> -->
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import addTaxationDialog from '../dialog/addTaxationDialog.vue';
import AddPaymentDialog from '../dialog/AddPaymentDialog.vue';
import { addTax, addTaxAttach } from '../../../../../api/webapi-fin.js';
import { mapState, mapActions } from 'vuex';
export default {
  // 数据节点
  data () {
    return {
      mytitle: '',
      mydatalist: []
    };
  },
  components: {
    addTaxationDialog,
    AddPaymentDialog
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.currentUser
    })
  },
  // 生命周期函数节点
  created () {},
  // 自定义函数节点
  methods: {
    handleCommand (command) {
      this.$emit('click', parseInt(command));
    },
    addTax () {
      this.$refs.addTaxaRef.openDialog({});
    },
    addSettle () {
      this.mytitle = '新增一般结算账号信息';
      this.$refs.addPayRef.openDialog('settle');
    },
    addSecurity () {
      this.mytitle = '社保缴费凭证';
      this.$refs.addPayRef.openDialog('security');
    },
    addPayTax () {
      this.mytitle = '完税凭证';
      this.$refs.addPayRef.openDialog('tax');
    },
    addAudit () {
      this.mytitle = '审计报告';
      this.$refs.addPayRef.openDialog('audit');
    },
    // 新增税务信息
    sumitTax (data) {
      let pa = Object.assign({}, data);
      pa = { jsondata: JSON.stringify(pa) };
      addTax(pa).then((res) => {
        if (res.code == 200) {
          this.$message.success('新增税务信息成功！');
          this.$parent.getallTax();
        }
      });
    },
    sumbitPay (data) {
      let pa = Object.assign(data, { create_by: this.currentUser.dinCode });
      pa = { jsondata: JSON.stringify(pa) };
      addTaxAttach(pa).then((res) => {
        if (res.code == 200) {
          this.$message.success('新增信息成功！');
          this.$parent.getallTax();
        }
      });
      // switch (data.type) {
      //   case "Settle"://新增一般结算账号信息
      //     break;
      //       case "security"://社保缴费凭证
      //     break;
      //       case "tax"://完税凭证
      //     break;
      //       case "audit"://审计报告
      //     break;
      // }
    }
  }
};
</script>
<style lang="less" scoped>
.btn-left {
  float: left;
  margin-left: 0 !important;
}
.btn-right {
  float: right;
  margin-right: 0 !important;
  .el-button {
    margin-left: 5px;
    margin-right: 5px;
  }
}
</style>
