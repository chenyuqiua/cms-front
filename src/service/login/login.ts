import hyRequest from ".."
import type { IAccount } from "@/types"

// 登录请求
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: "/login",
    data: account
  })
}

// 根据用户获取到角色信息
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

// 根据角色信息获取到权限信息(菜单信息)
export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/menus/${id}`
  })
}
