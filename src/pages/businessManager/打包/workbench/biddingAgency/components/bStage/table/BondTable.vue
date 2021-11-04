<!-- 编制及审核资格预审文件台账 -->
<template>
  <div>
    <!--<div style="margin: 5px 5px;">
      <el-tabs tab-position="top">
        <template v-for="(item,index) in subcontractNames">
          <el-tab-pane :label="item.name">
            <el-col :span="4" style="margin: 10px 0;"><label>报名家数：{{item.signUpNumber}}</label></el-col>
            <el-col :span="4" style="margin: 10px 0;"><label>保证金缴纳家数：{{item.paymentNumber}}</label></el-col>
            <el-col :span="4" style="margin: 10px 0;"><label>已退家数：{{item.returnNumber}}</label></el-col>
            <el-col :span="4" style="margin: 10px 0;"><label>未退家数：{{item.onReturnUpNumber}}</label></el-col>
            <el-col :span="8" style="margin: 10px 0;">

            </el-col>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>-->
    <div class="table">
      <el-button
        style="float: left;margin-bottom: 10px"
        type="primary"
        size="mini"
        icon="el-icon-plus"
        @click="$refs.addSaleRef.openDialog()"
        >新建</el-button
      >
      <el-table
        :data="materialInfo"
        :span-method="objectSpanMethod"
        style="width: 100%"
        align="center"
        height="350px"
        highlight-current-row
        :header-cell-style="{ fontSize: '10px' }"
        border
      >
<!--        新加-->
        <el-table-column prop="fileNtimes" label="发售次数" align="center" width="120" fixed="left"></el-table-column>
        <!--        新加-->
        <el-table-column
          prop="filesalename"
          label="分包/分标段名称"
          align="center"
          fixed="left"
        ></el-table-column>
        <el-table-column prop="" label="文件及保证金情况" align="center" width="120" >
          <template slot-scope="scope">
            <el-popover placement="bottom" width="400" trigger="click">
              <br>
                <p>文件缴费时间段：  <span v-if="scope.row.filesalebegindateTime !== '' &&scope.row.filesaleestimateEndTime !== ''">
              {{ scope.row.filesalebegindateTime }}-{{
                scope.row.filesaleestimateEndTime
              }}
            </span></p>
                <p>应缴文件费金额：{{scope.row.filecost}}</p>
                <p>保证缴费时间段：   <span v-if="scope.row.cashdeposittime !== '' && scope.row.cashdepositendtime !== ''">
              {{ scope.row.cashdeposittime }}-{{ scope.row.cashdepositendtime }}
            </span></p>
              <p>应缴保证金金额：{{scope.row.cashdepositcost}}</p>
              <br>
<!--              <p>缴费情况</p>-->
<!--              <p>文件缴费时间：{{scope.row.children.filesaledateTime}}</p>-->
<!--              <p>保证金缴费时间：{{scope.row.children.cashdepositdateTime}}</p>-->
<!--              <p>保证金退回时间：{{scope.row.children.refunddateTime}}</p>-->
              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>
        </el-table-column>

<!--        <el-table-column width="0"></el-table-column>-->
<!--        <el-table-column width="0"></el-table-column>-->
<!--        <el-table-column label="保证金收款时间" align="center" width="140">-->
<!--          <template slot-scope="scope">-->
<!--            <span-->
<!--              v-if="-->
<!--                scope.row.cashdeposittime !== '' &&-->
<!--                  scope.row.cashdepositendtime !== ''-->
<!--              "-->
<!--            >-->
<!--              {{ scope.row.cashdeposittime }}-{{ scope.row.cashdepositendtime }}-->
<!--            </span>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="cashdepositcost"-->
<!--          label="保证金金额(元)"-->
<!--          align="center"-->
<!--          width="100"-->
<!--        ></el-table-column>-->

        <el-table-column
          prop="children.companyname"
          label="单位名称"
          align="center"
          width="400px"
        ></el-table-column>
        <el-table-column
            label="保证金是否已缴纳"
            align="center"
            width="120px"
        >
          <template slot-scope="scope">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link" >
                <el-tag @click="updataItem=scope.row.children">{{scope.row.children.allstatuscode=="1"?"已缴纳":scope.row.children.allstatuscode=="0"?"未缴纳":'无'}}</el-tag>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0">未缴纳</el-dropdown-item>
                <el-dropdown-item command="1">已缴纳</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>

        </el-table-column>
        <el-table-column label="操作" align="center" width="80">
          <template slot-scope="scope">
            <el-button v-if="$myfunction.isEmpty(scope.row.children)"
                type="primary" size="mini" plain disabled>删除</el-button>
            <template v-if="!$myfunction.isEmpty(scope.row.children)">
