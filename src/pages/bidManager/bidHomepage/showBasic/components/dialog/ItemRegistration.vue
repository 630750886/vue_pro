<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
       v-if="dialogVisible"
      width="70%"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="120px"
      >
      <el-row>
      <el-col :span="12">
        <div>
              <el-form-item label="项目名称">
          <el-input v-model="form.projectname"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label="业务类型" prop="businessType">
              <rea-select
                v-model="form.vocationaltypekeyid"
                :data="businessType"
                @getLabel="
                  item => {
                    form.vocationaltypename = item;
                  }
                "
              ></rea-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="businessTypeList" label-width="0">
              <rea-select
                v-if="
                  form.vocationaltypekeyid ===
                    '402880fa74c3492d0174d98cf77a0046'
                "
                v-model="vocationaltypekeyid"
                :data="
                  businessType.filter((item, index) => {
                    return index < 5;
                  })
                "
                multiple
                @getLabel="
                  item => {
                    vocationaltypename = item;
                  }
                "
              ></rea-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="项目业主">
          <el-autocomplete
            class="inline-input"
            v-model="form.proprietor"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容业主"
            :trigger-on-focus="false"
            @select="handleSelecta"
          >
          <i
            class="el-icon-edit el-input__icon"
            slot="suffix"
            @click="handleIconClick">
          </i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.contextname }}</div>
            <span class="addr">{{ item.address }}</span>
          </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="招标人" prop="tenderee">
          <el-autocomplete
            class="inline-input"
            v-model="form.tenderee"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容业主招标人"
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
            <span class="addr">{{ item.address }}</span>
          </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label=" 负责人">
          <el-input v-model="form.tendereeleading"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.tendereeleadingphone"></el-input>
        </el-form-item>
         <el-form-item label="是否进交易中心" prop="accesstradingcentre">
          <com-truefalse v-model="form.accesstradingcentre"></com-truefalse>
        </el-form-item>
        <el-form-item
          v-if="form.accesstradingcentre"
          label="交易中心名称"
        >
        <el-autocomplete
            class="inline-input"
            v-model="form.tradingcentrename"
            :fetch-suggestions="querySearchplat"
            placeholder="交易中心名称"
            :trigger-on-focus="false"
            @select="handleSelectplat"
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
        <el-form-item label="开标地点">
          <el-input v-model="form.placebidopening"></el-input>
        </el-form-item>
        <el-form-item label="报名时间">
          <rea-datescope
            value-type="array"
            v-model="dateScope"
            type="datetimerange"
          ></rea-datescope>
        </el-form-item>
        <!--
          <el-form-item label="报名延期">
            <rea-datepicker
              v-model="form.applicantdelaydateTime"
              type="datetime"
            ></rea-datepicker>
          </el-form-item>
        -->
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
        </div>
      </el-col>
      <el-col :span="12">
        <div>
           <el-form-item label="招标代理机构">
          <el-input v-model="form.biddingagency"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="form.biddingagencyleading"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.biddingagencyleadingphone"></el-input>
        </el-form-item>
        <el-form-item label="网站截图上传">
          <upload-button
            v-model="form.webimgfile"
            module-type="tb"
            file-name="网站截图上传"
            :base-id="form.keyid"
          ></upload-button>
        </el-form-item>
        <el-form-item label="网站链接">
          <el-input v-model="form.weburladdress"></el-input>
        </el-form-item>
        <el-form-item label="开标时间">
          <rea-datepicker
            v-model="form.bidopeningdateTime"
            type="datetime"
          ></rea-datepicker>
        </el-form-item>
        <el-form-item label="招标文件">
          <upload-button
            v-model="form.tenderfile"
            module-type="tb"
            file-name="招标文件"
            :base-id="form.keyid"
          ></upload-button>
        </el-form-item>
          <el-row>
          <el-col :span="10">
            <el-form-item label="是否需要答辩">
              <com-truefalse v-model="form.isrejoin"></com-truefalse>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item v-if="form.isrejoin" label="答辩人员">
              <rea-query-input
                v-model="form.rejoinperson"
                url="hr/basicinfo/autofindwhere"
                filter-obj="{}"
                unmatched
                filter-key="contextname"
              ></rea-query-input>
            </el-form-item>
          </el-col>
        </el-row>
        </div>
      <el-form-item label="报名人">
          <el-input v-model="form.applicant"></el-input>
        </el-form-item>
      <el-form-item label="报名时间">
        <rea-datepicker v-model="form.applicantdatetime"></rea-datepicker>
        </el-form-item>
      <el-form-item label="文件费(元)">
         <el-input-number v-model="form.applicantsum" :max="90000" :controls="false"></el-input-number>
        </el-form-item>
         <el-form-item label="是否缴保证金">
            <com-truefalse v-model="form.istenderbond"></com-truefalse>
          </el-form-item>
          <template v-if="form.istenderbond">
                  <el-form-item label="保证金(元)">
                    <el-col :span="16">
                      <el-input-number v-model="form.tenderbondsum" :max="900000" :controls="false"></el-input-number>
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
    </el-row>
        <rea-divider title="招标文件澄清及修改"></rea-divider>
        <files-table-template
          v-model="form.tenderfileclarification"
        ></files-table-template>
        <rea-divider></rea-divider>
        <rea-divider title="招标文件分析"></rea-divider>
        <el-form-item label="人员分析">
          <rea-textarea v-model="form.personanalyse"></rea-textarea>
        </el-form-item>
        <el-form-item label="业绩分析">
          <rea-textarea v-model="form.achievementanalyse"></rea-textarea>
        </el-form-item>
        <el-form-item label="行政分析">
          <rea-textarea v-model="form.administrationanalyse"></rea-textarea>
        </el-form-item>
        <el-form-item label="重点分析">
          <rea-textarea v-model="form.keypointanalyse"></rea-textarea>
        </el-form-item>
      </el-form>
      <dialog-button
        reset-btn="false"
        ok-btn="确 定"
        :cancelBtn="{show:false}"
        @okBtn="submitForm"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import FilesTableTemplate from "../../../../acomponents/FilesTableTemplate.vue";
