<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" @close="addDialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
        <el-form-item label="姓名" prop="personName">
          <el-input v-model="form.personName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="form.idCard" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" :disabled="true"></el-input>
        </el-form-item>
        <rea-divider title="调整岗位" position="center"></rea-divider>
        <el-form-item label="所属组织" prop="orgId">
          <rea-cascader v-model="form.orgId"
                        :data="loadData.organizeList"
                        @getObject="item=>{form.orgName=item.label}"
                        prop="keyid" label="label" checkStrictly></rea-cascader>
        </el-form-item>
        <el-form-item label="岗位名称" prop="posId">
          <rea-select v-model="form.posId"
                      :data="getPostList(form.orgId)"
                      @getLabel="item=>{form.posName=item}"
                      prop="keyid"
                      label="posName"></rea-select>
        </el-form-item>
      </el-form>
      <dialog-button :resetBtn="{show:false}" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="addDialogClose"></dialog-button>
    </el-dialog>

  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件


  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('loadType')

  export default {
    components: {

    },
    computed:{
        ...mapGetters({
          loadData:'loadHrType'
        })
    },
    props: {
      title: '',
    },
    watch: {
      'form.idCard':function (newValue) {
        this.form.birthday=this.$myfunction.getBirthdayAndAge(newValue).birthday
        this.form.age=this.$myfunction.getBirthdayAndAge(newValue).age
      },
      'form.orgId':function (newValue) {
        this.form.postId=''
      },
    },
    //数据节点
    data() {
      const IDCard = (rule, value, cb) => {
        //验证的正则表达式
        const regIDCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

        if (regIDCard.test(value)) {
          return cb()
        }
        cb(new Error('请输入合法身份证号码'))
      }
      //自定义验证手机号的规则
      const checkPhone = (rule, value, cb) => {
        //验证手机号的正则表达式 ^1[0-9]{10}$
        //const regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        const regPhone = /^1[0-9]{10}$/
        if (regPhone.test(value)) {
          return cb()
        }
        cb(new Error('请输入合法的手机号'))
      }
      return {
        dialogVisible: false,
        //表单对象
        form: {
          dinCode:'',
          gender:'',
          personName: '',
          birthday:'',
          age:'',
          idCard: '',
          phone: '',
          orgId:'',
          orgName:'',
          posId:'',
          posName:'',
        },
        //表单验证规则
        formRules: {
          personName: [
            {
              required: true,
              message: '请输入名字',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 4,
              message: '长度在2～4个字符之间',
              trigger: 'blur'
            }
          ],
          idCard: [
            {
              required: true,
              message: '请输入身份证号码',
              trigger: 'blur'
            },
            {
              validator: IDCard,
              trigger: 'blur'
            }
          ],
          phone: [
            {
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              validator: checkPhone,
              trigger: 'blur'
            }
          ],
          orgId:[
            {
              required: true,
              message: '必填',
              change: 'blur'
            },
          ],
          posId:[
            {
              required: true,
              message: '必填',
              change: 'blur'
            },
          ]
        },
        options: [
          {
            value: 'zhinan',
            label: '指南',
            children: [{}]
          }
        ],
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      getPostList(value) {
        return this.loadData.positionList.filter(item => {
          if (item.orgId === value) return item
        })
      },
      addDialogClose() {
        this.dialogVisible = false
        this.$refs.formRef.resetFields()
      },
      submitFormData() {
        this.$refs.formRef.validate(valid => {
          if (!valid) return
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.addDialogClose()
        })
      },
      getStationData(data) {
        let str = ''
        if (data.length > 0) {
          data.forEach(val => {
            str = str + val + '/'
          })
        }
        this.$set(this.form, 'organize', str)
      },
      openDialog(data) {
        //数据为人员信息；
        if (data !== undefined) {
          this.form=data;
        }
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
