<template>
  <div class="indnexdiv">
    <div id="body">
      显示页面的全部内容
      <div id="open" @click="openBox">打开弹框</div>
    </div>
    <Loading ref="boxs"></Loading>
    <new-try :children="tryData"></new-try>
  </div>
</template>

<script>
import gantt from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
// import "dhtmlx-gantt/codebase/locale/locale_cn.js";
import NewTry from "./text";
export default {
  name: "HelloWorld",
  components: { NewTry },
  data() {
    return {
      tryData: [
        { id: 0, show: true, children: [{ id: 1 }, { id: 4 }] },
        { id: 2, show: false, children: [{ id: 5 }] },
        {
          id: 3,
          show: true,
          children: [
            { id: 6 },
            { id: 7 },
            { id: 8, show: false, children: [{ id: 9 }, { id: 10 }] },
          ],
        },
      ],
      treeData: [
        {
          id: "inter",
          parentId: "product",
          spType: 0,
          layerId: 0,
          seqId: 1,
          name: "网络产品",
          deleted: "0",
          show: false,
        },
        {
          id: "product",
          parentId: "",
          spType: 0,
          layerId: 0,
          seqId: 50,
          name: "产品中心",
          deleted: "0",
          show: false,
        },
        {
          id: "online",
          parentId: "product",
          spType: 0,
          layerId: 0,
          seqId: 2,
          name: "线上产品",
          deleted: "0",
          show: false,
        },
        {
          id: "unline",
          parentId: "product",
          spType: 0,
          layerId: 0,
          seqId: 3,
          name: "线下产品",
          deleted: "0",
          show: false,
        },
        {
          id: "update",
          parentId: "dispatch",
          spType: 0,
          layerId: 0,
          seqId: 1,
          name: "关于产品更新",
          deleted: "0",
          show: false,
        },
        {
          id: "dispatch",
          parentId: "",
          spType: 0,
          layerId: 0,
          seqId: 2,
          name: "通知公告",
          deleted: "0",
          show: false,
        },
        {
          id: "diedai",
          parentId: "dispatch",
          spType: 0,
          layerId: 0,
          seqId: 2,
          name: "产品迭代",
          deleted: "0",
          show: false,
        },
        {
          id: "address",
          parentId: "about",
          spType: 0,
          layerId: 0,
          seqId: 1,
          name: "公司地址",
          deleted: "0",
          show: false,
        },
        {
          id: "about",
          parentId: "",
          spType: 0,
          layerId: 0,
          seqId: 1,
          name: "关于我们",
          deleted: "0",
          show: false,
        },
        {
          id: "portals",
          parentId: "",
          spType: 0,
          layerId: 0,
          seqId: 3,
          name: "门户管理",
          deleted: "0",
          show: false,
        },
        {
          id: "communication",
          parentId: "address",
          spType: 0,
          layerId: 0,
          seqId: 1,
          name: "联系我",
          deleted: "0",
          show: false,
        },
      ],
    };
  },
  mounted() {
    let data = this.getTree(this.treeData, "");
    console.log("data", data);
    this.tryData = data;
  },
  methods: {
    openBox() {
      console.log(";aaaa", this.$refs.boxs);
      this.$refs.boxs.showBox = true;
    },
    getTree(treeData, parentId) {
      var treeArr = [];
      for (var i = 0; i < treeData.length; i++) {
        var node = treeData[i];
        if (node.parentId == parentId) {
          var newNode = {
            id: node.id,
            title: node.name,
            show: node.show,
            children: this.getTree(treeData, node.id),
          };

          treeArr.push(newNode);
          // if (treeArr[0].children.length === 3) {
          //   console.log("aaaa", treeArr);
          //   console.log("index", i);
          //   return treeArr;
          // }
        }
      }
      return treeArr;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.indnexdiv {
  width: 100%;
  height: 100%;
}
</style>
