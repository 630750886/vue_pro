<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="50%" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动名称">
              <el-input v-model="form.activityName"></el-input>
            </el-form-item>
            <el-form-item label="主办方名称">
              <el-input v-model="form.activityMain"></el-input>
            </el-form-item>

            <el-form-item label="活动规模(人)">
              <el-input style="width: 80px" v-model="form.activityPersonSum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动类型">
             <el-select v-model="activity.id" placeholder="请选择" @change="changeactivity">
                <el-option
                  v-for="item in activityType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="举办地点">
              <el-input v-model="form.activityAddress"></el-input>
            </el-form-item>
            <el-form-item label="负责人">
              <rea-query-input v-model="form.activityLeading"
                                     url="hr/basicinfo/autofindwhere"
                                     filter-obj="{}"
                                     filter-key="contextname"
                                     @getObject="item=>{form.activityLeading=item.contextname}"></rea-query-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动举办时间">
              <el-date-picker
                  v-model="form.beginDateTime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy/MM/dd"
                  format="yyyy/MM/dd">
                </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片资料">
              <upload-button
                  v-model="form.activityDocumentFile"
              ></upload-button>
            </el-form-item>

          </el-col>
        </el-row>

        <div class="divactivit">
          <div class="title">
              <span slot="label"><i class="el-icon-circle-plus-outline" @click="methassists"></i>协助人员:</span>
          </div>
           <template v-for="(item,index) in form.assists">
              <el-row :key="'ass-'+index">
                <el-col :span="10">
                  <el-form-item label="协助人员" label-width="60px">
                    <rea-query-input v-model="item.assistPersonName"
                                     url="hr/basicinfo/autofindwhere"
                                     filter-obj="{}"
                                     filter-key="contextname"
                                     @getObject="item=>{item.assistPersonName=item.contextname}"></rea-query-input>
