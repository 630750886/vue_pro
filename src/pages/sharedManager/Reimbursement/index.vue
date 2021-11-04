<template>
  <section class="data_section" ref="data_section">
    <el-row :gutter="20">
      <el-col>
        <tablelist         
          @function="submitForm"
          :myData="dataList"
          @tabClick="tableClick"
        ></tablelist>
        <reg-time ref="regtimeRef" title1="登记时间" @getFormData="regTimeUpdate"></reg-time>
        
      </el-col>
    </el-row>
  </section>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import tablelist from "./components/TableList.vue";
import regTime from "./components/dialog/regTimeDialog.vue";

import {
  addShareReimebursement,  
  getShareReimubursement,
  updateShareReimebursement
} from "../../../api/webapi-share.js";
import { startFlow } from "../../../api/webapi-flow.js";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  components: {
    tablelist,
    regTime   
  },
  //数据节点
  data() {
    return {
      dataList: [],
      total: 0,
      currTableRow:{},
      loadData: [],
      pageShow: {
        page: 1,
        limit: 30,
        where: "1=1"
      }
    };
  },
  //生命周期函数节点
  created() {
    this.showList();
    this.networkGetOrgAndPost();
    //this.loadTypes();
    // let url = location.href;
    // this.getsign(url);
  },
  computed: {
    ...mapGetters({
      attachpath: "flowManager/attachmentUploadStr"
    }),
    ...mapState({
      currentUser: "currentUser"
      //abc: state => state.loadType.nonBusConType.list
    })
  },
  mounted() {},
  //自定义函数节点
  methods: {
    ...mapActions({
      //getsign: "flowManager/newworkGetSign",
      loadTypes: "loadType/networkGetCascaderLoadData",
      networkGetOrgAndPost: "loadType/networkGetOrgAndPost"
      //getStamp: "shareManager/getAllData"
    }),
    tableClick(btn,data){
      this.currTableRow=data;
      switch (btn) {
        case 1:
          this.$refs.regtimeRef.openDialog();          
          break;
          case 2:
            data.delSign=1;
            this.$confirm('此操作将改变结果, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let pa = {jsondata:JSON.stringify(data)};
            updateShareReimebursement(pa).then(res=>{
              if(res.code==200){
                 this.$message.success("更新成功");
                  this.showList();
              }
            })         
          }).catch(() => {
           
          });
            
            break;
      }
    },
    showList() {
      let pa = {
        page: 1,
        limit: 30,
        where: "",
        phone: this.currentUser.userId
      };
      pa = { jsondata: JSON.stringify(pa) };
      getShareReimubursement(pa).then(res => {
        this.dataList = res.rows; 
       
      });
    }, 
    regTimeUpdate(formData){
       let pa = Object.assign(this.currTableRow,formData);
       pa = {jsondata:JSON.stringify(pa)};
       updateShareReimebursement(pa).then(res=>{
              if(res.code==200){
                 this.$message.success("更新成功");
                  this.showList();
              }
            })
    },
    async submitForm(formName, data) {
      switch (formName) {
        case "addData":
          let mydata=[];
          data.tables.forEach(s=>{
          let mytabs= s.children.forEach(item=>{
             item.orgId=s.orgId;
             item.orgName=s.orgName;
             item.contractId=s.contractId;
             item.contractName=s.contractName;             
             mydata.push(item);
           });           
         })
         data = Object.assign(data,{tables:mydata});
         
        let dateNow=new Date();
         if(data.status=="0"){
          let jsondata = [
            { name: "申请时间", controlType: "input_sign", value: "" },
            { name: "申请组织", controlType: "input_sign", value: "" },
            { name: "申请人", controlType: "input_sign", value: "" },
            {
              name: "报销申请表",
              controlType: "input_attachment",
              value: ""
            },
            {
              name: "报销证明",
              controlType: "input_attachment",
              value: ""
            },
            { name: "备注", controlType: "input_muit", value: "" },
            {
              name: "报销金额",
              controlType: "input_money",
              value: ""
            }
          ];
          if (!data.mark) {
            data.mark = " ";
          }
          let dateNow = new Date();
          jsondata[0].value = dateNow.Format("yyyy-MM-dd");
          jsondata[1].value = this.currentUser.orgName;
          jsondata[2].value = this.currentUser.userName;
          jsondata[3].value = await this.getfile(data.fileAttach);
          jsondata[4].value = await this.getfile(data.proveAttach);
          jsondata[5].value = data.mark;
          jsondata[6].value = data.sumMoney;
          let attachmentValue = JSON.stringify(jsondata); //这里一定要转换成字符串
          let passa = {
            startPerson: this.currentUser.dinCode,
            versionID: "v_2020_gxgl_bxsq",
            jsonData: attachmentValue
          };

          startFlow(passa).then(res => {
            if (res.success) {
              let mydata = Object.assign(data, {
                instanceId: res.msg,
                orgName: this.currentUser.orgName,
                orgId: this.currentUser.orgId,
                createTime: dateNow.Format("yyyy-MM-dd"),
                createBy: this.currentUser.userName
              });
              this.$message.success("流程发起成功");
              let pa = { jsondata: JSON.stringify(mydata) };

              addShareReimebursement(pa).then(res => {
                if (res.code == 200) {
                  this.$message.success("报销数据添加成功");
                  this.showList();
                }
              });
            }
          });

         }else{
            let mydata1 = Object.assign(data, {               
                orgName: this.currentUser.orgName,
                orgId: this.currentUser.orgId,
                createTime: dateNow.Format("yyyy-MM-dd"),
                createBy: this.currentUser.userName
              });
               let pa = { jsondata: JSON.stringify(mydata1) };

              addShareReimebursement(pa).then(res => {
                if (res.code == 200) {
                  this.$message.success("报销数据添加成功");
                  this.showList();
                }
              });
         }
          break;
         case "queryForm":
          // console.log(data);
          break;
        case "startFlowForm":
          break;
      }
    }
    //获得加载数据
    // ...mapActions({
    //   getsign: "flowManager/newworkGetSign"
    // }),
    // async getTableList() {
    //   let pa = {
    //     page: 1,
    //     limit: 30,
    //     filter: {}
    //   };
    //   const res = await getAll(pa);
    //   this.dataList = res.data;
    //   //console.log(res);
    // },
  }
};
</script>
<style lang="less" scoped>
.search_container {
  margin-bottom: 20px;
}

.searchArea {
  background: #e1dfdf;
  border-radius: 2px;
  padding: 18px 18px 0;
}

.row_list {
  margin-bottom: 20px;
  .row_base {
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 6px;
    height: 1.618rem;
  }
}

.order_list {
  .orderArea {
    width: 100%;
    height: 4.989rem;
    background: #fff !important;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 40px;
    overflow: hidden;
  }
  .orderbarArea {
    height: 4.989rem;
  }
}

.data_list {
  text-align: center;
  font-size: 14px;
  border-radius: 6px;
  padding: 10px;
  color: #fff;
  height: 1.079rem;
  .leftItem {
    align-items: start;
    justify-content: space-between;
    text-align: left;
  }
  .rightItem {
    width: 0.836rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .svg-icon {
      font-size: 30px;
    }
  }
  .number {
    font-size: 0.297rem;
    font-weight: bold;
    .perTitle {
      font-size: 0.175rem;
      margin-left: 5px;
    }
  }
}

.pay {
  .leftItem {
    justify-content: space-around;
  }
}
</style>