import {getfindbycodeurladdress} from "@/api/webapi-sys.js"
import { mapActions } from "vuex";

export default {
  components: {
    FilesTableTemplate
  },
  props: {
    title: { type: String },
    width: { type: String },
    labelWidth: {
      type: String,
      default: "130px"
    }
  },
  watch: {
    "form.vocationaltypekeyid": function(newValue) {
      this.vocationaltypekeyid = "";
      this.vocationaltypename = "";
    },
    "form.accesstradingcentre": function(newValue) {
      if (!newValue) {
        this.form.tradingcentrename = "";
      }
    },
    "form.isrejoin": function(newValue) {
      if (newValue === false) {
        this.form.rejoinperson = "";
      }
    },
    proprietoridA(newValue) {
      if (
        !this.$myfunction.isEmpty(newValue) ||
        !this.$myfunction.isEmpty(this.proprietoridB)
      ) {
        this.form.existingclients = true;
      } else {
        this.form.existingclients = false;
      }
    },
    proprietoridB(newValue) {
      if (
        !this.$myfunction.isEmpty(newValue) ||
        !this.$myfunction.isEmpty(this.proprietoridA)
      ) {
        this.form.existingclients = true;
      } else {
        this.form.existingclients = false;
      }
    },
    dateScope(newValue) {
      if (!this.$myfunction.isEmpty(newValue)) {
        this.form.applicantbegindatetime = newValue[0];
        this.form.applicantenddatetime = newValue[1];
      }
    },
    "form.applicantdelaydateTime": function(newValue) {
      //this.form.applicantenddatetime=newValue
    },
    "form.proprietor": function(newValue) {
      if (this.$myfunction.isEmpty(newValue)) {
        this.proprietoridA = "";
      }
    },
    "form.tenderee": function(newValue) {
      if (this.$myfunction.isEmpty(newValue)) {
        this.proprietoridB = "";
      }
    }
  },
  //数据节点
  data() {
    return {
      dialogVisible: false,
      currexistingclients:false,
      dateScope: [], //报名时间
      proprietoridA: "", //业主id
      proprietoridB: "", //招标
      vocationaltypekeyid: "",
      vocationaltypename: "",
      form: {
        projectname: "",
        proprietor: "",
        tenderee: "",
        tendereeleading: "",
        tendereeleadingphone: "",
        biddingagency: "",
        biddingagencyleading: "",
        biddingagencyleadingphone: "",
        webimgfile: "",
        weburladdress: "",
        accesstradingcentre: "",
        tradingcentrename: "",
        placebidopening: "",
        applicantdelaydateTime: "",
        bidopeningdateTime: "",
        tenderfile: "",
        tenderfileclarification: [],
        personanalyse: "",
        tbbegindateTime:"",
        achievementanalyse: "",
        administrationanalyse: "",
        keypointanalyse: "",
        isrejoin: "",
        rejoinperson: "",
        vocationaltypekeyid: "",
        existingclients:false
      },
      formRules: {},
      bidModality: [],
      businessType: [],
      bidPart: [],
      selectcosume:[],
      urladdress:''
    };
  },
  //生命周期函数节点
  created() {
    this.currexistingclients=false;
    this.networkGetSelectByCode("TYPE-015").then(item => {
      this.businessType = item;
    });
    /*
    this.networkGetCascaderByCode("TYPE-042").then(item => {
      this.bidPart = item;
    });
    */
    this.networkGetSelectByCode("TYPE-041").then(item => {
      this.bidModality = item;
    });
     if (this.session.getItem("auto_consumer")==null)
      {
        this.getallcocoume();
      };
    //platform
    if (this.session.getItem("platform")==null)
          {
            this.getallplat();
          };
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
    openDialog(data) {
      if (!this.$myfunction.isEmpty(data)) {
        this.form = this.$myfunction.copyData(data);
        this.form.tenderfileclarification = [];
        this.form.applicantdatetime=data.applicantdatetime;
        if (data.applicantbegindatetime !==""&&data.applicantenddatetime !=="") 
        {
          this.dateScope.push(data.applicantbegindatetime);
          this.dateScope.push(data.applicantenddatetime);
        }
        if (data.tenderfileclarification.indexOf(",") !== -1) {
          this.form.tenderfileclarification = data.tenderfileclarification.split(
            ","
          );
        } else if (!this.$myfunction.isEmpty(data.tenderfileclarification)) {
          this.form.tenderfileclarification.push(data.tenderfileclarification);
        }
      }
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.form = this.$options.data().form;
      this.dateScope = [];
    },
    submitForm() {
      let form = this.$myfunction.copyData(this.form);
      form.existingclients=this.currexistingclients;
      if (!this.$myfunction.isEmpty(this.vocationaltypekeyid)) {
        form.vocationaltypename = this.vocationaltypename;
        form.vocationaltypekeyid = this.vocationaltypekeyid;
      }
      form.tenderfileclarification = form.tenderfileclarification.join(",");
      form.existingclients=this.currexistingclients;
      this.$emit("getFormData", form);
      this.dialogClose();
      this.currexistingclients=false;
    },
    querySearch(queryString, cb) {
        console.log(queryString);
        var restaurants=this.session.getItem("auto_consumer");
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        console.log(results);
        cb(results);
      },
    createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.contextname.toLowerCase().includes(queryString.toLowerCase()));
        };
      },
      handleSelect(item) {
        this.form.tenderee=item.contextname;
        this.form.existingclients=true;
        this.currexistingclients=true;
      },
      handleSelecta(item) {
        this.form.proprietor=item.contextname;
        this.form.existingclients=true;
        this.currexistingclients=true;
      },
      handleIconClick(ev) {
        console.log(ev);
      },
    getallcocoume()
    {
      this.javaHttp("crm/consumer/autofindwhere",{customerName:""}).then(reqdata=>{
          this.selectcosume=reqdata.data;
          //console.log(this.selectcosume);
          this.session.setItem("auto_consumer", this.selectcosume);
      });
    },
    getallplat()
    {
      this.javaHttp("tender/tendertradingplatform/autofindwhere",{tradingPlatformname:""}).then(reqdata=>{
          this.selectcosume=reqdata.data;
          //console.log(this.selectcosume);
          this.session.setItem("platform", this.selectcosume);
      });
    },
    querySearchplat(queryString, cb) {
        var restaurants=this.session.getItem("platform");
        var results = queryString ? restaurants.filter(this.createFilterplat(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilterplat(queryString) {
          return (restaurant) => {
            return (restaurant.contextname.toLowerCase().includes(queryString.toLowerCase()));
          };
      },
      handleSelectplat(item) {
        this.form.tradingcentrename=item.contextname;
      }
  }
};
</script>
<style lang="less" scoped></style>
