import type { RouteRecordRaw } from "vue-router"

// 定义变量: 用于记录第一次进入页面的菜单
export let firstMenu: any = null

/**
 * 加载本地文件中的路由到一个数组中
 * @returns 返回本地文件中所有路由对象组成的数组
 */
function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  // 1.加载 @/router/main 目录下的所有ts文件
  const files: Record<string, any> = import.meta.glob("../router/main/**/*.ts", {
    eager: true
  })
  // 2.将所有的路径和组件保存到localRoutes数组中
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

/**
 * 获取用户对应权限的路由封装到一个数组中
 * @param userMenus 传入要匹配的菜单数组
 * @returns 返回满足匹配的路由数组
 */
export function mapMenuToRoutes(userMenus: any[]) {
  // 1.调用函数, 加载本地路由获得一个路由数组
  const localRoutes = loadLocalRoutes()

  // 2.根据菜单匹配正确的路由, 封装到一个数组中
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) routes.push(route)
      if (!firstMenu && route) firstMenu = submenu
    }
  }

  return routes
}

/**
 * 根据页面的路径获取到对应菜单信息
 * @param path 要匹配的路径
 * @param userMenus 传入要匹配的菜单数组
 * @param isAll 是否同时返回父菜单和子菜单信息 默认为false
 * @param isSubMenu 是否返回子菜单 默认true返回子菜单 设置false时返回父菜单
 * @returns 返回与path匹配的菜单信息
 */
export function mapPathToMenu(path: string, userMenus: any[], isAll = false, isSubMenu = true) {
  // 对菜单进行遍历
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (path === submenu.url && isAll) {
        return {
          menu: menu,
          submenu: submenu
        }
      }
      if (path === submenu.url) {
        return isSubMenu ? submenu : menu
      }
    }
  }
}
