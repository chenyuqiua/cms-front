<template>
  <div class="main-header">
    <div class="menu-icon" @click="handelMenuIconClick">
      <el-icon size="28px">
        <transition mode="out-in" name="toggle">
          <component :is="isFold ? 'Fold' : 'Expand'"></component>
        </transition>
      </el-icon>
    </div>
    <div class="content">
      <header-crumb />
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import headerInfo from "./c-cpns/header-info.vue"
import headerCrumb from "./c-cpns/header-crumb.vue"

const emit = defineEmits(["foldChange"])

const isFold = ref(true)
// 菜单按钮的折叠
function handelMenuIconClick() {
  emit("foldChange", isFold.value) // 发送自定义事件
  isFold.value = !isFold.value
}
</script>

<style lang="less" scoped>
.main-header {
  // flex: 1;
  display: flex;
  align-items: center;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
  }
}

// 菜单切换按钮动画
.menu-icon {
  .toggle-leave-from {
    transform: rotate(0deg);
  }

  .toggle-leave-to {
    transform: rotate(180deg);
  }

  .toggle-leave-active {
    transition: transform 0.2s linear;
  }
}
</style>
