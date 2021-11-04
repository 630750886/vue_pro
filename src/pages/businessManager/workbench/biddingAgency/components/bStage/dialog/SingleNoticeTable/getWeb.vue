<template>
  <div>
    <p v-if="isNameItem=='1'">{{publicitydateTime}}</p>
    <p v-else-if="isNameItem=='2'">{{publicityWebName}}</p>
    <download-button v-else-if="isNameItem=='3'" :value="publicityImageFile"></download-button>
    <div  v-else >
      <download-button :value="publicityChangeImageFile"></download-button>
      <upload-button
          v-if="!publicityChangeImageFile"
          v-model="publicityChangeImageFile"
          @getValue="networkUpData(itemData)"
      ></upload-button>
    </div>

  </div>
</template>

<script>
  import { GetHttp } from "../../../../../../../../utils/http";
  export default {//组件里面data必须写函数，而且要有返回值return
    data() {
      return {
        publicityWebName:'',//网站名称
        publicitydateTime:'',//发布时间
        publicityImageFile:'',
        publicityChangeImageFile:'',
        itemData:{}
      }
    },
    props:{
      pkeyid:{
        type:String
      },
      isNameItem: {
        type:Number
      },
    },
    methods: {
      networkUpData(data) {
        data.publicityChangeImageFile=this.publicityChangeImageFile
        GetHttp('java_post','/pro/publicitylist/adds','post',data)
      }
    },
    components: {},
    //生命周期
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        if(this.pkeyid!==""){
          GetHttp(
            "java_post",
            '/pro/publicitylist/findwhere',
            "post",
            {pkeyid:this.pkeyid}
          ).then(item => {
            this.publicityWebName=item.data[0].publicityWebName
            this.publicitydateTime=item.data[0].publicitydateTime
            this.publicityImageFile=item.data[0].publicityImageFile
            this.publicityChangeImageFile=item.data[0].publicityChangeImageFile
            this.itemData = item.data[0]
          });
        }
      })
    },
    computed: {},

  }
</script>

<style lang="less" scoped>

</style>
