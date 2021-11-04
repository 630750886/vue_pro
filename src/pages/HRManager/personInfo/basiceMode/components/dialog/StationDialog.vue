<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="dialogWidth" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="1.618rem">
        <station ref="stationRef" v-model="form.station"
                 :options="{organize:loadData.organizeList,position:loadData.positionList}" direction="col"></station>
      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
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
      dialogWidth: '',
      loadData: '',
      userId: '',
      updateData: {
        type: Object,
        default: () => {
          return {
            organize: '',
            stationName: ''
          }
        }
      }
    },
    watch: {
      updateData(value) {
        //console.log(value)
        this.form=value
      },
      userId(newValue) {
        this.form.userId = newValue
      }
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          userId: this.userId,
          station: '',
          posId: '',
        },
        formRules: {
          posId: [
            {
              required: true,
              message: '',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      handleOrganize(key) {
        //console.log(key)
        const _this = this
        this.allOrganize.forEach(ref => {
          if (ref.keyid === key) {
            _this.allStation = ref.children
          }
        })
      },
      submitFormData: function () {
        this.$refs.formRef.validate(valid => {
          if (!valid) return
          this.$refs.stationRef.getData()
          this.form.posId = this.$myfunction.copyData(this.form.station.position)
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
        })
      },
      dialogClose() {
        this.dialogVisible = false
        this.form=this.$options.data().form
      },
      openDialog() {
        this.dialogVisible = true
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
