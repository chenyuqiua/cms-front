<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.updateTitle"
      width="30%"
      center
    >
      <!-- 动态生成表单区域 -->
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large" :rules="rules" ref="formRef">
          <template v-for="item in modalConfig.formItems" :key="item.props">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
import { ElForm, ElMessage } from "element-plus"

import useSystemStore from "@/store/main/system/system"
import type { IFormItems } from "@/global/components-type"

interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      updateTitle: string
    }
    formItems: IFormItems[]
  }
  otherInfo?: any
}
const props = defineProps<IProps>()

// 定义弹窗显示隐藏的变量
const dialogVisible = ref(false)
// 定义表单变量
const initalData: any = {}
for (const item of props.modalConfig.formItems) {
  initalData[item.prop] = item.initalValue ?? ""
}
const formData: any = reactive<any>(initalData)

// 记录当前是否是新建弹窗
const isNewRef = ref(true)
// 记录当前修改数据的id
const updateId = ref()
// 绑定表单Ref
const formRef = ref<InstanceType<typeof ElForm>>()

// 获取角色/部门数据进行展示
const systemStore = useSystemStore()
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

      // 合并otherInfo的其他请求信息
      let infoData = formData
      if (props.otherInfo) {
        // 目前只支持分配一级菜单权限, 过滤二级菜单(支持时删除filter过滤即可)
        const newMenuList = props.otherInfo.menuList.filter((item: any) => {
          if (item < 10) return item
        })

        props.otherInfo.menuList = newMenuList
        infoData = { ...infoData, ...props.otherInfo }
      }

      if (isNewRef.value) {
        // 发送新建数据网络请求
        await systemStore.createPageDataAction(props.modalConfig.pageName, infoData)
      } else {
        // 发送修改数据网络请求
        await systemStore.updatePageDataAction(props.modalConfig.pageName, {
          id: updateId.value,
          ...infoData
        })
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
    { min: 3, max: 20, message: "用户名长度应为3-20位!", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码!", trigger: "blur" },
    { min: 4, message: "密码长度应至少3位!", trigger: "blur" }
  ],
  realname: [
    { required: true, message: "请输入您的真实姓名!", trigger: "blur" },
    { min: 2, message: "您的名字不符合规则!", trigger: "blur" }
  ],
  leader: [{ required: true, message: "请输入部门领导!", trigger: "blur" }],
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
