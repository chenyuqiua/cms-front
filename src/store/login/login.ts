import { accountLoginRequest } from "@/service/login/login"
import { defineStore } from "pinia"

import type { IAccount } from "@/types"
import { localCache } from "@/utils/cache"
import router from "@/router"
import { LOGIN_TOKEN } from "@/global/constants"

const useLoginStore = defineStore("login", {
  state: () => ({
    id: "",
    name: "",
    token: localCache.getCache(LOGIN_TOKEN) ?? ""
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      // 1.获取登录信息到store中
      const loginResult = await accountLoginRequest(account)
      this.id = loginResult.data.id
      this.name = loginResult.data.name
      this.token = loginResult.data.token

      // 2.保存token到本地缓存中
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 3.页面跳转 -> main
      router.push("/main")
    }
  }
})

export default useLoginStore
