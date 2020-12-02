<template>
  <transition name="fade">
    <div class="cover" v-show="showBox">
      <div class="modal">
        <div class="close" @click="closeBox">关闭弹框</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {
      showBox: false,
    };
  },
  mounted() {},
  methods: {
    closeBox() {
      this.showBox = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.cover {
  position: fixed;
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0, 0.4);
  width: 100%; /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
  height: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  .modal {
    position: fixed;
    width: 500px;
    height: 300px;
    border-radius: 8px;
    background-color: #fff;
    cursor: pointer;
    z-index: 9999;
  }
}
</style>
