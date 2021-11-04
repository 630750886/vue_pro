<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
       v-if="dialogVisible"
      :width="width"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="100px"
      >
        <el-row :gutter="1">
          <el-col :span="12">
            <el-form-item label="创建日期">
              <rea-datescope
                value-type="array"
                v-model="form.createddateTime"
              ></rea-datescope>
            </el-form-item>
            <el-form-item label="创建人">
              <rea-query-input
                v-model="form.syscreatepersonname"
                url="hr/basicinfo/autofindwhere"
                filter-key="contextname"
                @getObject="
                  item => {
                    form.syscreatepersonid = item.keyid;
                  }
                "
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="报名时间">
              <rea-datescope
                value-type="array"
                v-model="form.applicantdatetime"
              ></rea-datescope>
            </el-form-item>
            <el-form-item label="是否需要答辩">
              <el-radio v-model="form.isrejoin" label="true">是</el-radio>
            </el-form-item>
            <el-form-item label="是否进交易中心">
              <el-radio v-model="form.accesstradingcentre" label="true">是</el-radio>
            </el-form-item>
            <el-form-item label="负责人">
              <rea-query-input
                v-model="form.biddingleading"
                url="tender/tenderinfo/autofindleading"
                filter-key="contextname"
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="是否缴保证金">
              <el-radio v-model="form.isdeposit" label="true">是</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称">
              <el-autocomplete
            class="inline-input"
            style="width:85%"
            v-model="form.projectname"
            :fetch-suggestions="querySearch"
            placeholder="请输入项目名称"
            :trigger-on-focus="false"
            @select="handleSelect"
          >
          <i
            class="el-icon-edit el-input__icon"
            slot="suffix"
            @click="handleIconClick">
          </i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.contextname }}</div>
          </template>
          </el-autocomplete>
            </el-form-item>
            <el-form-item label="业务类型">
              <rea-select
                :multiple="false"
                v-model="form.vocationaltypekeyid"
                :data="businessType"
              ></rea-select>
            </el-form-item>
            <el-form-item label="开标时间">
              <rea-datescope
                value-type="array"
                v-model="form.begindateTime"
              ></rea-datescope>
            </el-form-item>
            <el-form-item label="投标形式">
               <el-select v-model="form.formtenderkeyid" placeholder="请选择" @change="getsealType">
                  <el-option
                  v-for="item in bidModality"
                  :key="item.keyid"
                  :label="item.listname"
                  :value="item.keyid">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="投标主体">
                <el-select v-model="form.tendererkeyid" placeholder="请选择" @change="getsealType_ent">
					<el-option
					v-for="item in bidPart"
					:key="item.keyid"
					:label="item.listname"
					:value="item.keyid">
					</el-option>
				</el-select>
            </el-form-item>
            <el-form-item label="分包编号" prop="bidsectioncode">
              <el-input
                v-model="form.bidsectioncode"
              ></el-input>
            </el-form-item>
            <el-form-item label="保证金(元)" prop="tenderbondsum">
              <el-row>
                <el-col :span="10"><el-input-number v-model="form.tenderbondsum[0]"  :max="900000000" :controls="false" style="width:90%"></el-input-number>
                </el-col>
                <el-col :span="2">-</el-col>
                <el-col :span="10">
                  <el-input-number v-model="form.tenderbondsum[1]" :max="900000000" :controls="false" style="width:90%"></el-input-number>
                  </el-col>
              </el-row>
              
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <dialog-button
        reset-btn="重 置"
        ok-btn="筛 选"
        :cancelBtn="{show:false}"
        @resetBtn="resetForm"
        @okBtn="submitForm"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import { mapActions } from "vuex";
import {getfindbycodeurladdress} from "@/api/webapi-sys.js"
export default {
  components: {},
  props: {
    title: { type: String },
    width: { type: String },
    labelWidth: {
      type: String,
      default: "130px"
    }
  },
  watch: {},
  //数据节点
  data() {
    return {
      dialogVisible: false,
      form: {
        createddateTime:[], //创建日期
        applicantdatetime:[],//报名时间
        syscreatepersonname: "", //创建人
        accesstradingcentre:"",//是否进交易中心
        isrejoin: "", //是否需要答辩
        biddingleading: "", //负责人
        isdeposit: "", //是否需要缴纳保证金
        projectname: "", //项目名称
        vocationaltypekeyid:"", //业务类型
        begindateTime:[], //开标时间
        formtenderkeyid: "", //投标形式
        tendererkeyid: "", //投标主体
        bidsectioncode:"",
        tenderbondsum:[]
      },
      formRules: {},
      bidModality: [],
      businessType: [],
      bidPart: []
    };
  },
  //生命周期函数节点
  created() {
    this.networkGetSelectByCode("TYPE-015").then(item => {
      this.businessType = item;
      this.businessType.splice(item.length - 1, 1);
    });
    /*
    this.networkGetSelectByCode("TYPE-042").then(item => {
      this.bidPart = item;
    });
    */
    this.networkGetSelectByCode("TYPE-041").then(item => {
      this.bidModality = item;
    });
  },
  //自定义函数节点
  methods: {
    getsealType(data){
        let ditem= this.bidModality.find((item,index)=>{
          if(item.keyid=== data){
          return item;
        }
          })
        this.form.formtenderkeyid=ditem.keyid;
        this.form.formtendername=ditem.listname;
        getfindbycodeurladdress({code:"TYPE-042",urladdress:ditem.urladdress}).then(item=>{
          this.bidPart = item.data;
        });
        },
    getsealType_ent(data){
        let ditem= this.bidPart.find((item,index)=>{
          if(item.keyid=== data){
          return item;
        }
          })
        this.form.tendererkeyid=ditem.keyid;
        this.form.tenderername=ditem.listname;
        },
    ...mapActions("loadType", {
      networkGetSelectByCode: "networkGetSelectByCode",
      networkGetCascaderByCode: "networkGetCascaderByCode"
    }),
    openDialog() {
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
    },
    submitForm() {
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    },
    resetForm() {
      this.form = this.$options.data().form;
    },
      querySearch(queryString, cb) {
        this.javaHttp("tender/tenderinfo/autofindwhereall",{projectname:"",allstatuscode:"0"}).then(reqdata=>{
              this.selectcosume=reqdata.data;
              //console.log(this.selectcosume);
               var restaurants=reqdata.data;
               var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
               cb(results);
          });
      },
      createFilter(queryString) {
          return (restaurant) => {
            return (restaurant.contextname.toLowerCase().includes(queryString.toLowerCase()));
          };
      },
      handleSelect(item) {
        this.form.projectname=item.contextname;
      },
    handleIconClick(ev) {
        console.log(ev);
      },

  }
};
</script>
<style lang="less" scoped></style>
