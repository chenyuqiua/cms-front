import { selectDepListData, selectRoleListData } from "@/service/main/main"
import { defineStore } from "pinia"

interface IMainStore {
  entireRoles: any[]
  entireDeps: any[]
}
const useMainStore = defineStore("main", {
  state: (): IMainStore => ({
    entireRoles: [],
    entireDeps: []
  }),
  actions: {
    async fetchSelectRoleListAction(queryInfo: any) {
      const roleListResult = await selectRoleListData(queryInfo)
      this.entireRoles = roleListResult.data.list
    },
    async fetchSelectDepListAction(queryInfo: any) {
      const depListResult = await selectDepListData(queryInfo)
      this.entireDeps = depListResult.data.list
    }
  }
})

export default useMainStore