<!--              <el-button-->
<!--                type="text"-->
<!--                @click="$refs.upComRef.openDialog('edit', scope.row.children)"-->
<!--                >修改</el-button-->
<!--              >-->
              <el-button
                  type="primary" size="mini" plain
                @click="networkDelBondCom(scope.row.children)"
                >删除</el-button>
<!--              <el-button-->
<!--                type="text"-->
<!--                @click="$refs.perfectRef.openDialog(scope.row.children)"-->
<!--                >完善信息</el-button-->
<!--              >-->
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="150"

        >
          <template slot-scope="scope">
            <el-button
              type="primary" size="mini" plain
              @click="$refs.addComRef.openDialog('add', scope.row)"
              >登记单位</el-button>
            <el-button
                type="primary" size="mini" plain
                @click="delThisArticle(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div lang="dialog">
      <add-file-sale-dialog
        title="新增文件发售"
        ref="addSaleRef"
        width="40%"
        @getFormData="networkAddData"
      ></add-file-sale-dialog>

<!--      <add-file-sale-dialog-->
<!--        title="修改文件发售"-->
<!--        ref="upSaleRef"-->
<!--        width="40%"-->
<!--        @getFormData="networkUpData"-->
<!--      ></add-file-sale-dialog>-->

<!--      title="新增单位"-->
      <add-company-dialog
        width="30%"
        ref="addComRef"
        @getFormData="networkAddCom"
      >

      </add-company-dialog>
<!--      <add-company-dialog-->
<!--        title="修改单位"-->
<!--        width="30%"-->
<!--        ref="upComRef"-->
<!--        @getFormData="networkUpCom"-->
<!--      ></add-company-dialog>-->

<!--      <perfect-file-dialog-->
<!--        title="完善信息"-->
<!--        width="30%"-->
<!--        ref="perfectRef"-->
<!--        @getFormData="networkUpCom"-->
<!--      ></perfect-file-dialog>-->
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import HeadRightButton from "../button/HeadRightButton.vue";
import AddCompanyDialog from "../dialog/BondTable/AddCompanyDialog.vue";
import AddFileSaleDialog from "../dialog/BondTable/AddFileSaleDialog.vue";
import PerfectFileDialog from "../dialog/BondTable/PerfectFileDialog.vue";
import { mapState } from "vuex";
import {
  getBond,
  addBond,
  upBond,
  delBond,
  addBondCom,
  upBondCom,
  delBondCom,

} from "../../../../../../../api/workbench/webapi-biddingAgency.js";

