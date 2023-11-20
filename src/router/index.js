import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue';

export const constantRoutes = [

  {
    path: '/index',
    component: () => import("@/views/index.vue"),
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        alias: '/',
        name: 'Home',
        component: () => import("@/views/home.vue"),
        meta: {
          title: '主页',
          icon: 'home',
          keepAlive: true
        }
      },
    ]
  },
  // {
  //   path: "/404",
  //   component: () => import("@/views/error-page/404.vue"),
  //   meta: {
  //     hidden: true
  //   },
  //   alias: "/:pathMatch(.*)*"
  // },
  // {
  //   path: "/403",
  //   component: () => import("@/views/error-page/403.vue"),
  //   meta: {
  //     hidden: true
  //   }
  // },
  // {
  //   path: "/:pathMatch(.*)*", // 必须将 'ErrorPage' 路由放在最后
  //   redirect: "/404",
  //   name: "ErrorPage",
  //   meta: {
  //     hidden: true
  //   }
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})


export default router