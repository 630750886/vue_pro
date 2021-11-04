<template>
  <div class="body">
    <div class="card-head">
      <el-row>
        <el-col :span="2">
          <public-button name="WAN2SHAN4XIN4XI" title="完善信息" @click="$refs.showRef.openDialog(contractInfo)"></public-button>
        </el-col>
        <el-col :span="12">
          <div v-if="false">
            <span style="color: red">提示：当前合同需要缴纳保证金，请缴纳！</span>金额(元)：{{contractInfo.depositsum}}
            <public-button type="text" name="BAO3ZHENG4JIN1JIAO3NA4SHEN1QING" title="缴纳申请" @click="Appplayclick"></public-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="card-main">
      <com-showinfo :data-base="contractInfo" label="value" :label-prop-list="infoArray" :index="index"></com-showinfo>
    </div>
    <up-basic-info-dialog ref="showRef" width="55%" @getFormData="submitForm"></up-basic-info-dialog>
    <playAppDialog  title="支付信息"
    ref="depoRef"
    @getFormData="depApply"
    ></playAppDialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import UpBasicInfoDialog from './dialog/UpBasicInfoDialog.vue'
  import playAppDialog from "./dialog/playAppDialog.vue"
  import {createNamespacedHelpers} from 'vuex'
  import { startFlow } from "@/api/webapi-flow";
  import {
  getProject,
  getAll,
  addCollection,
  addCollectionList,
  getTender
} from "@/api/webapi-fin.js";

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('nonBusContract')
  export default {
    components: {
      UpBasicInfoDialog,
      playAppDialog
    },
    props: {},
    watch: {
      contractInfo(newValue){
        if (newValue.isgather) {
          let arr=[
            {key: 'isgather', value: '是否需要缴纳履约（风险）保证金',type:'boolean'},
            {key: 'depositsum', value: '缴纳金额(元)'},
            {key: 'depositdateTime', value: '履约（风险）保证金缴纳时间'},
            {key: 'depositfile', value: '履约（风险）保证金缴纳回执单',type:'file',btns:[{name:'下载',type:'button'}]},
            {key: 'indepositdateTime', value: '履约（风险）保证金退回时间'},
            {key: 'indepositfile', value: '履约（风险）保证金退回电子凭证',type:'file',btns:[{name:'下载',type:'button'}]},
          ]
          this.infoArray=this.$options.data().infoArray
          this.infoArray=this.infoArray.concat(arr)
        }
        if (newValue.isdeposit) {
          let arr=[
            {key: 'isdeposit', value: '是否需要收取履约（风险）保证金', type:'boolean'},
            {key: 'depositsum', value: '收取金额(元)'},
            {key: 'depositdateTime', value: '履约（风险）保证金收取时间'},
            {key: 'depositfile', value: '履约（风险）保证金收取回执单',type:'file',btns:[{name:'下载',type:'button'}]},
            {key: 'indepositdateTime', value: '履约（风险）保证金退回时间'},
            {key: 'indepositfile', value: '履约（风险）保证金退回电子凭证',type:'file',btns:[{name:'下载',type:'button'}]}
          ]
          this.infoArray=this.$options.data().infoArray
          this.infoArray=this.infoArray.concat(arr)
        }
      }
    },
    computed: {
      ...mapState({
        contractInfo:'contractInfo'
      })
    },
    //数据节点
    data() {
      return {
        index: 12,
        dataInfo: {},
        infoArray: [
          {key: 'contractName', value: '合同名称'},
          {key: 'contractTypename', value: '合同类型'},
          {key: 'contractBurchaser', value: '甲方名称'},
          {key: 'contractSeller', value: '乙方名称'},
          {key: 'thirdparty', value: '第三方'},
          {key: 'methodofdisputename', value: '合同争议方式'},
          {key: 'disputename', value: '仲裁地点/法院名称'},
          {key: 'issecurity', value: '是否有担保人',type:'boolean'},
          {key: 'contractSecurityPerson', value: '担保人'},
          {key: 'concludesigndateTime', value: '合同签订时间'},
          {key: 'contractallfile', value: '合同扫描件', type: 'file',btns:[{name:'下载',type:'button'}]},
          {key: 'isexpiryDate', value: '是否有有效期',type:'boolean'},
          {key: 'expiryDate', value: '有效期起止时间'},
        ],
      }
    },
    //生命周期函数节点
    created() {
      if (this.contractInfo.isgather) {
        let arr=[
          {key: 'isgather', value: '是否需要缴纳履约（风险）保证金',type:'boolean'},
          {key: 'depositsum', value: '缴纳履约（风险）保证金'},
          {key: 'depositdateTime', value: '履约（风险）保证金缴纳时间'},
          {key: 'depositfile', value: '履约（风险）保证金缴纳回执单',type: 'file',btns:[{name:'下载',type:'button'}]},
          {key: 'indepositdateTime', value: '履约（风险）保证金退回时间'},
          {key: 'indepositfile', value: '履约（风险）保证金退回电子凭证',type: 'file',btns:[{name:'下载',type:'button'}]},
        ]
        this.infoArray=this.$options.data().infoArray
        this.infoArray=this.infoArray.concat(arr)
      }
      if (this.contractInfo.isdeposit) {
        let arr=[
          {key: 'isdeposit', value: '是否需要收取履约（风险）保证金', type:'boolean'},
          {key: 'depositsum', value: '缴纳履约（风险）保证金'},
          {key: 'depositdateTime', value: '履约（风险）保证金收取时间'},
          {key: 'depositfile', value: '履约（风险）保证金收取回执单',type: 'file',btns:[{name:'下载',type:'button'}]},
          {key: 'indepositdateTime', value: '履约（风险）保证金退回时间'},
          {key: 'indepositfile', value: '履约（风险）保证金退回电子凭证',type: 'file',btns:[{name:'下载',type:'button'}]}
        ]
        this.infoArray=this.$options.data().infoArray
        this.infoArray=this.infoArray.concat(arr)
      }
    },
    //自定义函数节点
    methods: {
        ...mapActions({
          networkUpContract:'networkUpContract',

        }),
      submitForm(formData) {
        this.networkUpContract(formData)
      },
      Appplayclick()
      {
        this.$refs.depoRef.openDialog({applyType:'app'});
      },
      depApply(data) {
      this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
          {
            if(data.applyType=="app"){
              let arr = [{"name":"申请时间","controlType":"input_sign","value":""},
                {"name":"申请组织","controlType":"input_sign","value":""},
                {"name":"联系人","controlType":"input_sign","value":""},
                {"name":"支付类型","controlType":"input_sign","value":""},
                {"name":"金额(元)","controlType":"input_money","value":""},
                {"name":"代支付证明","controlType":"input_attachment","value":""},
                {"name":"支付申请表","controlType":"input_attachment","value":""}];
                let dateNow = new Date();
                arr[0].value = dateNow.Format("yyyy-MM-dd");
                arr[1].value = this.cu.orgName;
                arr[2].value = this.cu.userName;
                arr[3].value = this.collTypeShow(data.collType);
                arr[4].value = data.collMoney;
                arr[5].value =await this.getfile(data.payProveAttach);
                arr[6].value =await this.getfile(data.payApplyAttach);
                let attachmentValue = JSON.stringify(arr); //这里一定要转换成字符串
                let passa = {
                  startPerson: this.cu.dinCode,
                  versionID: "v_2020_cwgl_bzjjlsq",
                  jsonData: attachmentValue,
                };

              await startFlow(passa).then((res) => {
                  if (res.success) {
                    this.$message.success("流程发起成功");
                    data = Object.assign(data, {
                      applyId: res.msg,
                      Status:1,
                      createBy: this.cu.dinCode,
                      createBy_name: this.cu.userName,
                      createBy_orgName:this.cu.orgName
                    });
                  let pa = { jsondata: JSON.stringify(data) };
                  console.log(pa);
                addCollectionList(pa).then((res) => {
                      if (res.code == 200) {
                        this.getall();
                        this.$message.success("添加成功");
                      }
                  });
                  }
                });
              }
          }).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});
      }
    }
  }
</script>
<style lang='less' scoped>
  .body {
    height: 550px;
    .card-head {
      height: 30px;
      margin-bottom: 20px;
    }
    .card-main {
      position: relative;
      .show-data {
        height: 230px;
        width: 50%;
        p {
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          margin-bottom: 5px;
        }
        &:nth-child(2) {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }

</style>
