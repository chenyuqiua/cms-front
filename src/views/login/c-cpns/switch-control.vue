<template>
  <div class="switch-control">
    <!-- 引入登录和注册子组件 -->
    <div class="loginAndRegist">
      <login-panel :isShow="isShow" />
      <register-panel :isShow="isShow" />
    </div>

    <div
      id="control"
      class="showInfo"
      :style="{
        borderTopRightRadius: styleObj.bordertoprightradius,
        borderBottomRightRadius: styleObj.borderbottomrightradius,
        borderTopLeftRadius: styleObj.bordertopleftradius,
        borderBottomLeftRadius: styleObj.borderbottomleftradius,
        right: styleObj.rightDis
      }"
      ref="showInfoView"
    >
      <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__fadeInUp"
        leave-active-class="animate__zoomOut"
        appear
      >
        <!-- 登录时显示的信息 -->
        <div v-if="isShow" class="current-show">
          <div class="welcome">欢迎登入后台管理系统</div>
          <div style="flex: 2">
            <el-button class="current-btn" type="success" round @click="handelToRegiest">
              还没有账户？点击注册
            </el-button>
          </div>
        </div>

        <!-- 注册时显示的信息 -->
        <div v-else class="current-show">
          <div class="welcome">欢迎注册</div>
          <div style="flex: 2">
            <el-button type="success" round @click="handelToLogin"> 已有账户？点击登录 </el-button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import LoginPanel from "./login-panel.vue"
import RegisterPanel from "./register-panel.vue"

// 控制登录和注册页面的切换
let isShow = ref(true)

// 动态绑定样式的对象
const styleObj = reactive({
  bordertoprightradius: "15px",
  borderbottomrightradius: "15px",
  bordertopleftradius: "0px",
  borderbottomleftradius: "0px",
  rightDis: "0px"
})

// 切换到注册的方法
function handelToRegiest() {
  styleObj.bordertoprightradius = "0px"
  styleObj.borderbottomrightradius = "0px"
  styleObj.bordertopleftradius = "15px"
  styleObj.borderbottomleftradius = "15px"
  styleObj.rightDis = "50%"
  isShow.value = !isShow.value
}

// 切换到登录的方法
function handelToLogin() {
  styleObj.bordertoprightradius = "15px"
  styleObj.borderbottomrightradius = "15px"
  styleObj.bordertopleftradius = "0px"
  styleObj.borderbottomleftradius = "0px"
  styleObj.rightDis = "0px"
  isShow.value = !isShow.value
}
</script>

<style lang="less" scoped>
.switch-control {
  position: relative;

  .loginAndRegist {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  #control {
    transition: 0.3s linear;
  }

  .showInfo {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    position: absolute;
    height: 400px;
    width: 350px;
    z-index: 2;
    top: 0;
    right: 0;
    background-image: url("@/assets/img/login-wc.png");
    background-size: 90%;

    .current-show {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .current-btn {
        background-color: var(--login-primary);
        border: 1px solid #ffffff;
      }

      .welcome {
        flex: 2;
        display: flex;
        align-items: center;
        font-size: 22px;
        color: #ffffff;
        font-weight: bold;
      }
    }
  }

  .showInfo:hover {
    background-size: 100%;
    background-position: -50px -50px;
  }
}
</style>