<!--                    <el-input v-model="item.assistPersonName" placeholder="协助人员名称"></el-input>-->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="负责工作" label-width="60px">
                    <el-input v-model="item.assistPersonContant" type="textarea" placeholder="负责工作内容" :rows="1"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-form-item label="" label-width="10px">
                    <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="removeassists(index)"></el-button>
                   </el-form-item>
                </el-col>
              </el-row>
            </template>
          <div class="title">
               <span slot="label"><i class="el-icon-circle-plus-outline" @click="signcontract"></i>相关合同:</span>
          </div>
          <template v-for="(contitem,index) in form.attachFileContract">
              <el-row :key="'att-'+index">
                <el-col :span="10">
                   <el-form-item label="合同编号" prop="contractId" label-width="60px">
                    <rea-query-input
                      v-model="contitem.activityAttachCode"
                      url="/nonagr/contractbaseInfo/findall"
                      filter-obj="{}"
                      filter-key="contractCode"
                      @getObject="
                        item => {
                          contitem.activityAttachCode =item.contractCode;
                          contitem.activityAttachName = item.contractName;
                        }
                      "
                    ></rea-query-input>
              </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="合同名称" label-width="60px">
                    <el-input v-model="contitem.activityAttachName" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-form-item label="" label-width="10px">
                     <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="removesigncontract(index)"></el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
          <div class="title">
              <span slot="label"><i class="el-icon-circle-plus-outline" @click="prizeitem"></i>相关奖项:</span>
          </div>
          <template v-for="(item,index) in form.attachFilePrize">
              <el-row :key="'pri-'+index">
                <el-col :span="10">
                  <el-form-item label="奖项名称" label-width="60px">
                    <el-input v-model="item.activityAttachName" placeholder="奖项名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="奖项图片" label-width="60px">
                    <upload-button v-model="item.activityAttachFile"></upload-button>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-form-item label="" label-width="10px">
                    <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="removeprizeitem(index)"></el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
        </div>
      </el-form>
      <dialog-button resetBtn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" ok-btn="保存"  @cancelBtn="dialogClose()"></dialog-button>
    </el-dialog>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import DialogButton from '../../../acomponents/DialogButton.vue'
  import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue'
  import QueryInput from '../../../acomponents/QueryInput.vue'
  import DatePickerScope from '../../../acomponents/DatePickerScope.vue'

  export default {
    components: {
      DialogButton,
      ElSelectTemplate,
      QueryInput,
      DatePickerScope,
    },
    props: {
      title: '',
      station: {
        type: Object,
        default: () => {
          return {
            organize: [],
          }
        }
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible: false,
        numassist: 1,
        numcontract: 1,
        numprize: 1,
        //表单对象
        form: {
          keyid:'',
          activityName:'',
          activityTypeKeyId:'',
          activityTypeName:'',
          activityMain:'',
          activityAddress:'',
          beginDateTime:'',
          endDateTime:'',
          activityPersonSum:0,
          activityLeading:'',
          activityDocumentFile:'',
          activitySum:0.0,
          iscontract:false,
          isprize:false,
          assists:[],
          attachFileContract:[],
          attachFilePrize:[]
        },
        activitydate:[],
        activity:{name:"公益",id:"7"},
        //表单验证规则
        formRules: {},
        activityType:[
          {id:"1",name:"年会"},
          {id:"2",name:"旅游"},
          {id:"3",name:"拓展"},
          {id:"4",name:"节日"},
          {id:"5",name:"协会"},
          {id:"6",name:"文体"},
          {id:"7",name:"公益"},
          {id:"8",name:"其他"}
        ],
        tassists:{
          keyid:'',
          activityKeyId:'',
          assistPersonKeyId:'',
          assistPersonName:'',
          assistPersonContant:'',
          assistresults:''
        },
        tattachFile:{
          keyid:'',
          activityKeyId:'',
          activityAttachTypeKeyId:'',
          activityAttachTypeName:'',
          activityAttachCode:'',
          activityAttachName:'',
          activityAttachFile:''
        }
      }
    },
    //生命周期函数节点
    created() {

    },
    //自定义函数节点
    methods: {
      methassists()
      {
         let iassists={
          keyid:'',
          assistPersonKeyId:'',
          assistPersonName:'',
          assistPersonContant:'',
          assistresults:'',
          activityKeyId:this.form.keyid};
          this.form.assists.push(iassists);
      },
      removeassists(index)
      {
         console.log(index);
         this.form.assists.splice(index,1);
      },
      signcontract(){
         let signitem={
          keyid:'',
          activityKeyId:this.form.keyid,
          activityAttachTypeKeyId:'001',
          activityAttachTypeName:'合同',
          activityAttachCode:'',
          activityAttachName:'',
          activityAttachFile:''
         };
         this.form.attachFileContract.push(signitem);
      },
      removesigncontract(index){
         this.form.attachFileContract.splice(index,1);
      },
      prizeitem(){
        let prizeitem={
          keyid:'',
          activityKeyId:this.form.keyid,
          activityAttachTypeKeyId:'002',
          activityAttachTypeName:'奖品',
          activityAttachCode:'',
          activityAttachName:'',
          activityAttachFile:''
        };
        this.form.attachFilePrize.push(prizeitem);
      },
      removeprizeitem(index)
      {
          this.form.attachFilePrize.splice(index,1);
      },
      getactivitydate(dataScope)
      {
        console.log(dataScope.lenght);
        if (dataScope.length===2)
        {
          this.form.beginDateTime=dataScope[0];
          this.form.endDateTime=dataScope[1];
        }
      },
      dialogClose() {
        this.dialogVisible = false
        this.form=this.$options.data().form
      },
      submitFormData() {
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
      },
      changeactivity(ind)
      {
        let ditem= this.activityType.find((item,index)=>{
              if(item.id=== ind){
              return item;
            }
        });
        this.form.activityTypeName=ditem.name;
        this.form.activityTypeKeyId=ditem.id;
        this.activity.id=ditem.id;
        this.activity.name=ditem.name;
      },
      openDialog(data) {
        if (data) {
          this.form=data;
          this.activitydate=[this.form.beginDateTime,this.form.endDateTime];
          this.activity.id=this.form.activityTypeKeyId;
          this.activity.name=this.form.activityTypeName;
        }
        this.dialogVisible = true
      }
    }
  }
</script>
<style lang='less' scoped>
.divactivit{
  margin: 3px 2px 10px 2px;
  min-height: 10px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
}
  .btn-right {
    float: right;
    margin-right: 0 !important;
  }
</style>
