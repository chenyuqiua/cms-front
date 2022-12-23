<template>
  <div class="page-form">
    <el-row :gutter="gutter">
      <template v-for="item in formItems" :key="item.props">
        <el-col :span="span">
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
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import type { IFormItems } from "@/global/components-type"

interface IProps {
  span: number
  gutter: number
  formItems: IFormItems[]
  formData: any
}
defineProps<IProps>()
</script>

<style lang="less" scoped>
.page-form {
  .el-form-item {
    padding: 20px;
    margin-bottom: 0;
  }
}
</style>
