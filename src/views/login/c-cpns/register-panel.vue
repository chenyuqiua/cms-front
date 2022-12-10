<template>
  <div class="register-panel">
    <transition
      name="animate__animated animate__bounce"
      enter-active-class="animate__fadeInUp"
      leave-active-class="animate__zoomOut"
      appear
    >
      <!--  注册标题-->
      <div v-show="!isShow" class="rigestTitle">管理员注册</div>
    </transition>

    <transition
      name="animate__animated animate__bounce"
      enter-active-class="animate__fadeInUp"
      leave-active-class="animate__zoomOut"
      appear
    >
      <!-- 注册表单-->
      <div v-show="!isShow" class="registForm">
        <template v-for="(item, index) in inputData" :key="index">
          <div class="position-wrap">
            <div class="input-item">
              <input
                autocomplete="new-password"
                :type="item.inputType"
                required
                v-model="item.bindValue"
                @blur="handelRegisterVerify(index)"
              />
              <span>{{ item.title }}</span>
              <i></i>
            </div>
            <div class="verify-message">{{ item.message }}</div>
          </div>
        </template>
      </div>
    </transition>

    <transition
      name="animate__animated animate__bounce"
      enter-active-class="animate__fadeInUp"
      leave-active-class="animate__zoomOut"
      appear
    >
      <!-- 注册按钮-->
      <div v-show="!isShow" class="registBtn">
        <el-button type="success" class="register" size="large" @click="userRegister">
          注册
        </el-button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"

defineProps({
  isShow: {
    type: Boolean,
    default: true
  }
})

// 最终注册信息封装的对象
const regUser = {
  regUsername: "",
  regPwd: "",
  regRePwd: ""
}
// 记录是否可以注册
const userFlag = ref(false)
const pwdFlag = ref(false)
const twoPwdFlag = ref(false)
const isRegister = ref(false)
// 表单校验的展示信息
const userMessage = ref("")
const pwdMessage = ref<string>()
const towPwdMessage = ref<string>()

// 用于遍历表单并提供双向绑定的数据
const inputData = reactive([
  {
    title: "用户名",
    inputType: "text",
    bindValue: "",
    message: userMessage
  },
  {
    title: "密码",
    inputType: "password",
    bindValue: "",
    message: pwdMessage
  },
  {
    title: "确认密码",
    inputType: "password",
    bindValue: "",
    message: towPwdMessage
  }
])

// 表单校验函数
function handelRegisterVerify(index: number) {
  const userReg = /^[a-zA-Z0-9]{5,20}$/
  const pwdReg = /^[a-z][a-zA-Z0-9]{2,}$/

  isRegister.value = false

  // 用户名表单校验
  if (index === 0) {
    if (inputData[0].bindValue === "") {
      console.log("first")
      userMessage.value = "用户名不能为空!"
      userFlag.value = false
      return
    } else if (!userReg.test(inputData[0].bindValue)) {
      userMessage.value = "用户名由字母或数字组成且长度为5~20位之间!"
      userFlag.value = false
      return
    } else {
      userMessage.value = ""
      userFlag.value = true
    }
  }

  // 密码表单校验
  if (index === 1) {
    if (inputData[1].bindValue === "") {
      pwdMessage.value = "密码不能为空!"
      pwdFlag.value = false
      return
    } else if (!pwdReg.test(inputData[1].bindValue)) {
      pwdMessage.value = "密码必须以字母开头且长度在3位以上!"
      pwdFlag.value = false
      return
    } else {
      pwdMessage.value = ""
      pwdFlag.value = true
    }
  }

  // 确认密码表单校验
  if (index === 2) {
    if (inputData[2].bindValue === "") {
      towPwdMessage.value = "密码不能为空!"
      twoPwdFlag.value = false
    } else if (inputData[1].bindValue !== inputData[2].bindValue) {
      towPwdMessage.value = "请确保两次密码一致!"
      twoPwdFlag.value = false
      return
    } else {
      towPwdMessage.value = ""
      twoPwdFlag.value = true
    }
  }

  if (userFlag.value && pwdFlag.value && twoPwdFlag.value) {
    regUser.regUsername = inputData[0].bindValue
    regUser.regPwd = inputData[1].bindValue
    regUser.regRePwd = inputData[2].bindValue
    isRegister.value = true
  }
}

// 注册按钮的点击事件/注册相关逻辑
function userRegister() {
  if (!isRegister.value) return
  console.log(regUser)
}
</script>

<style lang="less" scoped>
.register-panel {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 400px;
  padding: 0 25px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;

  .rigestTitle {
    position: absolute;
    top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 70%;
    height: 40px;
    border-bottom: 1px solid var(--login-primary);

    color: var(--login-primary);
    font-weight: bold;
    font-size: 24px;
  }

  .registForm {
    width: 100%;
    margin-top: 16px;

    .position-wrap {
      position: relative;

      .input-item {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
        height: 45px;
        margin-bottom: 26px;

        input {
          width: 100%;
          height: 30px;
          border: none;
          box-shadow: none;

          color: #333;
          font-family: AlimamaShuHeiTi-Bold;
          font-size: 14px;
          background: transparent;

          outline: none;
          letter-spacing: 0.1em;
        }

        span {
          position: absolute;
          left: 0;

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

      .verify-message {
        position: absolute;
        bottom: -18px;
        width: 100%;
        color: #f56c6c;
        font-size: 14px;
      }
    }
  }

  .registBtn {
    display: flex;
    width: 100%;
    margin-top: 15px;

    .register {
      width: 100%;
      background-color: var(--login-primary);
      letter-spacing: 5px;
      border-color: var(--login-primary);
    }
  }
}
</style>
