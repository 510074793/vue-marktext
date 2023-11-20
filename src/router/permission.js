import router from "@/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

import { getToken } from "@/util/cookies"


NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  // const userStore = useUserStoreHook()

  let token = getToken()
  if (token) {
    if (to.path === "/index") {
      // 如果已经登录，并准备进入 Login 页面，则重定向到主页
      next({ path: "/" })
      NProgress.done()
    } else {
      next()
    }
  }
  else {
    // 如果没有 Token
    if (to.path === "/index") {
      next()
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面
      next("/index")
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
