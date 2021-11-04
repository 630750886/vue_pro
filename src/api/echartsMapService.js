export function initImportFile(key_name ) {
    let filaName = {
      浙江: "zhejiang.js",
      安徽: "anhui.js",
      澳门: "aomen.js",
      北京: "beijing.js",
      重庆: "chongqing.js",
      福建: "fujian.js",
      甘肃: "gansu.js",
      广东: "guangdong.js",
      广西: "guangxi.js",
      贵州: "guizhou.js",
      海南: "hainan.js",
      河北: "hebei.js",
      黑龙江: "heilongjiang.js",
      河南: "henan.js",
      湖北: "hubei.js",
      湖南: "hunan.js",
      江苏: "jiangsu.js",
      江西: "jiangxi.js",
      吉林: "jilin.js",
      辽宁: "liaoning.js",
      内蒙古: "neimenggu.js",
      宁夏: "ningxia.js",
      青海: "qinghai.js",
      山东: "shandong.js",
      上海: "shanghai.js",
      山西: "shanxi.js",
      山西1: "shanxi1.js",
      四川: "sichuan.js",
      台湾: "taiwan.js",
      天津: "tianjin.js",
      香港: "xianggang.js",
      新疆: "xinjiang.js",
      西藏: "xizang.js",
      云南: "yunnan.js"
    };
    require(`echarts/map/js/province/${filaName[key_name]}`);
  }

  export function initChinaMap() {
    let option = {
      tooltip: {
        show: false
      },
      geo: {
        map: this.province,
        roam: false,
        // zoom: 1.23,
        label: {
          normal: {
            show: false,
            fontSize: "10",
            color: "rgba(0,0,0,0.7)"
          }
        },
        itemStyle: {
          normal: {
            areaColor: "#0d0059",
            borderColor: "#389dff",
            borderWidth: 1, //设置外层边框
            shadowBlur: 5,
            shadowOffsetY: 8,
            shadowOffsetX: 0,
            shadowColor: "#01012a"
          },
          emphasis: {
            areaColor: "#184cff",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 5,
            borderWidth: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      },
      series: [
        {
          type: "map",
          map: this.province,
          roam: false,
          showLegendSymbol: false, // 存在legend时显示
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
              textStyle: {
                color: "#fff"
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: "#0d0059",
              borderColor: "#389dff",
              borderWidth: 0.5
            },
            emphasis: {
              areaColor: "#17008d",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 5,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
    let myEchart = echarts.init(this.$refs.myEchart);
    myEchart.setOption(option);
  }