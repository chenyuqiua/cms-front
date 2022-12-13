<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '62px' : '210px'">
        <main-menu :isFold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @fold-change="handelFoldChange" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from "@/components/main-menu/main-menu.vue"
import MainHeader from "@/components/mian-header/main-header.vue"
import { ref } from "vue"

const isFold = ref(false)
// 监听子组件传出的事件 处理菜单折叠的变化
function handelFoldChange(flag: boolean) {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  .main-content {
    height: 100%;
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      line-height: 200px;
      text-align: left;
      cursor: pointer;
      // background-color: #001529;
      background-color: var(--main-aside-bg);

      transition: width 0.4s ease;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .el-header {
      background-color: #fff;
    }

    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
