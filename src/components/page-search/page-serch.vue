<template>
  <div class="search">
    <!-- 表单相关 -->
    <el-form :model="searchForm" label-width="80px" size="large" ref="formRef">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.props">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="footer">
      <el-button size="large" icon="Refresh" @click="handelResetClick"> 重置 </el-button>
      <el-button size="large" icon="Search" type="primary" @click="handelSelectClick">
        查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from "element-plus"
import { reactive, ref } from "vue"

import type { IFormItems } from "@/global/components-type"

interface IProps {
  searchConfig: {
    formItems: IFormItems[]
  }
}
const props = defineProps<IProps>()
const emit = defineEmits(["queryClick", "resetClick"])

// 定义属于与表单双向绑定
const initalForm: any = {}
for (const item of props.searchConfig.formItems) {
  initalForm[item.prop] = item.initalValue ?? ""
}
const searchForm = reactive(initalForm)

// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handelResetClick() {
  formRef.value?.resetFields()
  emit("resetClick")
}

// 查询操作
function handelSelectClick() {
  emit("queryClick", searchForm)
}
</script>

<style lang="less" scoped>
.search {
  padding: 20px;
  background-color: #fff;

  .el-form-item {
    padding: 20px;
    margin-bottom: 0;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }
}
</style>
