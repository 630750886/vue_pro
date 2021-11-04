<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" width="30%"
               @close="dialogClose" :close-on-click-modal="false">
      <el-checkbox-group v-model="checkList">
        <span style="margin: 5px 10px" v-for="item in checkData" :key="item.keyid">
          <el-checkbox :label="item.keyid">{{item.name}}</el-checkbox>
        </span>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <dialog-button resetBtn="false" :cancelBtn="{show:false}" @okBtn="submitForm" ok-btn="下载" @cancelBtn="dialogClose()"></dialog-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import DialogButton from "../button/DialogButton.vue";
  import {GetHttp} from "../../../../../utils/http.js";

  export default {//组件里面data必须写函数，而且要有返回值return
    props: {
      title: '',
      width: '',
    },
    data() {
      return {
        dialogVisible:false,
        checkList:[],
        checkData:[]
      }
    },
    methods: {
      openDialog() {
        this.checkData=[]
        this.checkList=[]
        GetHttp("java_post","systypelist/findbycode","post",{code:'TYPE-314'}).then(res => {
          let result={}
          res.data.forEach(item => {
            result={
              keyid:item.keyid,
              name:item.listname
            }
            this.checkData.push(result)
          })
        })
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
      },
      submitForm() {
        this.$emit('getFormData',this.$myfunction.copyData(this.checkList))
        this.dialogClose()
      },
    },
    components: {
      DialogButton,
    },
    //生命周期
    created() {
    },
    computed: {},

  }
</script>

<style lang="less" scoped>

</style>
