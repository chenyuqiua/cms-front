import { ref } from "vue"
import type pageModal from "@/components/page-modal/page-modal.vue"

type UpdateFnType = (data: any) => void
function usePageMoadl(updateCallBack?: UpdateFnType) {
  // 监听count组件自定义事件, 对modal组件进行操作
  const modalRef = ref<InstanceType<typeof pageModal>>()
  // 新建操作
  function handleNewClick() {
    modalRef.value?.setDialogVisible()
  }
  // 修改操作
  function handleUpdateClick(itemData: any) {
    modalRef.value?.setDialogVisible(false, itemData)
    if (updateCallBack) {
      updateCallBack(itemData)
    }
  }

  return {
    modalRef,
    handleNewClick,
    handleUpdateClick
  }
}

export default usePageMoadl
