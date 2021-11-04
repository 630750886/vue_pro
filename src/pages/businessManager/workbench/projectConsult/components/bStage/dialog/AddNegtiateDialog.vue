<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
        <el-form-item label="会商时间">
					<rea-datepicker v-model="form.negotiationsdateTime"></rea-datepicker>
				</el-form-item>
				<el-form-item label="会商主题">
					<el-input v-model="form.negotiationsTitle"></el-input>
				</el-form-item>
				<rea-divider title="谈判人"></rea-divider>
				<com-add-person v-model="form.negotiationsPersons"></com-add-person>
				<rea-divider></rea-divider>
				<el-form-item label="相关资料">
					<upload-button v-model="form.negotiationsDataFile" module-type="xm" file-name="会商相关资料" :base-id="currentItem.keyid"></upload-button>
				</el-form-item>
				<el-form-item label="图片或影像记录">
					<upload-button v-model="form.negotiationsImageVideoFile" module-type="xm" file-name="会商图片或影像记录" :base-id="currentItem.keyid"></upload-button>
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
        form:{
          negotiationsdateTime:'',
          negotiationsTitle:'',
          negotiationsPersons:[],
          negotiationsDataFile:'',
          negotiationsImageVideoFile:'',
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
          let ref=this.$myfunction.copyData(data)
          if (ref.negotiationsPersons.indexOf(',')!==-1) {
            ref.negotiationsPersons=ref.negotiationsPersons.split(',')
          }else {
            let arr=[]
            arr.push(ref.negotiationsPersons)
            ref.negotiationsPersons=arr
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
        this.form.negotiationsPersons=this.form.negotiationsPersons.join(',')
        this.$emit('getFormData',this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
