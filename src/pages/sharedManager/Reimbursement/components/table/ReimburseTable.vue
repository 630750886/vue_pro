<template>
    <div class="body">
         <div class="table">
            <el-table
       
        :data="cuData"
        stripe
        style="width: 100%"
        align="left"
        height="7.5rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        ref="refTable"
        border
        :default-sort = "{prop: 'createTime', order: 'descending'}"
      >
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="left"
        ></el-table-column>
        <el-table-column prop="orgName" label="创建组织" align="left" width="180">
        </el-table-column>
        <el-table-column prop="createBy" label="创建人" align="left">
        </el-table-column>
         <el-table-column prop="status" :formatter="showStatus" label="类型" align="left">
        </el-table-column>
        <el-table-column
          label="报销总额(元)"
          align="left"
          prop="SumMoney"
        >
        </el-table-column>
        <el-table-column label="明细" align="left">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="bottom" width="1200">
              <el-table
                :data="scope.row.children"
                style="width: 100%"
                align="left"
                highlight-current-row
                border
                :header-cell-style="{ fontSize: '14px' }"
              >
                <el-table-column
                  prop="orgName"
                  label="组织名称"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="contractId"
                  label="合同编号"
                  align="left"
                  width="130"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="contractName"
                  label="合同名称"
                  align="left"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="Aclass"
                  label="一级科目"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="Bclass"
                  label="二级科目"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="expense"
                  label="金额(元)"
                  align="left"
                ></el-table-column>              
              </el-table>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="fileAttach" label="报销申请表" align="left">
          <template slot-scope="scope">
            <download-button :value="scope.row.fileAttach"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="proveAttach" label="报销证明" align="left">
          <template slot-scope="scope">
            <download-button :value="scope.row.proveAttach"></download-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="auditTime"
          label="审核完成时间"
          align="left"          
          min-width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="mark"
          label="备注"
          align="left"
          min-width="120px"
          show-overflow-tooltip
        >
        </el-table-column>
       
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="140px"
        >
          <template slot-scope="scope">
           <public-button  classhd="hd"  plain  type="primary" v-if="scope.row.Status===1" name="DENG1JI4SHI2JIAN" title="登记时间"  @click="$emit('click',1,scope.row)"></public-button>
             <public-button  classhd="hd"  plain type="primary" name="SHAN1CHU" title="删除"  @click="$emit('click',2,scope.row)"></public-button>
          </template>
        </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
        <!--分页-->
            <pagination
             :pageTotal="dataList.length"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            >
            </pagination>
        </div>
    </div>  
</template>
<script>
import pagination from '@c/pagination/index.vue';

export default {
    components:{
        pagination
      
    },
     props:{
        dataList:{
            type:[],
            default:()=>{
                return [];
            }
        }
    },
    data(){
        return{
            pageShow: {
                        page: 1,
                        limit: 30,
                        where: '1=1'
                    }
            }
    },
    computed:{
        cuData(){
              return this.$myfunction.getPageData(this.dataList, this.pageShow);
        }
    },
    methods:{
         // 点击页码
        handleCurrentChange (val) {
        this.pageShow = Object.assign(this.pageShow, { page: val });
        },
        // 点击页数
        handleSizeChange (val) {
        this.pageShow = Object.assign(this.pageShow, { limit: val });
        },
        showStatus(row, col){
          let result="申请";
          //console.log('row');
           //console.log(row);
          if(row.Status=="1"){
            result="登记";
          }
          return result;
        }
        
    }
   

}
</script>