import { reactive, ref, watch } from "vue"
import { defineStore } from "pinia"
import { getSidebarStatus, setSidebarStatus, getLeftStatus, setLeftStatus } from "@/util/local-storage"
import { Desktop, SIDEBAR_OPENED, SIDEBAR_CLOSED } from "@/constants/app-key"


/** 设置侧边栏状态本地缓存 */
function handleSidebarStatus(opened) {
  opened ? setSidebarStatus(SIDEBAR_OPENED) : setSidebarStatus(SIDEBAR_CLOSED)
}

function handleLeftStatus(opened) {
  opened ? setLeftStatus(SIDEBAR_OPENED) : setLeftStatus(SIDEBAR_CLOSED)
}

export const useAppStore = defineStore("app", () => {
  /** 侧边栏状态 */
  const sidebar = reactive({
    opened: getSidebarStatus() !== SIDEBAR_CLOSED,
    withoutAnimation: false
  })

  const leftContent = reactive({
    opened: getLeftStatus() !== SIDEBAR_CLOSED,
    withoutAnimation: false
  })

  /** 设备类型 */
  const device = ref(Desktop);

  const windowHeight = ref(window.innerHeight);

  /** 监听侧边栏 opened 状态 */
  watch(
    () => sidebar.opened,
    (opened) => handleSidebarStatus(opened)
  )

  watch(
    () => leftContent.opened,
    (opened) => handleLeftStatus(opened)
  )

  /** 切换侧边栏 */
  const toggleSidebar = (withoutAnimation) => {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = withoutAnimation
  }


  /** 关闭侧边栏 */
  const closeSidebar = (withoutAnimation) => {
    sidebar.opened = false
    sidebar.withoutAnimation = withoutAnimation
  }

  /** 打开侧边栏 */
  const openSidebar = (withoutAnimation) => {
    sidebar.opened = true
    sidebar.withoutAnimation = withoutAnimation
  }

  /** 切换左测侧边栏 */
  const toggleLeftContent = (withoutAnimation) => {
    leftContent.opened = !leftContent.opened
    leftContent.withoutAnimation = withoutAnimation
  }


  /** 关闭左测侧边栏 */
  const closeLeftContent = (withoutAnimation) => {
    leftContent.opened = false
    leftContent.withoutAnimation = withoutAnimation
  }
  /** 关闭左测侧边栏 */
  const openLeftContent = (withoutAnimation) => {
    leftContent.opened = true
    leftContent.withoutAnimation = withoutAnimation
  }


  /** 切换设备类型 */
  const toggleDevice = (value) => {
    device.value = value
  }

  return { device, windowHeight, sidebar, toggleSidebar, closeSidebar,openSidebar, toggleDevice, leftContent, toggleLeftContent, closeLeftContent, openLeftContent }
})
