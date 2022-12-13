import { createRouter, createWebHashHistory } from "vue-router"

import { LOGIN_TOKEN } from "@/global/constants"
import { localCache } from "@/utils/cache"
import { firstMenu } from "@/utils/map-menus"

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
      name: "main",
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
  // 进入到main页面, 没有token返回登录页面
  if (to.path === "/main" && !token) return "/login"

  // 进入到main页面, 加载首次进入菜单的第一个子路由中
  if (to.path === "/main" && token) return firstMenu?.url
})

export default router
