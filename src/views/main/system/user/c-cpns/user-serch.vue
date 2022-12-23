<template>
  <div class="search">
    <el-form :model="searchForm" label-width="80px" size="large" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="searchForm.realname" placeholder="请输入真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="searchForm.cellphone" placeholder="请输入手机号" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <el-select v-model="searchForm.status" style="width: 100%" placeholder="请选择状态">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createTime">
            <el-date-picker
              v-model="searchForm.createTime"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
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

const emit = defineEmits(["queryClick", "resetClick"])

// 定义属于与表单双向绑定
const searchForm = reactive({
  name: "",
  realname: "",
  cellphone: "",
  status: 1,
  createTime: ""
})

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
