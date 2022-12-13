<template>
  <div class="main-menu">
    <div class="logo">
      <img class="logo-image" src="@/assets/img/logo.png" alt="" />
      <h2 v-show="!isFold" class="title">Chenyq-CMS</h2>
    </div>
    <div class="menu">
      <el-menu
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="var(--main-aside-bg)"
        :default-active="defaultActive"
        :collapse-transition="false"
        :collapse="isFold"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handelItemClick(subItem)">
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRouter, useRoute } from "vue-router"

import useLoginStore from "@/store/login/login"
import { mapPathToMenu } from "@/utils/map-menus"

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 动态获取到菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

// 菜单的路由跳转
const router = useRouter()
function handelItemClick(item: any) {
  router.push(item.url)
}

// 控制Menu中的菜单的选中子菜单
const route = useRoute()
const defaultActive = computed(() => {
  const currentMenu = mapPathToMenu(route.path, userMenus)
  return currentMenu.id + ""
})
</script>

<style lang="less" scoped>
.main-menu {
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .logo-image {
      width: 28px;
      height: 28px;
      background-color: #fff;
      border-radius: 50%;
      margin: 0 15px 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
    }
  }

  .menu {
    .el-menu {
      border-right: none;
      user-select: none;

      .el-sub-menu {
        .el-menu-item {
          padding-left: 50px !important;
          background-color: var(--main-aside-item);
        }

        .el-menu-item:hover {
          color: #fff;
        }

        .el-menu-item.is-active {
          background-color: var(--main-aside-active);
        }
      }
    }
  }
}
</style>
