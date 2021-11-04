<template>
  <div>
    <template>
      <!--<el-button v-if="power.show" type="text" size="mini" @click="$emit('btnClick',1,scope)">查看</el-button>-->
      <template v-if="btnListIndexOf('SHANG4CHUAN2SAO3MIAO2JIAN')">
        <el-dropdown v-if="scope.applytypeid!=='402880fa75fcce49017603f10b0301fd'" @command="handleCommand" trigger="click">
          <el-button type="text" size="mini">上传存档扫描附件<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <el-dropdown-menu slot="dropdown" divided>
            <template v-if="scope.applytypeid==='402880fa75fcce49017603f02bff01f9'">
              <!--<el-dropdown-item command="2">上传招聘需求申请表</el-dropdown-item>
              <el-dropdown-item command="3">上传面试登记表</el-dropdown-item>
              <el-dropdown-item command="4">上传入职登记表</el-dropdown-item>-->
              <el-dropdown-item command="2" divided>
                <upload-button v-model="upData.attachFilea"
                               module-type="hr"
                               file-name="招聘需求申请表"
                               btn-title="招聘需求申请表"
                               :base-id="upData.keyid" @getValue="$emit('btnClick',2,upData)"></upload-button>
              </el-dropdown-item>
              <el-dropdown-item command="3" divided>
                <upload-button v-model="upData.attachFileb"
                               module-type="hr"
                               file-name="面试登记表"
                               btn-title="面试登记表"
                               :base-id="upData.keyid" @getValue="$emit('btnClick',2,upData)"></upload-button>
              </el-dropdown-item>
              <el-dropdown-item command="4" divided>
                <upload-button v-model="upData.attachFilec"
                               module-type="hr"
                               file-name="招聘需求申请表"
                               btn-title="入职登记表"
                               :base-id="upData.keyid" @getValue="$emit('btnClick',2,upData)"></upload-button>
              </el-dropdown-item>
            </template>
            <template v-if="scope.applytypeid==='402880fa75fcce49017603f081db01fa'">
              <!--<el-dropdown-item command="5">上传员工转正申请表</el-dropdown-item>-->
              <el-dropdown-item command="5">
                <upload-button v-model="upData.attachFilea"
                               module-type="hr"
                               file-name="员工转正申请表"
                               btn-title="员工转正申请表"
                               :base-id="upData.keyid" @getValue="$emit('btnClick',2,upData)"></upload-button>
              </el-dropdown-item>
            </template>
            <template v-if="scope.applytypeid==='402880fa75fcce49017603f0aa9201fb'">
              <!--<el-dropdown-item command="6">上传员工离职申请表</el-dropdown-item>
              <el-dropdown-item command="7">上传离职交接表</el-dropdown-item>-->
              <el-dropdown-item command="6">
                <upload-button v-model="upData.attachFilea"
                               module-type="hr"
                               file-name="员工离职申请表"
                               btn-title="员工离职申请表"
                               :base-id="upData.keyid" @getValue="$emit('btnClick',2,upData)"></upload-button>
              </el-dropdown-item>
              <el-dropdown-item command="7">
                <upload-button v-model="upData.attachFileb"
                               module-type="hr"
                               file-name="离职交接表"
                               btn-title="离职交接表"
                               :base-id="upData.keyid" @getValue="$emit('btnClick',2,upData)"></upload-button>
              </el-dropdown-item>
            </template>
            <template v-if="upData.applytypeid==='402880fa75fcce49017603f0e5df01fc'">
              <!--<el-dropdown-item command="8">上传调岗晋级申请表</el-dropdown-item>-->
              <el-dropdown-item command="8">
                <upload-button v-model="upData.attachFilea"
                               module-type="hr"
                               file-name="调岗晋级申请表"
                               btn-title="调岗晋级申请表"
                               :base-id="upData.keyid" @getValue="$emit('btnClick',2,upData)"></upload-button>
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <status-button :status="upData.allstatuscode" code="131"></status-button>
    </template>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      scope: [Object],
      power: {
        type: Object,
        default:()=>{
          return {
            add: true,
            del: true,
            show: true,
            update: true,
            upload:true,
          }
        }
      }
    },
    watch: {
      scope(newValue){
        this.upData=newValue
      }
    },
    //数据节点
    data () {
      return {
        statusColor:[],
        statusList:[],
        upData:this.scope
      }
    },
    //生命周期函数节点
    created () {
    },
    //自定义函数节点
    methods: {
      handleCommand(command){
        //this.$emit('btnClick',parseInt(command),this.scope)
      },
    }
  }
</script>
<style lang='less' scoped>
.el-dropdown{
  margin-left: 10px;
}
span{
  color: #409EFF;
  margin-left: 10px;
}
</style>
