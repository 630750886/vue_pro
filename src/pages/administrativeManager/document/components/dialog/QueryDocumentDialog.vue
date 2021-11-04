<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="70px">
        <el-form-item label="名称" prop="documentName">
          <el-autocomplete
            class="inline-input"
            v-model="form.documentName"
            :fetch-suggestions="querySearch"
            placeholder="请输入内名称"
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
        <el-form-item label="编号"  prop="documentCode">
          <el-input v-model="form.documentCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="类型"  prop="fileTypeKeyId">
          <el-select v-model="form.fileTypeKeyId" placeholder="请选择">
            <el-option
                v-for="item in TypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容摘要"  prop="documentDesc">
          <el-input v-model="form.documentDesc" clearable></el-input>
        </el-form-item>
        <el-form-item label="日期"  prop="dateTime">
          <rea-datescope
              v-model="form.dateTime"
              value-type="array"
          ></rea-datescope>
        </el-form-item>
      </el-form>
      <dialog-button :cancelBtn="{show:false}" ok-btn="筛 选" resetBtn="true"  @resetBtn="resetForm" @okBtn="submitFormData" @cancelBtn="dialogClose()"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import DialogButton from '../../../acomponents/DialogButton.vue'
  import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue'
  import QueryInput from "../../../acomponents/QueryInput.vue"
  import DatePickerScope from "../../../acomponents/DatePickerScope.vue"
  import {getTypeListByCode} from "@/api/webapi-sys.js"
  export default {
    components: {
      QueryInput,
      DialogButton,
      ElSelectTemplate,
      DatePickerScope
    },
    props: {
      title: '',
      activeName:{
        type: String,
      },
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
    computed:{
      TypeList() {
       switch (this.activeName) {
         case "1":
           return this.documentType1;
           break
         case "2":
           return this.documentType2;
           break
         case "3":
           return this.MeetType;
           break
         case "4":
           return this.RegulationType;
           break

       }
      }
    },
    //数据节点
    data() {
      return {
        documentType1:[],
        documentType2:[],
        MeetType:[],
        RegulationType:[],
        dialogVisible: false,
        //表单对象
        form: {
          documentName:"",//名称
          documentCode:"",// 编号
          fileTypeKeyId:"",//类型
          documentDesc:"",//内容摘要
          dateTime:[]//日期
        },
        //表单验证规则
        formRules: {
        },

      }
    },
    //生命周期函数节点
    created() {
      this.getalldocument();
      getTypeListByCode({code:"TYPE-300"}).then(res => {
        res.data.forEach(list => {
          let obj={}
          obj={id:list.keyid,name:list.listname}
          this.documentType1.push(obj)
        })
      })
      getTypeListByCode({code:"TYPE-301"}).then(res => {
        res.data.forEach(list => {
          let obj={}
          obj={id:list.keyid,name:list.listname}
          this.documentType2.push(obj)
        })
      })
      getTypeListByCode({code:"TYPE-302"}).then(res => {
        res.data.forEach(list => {
          let obj={}
          obj={id:list.keyid,name:list.listname}
          this.MeetType.push(obj)
        })
      })
      getTypeListByCode({code:"TYPE-303"}).then(res => {
        res.data.forEach(list => {
          let obj={}
          obj={id:list.keyid,name:list.listname}
          this.RegulationType.push(obj)
        })
      })
    },
    //自定义函数节点
    methods: {
      getalldocument()
      {
        this.javaHttp("xz/DocumentInfo/autofindwhere",{documentName:""}).then(reqdata=>{
            this.session.setItem("auto_document", reqdata.data);
        });
      },
      querySearch(queryString, cb) {
        console.log(queryString);
        var restaurants=this.session.getItem("auto_document");
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
        this.form.documentName=item.contextname;
      },
      handleIconClick(ev) {
              console.log(ev);
            },
       resetForm(){
         this.$refs.formRef.resetFields();
       },
      dialogClose() {
        this.dialogVisible = false
        this.$refs.formRef.resetFields()
      },
      submitFormData() {
        this.$refs.formRef.validate(valid => {
          if (!valid) return
          this.$emit('SearchFormData', this.$myfunction.copyData(this.form))
          this.form={}
          this.dialogClose()
        })
      },
      openDialog() {
        this.dialogVisible = true
      }
    }
  }
</script>
<style lang='less' scoped>
  .btn-right {
    float: right;
    margin-right: 0 !important;
  }
</style>
