<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="45px">
				<el-form-item label="">
					<rea-datepicker v-model="time"></rea-datepicker>
				</el-form-item>
      </el-form>
      <dialog-button reset-btn="false" ok-btn="保 存" :cancelBtn="{show:false}"
                     @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件

  export default {
    components: {
    },
    props: {
      title: '',
      width: '',
      labelWidth: {
        type: String,
        default: '130px'
      },
    },
    watch: {},
    //数据节点
    data() {
      return {
        activeName:'1',
        dialogVisible: false,
        time:'',
        form:{
          year:'',
          month:'',
          day:'',
        },
        formRules:{},

      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data) {
        this.dialogVisible = true
				if (!this.$myfunction.isEmpty(data)) {
				  this.form=this.$myfunction.copyData(data)
				}
      },
      dialogClose() {
        this.dialogVisible = false
				this.time=this.$options.data().time
      },
      submitForm() {
        if (this.time !== '') {
          let arr=this.time.split('/')
          let ref={
            year:arr[0],
            month:arr[1],
            day:arr[2],
          }
          this.$emit('getFormData',this.$myfunction.copyData(ref))
          this.dialogClose()
				}else {
          this.$msgbox.alert('时间不能为空')
				}

      },
    }
  }
</script>
<style lang='less' scoped>

</style>