export default {
  components: {
    HeadRightButton,
    AddCompanyDialog,
    AddFileSaleDialog,
    PerfectFileDialog,
  },
  props: {
    typeCode: [String]
  },
  mounted() {},
  watch: {
    activeName(newValue) {},
    subcontractNames(newValue) {},
    materialInfo(newValue) {}
  },
  computed: {
    ...mapState("workbench", {
      currentItem: "currentItem"
    })
  },
  //数据节点
  data() {
    return {
      activeName: "A包",
      subcontractNames: [],
      materialInfo: [],
      tableData: [],
      OrderIndexArr: [],
      updataItem:{}
    };
  },
  //生命周期函数节点
  created() {
    this.networkGetDatas();
    console.log(this.materialInfo);
  },
  //自定义函数节点
  methods: {
    handleCommand(command){
      this.updataItem.allstatuscode=command
      if(this.updataItem.keyid){
        upBondCom(this.updataItem).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message);
            this.networkGetDatas();
          }
        });
      }else {
        this.$message.error('请先添加单位');
      }



    },
    // tableButtonClick(btn,tdata) {
    //   switch (btn) {
    //     case 1:
    //       // this.$refs.upRef.openDialog(tdata);
    //       break;
    //     case 2:
    //       this.$confirm('此操作将改变结果, 是否继续?', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //       }).then(() => {
    //         MessagePhone.edits_object(tdata).then(item=>{
    //           if (item.code === 200) {
    //             this.$message.success("修改完成!");
    //             this.reload();
    //           }
    //         });
    //       }).catch(() => {
    //         tdata.allstatuscode=(tdata.allstatuscode=="0")?2:0,
    //           this.$message({
    //             type: 'info',
    //             message: '已取消'
    //           });
    //         this.reload();
    //       });
    //
    //       break;
    //     case 3:
    //       break;
    //   }
    // },
    delThisArticle(data){
      console.log()
      if(data.fileSaleList.length==0){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delBond({keyid:data.keyid}).then(res=>{
            this.$message.success("删除成功")
            this.networkGetDatas()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }else {
        this.$message.error("请先删除此条数据下的所有单位")
      }

    },
    networkGetDatas() {
      this.materialInfo = [];
      this.subcontractNames = [];
      let ref = {
        projectKeyid: this.currentItem.keyid,
        typecode: this.typeCode
      };
      getBond(ref).then(item => {
        // console.log(item)
        item.data.forEach(refs => {
          let obj = {
            children: {}
          };
          let subcontractName = {
            id: refs.keyid,
            name: refs.filesalename,
            signUpNumber: refs.fileSaleList.length,
            paymentNumber: 0,
            returnNumber: 0,
            onReturnUpNumber: 0
          };

          Object.assign(obj, refs);
          if (refs.fileSaleList.length > 0) {
            refs.fileSaleList.forEach(ref => {
              if (ref.cashdepositdateTime !== "") {
                subcontractName.paymentNumber++;
              }
              if (ref.refunddateTime !== "") {
                subcontractName.returnNumber++;
              }
              obj.children = ref;
              this.materialInfo.push(this.$myfunction.copyData(obj));
            });
          } else {
            this.materialInfo.push(obj);
          }
          subcontractName.onReturnUpNumber =
            subcontractName.paymentNumber - subcontractName.returnNumber;
          this.subcontractNames.push(
            this.$myfunction.copyData(subcontractName)
          );
        });
        this.tableData = [];
        this.OrderIndexArr = [];
        this.getOrderNumber("filesalename");
      });
    },
    networkAddData(formData) {
      let ref = {
        projectKeyid: this.currentItem.keyid,
        typecode: this.typeCode
      };
      Object.assign(formData, ref);
      addBond(formData).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.networkGetDatas();
        }
      });
    },
    networkUpData(formData) {
      formData.proofcount = formData.proofcount + 1;
      upBond(formData).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.networkGetDatas();
        }
      });
    },
    //新增单位
    networkAddCom(formData) {
      addBondCom(formData).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.networkGetDatas();
        }
      });
    },
    networkUpCom(formData) {
      upBondCom(formData).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.networkGetDatas();
        }
      });
    },
    networkDelBondCom(data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delBondCom(data).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message);
            this.networkGetDatas();
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },

    //合并项计算方法
    getOrderNumber(firstColumn) {
      let OrderObj = {};
      this.materialInfo.forEach((element, index) => {
        element.rowIndex = index;
        if (OrderObj[element[firstColumn]]) {
          OrderObj[element[firstColumn]].push(index);
        } else {
          OrderObj[element[firstColumn]] = [];
          OrderObj[element[firstColumn]].push(index);
        }
      });
      // 将数组长度大于1的值 存储到this.OrderIndexArr（也就是需要合并的项）
      for (let k in OrderObj) {
        if (OrderObj[k].length > 1) {
          this.OrderIndexArr.push(OrderObj[k]);
        }
      }
    },
    objectSpanMethod: function({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 3 || columnIndex === 6) {
        for (let i = 0; i < this.OrderIndexArr.length; i++) {
          let element = this.OrderIndexArr[i];
          for (let j = 0; j < element.length; j++) {
            let item = element[j];
            if (rowIndex == item) {
              if (j == 0) {
                return {
                  rowspan: element.length,
                  colspan: 1
                };
              } else if (j != 0) {
                return {
                  rowspan: 0,
                  colspan: 0
                };
              }
            }
          }
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
