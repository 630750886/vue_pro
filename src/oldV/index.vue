<template>
    <el-carousel :interval="3000" arrow="always" height="95%" indicator-position="none">
      <el-carousel-item v-for="(item,index) in images" :key="'elci'+index">
        <div class="middle" :style="{backgroundImage:'url(' + item.url + ')'}">
        </div>
        <h3>{{item.name}}</h3>
      </el-carousel-item>
    </el-carousel>
</template>
<script>
import { GetHttp } from "../utils/http";
export default {
  name: "home-index",
  data() {
    return {
     images: [
          {url: require("@/assets/img_init/dg001.jpg"),name:"弘典建设咨询有限公司"},
          {url: require("@/assets/img_init/gd002.jpg"),name:"弘典企业文化"},
          {url: require("@/assets/img_init/gd003.jpg"),name:"弘典荣誉墙"},
          {url: require("@/assets/img_init/gd004.jpg"),name:"弘典多功能会议室"},
          {url: require("@/assets/img_init/gd005.jpg"),name:"多彩贵州城"},
          {url: require("@/assets/img_init/gd006.jpg"),name:"贵安新区综合体"},
          {url: require("@/assets/img_init/gd007.jpg"),name:"贵州开阳经济开发区孵化研发数据中心"},
          {url: require("@/assets/img_init/gd008.jpg"),name:"花溪大学城"},
          {url: require("@/assets/img_init/gd009.jpg"),name:"黄铺物流园区"},
          {url: require("@/assets/img_init/gd010.jpg"),name:"龙里中学"},
          {url: require("@/assets/img_init/gd011.jpg"),name:"龙滩水库"},
          {url: require("@/assets/img_init/gd012.jpg"),name:"平塘医院"},
          {url: require("@/assets/img_init/gd013.jpg"),name:"日景"},
          {url: require("@/assets/img_init/gd014.jpg"),name:"西南商贸城"},
          {url: require("@/assets/img_init/gd015.png"),name:"宜家"}
        ]
    }
  }
};
</script>
<style lang="less">
.middle {
    width: 100%;
    background: no-repeat center top;
    background-size:100% 100%;
  }
 .el-carousel__container {
    position: relative;
    height:90%;
  }
  .el-carousel__item div{
    height: 99.9%;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #919292;
  }
 .el-carousel__item h3 {
    position: absolute;
    background: #b3b3b44b;
    color: #bd0404;
    font-size: 40px;
    opacity: 0.75;
    line-height: 50px;
    top: 15px;
    right: 50px;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #eef0f1;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #99a9bf;
  }
</style>
