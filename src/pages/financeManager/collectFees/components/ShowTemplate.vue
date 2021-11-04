<template>
  <div class="body">
    <div class="head-button">
      <head-button @click="headButtonClick"></head-button>
    </div>
    <el-tabs v-model="activeName" id="mytabs">
      <el-tab-pane name="1" v-if="btnListIndexOf('SHOU1RU4TAI2ZHANG')">
        <span slot="label">收入台账</span>
        <CollectionTablenew
          :dataList="cd"
          :category="'0'"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
        </CollectionTablenew>
      </el-tab-pane>
      <el-tab-pane name="2" v-if="btnListIndexOf('YING1FU4TAI2ZHANG')">
        <span slot="label">应付台账</span>
        <CollectionTablenew :dataList="ad" :category="'1'">
        </CollectionTablenew>
        <!-- <current-account-table
          :dataList="dataList.account"
        ></current-account-table> -->
      </el-tab-pane>
      <!-- <el-tab-pane name="3" label="招标文件费/代理投标保证金台账">
        <bid-table :data-list="dataList.bid"></bid-table>
      </el-tab-pane> -->
      <el-tab-pane name="4" v-if="btnListIndexOf('YING1SHOU1TAI2ZHANG')">
        <span slot="label">应收台账</span>
        <deposit-payment-table :dataList="pd"></deposit-payment-table>
      </el-tab-pane>
    </el-tabs>
    <div class="dialog">
      <insert-collection-dialog
        title=""
        lable="收款登记"
        ref="insertRef"
        @getFormData="insertColl"
      ></insert-collection-dialog>
      <query-collection-dialog
        title=""
        lable="高级查询"
        ref="queryRef"
        @getFormData="queryColl"
      ></query-collection-dialog>
      <show-collection-dialog
        title="数据展示"
        lable="高级查询"
        ref="showRef"
        @getFormData="showColl"
      ></show-collection-dialog>
      <grant-dialog
        title="授权管理"
        ref="grantRef"
        @getFormData="grantShow"
      ></grant-dialog>
      <deposit-application-dialog
        title=""
        lable="支付信息"
        ref="depoRef"
        @getFormData="depApply"
      ></deposit-application-dialog>
      <deposit-register-dialog
        title="保证金缴纳登记"
        ref="depRegistRef"
        @getFormData="depReg"
      ></deposit-register-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import HeadButton from "./button/HeadButton.vue";
import CollectionTable from "./table/CollectionTable.vue";
import CollectionTablenew from "./table/CollectionTable_new.vue";
import CurrentAccountTable from "./table/CurrentAccountTable.vue";
import BidTable from "./table/BidTable.vue";
import DepositPaymentTable from "./table/DepositPaymentTable.vue";
import InsertCollectionDialog from "./dialog/InsertCollectionDialog.vue";
import QueryCollectionDialog from "./dialog/QueryCollectionDialog.vue";
import ShowCollectionDialog from "./dialog/ShowCollectionDialog.vue";
import GrantDialog from "./dialog/GrantDialog.vue";
import DepositApplicationDialog from "./dialog/DepositApplicationDialog.vue";
import DepositRegisterDialog from "./dialog/DepositRegisterDialog.vue";

import {
  getProject,
  getAll,
  addCollection,
  addCollectionList,
  getTender,
  getBill,
  getColl
} from "../../../../api/webapi-fin.js";
import { mapState, mapActions } from "vuex";
import { startFlow } from "../../../../api/webapi-flow";

