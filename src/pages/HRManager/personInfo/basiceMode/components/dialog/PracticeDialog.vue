<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="dialogWidth" @close="close" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="1.618rem">
        <el-form-item label="执业类型" prop="practiceTypeid">
          <el-cascader v-model="ptypeinfo" ref="ptype" :options="Nomalytpe" :props="{value:'keyid',expandTrigger:'hover',label:'label'}" clearable  :show-all-levels="false"  @change="ptypeclick">
          </el-cascader>
        </el-form-item>
        <el-form-item label="专业一" prop="majorA">
          <el-input v-model="form.majorA"></el-input>
        </el-form-item>
        <el-form-item label="专业二" prop="majorB">
          <el-input v-model="form.majorB"></el-input>
        </el-form-item>
        <el-form-item label="初次获取时间" prop="obtainTime">
          <rea-datepicker v-model="form.obtainTime"></rea-datepicker>
        </el-form-item>
        <el-form-item label="注册有效期">
          <rea-datescope v-model="effectiveTime" value-type="array"></rea-datescope>
        </el-form-item>
        <el-form-item label="执业扫描件" prop="file">
          <upload-button v-model="form.file" module-type="hr" file-name="执业扫描件" :base-id="currentPersonId"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="close" :okBtn="{title:'新建'}"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    components: {
    },
    props: {
      title: '',
      dialogWidth: '',
    },
    watch: {
      effectiveTime(newValue) {
        this.form.startTime = newValue[0]
        this.form.endTime = newValue[1]
      }
    },
    computed: {
      ...mapGetters('loadType',{
        Nomalytpe:'Nomalytpe'
      }),
      ...mapState('hrStore',{
        currentPersonId:'currentPersonId'
      })
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        ptypeinfo:[],
        form: {
          practiceTypeid: '',
          practiceType: '',
          practiceTypeKeyid:'',
          practiceTypeName:'',
          majorA: '',
          majorB: '',
          obtainTime: '',
          startTime: '',
          endTime: '',
          file: '',
        },
        formRules: {
          practiceTypeid: [
            {
              required: true,
              message:'必填',
              change: 'blur'
            }
          ],
        },
        effectiveTime: []
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetCascaderNomalData("TYPE-005");
      this.effectiveTime.splice(0, 1, this.form.startTime)
      this.effectiveTime.splice(1, 1, this.form.endTime)
    },
    //自定义函数节点
    methods: {
      ...mapActions({
        networkGetCascaderNomalData:'loadType/networkGetCascaderNomalData'
      }),
      ptypeclick()
      {
        let pdata=this.$refs.ptype.getCheckedNodes();
        this.form.practiceTypeKeyid=pdata[0].value;
        this.form.practiceTypeName=pdata[0].label;
        this.form.practiceTypeid=pdata[0].parent.value;
        this.form.practiceType=pdata[0].parent.label;
      },
      submitFormData() {
        this.$refs.formRef.validate(valid => {
          //console.log(valid)
          if (!valid) return
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.close()
        })
      },
      close() {
        this.effectiveTime = ['', '']
        this.dialogVisible = false
        this.$refs.formRef.resetFields()
        //
      },
      openDialog(data) {
        if (!this.$myfunction.isEmpty(data)) {
          this.form = this.$myfunction.copyData(data)
        }
        this.dialogVisible = true
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
