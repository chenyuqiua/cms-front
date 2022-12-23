<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      @new-click="handleNewClick"
      @update-click="handleUpdateClick"
      ref="countenRef"
    />
    <page-modal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import pageSearch from "@/components/page-search/page-serch.vue"
import pageContent from "@/components/page-content/page-content.vue"
import pageModal from "@/components/page-modal/page-modal.vue"
import searchConfig from "./config/search.config"
import contentConfig from "./config/content.config"
import modalConfig from "./config/modal.config"
import usePageContent from "@/hooks/usePageCounten"
import usePageMoadl from "@/hooks/usePageModal"

const { countenRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewClick, handleUpdateClick } = usePageMoadl()
</script>

<style lang="less" scoped></style>
