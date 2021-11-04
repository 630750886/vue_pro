<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <download-excel class="export-excel-wrapper" :data="json_data" :fields="json_fields" header="客户数据信息表" name="客户信息表.xls">
        <el-button type="primary" size="small">导出客户信息表</el-button>
      </download-excel>
      <dialog-button :reset-btn="{show:false}" :cancelBtn="{show:false}" @cancelBtn="dialogClose" @okBtn="submitFormData"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
     name:"output_excel",
    //数据节点
    data() {
      return {
        dialogVisible:false,
        /*
        json_fields: {
        姓名: "name",   
        城市: "city",
        国家: "country",
        生日:"birthdate",
        "电话测试": "phone"    //如果命名的标题有空格,需要用双引号
      },
      json_data: [
        {
          name: "张三",
          city: "北京",
          country: "中国",
          birthdate: "1998-03-15",
          phone:"15645689652"
        },
        {
          name: "李四",
          city: "上海",
          country: "中国",
          birthdate: "1988-03-15",
          phone:"15645689652"
        }
      ],
      */
    json_fields: {
      "Complete name": "name",
      City: "city",
      Telephone: "phone.mobile",
      "Telephone 2": {
        field: "phone",
        callback: (value) => {
          let info="---mobile:"+value.mobile+"-----landline:"+value.landline
          return info;
        },
      },
    },
    json_data: [
      {
        name: "Tony Peña",
        city: "New York",
        country: "United States",
        birthdate: "1978-03-15",
        phone: {
          mobile: "1-541-754-3010",
          landline: "(541) 754-3010",
        },
      },
      {
        name: "Thessaloniki",
        city: "Athens",
        country: "Greece",
        birthdate: "1987-11-23",
        phone: {
          mobile: "+1 855 275 5071",
          landline: "(2741) 2621-244",
        },
      },
    ],
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ]
      }
    },
    //自定义函数节点
    methods: {
      openDialog(){
        this.dialogVisible=true
      },
      dialogClose(){
        this.dialogVisible=false
      },
      submitFormData(){
          this.dialogClose()
      },
      resetForm(){
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
