import { createRouter, createWebHashHistory } from "vue-router"

import { LOGIN_TOKEN } from "@/global/constants"
import { localCache } from "@/utils/cache"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/login",
      component: () => import("@/views/login/login.vue")
    },
    {
      path: "/main",
      component: () => import("@/views/main/main.vue")
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("@/views/not-found/not-found.vue")
    }
  ]
})

// 导航守卫
router.beforeEach((to) => {
  // 参数to(跳转到的位置)/from(从哪里跳转过来)
  // 返回值: 返回值决定要导航的路径
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path === "/main" && !token) return "/login"
})

export default router
