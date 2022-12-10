<template>
  <div class="login">
    <switch-control />
  </div>
</template>

<script setup lang="ts">
import SwitchControl from "./c-cpns/switch-control.vue"
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background: url("@/assets/img/login-bg.png");
  background-size: 100% 100%;
}
</style>
