import { defineStore } from "pinia"

import {
  createUserData,
  deleteUserById,
  selectUserListData,
  updateUserData,
  selectPageListData,
  deletePageById,
  createPageData,
  updatePageData
} from "@/service/main/system/system"
import type { ISystemStore } from "./type"

const useSystemStore = defineStore("system", {
  state: (): ISystemStore => ({
    userList: [],
    totalCount: 0,
    successMsg: "",
    errorMsg: "",
    pageList: [],
    pageTotalCount: 0,
    relNameAndId: {}
  }),
  actions: {
    async selectUsersListAction(queryInfo: any) {
      if (queryInfo.createTime === "") {
        queryInfo.createTime = []
      }
      const userListResult = await selectUserListData(queryInfo)
      const { list, totalCount } = userListResult.data
      this.userList = list
      this.totalCount = totalCount
    },
    async deleteUserByIdAcion(id: number) {
      const deleteResult = await deleteUserById(id)
      if (deleteResult.code === 0) {
        this.errorMsg = deleteResult.msg
      }
      this.successMsg = deleteResult.data

      // 重新请求刷新页面
      this.selectUsersListAction({ page: 1, size: 10 })
    },
    async createUserDateAction(userInfo: any) {
      const createResult = await createUserData(userInfo)
      if (createResult.code === 0) {
        this.errorMsg = createResult.msg
      }
      this.successMsg = createResult.data

      // 重新请求刷新页面
      this.selectUsersListAction({ page: 1, size: 10 })
    },
    async updateUserAction(userInfo: any) {
      const updateResult = await updateUserData(userInfo)
      if (updateResult.code === 0) {
        this.errorMsg = updateResult.msg
      }
      this.successMsg = updateResult.data

      // 重新请求刷新页面
      this.selectUsersListAction({ page: 1, size: 10 })
    },

    // 查询所有用户数据, 映射所有用户的id和姓名
    async selectAllUserListAction() {
      const userListResult = await selectUserListData()
      const list = userListResult.data.list
      for (const item of list) {
        const key = item.id
        this.relNameAndId[key] = item.realname
      }
    },
    // 针对页面数据的增删改查
    async selectPageListAction(pageName: any, queryInfo: any) {
      // 没有传时间时, 默认为一个空数组
      if (queryInfo.createTime === "") {
        queryInfo.createTime = []
      }

      // 获取到数据列表和总数据条数
      const pageListResult = await selectPageListData(pageName, queryInfo)
      const { list, totalCount } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      if (deleteResult.code === 0) {
        this.errorMsg = deleteResult.msg
      }
      this.successMsg = deleteResult.data

      // 重新请求刷新页面
      this.selectPageListAction(pageName, { page: 1, size: 10 })
    },
    async createPageDataAction(pageName: string, pageInfo: any) {
      const createResult = await createPageData(pageName, pageInfo)
      if (createResult.code === 0) {
        this.errorMsg = createResult.msg
      }
      this.successMsg = createResult.data

      // 重新请求刷新页面
      this.selectPageListAction(pageName, { page: 1, size: 10 })
    },
    async updatePageDataAction(pageName: string, pageInfo: any) {
      const updateResult = await updatePageData(pageName, pageInfo)
      if (updateResult.code === 0) {
        this.errorMsg = updateResult.msg
      }
      this.successMsg = updateResult.data

      // 重新请求刷新页面
      this.selectPageListAction(pageName, { page: 1, size: 10 })
    }
  }
})

export default useSystemStore
