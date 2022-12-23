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
    <page-modal :modal-config="modalConfig" :other-info="otherInfo" ref="modalRef">
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { ref, nextTick } from "vue"

import pageSearch from "@/components/page-search/page-serch.vue"
import pageContent from "@/components/page-content/page-content.vue"
import pageModal from "@/components/page-modal/page-modal.vue"

import searchConfig from "./config/search.config"
import contentConfig from "./config/content.config"
import modalConfig from "./config/modal.config"

import usePageContent from "@/hooks/usePageCounten"
import usePageMoadl from "@/hooks/usePageModal"
import type { ElTreeSelect } from "element-plus"
import useMainStore from "@/store/main/main"
import { mapMenuListToIds } from "@/utils/map-menus"

const { countenRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewClick, handleUpdateClick } = usePageMoadl(updateCallBack)

// 获取完整的表单信息
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

// 监听复选框的事件
const otherInfo = ref({})
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

// 菜单树的数据回显
const treeRef = ref<InstanceType<typeof ElTreeSelect>>()
function updateCallBack(itemData: any) {
  nextTick(() => {
    const ids = mapMenuListToIds(itemData.menus)
    treeRef.value?.setCheckedKeys(ids)
  })
}
</script>

<style lang="less" scoped>
:deep(.el-form-item__content) {
  margin-left: 0;
}
</style>
