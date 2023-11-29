<template>
  <section class="app-main">
    <div class="app-scrollbar">
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in" mode="out-in">
          <!-- :include="[]" -->
          <keep-alive>
            <component :is="Component" :key="currentPath" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import useResize from "./hooks/useResize"
const route = useRoute()

/** Layout 布局响应式 */
useResize()

const currentPath = computed(() => {
  return route.path
})

</script>

<style lang="scss" scoped>
.app-main {
  height: 100%;
  .app-scrollbar {
    height: 100%;
  }
}

</style>