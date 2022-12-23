<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large" :rules="rules" ref="formRef">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入用户密码" show-password />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model.number="formData.cellphone" placeholder="请输入电话号码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="depId">
            <el-select v-model="formData.depId" placeholder="请选择部门" style="width: 100%">
              <template v-for="item in entireDeps" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { storeToRefs } from "pinia"

import useMainStore from "@/store/main/main"
import useSystemStore from "@/store/main/system/system"
import { ElForm, ElMessage } from "element-plus"

// 定义弹窗显示隐藏的变量
const dialogVisible = ref(false)
// 定义表单变量
const formData = reactive<any>({
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  roleId: "",
  depId: ""
})
// 记录当前是否是新建弹窗
const isNewRef = ref(true)
// 记录当前修改数据的id
const updateId = ref()
// 绑定表单Ref
const formRef = ref<InstanceType<typeof ElForm>>()

// 获取角色/部门数据进行展示
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireRoles, entireDeps } = storeToRefs(mainStore)
const { errorMsg, successMsg } = storeToRefs(systemStore)

// 定义控制弹窗显示隐藏的方法 并控制新建弹窗和编辑弹窗的切换
function setDialogVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew

  if (!isNew && itemData) {
    updateId.value = itemData.id
    // 编辑时数据回显
    for (const key in formData) {
      formData[key] = itemData[key]
    }
  } else {
    updateId.value = null
    // 新建时数据清空
    for (const key in formData) {
      formData[key] = ""
    }
  }
}

// 点击确定按钮的逻辑处理
function handleConfirmClick() {
  // 点击按钮时进行表单校验
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      // 表单校验成功的操作
      // 关闭窗口修改数据
      dialogVisible.value = false
      if (isNewRef.value) {
        // 发送新建数据网络请求
        await systemStore.createUserDateAction(formData)
      } else {
        // 发送修改数据网络请求
        await systemStore.updateUserAction({ id: updateId.value, ...formData })
      }

      // 展示操作结果
      if (errorMsg.value !== "") {
        ElMessage.error(errorMsg.value)
        errorMsg.value = ""
        return
      }
      if (successMsg.value !== "") {
        console.log(successMsg.value)
        ElMessage.success(successMsg.value)
        successMsg.value = ""
      }
    } else {
      // 表单校验失败 就像用户提示发生错误的消息
      ElMessage.error("请填写格式正确的信息!")
    }
  })
}

// 表单校验规则
const rules = reactive({
  name: [
    { required: true, message: "请输入用户名!", trigger: "blur" },
    { min: 5, max: 20, message: "用户名长度应为5-20位!", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码!", trigger: "blur" },
    { min: 4, message: "密码长度应至少3位!", trigger: "blur" }
  ],
  realname: [
    { required: true, message: "请输入您的真实姓名!", trigger: "blur" },
    { min: 2, message: "您的名字不符合规则!", trigger: "blur" }
  ],
  cellphone: [
    { required: true, message: "请输入您的手机号码!", trigger: "blur" },
    { pattern: /^1[123456789]\d{9}$/, message: "手机号码格式不正确", trigger: "blur" }
  ]
})

// 将控制显式隐藏的函数暴露出去
defineExpose({ setDialogVisible })
</script>

<style lang="less" scoped>
.modal {
  .form {
    padding: 0 30px;
  }
}
</style>
