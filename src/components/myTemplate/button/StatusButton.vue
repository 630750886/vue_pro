<template>
    <div v-if="showTitle!==''" style="width: auto;display:inline-block" @click="$emit('click')">
        <span>{{showTitle}}</span><span>{{joinMessage}}</span>
    </div>
    <div v-else style="width: auto;display:inline-block"  @click="$emit('click')">
        <span>{{title}}</span><span>{{joinMessage}}</span>
    </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      data:{
        type:Array,
        default:()=>{
          return []
        }
      },
      code:[String,Number],
      status:[String,Number],
      title:[String],
      message:[String],
    },
    watch: {
      status(newValue){
        this.setShowTitle()
      },
    },
    //数据节点
    data() {
      return {
        showTitle:'',
        joinMessage:'',
        statusList:[]
      }
    },
    //生命周期函数节点
    created() {
      if (this.data.length <= 0) {
        if (!this.$myfunction.isEmpty(this.code)&& !this.$myfunction.isEmpty(this.status)) {
          if (this.code.indexOf('TYPE')===-1) {
            if (!this.$myfunction.isEmpty(this.session.getItem('TYPE-' + this.code))) {
              this.statusList=this.session.getItem('TYPE-' + this.code)
              this.setShowTitle()
            }else {
              this.getSelectByCode(this.code).then(item=>{
                this.statusList=item.data
                this.session.setItem('TYPE-' + this.code,item.data)
                this.setShowTitle()
              })
            }
          }else {
            if (!this.$myfunction.isEmpty(this.session.getItem('TYPE-' + this.code))) {
              this.statusList=this.session.getItem('TYPE-' + this.code)
              this.setShowTitle()
            }else {
              this.getSelectByCode(this.code.replace('TYPE-')).then(item=>{
                this.statusList=item.data
                this.session.setItem('TYPE-' + this.code,item.data)
                this.setShowTitle()
              })
            }

          }
        }
      }else {
        this.statusList=this.data
        this.setShowTitle()
      }
    },
    mounted(){
      if (this.message) {
        this.joinMessage='-'+this.message
      }
    },
    //自定义函数节点
    methods: {
      setShowTitle(){
        let ref=this.statusList.find(item=>{
          return item.staticsCode===this.status+''
        })
        if (ref) {
          this.showTitle=ref.listname
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  span{
    color: #409EFF;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
