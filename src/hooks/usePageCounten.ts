import { ref } from "vue"
import type pageContent from "@/components/page-content/page-content.vue"

function usePageContent() {
  // 监听search组件自定义事件, 对count组件进行操作
  const countenRef = ref<InstanceType<typeof pageContent>>()
  // 查询操作
  function handleQueryClick(queryInfo: any) {
    countenRef.value?.fetchPageListData(queryInfo)
  }
  // 重置操作
  function handleResetClick() {
    countenRef.value?.fetchPageListData()
  }

  return {
    countenRef,
    handleQueryClick,
    handleResetClick
  }
}

export default usePageContent
