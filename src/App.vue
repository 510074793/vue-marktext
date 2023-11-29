<script setup>
import zhCn from "element-plus/es/locale/lang/zh-cn"

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
