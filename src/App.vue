<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
}
.cusbox .el-dialog__body {
  padding: 10px 20px 30px !important;
}
.gantt_task_line,
.gantt_line_wrapper {
  margin-top: -9px;
}

.gantt_side_content {
  margin-bottom: 7px;
}

.gantt_task_link .gantt_link_arrow {
  margin-top: -12px;
}

.gantt_side_content.gantt_right {
  bottom: 0;
}
</style>
