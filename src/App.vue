<script setup>
import zhCn from "element-plus/es/locale/lang/zh-cn"
// import { onBeforeMount } from "vue";

// onBeforeMount(() => {
  // window.addEventListener("mousewheel", function (event) {
  //   if (event.ctrlKey === true || event.metaKey) { event.preventDefault(); }
  // }, { passive: false })

  // window.onload = function () {
  //   // 禁用双指放大
  //   document.addEventListener('touchstart', function (event) {
  //     if (event.touches.length > 1) {
  //       event.preventDefault()
  //     }
  //   });
  //   document.addEventListener('gesturestart', function (event) {
  //     event.preventDefault()
  //   })
    // 禁用双击放大
    // var lastTouchEnd = 0;
    // document.documentElement.addEventListener('touchend', function (event) {
    //   var now = Date.now();
    //   if (now - lastTouchEnd <= 300) {
    //     event.preventDefault();
    //   }
    //   lastTouchEnd = now;
    // }, {
    //   passive: false
    // });
  // };
// })


</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <router-view />
  </ElConfigProvider>
</template>

<style>
#app {
  height: 100%;
}

.el-popover {
  padding: 4px 0 !important;
  min-width: 100px !important;
}

.el-popper {
  padding: 4px 0 !important;
  min-width: 100px !important;
}
</style>
