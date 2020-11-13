<template>
  <div class="try">
    <div id="myChart" style="height: 260px; width: 100%"></div>
  </div>
</template>

<script>
export default {
  name: "three",
  data() {
    return {};
  },
  mounted() {
    let myChart = this.$echarts.init(document.getElementById("myChart"));
    var option = {
      title: {
        text: "站点状态",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: ["正常", "超标"],
      },
      series: [
        {
          name: "站点状态",
          type: "pie",
          radius: [0, "55%"],
          label: {
            align: "left",
            normal: {
              formatter: [
                "{title|{b}}{abg|}",
                "  {valueHead|数值}{rateHead|占比}",
                "{hr|}",
                "  {value|{c}}{rate|{d}%}",
              ].join("\n"),
              backgroundColor: "#eee",
              borderColor: "#fff",
              shadowColor: "rgba(0, 0, 0, 0.4)",
              shadowBlur: 10,
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                title: {
                  color: "#eee",
                  align: "center",
                },
                abg: {
                  backgroundColor: "#4169e1",
                  width: "100%",
                  align: "right",
                  height: 25,
                  borderRadius: [4, 4, 0, 0],
                },
                valueHead: {
                  color: "#333",
                  height: 24,
                  width: 30,
                  align: "center",
                  padding: [0, 20, 0, 10],
                },
                value: {
                  height: 30,
                  width: 30,
                  align: "center",
                  padding: [0, 20, 0, 0],
                },
                rateHead: {
                  color: "#333",
                  height: 24,
                  width: 30,
                  align: "center",
                  padding: [0, 20, 0, 10],
                },
                rate: {
                  height: 30,
                  width: 30,
                  align: "center",
                  padding: [0, 10, 0, 10],
                },
                hr: {
                  borderColor: "#fff",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0,
                },
              },
            },
          },
          data: [
            {
              value: 44,
              name: "正常",
              itemStyle: {
                color: "#4169e1",
              },
            },
            { value: 55, name: "超标", itemStyle: { color: "red" } },
          ],
        },
      ],
    };
    myChart.setOption(option, true);
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