export default {
  inject: ["reload"],
  components: {
    HeadButton,
    CollectionTable,
    CollectionTablenew,
    CurrentAccountTable,
    BidTable,
    DepositPaymentTable,
    InsertCollectionDialog,
    QueryCollectionDialog,
    ShowCollectionDialog,
    GrantDialog,
    DepositApplicationDialog,
    DepositRegisterDialog
  },
  props: {},
  watch: {},
  // 数据节点
  data () {
    return {
      activeName: "1",
      dataList: {},
      collectionData: [],
      aData: [],
      payData: [],
      cd_query: [],
      ad_query: [],
      pd_query: [],
      form: {},
      loading: false,
      op: [
        { id: 1, name: "服务费" },
        { id: 3, name: "文件费" },
        { id: 4, name: "管理费" },
        { id: 5, name: "风险（履约）保证金" },
        { id: 6, name: "投标保证金" },
        { id: 7, name: "其他往来款" },
        { id: 8, name: "其他收款" },
      ]
    };
  },
  computed: {
    ...mapState({
      // dataList: (state) => state.fin.dataList,
      cu: "currentUser",
    }),
    cd () {
      return this.$myfunction.queryData(this.cd_query, this.collectionData);
    },
    ad () {
      return this.$myfunction.queryData(this.ad_query, this.aData);
    },
    pd () {
      return this.$myfunction.queryData(this.pd_query, this.payData);
    },
  },
  // 生命周期函数节点
  created () {
    this.getall();
    this.networkGetOrgAndPost();
  },
  // 自定义函数节点
  methods: {
    ...mapActions({
      networkAddCollection: "fin/networkAddCollection",
      networkDelCollection: "fin/networkDelCollection",
      networkGetOrgAndPost: "loadType/networkGetOrgAndPost",
      previewAttach: "flowManager/preViewAttach",
    }),
    showts () {
      console.log(this.activeName);
    },
    getall () {
      this.loading = true;
      let pa = { page: 1, limit: 30, where: "", phone: this.cu.userId };
      pa = { jsondata: JSON.stringify(pa) };
      getAll(pa)
        .then((res) => {
          this.dataList = {
            collectionData: res.collData,
            account: res.accountData,
            payment: res.paymentData
          };
          console.log(this.dataList);
          const mydata = [];
          this.dataList.account.forEach((s) => {
            s.childrens.forEach((ss) => {
              mydata.push(ss);
            });
          });
          const collData = this.dataList.collectionData.map((s) => {
            s.detailStatus =
              s.sumMoney ==
              s.childrens.reduce((sums, n) => {
                return sums + parseFloat(n.collMoney);
              }, 0)
                ? '1'
                : '0';
            s.backTime = s.drawback ? s.drawback.creatTime : '';
            s.collType = s.childrens.map((t) => {
              return t.collType;
            });
            s.collType = s.collType.join(",");

            s.contractId = s.childrens
              .map((t) => {
                return t.contractId;
              })
              .filter((ttt) => {
                return ttt != "";
              })
              .join(",");

            s.contract_name = s.childrens
              .map((t) => {
                return t.contract_name;
              })
              .filter((ttt) => {
                return ttt != "";
              })
              .join(",");

            s.isBack = s.drawback ? '1' : '0';
            return s;
          });

          const AccData = this.dataList.account.map((s) => {
            s.detailStatus =
              s.sumMoney ==
              s.childrens.reduce((sums, n) => {
                return sums + parseFloat(n.collMoney);
              }, 0)
                ? '1'
                : '0';
            s.backTime = s.drawback ? s.drawback.creatTime : '';
            s.collType = s.childrens.map((t) => {
              return t.collType;
            });
            s.collType = s.collType.join(",");

            s.contractId = s.childrens
              .map((t) => {
                return t.contractId;
              })
              .filter((ttt) => {
                return ttt != "";
              })
              .join(",");

            s.contract_name = s.childrens
              .map((t) => {
                return t.contract_name;
              })
              .filter((ttt) => {
                return ttt != "";
              })
              .join(",");

            s.isBack = s.drawback ? '1' : '0';
            return s;
          });
          console.log('collTypes');

          const newData = this.dataList.payment.map((s) => {
            let status = -1;
            switch (s.collType) {
              case '5': // 风险保证金
                status =
                  mydata.filter((ts) => {
                    return ts.collType == '5' && ts.contractId == s.contractId;
                  }).length == 0
                    ? 0
                    : 1;

                break;
              case '6': // 投标保证金
                const pps = mydata
                  .filter((ts) => {
                    return ts.collType == "6" && ts.contractId == s.contractId;
                  })
                  .reduce((sum, n) => {
                    return parseFloat(sum) + parseFloat(n.collMoney);
                  }, 0);
                // console.log("my money");
                // console.log(pps);
                // console.log("my money----sssss");
                // console.log(s.collMoney);
                status =
                  mydata
                    .filter((ts) => {
                      return (
                        ts.collType == '6' && ts.contractId == s.contractId
                      );
                    })
                    .reduce((sum, n) => {
                      return parseFloat(sum) + parseFloat(n.collMoney);
                    }, 0) != parseFloat(s.collMoney)
                    ? 0
                    : 1;
                break;
              case '7': // 其它往来款
                status =
                  mydata.filter((ts) => {
                    return (
                      ts.collType == '7' &&
                      ts.orgname == s.orgname &&
                      ts.collMoney == s.collMoney
                    );
                  }).length == 0
                    ? 0
                    : 1;
                break;
            }
            s.PayStatus = status;
            s.reciveStatus = status;
            s.reciveTime = s.payDate;
            s.sumMoney = s.collMoney;
            return s;
          });

          // this.dataList.account.map(s=>{
          //   switch (s.childrens.collType) {
          //     case 5://风险保证金
          //       break;
          //     case 6://投标保证金
          //       break;
          //     case 7://其它往来款
          //       break;
          //   }
          // })
          this.collectionData = collData;
          this.aData = AccData;
          this.payData = newData;
          // this.dataList.payment = newData;
          this.loading = false;
          // console.log(this.dataList)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    headButtonClick (btn) {
      switch (btn) {
        case 1:
          //   let ppa ={condition:"payer='胡明红'"}
          //  let pa = {jsondata:JSON.stringify(ppa)};
          //   getColl(pa).then(res=>{
          //     console.log(res);
          //   })
          // getProject({}).then(res=>{
          // 	console.log(res);
          // })
          // getTender({}).then(res=>{console.log(res)});
          this.$refs.insertRef.openDialog({ category: 0 });
          break;
        case 7:
          this.$refs.insertRef.openDialog({ category: 1 });
          break;
        case 2:
          this.$refs.queryRef.openDialog();
          break;
        case 3:
          this.$refs.showRef.openDialog();
          break;
        case 4:
          this.$refs.grantRef.openDialog();
          break;
        case 5: // 保证金申请
          this.$refs.depoRef.openDialog({ applyType: "app" });
          break;
        case 6: // 保证金登记
          this.$refs.depoRef.openDialog({ applyType: "reg" });
          break;
        case 9:
          this.reload();
          break;
      }
    },
    // 收款添加
    insertColl (data) {
      const pa = { jsondata: JSON.stringify(data) };
      addCollection(pa).then((res) => {
        if (res.code == 200) {
          this.getall();
          this.$message.success("添加成功");
          // this.$router.push({path:'/fee/collect_fees'});
        }
      });
      console.log(data);
    },
    // 高级查询
    queryColl (data) {
      // console.log(this.collectionData);

      var mydata1 = data.filter((s) => {
        return s.ct.includes(parseInt(this.activeName));
      });

      // var changeData = Object.assign([], mydata1);
      // // console.log('mydata');
      // console.log(mydata1);
      // console.log(mydata1);
      // console.log(typeof mydata1[0].op);
      // console.log(data);

      switch (this.activeName) {
        case "1":
          console.log('1');
          this.cd_query = Object.assign([], mydata1);
          break;
        case "2":
          console.log('2');
          this.ad_query = Object.assign([], mydata1);
          break;
        case "4":
          console.log('4');
          this.pd_query = Object.assign([], mydata1);
          break;
      }
    },
    // 数据显示
    showColl (data) {},
    // 授权管理
    grantShow (data) {},
    // 保证金缴纳申请
    async depApply (data) {
      if (data.applyType == 'app') {
        const arr = [
          { name: '申请时间', controlType: 'input_sign', value: '' },
          { name: '申请组织', controlType: 'input_sign', value: '' },
          { name: '联系人', controlType: 'input_sign', value: '' },
          { name: '支付类型', controlType: 'input_sign', value: '' },
          { name: '金额(元)', controlType: 'input_money', value: '' },
          {
            name: '代支付证明',
            controlType: 'input_attachment',
            value: '',
          },
          {
            name: '支付申请表',
            controlType: 'input_attachment',
            value: '',
          }
        ];

        const dateNow = new Date();
        arr[0].value = dateNow.Format('yyyy-MM-dd');
        arr[1].value = this.cu.orgName;
        arr[2].value = this.cu.userName;
        arr[3].value = this.collTypeShow(data.collType);
        arr[4].value = data.collMoney;
        arr[5].value = await this.getfile(data.payProveAttach);
        arr[6].value = await this.getfile(data.payApplyAttach);
        const attachmentValue = JSON.stringify(arr); // 这里一定要转换成字符串
        const passa = {
          startPerson: this.cu.dinCode,
          versionID: 'v_2020_cwgl_bzjjlsq',
          jsonData: attachmentValue
        };

        await startFlow(passa).then((res) => {
          if (res.success) {
            this.$message.success('流程发起成功');
            data = Object.assign(data, {
              applyId: res.msg,
              Status: 1,
              createBy: this.cu.dinCode,
              createBy_name: this.cu.userName,
              createBy_orgName: this.cu.orgName,
              createBy_orgId: this.cu.orgId
            });
            const pa = { jsondata: JSON.stringify(data) };
            console.log(pa);
            addCollectionList(pa).then((res) => {
              if (res.code == 200) {
                this.getall();
                this.$message.success('添加成功');
              }
            });
          }
        });
      } else {
        // 区分条件为appid是否为空，如果为空代表就是登记
        data = Object.assign(data, {
          createBy: this.cu.dinCode,
          createBy_name: this.cu.userName,
          createBy_orgName: this.cu.orgName,
          createBy_orgId: this.cu.orgId
        });
        const pa = { jsondata: JSON.stringify(data) };
        addCollectionList(pa).then((res) => {
          if (res.code == 200) {
            this.getall();
            this.$message.success('添加成功');
          }
        });
      }

      // this.$confirm('是否确定发起流程审批?', '提示！', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      // })
      //   .then(async () => {
      //   })
      //   .catch(() => {
      //     this.$message({ type: 'info', message: '已取消发起流程！' });
      //   });
    },
    collTypeShow (code) {
      let result = "";
      switch (code) {
        case "1":
          result = "服务费";
          break;
        case "3":
          result = "文件费";
          break;
        case "4":
          result = "管理费";
          break;
        case "5":
          result = "风险（履约）保证金";
          break;
        case "6":
          result = "投标保证金";
          break;
        case "7":
          result = "其他往来款";
          break;
        case "8":
          result = "其他收款";
          break;
      }
      return result;
    },
    // 保证金缴纳登记
    depReg (data) {
      console.log(data);

      console.log(this.cu);
      data = Object.assign(data, {
        createBy: this.cu.dinCode,
        createBy_name: this.cu.userName,
        createBy_orgId: this.cu.orgId
      });
      // console.log('data');
      // console.log(data);
      const pa = { jsondata: JSON.stringify(data) };
      addCollectionList(pa).then((res) => {
        if (res.code == 200) {
          this.getall();
          this.$message.success("添加成功");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.head-button {
  height: 50px;
  line-height: 50px;
  padding: 10px 20px;
}
</style>
