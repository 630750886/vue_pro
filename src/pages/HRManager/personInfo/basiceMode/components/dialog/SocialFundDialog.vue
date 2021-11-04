<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="dialogWidth" @close="close" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width=" 0.674rem">
        <el-row>
          <el-col :span="12">
            <el-form-item label="年" prop="year">
              <el-date-picker
                      v-model="form.year"
                      type="year"
                      value-format="yyyy"
                      placeholder="选择年">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="月" prop="month">
              <el-date-picker
                      v-model="form.month"
                      type="month"
                      format="M"
                      value-format="M"
                      placeholder="选择月">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="是否缴纳" prop="isPayment" label-width="80px">
          <el-radio-group v-model="form.isPayment">
            <el-radio label="已缴纳">已缴纳</el-radio>
            <el-radio label="未缴纳">未缴纳</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="close"></dialog-button>
    </el-dialog>

  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件

  export default {
    components: {
    },
    props: {
      title:'',
      dialogWidth:'',
      userId:'',
      updateData: {
        type: Object,
        default: () => {
          return {
            year: '',
            month: '',
            isPayment: '',
          }
        }
      }
    },
    watch: {
      updateData () {
        this.form = this.updateData
      },
      userId(){
        this.$set(this.form,'userId',this.userId)
      }
    },
    //数据节点
    data () {
      return {
        dialogVisible:false,
        form: this.updateData,
        formRules: {
          year: [
            {
              required: true,
              trigger: 'blur'
            }
          ],
          month: [
            {
              required: true,
              trigger: 'blur'
            }
          ],
          isPayment: [
            {
              required: true,
              trigger: 'blur'
            }
          ],

        }
      }
    },
    //生命周期函数节点
    created () {
    },
    //自定义函数节点
    methods: {
      submitFormData () {
        this.$refs.formRef.validate(valid => {
          if (!valid) return
          this.$set(this.form,'userId',this.userId)
          this.$emit('getFormData',this.$myfunction.copyData(this.form))
          this.close()
        })
      },
      close () {
        this.dialogVisible=false
        this.$refs.formRef.resetFields()
      },
      openDialog(){
        this.dialogVisible=true
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
