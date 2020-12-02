<template>
  <div class="try">
    <ul>
      <li v-for="item in children" :key="item.id">
        <el-button
          type="primary"
          @click="change(item)"
          :disabled="!item.children"
        >
          <span>
            <i
              style="font-size: 18px"
              class="el-icon-arrow-up"
              v-if="item.show"
            ></i>
            <i style="font-size: 18px" class="el-icon-arrow-down" v-else></i>
          </span>
          <span>{{ item.id }}</span>
        </el-button>
        <new-try
          v-if="item.children && item.show"
          :children="item.children"
        ></new-try>
      </li>
    </ul>
  </div>
</template>
 
<script>
export default {
  name: "NewTry", //这里写了name的名字 上面的组件不用声明
  props: { children: Array },
  data() {
    return {
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
    console.log("ppppppp", data);
  },
  methods: {
    change(item) {
      item.show = !item.show;
    },
    getTree(list, id) {
      var newList = [];
      for (let index = 0; index < list.length; index++) {
        let node = list[index];
        if (node.parentId == id) {
          let sonObj = {
            name: node.name,
            id: node.id,
            children: this.getTree(list, node.id),
          };
          newList.push(sonObj);
        }
      }
      return newList;
    },
  },
};
</script>