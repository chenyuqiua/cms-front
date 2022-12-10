<template>
  <div class="main">
    <h2>main</h2>
    <button @click="handelExitClick">退出</button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from "@/global/constants"
import { useRouter } from "vue-router"
import { localCache } from "@/utils/cache"

const router = useRouter()
function handelExitClick() {
  // 删除token
  localCache.removeCache(LOGIN_TOKEN)
  router.push("/login")
}
</script>

<style lang="less" scoped></style>
