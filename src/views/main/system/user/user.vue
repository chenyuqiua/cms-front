<template>
  <div class="user">
    <user-search @query-click="handelQueryClick" @reset-click="handelResetClick" />
    <user-content ref="contentRef" @new-click="handelNewClick" @update-click="handleUpdateClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

import userSearch from "./c-cpns/user-serch.vue"
import userContent from "./c-cpns/user-content.vue"
import userModal from "./c-cpns/user-modal.vue"

interface ISearchForm {
  name: string
  realname: string
  cellphone: string
  status: number
  createTime: string
}
// 对content子组件绑定ref
const contentRef = ref<InstanceType<typeof userContent>>()
// 监听search子组件自定义事件, 对content子组件进行操作
function handelQueryClick(formData: ISearchForm) {
  contentRef.value?.fetchUserListData(formData)
}
function handelResetClick() {
  contentRef.value?.fetchUserListData()
}

// 对modal子组件绑定ref
const modalRef = ref<InstanceType<typeof userModal>>()
// 监听content子组件自定义事件, 对modal子组件进行操作
function handelNewClick() {
  modalRef.value?.setDialogVisible()
}
function handleUpdateClick(itemData: any) {
  modalRef.value?.setDialogVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 20px;
  overflow: hidden;
}
</style>
