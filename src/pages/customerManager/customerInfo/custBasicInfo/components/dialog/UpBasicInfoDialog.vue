<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户名称" prop="customerName">
              <el-input v-model="form.customerName" clearable></el-input>
            </el-form-item>
            <el-form-item label="所属省市区" prop="region">
               <el-cascader ref="casRef"  v-model="nregion" :props="regiondata" @change="handleChange" :show-all-levels="false"></el-cascader>
            </el-form-item>
            <el-form-item label="是否有统一社会信用码" prop="isCreditCode" label-width="180px">
              <com-truefalse v-model="form.isCreditCode"></com-truefalse>
            </el-form-item>
            <el-form-item v-if="form.isCreditCode" label="统一社会信用代码" prop="i1" label-width="150px">
              <el-input v-model="form.creditCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位地址" prop="address">
              <el-input v-model="form.address" clearable></el-input>
            </el-form-item>
            <el-form-item label="单位性质" prop="unitNature">
              <rea-select v-model="form.unitNatureid" :data="unitNature.list" @getLabel="item=>{form.unitNature=item}"></rea-select>
            </el-form-item>
            <el-form-item label="是否为一般纳税人" prop="isTaxpayer" label-width="150px">
              <com-truefalse v-model="form.isTaxpayer"></com-truefalse>
            </el-form-item>

          </el-col>
        </el-row>
        <el-form-item label="开户行" prop="bank">
          <el-input v-model="form.bank" clearable></el-input>
        </el-form-item>
        <el-form-item label="账号" prop=" accountCode">
          <el-input v-model="form.accountCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="开票地址" prop="invoiceAddress">
          <el-input v-model="form.invoiceAddress" clearable></el-input>
        </el-form-item>
        <el-form-item label="开票电话" prop="invoicePhone">
          <el-input v-model="form.invoicePhone" clearable></el-input>
        </el-form-item>
      </el-form>
      <dialog-button :reset-btn="{show:false}" :cancelBtn="{show:false}"  @cancelBtn="dialogClose" @okBtn="submitFormData" :okBtn="{title:'保存'}">></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件

  import {createNamespacedHelpers} from 'vuex'
  import { GetHttp, GetHttp_Net } from "@/utils/http";

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('loadType')
  export default {
    components: {

    },
    props: {
      title: '',
      width: {
        type: String,
        default: '50%'
      },
    },
    watch: {
      'form.isCreditCode':function (newValue) {
        if (!newValue) {
          this.form.creditCode=''
        }
      }
    },
    computed: {
      ...mapState({
        allRegion: 'region',
        unitNature:'unitNature'
      })
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          customerName: '',
          address: '',
          region: '',
          regionkeyid: '',
          unitNatureid:'',
          unitNature: '',
          isTaxpayer: '',
          isCreditCode: '',
          creditCode: '',
          bank: '',
          accountCode: '',
          invoiceAddress: '',
          invoicePhone: '',
        },
        regiondata:{
          lazy: true,
          lazyLoad (node, resolve) {
            let that=this;
            console.log(node.level);
            let querdata={};
            if ((node.level===0))
            {
              querdata={"supercode":"00"};
            }
            else
            {
              querdata={"supercode":node.value}
            }
            setTimeout(()=>{
              GetHttp("java_post", "/sysarea/findsuper", "post",querdata).then(item => {
                if (item.code === 200) {
                  if (item.data.length>0)
                    {
                      const nodes=item.data.map(inod=>({
                          value:inod.value,
                          label: inod.label,
                          leaf: node.level>= 2
                      }));
                      resolve(nodes);
                    }
                  else{
                    this.$message.success("数据加载完成!");
                  }
                } else {
                  this.$message.success(item.message);
                }
              });
            },3000);
          }
        },
        nregion:[],
        formRules: {},
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      handleChange(){
       let nodes=this.$refs.casRef.getCheckedNodes(false)[0].pathNodes;
       this.form.regionkeyid="";
       this.form.region=""
       nodes.forEach(element => {
         this.form.regionkeyid+="/"+element.value;
         this.form.region+="/"+element.label;
       });
       //.slice(6)  split()
       this.form.regionkeyid=this.form.regionkeyid.slice(1);
       this.form.region=this.form.region.slice(1);
      },
      openDialog(data) {
        if (!this.$myfunction.isEmpty(data)) {
          this.form = this.$myfunction.copyData(data)
          this.nregion=this.form.regionkeyid.split("/");
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
      },
      submitFormData() {
        this.$emit('getFormData', this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
      resetForm() {
        this.$refs.formRef.resetFields()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
