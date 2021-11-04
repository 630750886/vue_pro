<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
				<el-form-item label="提出异议的文件">
					<upload-button v-model="form.dissentSubmitFile"></upload-button>
				</el-form-item>
				<el-form-item label="异议回复处理">
					<rea-select v-model="form.dissentDoWay"
											prop="name"
											label="name"
											:data="[{id:1,name:'异议驳回'},{id:2,name:'异议接受'}]"></rea-select>
				</el-form-item>
				<el-form-item label="异议驳回文件">
					<upload-button v-model="form.dissentResultFile"></upload-button>
				</el-form-item>

      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}"
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
			data:{},
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible: false,
				num:1,
        form:{
          dissentSubmitFile:'',
          dissentDoWay:'',
          dissentResultFile:'',
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
          this.form=this.$myfunction.copyData(data)
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.form=this.$options.data().form
      },
      submitForm() {
        this.$emit('getFormData',this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
