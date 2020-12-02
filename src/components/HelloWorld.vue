<template>
  <div class="indnexdiv">
    <div class="ganttdiv">
      <div style="height: 500px" ref="gantt" class="leftContainer" />
    </div>
  </div>
</template>

<script>
import gantt from "../js/gantt_trial/codebase/dhtmlxgantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

export default {
  name: "HelloWorld",
  data() {
    return {
      tasks: {
        data: [
          {
            id: 1,
            index: 1,
            text: "Project #2",
            start_date: "2019-04-04",
            duration: 18,
            endDate: "2020-05-05",
            taskName: "项目1",
            personName: "xiangmu",
            item: "2",
            planData: "09-09-2020",
            actualStartDate: "2019-05-04",
            actualEndDate: "2020-05-05",
          }, // 这里的parent为定义的根节点ID
          {
            id: 2,
            index: 2,
            text: "Task #1",
            start_date: "2019-04-04",
            duration: 8,
            endDate: "2020-05-05",
            taskName: "项目2",
            personName: "xiangmu",
            item: "2",
            planData: "09-09-2020",
            actualStartDate: "2019-04-04",
            actualEndDate: "2020-05-05",
          },
          {
            id: 3,
            index: 3,
            text: "Task #2",
            start_date: "2019-04-04",
            duration: 8,
            endDate: "2020-05-05",
            taskName: "项目3",
            personName: "xiangmu",
            item: "2",
            planData: "09-09-2020",
            actualStartDate: "2019-04-04",
            actualEndDate: "2020-05-05",
          },
        ],
        links: [
          { id: 1, source: 1, target: 2, type: 1 },
          { id: 2, source: 2, target: 3, type: 0 },
        ],
      },
    };
  },
  mounted() {
    this.initData();
    // 数据解析
    gantt.parse(this.tasks);
  },
  methods: {
    initData() {
      gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
      gantt.config.xml_date = "%Y-%m-%d";
      gantt.plugins({
        marker: true,
      });
      var dateToYear = gantt.date.date_to_str("%Y");
      var dateToMonth = gantt.date.date_to_str("%m");
      gantt.config.duration_unit = "month";
      gantt.config.scale_unit = "year";
      gantt.config.date_scale = "%Y";
      gantt.config.scale_height = 50;
      gantt.config.subscales = [
        {
          unit: "month",
          step: 1,
          date: "%F",
          format: function (date) {
            return `${dateToMonth(date)}月`;
          },
        },
      ];
      // gantt.config.task_height = 16;
      // gantt.config.row_height = 40;
      // gantt.locale.labels.baseline_enable_button = "Set";
      // gantt.locale.labels.baseline_disable_button = "Remove";
      // gantt.config.lightbox.sections = [
      //   {
      //     name: "description",
      //     height: 70,
      //     map_to: "text",
      //     type: "textarea",
      //     focus: true,
      //   },
      //   { name: "time", map_to: "auto", type: "duration" },
      //   {
      //     name: "baseline",
      //     map_to: { start_date: "planned_start", end_date: "planned_end" },
      //     button: true,
      //     type: "duration_optional",
      //   },
      // ];
      // gantt.locale.labels.section_baseline = "Planned";

      // gantt.showLightbox = (e, data) => {
      //   console.log("展示", e, data);
      // };
      gantt.config.layout = {
        css: "gantt_container",
        cols: [
          {
            width: 400,
            min_width: 300,
            rows: [
              {
                view: "grid",
                scrollX: "gridScroll",
                scrollable: true,
                scrollY: "scrollVer",
              },
              { view: "scrollbar", id: "gridScroll", group: "horizontal" },
            ],
          },
          { resizer: true, width: 1 },
          {
            rows: [
              { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
              { view: "scrollbar", id: "scrollHor", group: "horizontal" },
            ],
          },
          { view: "scrollbar", id: "scrollVer" },
        ],
      };

      // 设置被指派人为当前用户

      gantt.config.columns = [
        {
          name: "index",
          align: "center",
          label: "序号",
          width: "30",
          resize: true,
        },
        {
          name: "taskName",
          align: "center",
          label: "任务名称",
          tree: true,
          width: "150",
          align: "left",
        },
        {
          name: "item",
          align: "center",
          label: "长度或项",
          resize: true,
        },
        {
          name: "planStartDate",
          align: "center",
          label: "计划开始",
          resize: true,
        },
        {
          name: "planEndDate",
          align: "center",
          label: "计划完工",
          resize: true,
        },
        {
          name: "actualStartDate",
          align: "center",
          label: "实际开始",
          resize: true,
        },
        {
          name: "actualEndDate",
          align: "center",
          label: "实际完工",
          resize: true,
        },
        {
          name: "planDays",
          align: "center",
          label: "计划工期",
          resize: true,
        },
        {
          name: "add",
          width: 44,
        },
      ];

      gantt.config.task_height = 16;
      gantt.config.row_height = 40;

      //添加一条进度条
      gantt.addTaskLayer(function draw_planned(task) {
        console.log("tasktasktask", task);
        if (task.actualStartDate && task.actualEndDate) {
          var sizes = gantt.getTaskPosition(
            task,
            task.actualStartDate,
            task.actualEndDate
          );
          // console.log("sizes", sizes);
          var el = document.createElement("div");
          el.className = "baseline";
          el.style.left = sizes.left + "px";
          el.style.width = sizes.width + "px";
          el.style.height = 10 + "px";
          el.style.background = "red";
          el.style.position = "absolute";
          el.style.top = sizes.top + gantt.config.task_height + 10 + "px";
          return el;
        }
        return false;
      });
      //添加一条进度条的字体样式
      gantt.templates.task_class = function (start, end, task) {
        if (task.planned_end) {
          var classes = ["has-baseline"];
          if (end.getTime() > task.planned_end.getTime()) {
            classes.push("overdue");
          }
          return classes.join(" ");
        }
      };
      //添加一条进度条的字体自定义
      gantt.templates.rightside_text = function (start, end, task) {
        if (task.actualEndDate) {
          // if (end.getTime() > task.actualEndDate.getTime()) {
          //   var overdue = Math.ceil(
          //     Math.abs(
          //       (end.getTime() - task.actualEndDate.getTime()) /
          //         (24 * 60 * 60 * 1000)
          //     )
          //   );
          //   var text = "<b>Overdue: " + overdue + " days</b>";
          //   return text;
          // }
        }
      };
      //计划进度时间的转换
      gantt.attachEvent("onTaskLoading", function (task) {
        task.planned_start = gantt.date.parseDate(
          task.planned_start,
          "xml_date"
        );
        task.planned_end = gantt.date.parseDate(task.planned_end, "xml_date");
        return true;
      });
      //实际进度时间的转换
      gantt.attachEvent("onTaskLoading", function (task) {
        console.log("aaaaaaaaaccccccc", task);
        task.actualStartDate = gantt.date.parseDate(
          task.actualStartDate,
          "xml_date"
        );
        task.actualEndDate = gantt.date.parseDate(
          task.actualEndDate,
          "xml_date"
        );
        return true;
      });
      // gantt.addTaskLayer(function draw_planned(task) {
      //   if (task.actualStartDate && task.actualEndDate) {
      //     var sizes = gantt.getTaskPosition(
      //       task,
      //       task.actualStartDate,
      //       task.actualEndDate
      //     );
      //     console.log("sizes", sizes);
      //     var el = document.createElement("div");
      //     el.className = "baseline";
      //     el.style.left = sizes.left + "px";
      //     el.style.width = 20 + "px";
      //     el.style.height = 20 + "px";
      //     el.style.background = "red";
      //     el.style.top = sizes.top + gantt.config.task_height + 13 + "px";

      //     console.log("task1111111", el);
      //     return el;
      //   }
      //   return false;
      // });
      // 初始化
      gantt.init(this.$refs.gantt);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.baseline {
  position: absolute;
  border-radius: 2px;
  opacity: 0.6;
  margin-top: -7px;
  height: 12px;
  background: #ffd180;
  border: 1px solid rgb(255, 153, 0);
}

/* move task lines upper */
</style>
