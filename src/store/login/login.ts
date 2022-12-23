import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from "@/service/login/login"
import { defineStore } from "pinia"

import type { IAccount } from "@/types"
import { localCache } from "@/utils/cache"
import router from "@/router"
import { LOGIN_TOKEN, USER_INFO, USER_MENUS } from "@/global/constants"
import { mapMenuToRoutes } from "@/utils/map-menus"
import useMainStore from "../main/main"

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  errMsg: string
}

const useLoginStore = defineStore("login", {
  state: (): ILoginState => ({
    token: "",
    userInfo: {},
    userMenus: [],
    errMsg: ""
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      // 0.获取服务器返回的错误信息
      const loginResult = await accountLoginRequest(account)
      if (loginResult.code === 0) {
        this.errMsg = loginResult.msg
        return
      }
      this.errMsg = ""

      // 1.获取登录信息token存储到store中
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.根据登录用户获取到详细信息(角色信息)
      const userInfoRes = await getUserInfoById(id)
      this.userInfo = userInfoRes.data
      console.log(this.userInfo.role)

      // 3.根据角色信息获取到权限信息(获取菜单)
      const userMenusRes = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenus = userMenusRes.data
      console.log(this.userMenus)

      // 4.保存数据到本地缓存中
      localCache.setCache(USER_INFO, this.userInfo)
      localCache.setCache(USER_MENUS, this.userMenus)

      // 5.派发action发送网络请求获取角色和部门信息
      const mainStore = useMainStore()
      mainStore.fetchSelectRoleListAction({})
      mainStore.fetchSelectDepListAction({})

      // 6.动态添加路由
      // 调用函数获取到对应权限的路由数组
      const routes = mapMenuToRoutes(this.userMenus)
      // 遍历数组添加到main的路由列表中进行注册
      routes.forEach((item) => router.addRoute("main", item))

      // 7.页面跳转 -> main
      router.push("/main")
    },
    // 加载本地缓存的action
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(USER_INFO)
      const userMenus = localCache.getCache(USER_MENUS)

      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 刷新时重新派发action发送网络请求获取角色和部门信息
        const mainStore = useMainStore()
        mainStore.fetchSelectRoleListAction({})
        mainStore.fetchSelectDepListAction({})

        // 解决用户刷新动态路由丢失: 判断用户是否登录以及是否包含userMenus菜单
        const routes = mapMenuToRoutes(userMenus)
        routes.forEach((item) => router.addRoute("main", item))
      }
    }
  }
})

export default useLoginStore
