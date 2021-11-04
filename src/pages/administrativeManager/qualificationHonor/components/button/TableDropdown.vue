<template>
  <div>
    <el-dropdown @command="handleCommand">
      <el-tag>{{CheckResult_des}}<i class="el-icon-arrow-down el-icon--right"></i></el-tag>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="0">已通过</el-dropdown-item>
        <el-dropdown-item command="1">未通过</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import StatusButton from '../../../acomponents/StatusButton.vue'
  export default {
    components:{
      StatusButton
    },
    props: {
      check:{type:Number,default:0},
      checkscope: {},
    },
    //数据节点
    data() {
      return {
        data: this.checkscope
      }
    },
    //生命周期函数节点
    created() {
    },
    computed:{
       CheckResult_des:function () {
         let str1 = this.data.licenceCheckResult.toString().replace(/\s/g,"");
         let str2 = this.data.licenceCheckChangeREsult.toString().replace(/\s/g,"");
         console.log(str1+"   $$$$$$$  "+str2);
        if (this.check==0)
        {
          if (str1=="")
          {return "无状态";} 
          else if (str1=="true") {return "已通过";}
          else if (str1=="false"){return "未通过";}
          else{return ""}

        }
        else
        {
          if (str2=="") {return "无状态";}
          else if (str2=="true") return "已通过";
          else if (str2=="false"){ return "未通过";}
          else{return ""}
        }
    }
    },
    //自定义函数节点
    methods: {
      handleCommand(command) {
        if (command==="0")
        {
            if (this.check==0)
            {
                 this.data.licenceCheckResult=true;
            }
            else
            {
                 this.data.licenceCheckChangeREsult=true;
            }
        }
        else
        {
           if (this.check==0)
            {
                 this.data.licenceCheckResult=false;
            }
            else
            {
                 this.data.licenceCheckChangeREsult=false;
            }
        }
        this.$emit('click', 2, this.data)
      }
    }
  }
</script>
<style lang='less' scoped>
  .el-tag {
    margin: 0px !important;
  }
</style>
