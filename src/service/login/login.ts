import hyRequest from ".."
import type { IAccount } from "@/types"

// 登录请求
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: "/login",
    data: account
  })
}
