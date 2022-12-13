<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="currentMenus.menu.children[0].url">
        {{ currentMenus.menu.name }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="currentMenus.submenu.url">
        {{ currentMenus.submenu.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import { computed } from "vue"

import { mapPathToMenu } from "@/utils/map-menus"
import useLoginStore from "@/store/login/login"

// 动态展示面包屑
const route = useRoute()
const loginStore = useLoginStore()
const currentMenus = computed(() => {
  return mapPathToMenu(route.path, loginStore.userMenus, true)
})
</script>

<style lang="less" scoped></style>
