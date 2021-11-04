<template>
  <div class="body">
    <el-row>
      <el-col :span="18" :offset="4">
        <div style="height: 7rem">
          <el-form :model="form" ref="formRef" :rules="formRules" label-width="150px">
            <el-row v-if="!readonly">
              <el-col :span="12">
                <el-form-item label="投标形式">
                  <rea-select v-model="form.formtenderkeyid" :data="bidModality"
                              @getLabel="item=>{form.formtendername=item}"></rea-select>
                </el-form-item>
                <el-form-item label="投标主体">
                  <rea-cascader v-model="form.tendererkeyid" :data="bidPart"
                                @getLabel="item=>{form.tenderername=item}"></rea-cascader>
                </el-form-item>
                <el-form-item label="是否需要缴纳保证金">
                  <com-truefalse v-model="form.istenderbond"></com-truefalse>
                </el-form-item>
                <template v-if="form.istenderbond">
                  <el-form-item label="保证金(元)">
                    <el-col :span="16">
                      <el-input v-model="form.tenderbondsum"></el-input>
                    </el-col>
                    <el-col class="line" :span="2"></el-col>
                    <el-col :span="6">
                    </el-col>
                  </el-form-item>
                  <el-form-item label="缴纳时间">
                    <rea-datescope v-model="form.tbbegindateTime" type="datetimerange"></rea-datescope>
                  </el-form-item>
                </template>
              </el-col>
              <el-col :span="12">
                <el-form-item label="保证金缴纳时间">
                  {{form.bondpaydateTime}}
                </el-form-item>
                <el-form-item label="保证金缴纳回执单">
                  <download-button :value="form.bondpayfile"></download-button>
                </el-form-item>
                <el-form-item label="保证金退回时间">
                  {{form.bondbackdateTime}}
                </el-form-item>
                <el-form-item label="保证金退回回执单">
                  <download-button :value="form.bondbackfile"></download-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="readonly">
              <el-col :span="12">
                <el-form-item label="投标形式">
                  {{form.formtendername}}
                </el-form-item>
                <el-form-item label="投标主体">
                  {{form.tenderername}}
                </el-form-item>
                <el-form-item label="是否需要缴纳保证金">
                  {{form.istenderbond?'是':!form.istenderbond?'否':''}}
                </el-form-item>
                <template v-if="form.istenderbond">
                  <el-form-item label="保证金(元)">
                    <el-col :span="6">
                      {{form.tenderbondsum}}
                    </el-col>
                  </el-form-item>
                  <el-form-item label="缴纳时间">
                    {{form.tbbegindateTime}}
                  </el-form-item>
                </template>
              </el-col>
              <el-col :span="12">
                <el-form-item label="保证金缴纳时间">
                  {{form.bondpaydateTime}}
                </el-form-item>
                <el-form-item label="保证金缴纳回执单">
                  {{form.bondpayfile}}
                </el-form-item>
                <el-form-item label="保证金退回时间">
                  {{form.bondbackdateTime}}
                </el-form-item>
                <el-form-item label="保证金退回回执单">
                  {{form.bondbackfile}}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <primary-button v-if="!readonly" width="100%" letter-spacing="100px" title="保存"
                        @click="submitForm"></primary-button>
        <primary-button v-if="readonly && btnListIndexOf('BIAN1JI')" width="100%" letter-spacing="100px" title="编辑"
                        @click="readonly=false"></primary-button>
      </el-col>
    </el-row>
    <AppplayDialog
      title="支付信息"
      ref="depoRef"
      @getFormData="depApply">
    </AppplayDialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {getBidRecordByKeyid, addBidRecord, upBidRecord} from '../../../../../api/webapi-bidRecord.js'
  import {mapState, mapActions,mapMutations} from 'vuex'
  import  AppplayDialog from "../dialog/AppplayDialog.vue"
  import { startFlow } from "@/api/webapi-flow";
  import {
  getProject,
  getAll,
  addCollection,
  addCollectionList,
  getTender
} from "@/api/webapi-fin.js";
  export default {
    components: {
      AppplayDialog
    },
    props: {},
    //生命周期函数节点
    created() {
      this.networkGetCascaderByCode('TYPE-042').then(item => {
        this.bidPart = item
      })
      this.networkGetSelectByCode('TYPE-041').then(item => {
        this.bidModality = item
      })
    },
    mounted() {
      this.form = this.$myfunction.copyData(this.item)
    },
    watch: {
      'form.istenderbond': function (newValue) {
        if (newValue === false) {
          this.form.tenderbondsum = ''
          this.form.tbbegindateTime = ''
        }
      }
    },
    computed: {
      ...mapState('bidManager', {
        item: 'item'
      })
    },
    //数据节点
    data() {
      return {
        readonly: true,
        form: {
          formtenderkeyid: '',
          tendererkeyid: '',
          formtendername: '',
          tenderername: '',
          istenderbond: '',
          tenderbondsum: '',
          tbbegindateTime: '',
        },
        formRules: {},
        bidModality: [],
        bidPart: [],
      }
    },

    //自定义函数节点
    methods: {
      ...mapActions('loadType', {
        networkGetSelectByCode: 'networkGetSelectByCode',
        networkGetCascaderByCode: 'networkGetCascaderByCode',
      }),
        ...mapMutations('bidManager',{
          updateItem:'updateItem'
        }),
      networkGetDataByItemId() {
        getBidRecordByKeyid({keyid: this.item.keyid}).then(item => {
          this.form = item.data[0]
          this.updateItem(this.$myfunction.copyData(item.data[0]))
        })
      },
      submitForm() {
        upBidRecord(this.form).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataByItemId()
          }
          this.readonly = true
        })
      },
      appPlay()
      {
        this.$refs.depoRef.openDialog({applyType:'app'});
      },
      async depApply(data) {
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
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
