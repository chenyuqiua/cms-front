<template>
  <div class="login-panel">
    <div class="wrap">
      <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__fadeInUp"
        leave-active-class="animate__zoomOut"
        appear
      >
        <!-- 登录标题 -->
        <div v-show="isShow" class="title">LOGIN</div>
      </transition>

      <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__fadeInUp"
        leave-active-class="animate__zoomOut"
        appear
      >
        <!-- 密码框和用户名框 -->
        <div v-show="isShow" class="login">
          <!-- 用户框相关 -->
          <div class="position-warp">
            <!-- 用户名 -->
            <div class="input-item">
              <input
                autocomplete="new-password"
                type="text"
                required
                v-model="loginUser.name"
                @blur="handelInputVerify(true)"
              />
              <span>账 户</span>
              <i></i>
            </div>
            <!-- 表单验证提示信息 -->
            <div class="user-message">{{ userMessage }}</div>
          </div>

          <div class="position-warp">
            <!-- 密码框 -->
            <div class="input-item">
              <input
                autocomplete="new-password"
                type="password"
                required
                v-model="loginUser.password"
                @blur="handelInputVerify(false)"
              />
              <span>密 码</span>
              <i></i>
            </div>

            <!-- 表单验证提示信息 -->
            <div class="pwd-message">{{ pwdMessage }}</div>
          </div>
        </div>
      </transition>

      <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__fadeInUp"
        leave-active-class="animate__zoomOut"
        appear
      >
        <!-- 登录按钮 -->
        <div v-show="isShow" class="btnArea">
          <div class="btns">
            <el-checkbox class="rememberPwd" v-model="isRemPwd" label="记住密码" size="large" />

            <el-link class="changePwd" type="success" :underline="false"> 修改密码 </el-link>
          </div>

          <el-button type="success" size="large" class="login-btn" @click="userLogin">
            立即登录
          </el-button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus"
import { ref, reactive, watch } from "vue"

import useLoginStore from "@/store/login/login"
import type { IAccount } from "@/types"
import { localCache } from "@/utils/cache"

// 定义常量
const CACHE_NAME = "name"
const CACHE_PASSWORD = "password"

defineProps({
  isShow: {
    type: Boolean
  }
})

// 双向绑定用户名和密码的对象
const loginUser = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? "",
  password: localCache.getCache(CACHE_PASSWORD) ?? ""
})

// 表单验证展示的信息
const userMessage = ref<string>()
const pwdMessage = ref<string>()
// 记录是否可以登录的变量
const userFlag = ref(false)
const pwdFlag = ref(false)
const isLogin = ref(false)

// 表单校验
function handelInputVerify(flag: boolean) {
  const userReg = /^[a-zA-Z0-9]{5,20}$/
  // 以字母开头的3位以上的密码
  // const pwdReg = /^[a-z][a-zA-Z0-9]{2,}$/
  // 三位以上字母和数字组合的密码
  const pwdReg = /^[a-zA-Z0-9]{2,}$/

  isLogin.value = false

  if (flag) {
    // 用户名表单校验
    if (loginUser.name === "") {
      userMessage.value = "用户名不能为空!"
      userFlag.value = false
      return
    } else if (!userReg.test(loginUser.name)) {
      userMessage.value = "用户名格式输入有误!"
      userFlag.value = false
      return
    } else {
      userMessage.value = ""
      userFlag.value = true
    }
  } else {
    // 密码表单校验
    if (loginUser.password === "") {
      pwdMessage.value = "密码不能为空!"
      pwdFlag.value = false
      return
    } else if (!pwdReg.test(loginUser.password)) {
      pwdMessage.value = "密码格式有误!"
      pwdFlag.value = false
      return
    } else {
      pwdMessage.value = ""
      pwdFlag.value = true
    }
  }

  if (userFlag.value && pwdFlag.value) {
    isLogin.value = true
  }
}

// 记录是否需要记住密码
const isRemPwd = ref<boolean>(localCache.getCache("isRemPwd") ?? false)
watch(isRemPwd, (newValue) => {
  localCache.setCache("isRemPwd", newValue)
})

// 获取store
const loginStore = useLoginStore()
// 登录按钮的点击事件/登录相关逻辑
function userLogin() {
  // 记住密码点击登陆时, 对表单进行一次校验
  handelInputVerify(true)
  handelInputVerify(false)

  if (!isLogin.value) {
    ElMessage.error("请输入符合规则的账户密码再进行登录!")
    return
  }

  // 用户输入的账号和密码
  const name = loginUser.name
  const password = loginUser.password
  // 携带账号密码通过派发Action
  loginStore.accountLoginAction({ name, password }).then(() => {
    // 登录成功后判断是否记住密码
    if (isRemPwd.value) {
      localCache.setCache(CACHE_NAME, name)
      localCache.setCache(CACHE_PASSWORD, password)
    } else {
      localCache.removeCache(CACHE_NAME)
      localCache.removeCache(CACHE_PASSWORD)
    }
  })
}
</script>

<style lang="less" scoped>
.login-panel {
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  height: 400px;
  width: 350px;

  background-color: rgba(255, 255, 255, 0.8);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;

  .wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;

    .title {
      position: absolute;
      top: 20px;

      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      width: 70%;
      padding-bottom: 13px;
      border-bottom: 1px solid var(--login-primary);

      color: var(--login-primary);
      font-weight: bold;
      font-size: 24px;
    }

    .login {
      display: flex;
      flex-wrap: wrap;
      width: 300px;

      .position-warp {
        width: 100%;
        position: relative;

        .input-item {
          position: relative;
          width: 100%;
          height: 55px;
          margin-bottom: 28px;

          input {
            width: 100%;
            height: 45px;
            padding: 10px 0 5px;
            border: none;
            box-shadow: none;

            color: #333;
            font-family: AlimamaShuHeiTi-Bold;
            font-size: 1em;
            background: transparent;

            outline: none;
            letter-spacing: 0.1em;
          }

          span {
            position: absolute;
            left: 0;
            padding: 15px 0 5px;

            text-transform: uppercase;
            color: #606060;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            transition: 0.5s;
            font-family: AlimamaShuHeiTi-Bold;
            pointer-events: none;
          }

          input:valid ~ span,
          input:focus ~ span {
            color: var(--login-primary);
            transform: translateY(-16px);
            font-size: 12px;
            font-weight: 700;
          }

          i {
            position: absolute;
            left: 0;
            bottom: 0;

            width: 100%;
            height: 2px;
            background: #ccc;
            overflow: hidden;
          }

          i::before {
            content: "";
            position: absolute;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #ff1b69, #ff0, #2196f3, #9c27b0, #ff1b69);
            animation: animate 2s linear infinite;
          }

          input:valid ~ i::before,
          input:focus ~ i::before {
            left: 0;
          }

          @keyframes animate {
            0% {
              background-position-x: 0;
            }

            100% {
              background-position-x: 300px;
            }
          }
        }

        .user-message,
        .pwd-message {
          position: absolute;
          bottom: 3px;
          color: #f56c6c;
          font-size: 14px;
        }
      }
    }

    .btnArea {
      width: 100%;

      .btns {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        .rememberPwd {
          --el-checkbox-checked-text-color: var(--login-primary);
          --el-checkbox-checked-bg-color: var(--login-primary);
          --el-checkbox-checked-input-border-color: var(--login-primary);
        }

        .changePwd {
          color: var(--login-primary);
        }
      }

      .login-btn {
        width: 100%;
        background-color: var(--login-primary);
        letter-spacing: 5px;
        border-color: var(--login-primary);
      }
    }
  }
}
</style>
