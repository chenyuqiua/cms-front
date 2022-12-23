<template>
  <div class="user">
    <user-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <user-content
      :content-config="contentConfig"
      ref="countenRef"
      @new-click="handleNewClick"
      @update-click="handleUpdateClick"
    />
    <user-modal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

import userSearch from "@/components/page-search/page-serch.vue"
import userContent from "@/components/page-content/page-content.vue"
import userModal from "@/components/page-modal/page-modal.vue"
import searchConfig from "./config/search.config"
import contentConfig from "./config/content.config"
import modalConfig from "./config/modal.config"
import usePageContent from "@/hooks/usePageCounten"
import usePageMoadl from "@/hooks/usePageModal"
import useMainStore from "@/store/main/main"

const { countenRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewClick, handleUpdateClick } = usePageMoadl()

// 为modalConfig中的数据, 注入动态数据
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()

  // 映射角色和部门到一个新数组中
  const roles = mainStore.entireRoles.map((item) => {
    return { label: item.name, value: item.id }
  })
  const deps = mainStore.entireDeps.map((item) => {
    return { label: item.name, value: item.id }
  })

  // 动态注入数据
  modalConfig.formItems.forEach((item: any) => {
    if (item.prop === "roleId") {
      item.options.push(...roles)
    }
    if (item.prop === "depId") {
      item.options.push(...deps)
    }
  })
  return modalConfig
})
</script>

<style lang="less" scoped>
.user {
  border-radius: 20px;
  overflow: hidden;
}
</style>
