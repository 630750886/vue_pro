<template>
  <div style="width: auto;display:inline-block;margin-left: 10px;margin-right: 10px">
    <el-button type="text" @click="$refs.infoRef.openDialog()">{{title}}</el-button>
    <info-dialog ref="infoRef" :title="title" width="30%" @getFormData="submitFormData"></info-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import InfoDialog from './dialog/InfoDialog.vue'
  export default {
    components: {
      InfoDialog
    },
    /**
     * title 按钮名称，对话框标题
     * dinCode 钉钉编号，String 一个钉钉号，Array 多个钉钉号的数组
     * personId 人员信息编号，String 一个钉钉号，Array 多个钉钉号的数组
     * userId 用户信息编号，String 一个钉钉号，Array 多个钉钉号的数组
     */
    props: {
      title:{
        type:String,
        default:'工作提醒'
      },
      dinCode:[String,Array],
      personId:[String,Array],
      userId:[String,Array],
    },
    //生命周期函数节点
    created() {
      if (this.userId) {
        if (this.userId.length > 0) {
          if (Array.isArray(this.userId)) {
            this.userId.forEach(item=>{
              this.javaHttp('/sys/sysuser/findwhere',{keyid:item}).then(user=>{
                this.dinList.push(user.data[0].dingTalkkeyid)
              })
            })
          }else {
            this.javaHttp('/sys/sysuser/findwhere',{keyid:this.userId}).then(item=>{
              this.dinList.push(item.data[0].dingTalkkeyid)
            })
          }
        }
      }
      if (this.dinCode) {

        if (this.dinCode.length>0) {
          if (Array.isArray(this.dinCode)) {
            this.dinList=this.dinCode
          }else {
            this.dinList.push(this.dinCode)
          }
        }
      }
    },
    mounted() {
    },
    watch: {},
    //数据节点
    data() {
      return {
        dinList:[]
      }
    },

    //自定义函数节点
    methods: {
      submitFormData(data){
        let formData=data.info
        if (this.personId) {

          if (this.personId.length > 0) {
            if (Array.isArray(this.personId)) {
              this.sendOutRemind({userList:this.personId,message:formData})
            }else {
              let personList=[]
              personList.push(this.personId)
              this.sendOutRemind({userList:personList,message:formData})
            }
          }

        }
        if (this.dinList) {
          if (this.dinList.length > 0) {
            this.sendOutRemind({dinList:this.dinList,message:formData})
          }
        }

      }
    }
  }
</script>
<style lang='less' scoped>

</style>
