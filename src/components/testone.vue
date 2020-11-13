<template>
  <div class="try">
    <div id="myChart" style="height: 260px; width: 100%"></div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      dataSetArr: [
        { name: "本科", value: 56 },
        { name: "硕士", value: 40 },
        { name: "博士", value: 15 },
        { name: "留学", value: 76 },
      ],
      currName: "",
    };
  },
  mounted() {
    this.currName = "";
    let colors = this._colors();
    let itemCol = this._itemColor();
    let dataSorce = this._yAxisData();
    let centerData = this._getCenterData();
    let legendData = this._legData();
    let myChart = this.$echarts.init(document.getElementById("myChart"));
    let option = {
      backgroundColor: "#0C1D38", //背景颜色
      color: colors,
      legend: {
        show: true,
        right: "3%",
        top: "12%",
        type: "scroll",
        itemWidth: 12,
        itemHeight: 12,
        orient: "vertical",
        data: legendData,
      },
      tooltip: {
        show: true,
        backgroundColor: "rgba(3,43,80,0.7)",
        textStyle: {
          color: "rgba(255,255,255,0.7)",
          fontSize: 16,
        },
        extraCssText: "text-align:left",
        formatter: function (params, m) {
          let item = `
          <span 
          style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${
            itemCol[params.dataIndex]
          };"></span>
          `;
          let str = `${item} ${params.name}&nbsp;${params.value}`;
          return str;
        },
      },
      series: [
        {
          name: "",
          type: "pie",
          hoverAnimation: false,
          radius: ["43%", "63%"],
          center: ["42%", "47%"],
          avoidLabelOverlap: true,
          label: {
            // normal: {
            show: true,
            position: "outside",
            formatter: function (params) {
              let nm = params.name,
                per = Number(params.percent).toFixed(2);
              return [`{a|${nm}}\n`, `{b|${per}%}`];
            },
            rich: {
              a: {
                color: "#fff",
                fontSize: 14,
                lineHeight: 20,
              },
              b: {
                color: "yellow",
                fontSize: 14,
                foneWeight: "bold",
              },
            },
            // }
          },
          labelLine: {
            normal: {
              show: true,
              length: 32,
              length2: 40,
              lineStyle: {
                color: "#fff",
              },
            },
          },
          data: dataSorce,
        },
        {
          name: "边框1",
          type: "pie",
          hoverAnimation: false,
          radius: ["73%", "73.5%"],
          center: ["42%", "47%"],
          labelLine: {
            normal: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              color: "#2bb0eb",
              shadowColor: "#2bb0eb",
              borderWidth: 5,
              borderColor: "rgba(43,176,235,0.2)",
              shadowBlur: 20,
              opacity: 0.3,
            },
          },
          data: [
            {
              value: 100,
              tooltip: {
                show: false,
              },
            },
          ],
        },
        {
          name: "内框",
          type: "pie",
          hoverAnimation: false,
          radius: ["38%", "38.5%"],
          center: ["42%", "47%"],
          label: {
            normal: {
              show: true,
              position: "center",

              formatter: [
                `{a|${centerData[0].name}}`,
                `{b|${centerData[0].value + "%"}}`,
              ].join("\n"),
              rich: {
                a: {
                  color: "#fff",
                  fontSize: 18,
                  lineHeight: 30,
                },
                b: {
                  color: "yellow",
                  fontSize: 20,
                  foneWeight: "bold",
                  textShadowBlur: 20,
                  textShadowColor: "yellow",
                },
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              color: "#2bb0eb",
              shadowColor: "#2bb0eb",
              borderWidth: 5,
              borderColor: "rgba(43,176,235,0.2)",
              // 	shadowBlur: 2,
              // 	opacity:0.3
            },
          },
          data: [
            {
              value: 100,
              tooltip: {
                show: false,
              },
            },
          ],
        },
      ],
    };
    myChart.setOption(option, true);
    myChart.on("mouseover", (params) => {
      this.currName = params.name;
      let op = myChart.getOption();
      if (params.seriesIndex === 0) {
        let _label = {
          normal: {
            show: true,
            position: "center",
            formatter: [
              `{a|${params.name}}`,
              `{b|${params.percent + "%"}}`,
            ].join("\n"),
            rich: {
              a: {
                color: "#fff",
                fontSize: 18,
                lineHeight: 30,
              },
              b: {
                color: "yellow",
                fontSize: 20,
                foneWeight: "bold",
                textShadowBlur: 20,
                textShadowColor: "yellow",
              },
            },
          },
        };

        op.series[2].label = _label;
        myChart.setOption(op, true);
      }
    });
  },
  methods: {
    _legData() {
      let dataArr = [];
      this.dataSetArr &&
        this.dataSetArr.map((item, i) => {
          dataArr.push({
            name: item.name,
            icon: "circle",
            textStyle: { color: "#ccc", fontSize: 12 },
          });
        });
      return dataArr;
    },
    _yAxisData() {
      return this.dataSetArr && this.dataSetArr.map((item) => item);
    },
    _dySum() {
      let dySum = 0,
        arr = [];
      this.dataSetArr.map((item) => {
        dySum += Number(item.value);
      });

      this.dataSetArr &&
        this.dataSetArr.map((item) => {
          let val = ((Number(item.value) / dySum) * 100).toFixed(2);
          arr.push({
            name: item.name,
            value: val,
          });
        });
      return arr;
    },
    _getCenterData() {
      let dtS = this._dySum();

      if (this.currName !== "") {
        return (
          dtS &&
          dtS.filter((item) => {
            return item.name === this.currName;
          })
        );
      } else {
        return [dtS && dtS[0]];
      }
    },
    _axisLine() {
      return {
        lineStyle: {
          color: "#3398DB", //坐标轴线颜色
          width: 2,
        },
      };
    },
    _itemColor() {
      return [
        "#327bfa",
        "#f6973d",
        "#17d8a1",
        "#7a3ceb",
        "#e40036",
        "#ffde1d",
        "#f8492c",
        "#1da349",
        "#eb3d7e",
      ];
    },
    _colors() {
      return [
        new this.$echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            { offset: 0, color: "#327bfa" }, // 1
            { offset: 1, color: "#77a6f8" },
          ],
          false
        ),
        new this.$echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            { offset: 0, color: "#f6973d" }, //2
            { offset: 1, color: "#ffc58e" },
          ],
          false
        ),
        new this.$echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            { offset: 0, color: "#17d8a1" }, //3
            { offset: 1, color: "#b9ffeb" },
          ],
          false
        ),
        new this.$echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            { offset: 0, color: "#7a3ceb" }, //4
            { offset: 1, color: "#b691f9" },
          ],
          false
        ),
        new this.$echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            { offset: 0, color: "#e40036" }, //5
            { offset: 1, color: "#f97695" },
          ],
          false
        ),
        new this.$echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            { offset: 0, color: "#ffde1d" }, //6
            { offset: 1, color: "#fff2a5" },
          ],
          false
        ),
        new this.$echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            { offset: 0, color: "#f8492c" }, //7
            { offset: 1, color: "#fea191" },
          ],
          false
        ),

        new this.$echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            { offset: 0, color: "#1da349" }, //8
            { offset: 1, color: "#39d16b" },
          ],
          false
        ),
        new this.$echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            { offset: 0, color: "#eb3d7e" }, //9
            { offset: 1, color: "#fd97bd" },
          ],
          false
        ),
      ];
    },
  },
};
</script>

<style scoped lang="less">
</style>