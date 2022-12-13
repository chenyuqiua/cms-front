<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <el-icon><Star /></el-icon>
      </span>
      <span>
        <el-icon><ChatDotSquare /></el-icon>
      </span>
      <span>
        <el-icon><Message /></el-icon>
        <i class="dot"></i>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            :size="30"
            src="https://ts1.cn.mm.bing.net/th/id/R-C.eff0bd9640e53ec8a53f1f837ff4f138?rik=2nHMxX6SFpvRZQ&riu=http%3a%2f%2fimg.touxiangwu.com%2f2020%2f3%2fieQrIj.jpg&ehk=mdY%2bfmE%2fjAcj7sUGQFvvaqP5kHUplQRBfKHdqEqK4HA%3d&risl=&pid=ImgRaw&r=0"
          />
          <span class="name">chenyq</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handelExitClick">
              <el-icon><CircleClose /></el-icon>
              退出系统
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              个人信息
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              修改密码
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
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

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;

  .operation {
    display: flex;
    align-items: center;
    margin-right: 20px;

    span {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;

      &:hover {
        background-color: #f2f2f2;
      }

      .el-icon {
        font-size: 20px;
      }

      .dot {
        position: absolute;
        top: 7px;
        right: 6px;
        z-index: 10;
        width: 6px;
        border-radius: 100%;
        height: 6px;
        background: red;
      }
    }
  }

  .info {
    cursor: pointer;

    .el-dropdown-link {
      display: flex;
      align-items: center;

      .name {
        margin-left: 8px;
      }
    }

    :global(.el-dropdown-menu__item) {
      line-height: 36px !important;
      padding: 6px 22px;
    }
  }
}
</style>
