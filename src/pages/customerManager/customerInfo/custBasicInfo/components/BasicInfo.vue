<template>
  <div class="body">
    <div class="card-head">
      <public-button name="WAN2SHAN4XIN4XI1XIN1JIAN4XIU1GAI" title="完善信息" @click="$refs.upRef.openDialog(dataBasic)"></public-button>
    </div>
    <div class="card-main">
      <div class="column">
        <com-showinfo :index="index" :data-base="dataBasic" :label-prop-list="infoArray" label="value"></com-showinfo>
      </div>
      <div class="column">
        <div class="table-el">
          <div class="table-el-head">
            <span style="font-size: 16px">前期联系人</span>
            <public-button name="WAN2SHAN4XIN4XI1XIN1JIAN4XIU1GAI" title="新建"  icon="el-icon-plus" type="primary" size="mini" @click="$refs.contactsRef.openDialog()">  
            </public-button>
          </div>
          <el-table
                  :data="contacts.dataList"
                  style="width: 650px"
                  align="center"
                  height="380px"
                  highlight-current-row
                  border
                  :header-cell-style="{fontSize:'14px',background:'#409eff'}">
            <el-table-column prop="name" label="联系人" align="left" width="150" header-align="center">
              <template slot-scope="scope">
                <i :class="scope.row.keycontacts?'el-icon-star-on':'el-icon-star-off'"
                   @click="signContactStatus(scope.row)"
                   :style="scope.row.keycontacts?'font-size: 19px;color: #409EFF':'font-size: 16px;color: #409EFF\''"></i>
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="phone" label="电话" align="left" width="150"  header-align="center"></el-table-column>
            <el-table-column prop="department" label="部门" width="160" align="left"  header-align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="post" label="职务" width="96" align="left"  header-align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" align="left"  header-align="center" width="92">
              <template slot-scope="scope">
                <public-button name="WAN2SHAN4XIN4XI1XIN1JIAN4XIU1GAI"  title="修改" classhd="hd" :plain="true" icon="el-icon-edit-outline" @click="$refs.upContactsRef.openDialog(scope.row)">修改</public-button>
                <!--<el-button type="text" size="mini">删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <up-basic-info-dialog ref="upRef" @getFormData="submitUpBasicInfoForm"></up-basic-info-dialog>
    <add-contacts-dialog ref="contactsRef" title=""
                         width="25%" @getFormData="submitAddContacts"></add-contacts-dialog>
    <add-contacts-dialog ref="upContactsRef" title=""
                         width="25%" @getFormData="submitUpContacts"></add-contacts-dialog>
  </div>
</template>
<script>
  //import __ from '__' // __是需要手动引入的文件
  import UpBasicInfoDialog from './dialog/UpBasicInfoDialog.vue'
  import AddContactsDialog from './dialog/AddContactsDialog.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('customerInfo')
  export default {
    components: {
      UpBasicInfoDialog,
      AddContactsDialog
    },
    props: {},
    watch: {

    },
    computed: {
      ...mapState({
        dataBasic: 'dataBasic',
        contacts: 'contacts',
      })
    },
    //数据节点
    data() {
      return {
        isImportant: false,
        upContacts: {},
        infoArray: [
          {key:'customerName',value:'客户名称'},
          {key:'address',value:'单位地址'},
          {key:'region',value:'所属省市区'},
          {key:'unitNature',value:'单位性质'},
          {key:'isTaxpayer',value:'是否为一般纳税人',type:'boolean'},
          {key:'isCreditCode',value:'是否有统一社会信用码',type:'boolean'},
          {key:'creditCode', value:'统一社会信用代码'},
          {key:'bank',value:'开户行'},
          {key:'accountCode',value:'账号'},
          {key:'invoiceAddress',value:'开票地址'},
          {key:'invoicePhone',value:'开票电话'}
        ],
        index: 11
      }
    },
    //自定义函数节点
    methods: {
      ...mapActions({
        networkUpCustomer: 'networkUpCustomer',
        networkAddContacts:'networkAddContacts',
        networkUpContacts:'networkUpContacts'
      }),
      submitUpBasicInfoForm(data) {
        this.networkUpCustomer(data)
      },
      submitAddContacts(data) {
        data.clientid=this.dataBasic.keyid
        this.networkAddContacts(data)
      },
      submitUpContacts(data) {
        this.networkUpContacts(data)
      },
      signContactStatus(oldData){
        let data=this.$myfunction.copyData(oldData)
        if (!data.keycontacts) {
          data.keycontacts=true
          this.$msgbox.confirm('是否标记该联系人？','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.networkUpContacts(data)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          })
        }else if (data.keycontacts) {
          data.keycontacts=false
          this.$msgbox.confirm('是否取消该联系人的标记？','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.networkUpContacts(data)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          })
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  .body {
    border: 0px solid #4b4ef7;
    border-radius: 3px;
    span {
      font-size: 16px;
    }
    .card-head {
      height: 30px;
      margin-bottom: 20px;
      .el-col {
        position: relative;
        height: 30px;
        line-height: 30px;
        span {
          font-size: 20px;
        }
        .el-button {
          position: absolute;
          top: 0;
          right: 0;
        }

      }
    }
    .card-main {
      display: flex;
      border-top: 1px solid #03acca;
      border-radius: 3px;
      .column {
        flex: 2;
        &:nth-child(1) {
          position: relative;
          .show-data {
            width:50%;
            p {
              height: 30px;
              line-height: 30px;
              font-size: 16px;
              margin-bottom: 10px;
            }
            &:nth-child(2) {
              position: absolute;
              top: 0;
              right: 0;
            }
          }
        }
        &:nth-child(2) {
          .table-el {
            background-color: #caebfa;
            color: rgb(250, 250, 250);
            padding: 2px;
            .table-el-head {
              position: relative;
              height: 40px;
              line-height: 30px;
              span {
                font-size: 14px;
                color: #000;
              }
              .el-button {
                position: absolute;
                top: 0;
                right: 5px;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
</style>
