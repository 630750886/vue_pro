<template>
  <!--高级查询对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" :width="width" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="130px" label-position="right">
        <el-form-item label="客户名称" prop="customerName" size="medium">
          <el-autocomplete
            class="inline-input"
            v-model="form.customerName"
            :fetch-suggestions="querySearch"
            placeholder="请输入客户名称"
            :trigger-on-focus="false"
            @select="handleSelect"
          >
          <i
            class="el-icon-edit el-input__icon"
            slot="suffix"
            @click="handleIconClick">
          </i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.contextname}}</div>
          </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="联系人名称" prop="contactsName">
          <el-autocomplete
            class="inline-input"
            v-model="form.contactsName"
            :fetch-suggestions="tactquerySearch"
            placeholder="请输入联系人名称"
            :trigger-on-focus="false"
            @select="tacthandleSelect"
          >
          <i
            class="el-icon-edit el-input__icon"
            slot="suffix"
            @click="tacthandleIconClick">
          </i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.contextname }}</div>
          </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="所属省市区" prop="region">
          <el-cascader ref="casRef"  v-model="nregion" :props="regiondata" @change="handleChange" :show-all-levels="false"></el-cascader>
        </el-form-item>
        <el-form-item label="单位性质" prop="unitNature">
          <rea-select v-model="form.unitNature" :data="loadCusType.unitNature"></rea-select>
        </el-form-item>
        <el-form-item label="是否为一般纳税人" prop="isTaxpayer">
          <com-truefalse v-model="form.isTaxpayer"></com-truefalse>
        </el-form-item>
        <el-form-item label="是否有统一社会信用码" prop="isCreditCode">
          <com-truefalse v-model="form.isCreditCode"></com-truefalse>
        </el-form-item>
      </el-form>
      <dialog-button ok-btn="筛 选" :cancelBtn="{show:false}" @resetBtn="resetForm" @cancelBtn="dialogClose"
                     @okBtn="submitFormData"></dialog-button>
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
      }
    },
    watch: {},
    computed:{
        ...mapGetters({
          loadCusType:'loadCusType'
        })
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          customerName: '',
          contactsName: '',
          regionkeyid:'',
          region:'',
          unitNature:'',
          isTaxpayer:'',
          isCreditCode: '',
          serviceBusiness: '',
          addCustomYear: '',
          loseCustomYear: '',
        },
        formRules: {},
        //省市区存储对象
        nregion:[],
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
      }
    },
    //生命周期函数节点
    created() {
      if (this.session.getItem("auto_consumer")==null)
      {
        this.getallcocoume();
      }
      if (this.session.getItem("auto_consumercontacts")==null)
      {
        this.getallconscontacts();
      }
      
    },
    //自定义函数节点
    methods: {
      openDialog() {
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
      },
      submitFormData() {
        this.$emit('getFormData', this.$myfunction.copyData(this.form))
        this.$refs.formRef.resetFields();
        this.dialogClose()
      },
      resetForm() {
        //resetFields
        this.$refs.formRef.resetFields()
      },
      getallcocoume()
        {
          this.javaHttp("crm/consumer/autofindwhere",{customerName:""}).then(reqdata=>{
              //this.selectcosume=reqdata.data;
              //console.log(this.selectcosume);
              this.session.setItem("auto_consumer", reqdata.data);
          });
        },
      querySearch(queryString, cb) {
        var restaurants=this.session.getItem("auto_consumer");
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
          return (restaurant) => {
            return (restaurant.contextname.toLowerCase().includes(queryString.toLowerCase()));
          };
      },
      handleIconClick(ev) {
        console.log(ev);
      },
      handleSelect(item) {
        this.form.customerName=item.contextname;
      },
      // /crm/conscontacts/autofindwhere
      getallconscontacts()
        {
          this.javaHttp("crm/conscontacts/autofindwhere",{}).then(reqdata=>{
              //this.selectcosume=reqdata.data;
              this.session.setItem("auto_consumercontacts", reqdata.data);
          });
        },
      tactquerySearch(queryString, cb) {
        let tactrestaurants=this.session.getItem("auto_consumercontacts");
        let tactresults = queryString ? tactrestaurants.filter(this.tactcreateFilter(queryString)) : tactrestaurants;
        // 调用 callback 返回建议列表的数据
        cb(tactresults);
      },
      tactcreateFilter(queryString) {
          return (restaurant) => {
            return (restaurant.contextname.toLowerCase().includes(queryString.toLowerCase()));
          };
      },
      tacthandleIconClick(ev) {
        console.log(ev);
      },
      tacthandleSelect(item) {
        this.form.contactsName=item.contextname;
      },


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
    }
  }
</script>
<style lang='less' scoped>

</style>
