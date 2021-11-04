<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" label-width="100px">
        <el-row :gutter="3">
          <el-col :span="7">
            <el-form-item label="姓名" prop="personName">
              <rea-query-input
              v-model="form.personName"
              url="hr/basicinfo/autofindwhere"
              filter-obj="{}"
              filter-key="contextname"
              @getObject="
                item => {
                  this.projectPersonKeyid = item.keyid;
                }
              "
            ></rea-query-input>
            </el-form-item>
            <el-form-item label="人员类型" prop="personType">
              <rea-select v-model="form.personType" :data="loadData.personTypeList"></rea-select>
            </el-form-item>
            <el-form-item label="组织" prop="orgName">
              <rea-cascader v-model="form.orgName" :data="loadData.organizeList" prop="keyid" label="label"
                            checkStrictly @getObject="item=>{form.orgId=item.keyid}"></rea-cascader>
            </el-form-item>
            <el-form-item label="岗位" prop="postName">
              <rea-select :key="postKey" v-model="form.postName"
                          :data="loadData.positionList"
                          :filter="{orgId:this.form.orgId}"
                          label="posName"
                          prop="keyid"></rea-select>
            </el-form-item>
            <el-form-item label="执业类型" prop="practiceList">
               <el-cascader v-model="form.practiceList" ref="ptype" :options="Nomalytpe" :props="{value:'keyid',expandTrigger:'hover',label:'label'}" clearable  :show-all-levels="false"  @change="ptypeclick">
              </el-cascader>
            </el-form-item>
            <el-form-item label="性别" prop="gender" label-width="115px">
              <com-truefalse v-model="form.gender" true-title="男" false-title="女"></com-truefalse>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="年龄" prop="age" label-width="115px">
              <com-numberscope v-model="form.age"></com-numberscope>
            </el-form-item>
            <el-form-item label="工龄" prop="workYears" label-width="115px">
              <com-numberscope v-model="form.workYears"></com-numberscope>
            </el-form-item>
            <el-form-item label="学历" prop="maxEducation" label-width="115px">
              <el-select v-model="form.maxEducation" placeholder="请选择">
                  <el-option
                  v-for="item in loadData.educationList"
                  :key="item.keyid"
                  :label="item.listname"
                  :value="item.listname">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职称级别" prop="titleLevel" label-width="115px">
              <rea-select v-model="form.titleLevel" :data="loadData.titleLevelList"></rea-select>
            </el-form-item>
            <el-form-item label="职称类别" prop="titleType" label-width="115px">
              <rea-select v-model="form.titleType" :data="loadData.titleTypeList"></rea-select>
            </el-form-item>
            <el-form-item label="是否有荣誉" prop="ishonor" label-width="170px">
              <el-radio v-model="form.ishonor" label="true">是</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否有退休证" prop="isretirement" label-width="170px">
              <el-radio v-model="form.isretirement" label="true">是</el-radio>
            </el-form-item>
            <el-form-item label="身份证状态" prop="isIDCard" label-width="170px">
              <el-radio-group v-model="form.isIDCard">
                <el-radio :label="true">有效</el-radio>
                <el-radio :label="false">无效</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="劳动合同状态" prop="isLaborContractEffective" label-width="170px">
              <el-radio-group v-model="form.isLaborContractEffective">
                <el-radio :label="true">有效</el-radio>
                <el-radio :label="false">无效</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="劳务合同状态" prop="isLabourServiceContractEffective" label-width="170px">
              <el-radio-group v-model="form.isLabourServiceContractEffective">
                <el-radio :label="true">有效</el-radio>
                <el-radio :label="false">无效</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否购买其他保险" prop="isBuyOtherInsurance" label-width="170px">
              <el-radio v-model="form.isBuyOtherInsurance" label="true">是</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <dialog-button ok-btn="筛 选" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="dialogClose"
                     @resetBtn="resetForm"></dialog-button>
    </el-dialog>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  const {mapGetters, mapActions} = createNamespacedHelpers('loadType')

  export default {
    props: {
      title: '',
      width: '',
    },
    computed: {
      ...mapGetters({
        loadData: 'loadHrType',
        Nomalytpe:'Nomalytpe'
      })
    },
    watch: {
    },
    mounted() {
    },
    data() {
      return {
        dialogVisible: false,
        postKey:1,
        projectPersonKeyid:'',
        form: {
          personName:'',
          personType:'',
          orgName:'',
          postName:'',
          practiceList:[],
          gender:'',
          age:[],
          workYears:[],
          maxEducation:'',
          titleLevel:'',
          titleType:'',
          ishonor:'',
          isretirement:'',
          isIDCard:'',
          isLaborContractEffective:'',
          isLabourServiceContractEffective:'',
          isBuyOtherInsurance:''
        },
      }
    },
    created() {
       this.networkGetCascaderNomalData("TYPE-005");
    },
    methods: {
      ...mapActions({
        networkGetCascaderNomalData:'networkGetCascaderNomalData'
      }),
      ptypeclick()
      {
        let pdata=this.$refs.ptype.getCheckedNodes();
      },
      getPostList(value) {
        return this.loadData.positionList.filter(item => {
          if (item.orgId === value) return item
        })
      },
      //关闭对话框
      dialogClose() {
        this.dialogVisible = false
      },
      //打开对话框
      openDialog() {
        this.dialogVisible = true
      },
      //重置表单
      resetForm() {
        this.form=this.$options.data().form
        this.postKey=new Date().getTime()
      },
      submitFormData() {
        this.$emit('getFormData', this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
    }
  }
</script>

<style scoped>

  .btn-right {
    float: right;
    margin-right: 0px !important;
  }
</style>
