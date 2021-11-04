<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">

				<el-form-item label="评审时间">
					<rea-datepicker v-model="form.reviewingdateTime"></rea-datepicker>
				</el-form-item>
				<el-form-item label="评审名称">
					<el-input v-model="form.reviewingTitle"></el-input>
				</el-form-item>
				<rea-divider title="评审组织人"></rea-divider>
				<com-add-person v-model="form.reviewingPersonName"></com-add-person>
				<rea-divider></rea-divider>
				<el-form-item label="相关资料">
					<upload-button v-model="form.reviewingDatafile"
												 module-type="xm"
												 file-name="评审相关资料"
												 :base-id="currentItem.keyid"
												 ></upload-button>
				</el-form-item>
				<el-form-item label="图片或影像资料">
					<upload-button v-model="form.reviewingImageVideo" module-type="xm" file-name="评审图片或影像资料" :base-id="currentItem.keyid" ></upload-button>
				</el-form-item>
      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}"
                     @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
	import {mapState} from 'vuex'
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
			data:{},
    },
    watch: {},

    computed:{
      ...mapState('workbench', {
        currentItem: 'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
				num:1,
        form:{
          reviewingdateTime:'',
          reviewingTitle:'',
          reviewingPersonName:[],
          reviewingDatafile:'',
          reviewingImageVideo:'',
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
        if (!this.$myfunction.isEmpty(data)) {
          let ref = this.$myfunction.copyData(data)
          if (ref.reviewingPersonName.indexOf(',') !== -1) {
            ref.reviewingPersonName = ref.reviewingPersonName.split(',')
          } else {
            let arr = []
            arr.push(ref.reviewingPersonName)
            ref.reviewingPersonName = arr
          }
          this.form=this.$myfunction.copyData(ref)
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
				this.form=this.$options.data().form
      },
      submitForm() {
        this.form.reviewingPersonName=this.form.reviewingPersonName.join(',')
        this.$emit('getFormData',this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
