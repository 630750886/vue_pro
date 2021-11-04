<template>
  <div class="body">
    <component :is="currentWorkbench.component"></component>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import projectConsult from './projectConsult/index.vue'
  import itemManager from './itemManager/index.vue'
  import biddingAgency from './biddingAgency/index.vue'
  import projectCost from './projectCost/index.vue'
  import projectSupervisor from './projectSupervisor/index.vue'
  import wholeProcess from './wholeProcess/index.vue'
  import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
  export default {
    components: {
      projectConsult,
			itemManager,
			biddingAgency,
      projectCost,
			projectSupervisor,
			wholeProcess,

    },
    props: {},
    watch: {

    },
    computed:{
        ...mapState({
          workbenchKeyid:state=>state.workbench.workbenchKeyid,
          currentItem:state=>state.workbench.currentItem,
        })
    },
    //数据节点
    data() {
      return {
        currentWorkbench:{
          keyid:'',
          name:'',
          component:''
        },
				name:'',
        businessType:[
          {keyid:'402880fa74c3492d0174d98785e3003d',name:'工程咨询',component:'projectConsult'},
          {keyid:'402880fa74c3492d0174d98936d70041',name:'项目管理',component:'itemManager'},
          {keyid:'402880fa74c3492d0174d988b0cb003f',name:'招标代理',component:'biddingAgency'},
          {keyid:'402880fa74c3492d0174d98812c0003e',name:'造价咨询',component:'projectCost'},
          {keyid:'402880fa74c3492d0174d988f7670040',name:'工程监理',component:'projectSupervisor'},
          {keyid:'402880fa74c3492d0174d9897c370042',name:'全过程咨询',component:'wholeProcess'},
          {keyid:'402880fa74c3492d0174d989b38e0043',name:'综合业务',component:'integrateService'},
        ]
			}
    },
    //生命周期函数节点
    created() {
      this.networkGetItemByKeyId().then(item=>{
        this.updateCurrentItem(item)
      })
			this.getCurrentWorkbench()
      this.networkBusinessWorkbenchLoadData()
      this.getSelectByCode('TYPE-046').then(({data:item})=>{
        this.currentWorkbench.component=item.find(ref=>{
          return ref.keyid===this.workbenchKeyid
        }).urladdress
      })
      this.networkCurrWorkGroupInfo()
      this.aStageGetCurrWorkPlan()
    },
    //自定义函数节点
    methods: {
        ...mapActions('loadType',{
          networkBusinessWorkbenchLoadData:'networkBusinessWorkbenchLoadData',
          networkGetSelectByCode:'networkGetSelectByCode'
        }),
      ...mapActions('workbench/aStage',{
        networkCurrWorkGroupInfo:'networkCurrWorkGroupInfo',
        aStageGetCurrWorkPlan: 'networkGetCurrWorkPlan',
        networkGetItemByKeyId:'networkGetItemByKeyId'
      }),
      ...mapMutations('workbench',{
        updateCurrentItem:'updateCurrentItem'
      }),
      getCurrentWorkbench(){
        this.name=this.$route.query.type
        if (!this.$myfunction.isEmpty(this.name)) {
          this.currentWorkbench=this.businessType.find(item=>{
            if (this.name === item.name) {
              return item
            }
          })
        }
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
