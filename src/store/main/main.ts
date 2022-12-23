import { selectDepListData, selectMenuListData, selectRoleListData } from "@/service/main/main"
import { defineStore } from "pinia"

interface IMainStore {
  entireRoles: any[]
  entireDeps: any[]
  entireMenus: any[]
}
const useMainStore = defineStore("main", {
  state: (): IMainStore => ({
    entireRoles: [],
    entireDeps: [],
    entireMenus: []
  }),
  actions: {
    async fetchSelectRoleListAction(queryInfo: any) {
      const roleListResult = await selectRoleListData(queryInfo)
      this.entireRoles = roleListResult.data.list
    },
    async fetchSelectDepListAction(queryInfo: any) {
      const depListResult = await selectDepListData(queryInfo)
      const menuListResult = await selectMenuListData(queryInfo)

      this.entireDeps = depListResult.data.list
      this.entireMenus = menuListResult.data.list
    }
  }
})

export default useMainStore
