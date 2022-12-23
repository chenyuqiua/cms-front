<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button size="large" type="primary" @click="handelNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column align="center" type="selection" />
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column align="center" prop="name" label="用户名" />
        <el-table-column align="center" prop="realname" label="真实姓名" />
        <el-table-column align="center" prop="cellphone" label="手机号码" width="130" />
        <el-table-column align="center" prop="status" label="状态">
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.status === 1 ? 'success' : 'danger'"
              plain
              :disabled="currentInfo.id === scope.row.id"
              @click="handleStatusClick(scope.row.id, scope.row.status)"
            >
              {{ scope.row.status === 1 ? "启用" : "禁用" }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" width="170" />
        <el-table-column align="center" prop="updateTime" label="更新时间" width="170" />
        <el-table-column align="center" prop="createUser" label="创建人">
          <template #default="scope">
            {{ getRealname[scope.row.createUser] }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateUser" label="修改人">
          <template #default="scope">
            {{ getRealname[scope.row.updateUser] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="170">
          <template #default="scope">
            <el-button type="success" @click="handelUpdateClick(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handelDeleteClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[2, 10, 20, 30]"
        layout="sizes, prev, pager, next, jumper, total"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from "vue"
import { storeToRefs } from "pinia"

import useSystemStore from "@/store/main/system/system"
import { ElMessage } from "element-plus"
import { localCache } from "@/utils/cache"

const emit = defineEmits(["newClick", "updateClick"])

// 获取store派发action请求数据 初始化
const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()
// 调用封装的函数发送网络请求
fetchUserListData()

// 获取store中的数据
const { totalCount, userList, successMsg, errorMsg } = storeToRefs(systemStore)

// 获取当前登录用户信息
const currentInfo = reactive(localCache.getCache("userInfo"))

// 表格状态栏
const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  if (rowIndex % 2 === 0) {
    return "warning-row"
  } else if (rowIndex % 2 === 1) {
    return "success-row"
  }
  return ""
}

// 使用计算属性返回一个对象, 映射id和真实姓名
let realnames: any = {}
const getRealname = computed(() => {
  const obj: any = {}
  for (const item of userList.value) {
    const key = item.id
    if (!obj.hasOwnProperty(key)) {
      obj[key] = item.realname
    }
  }
  realnames = { ...realnames, ...obj }
  return { ...realnames, ...obj }
})

// 分页器相关逻辑
function handleSizeChange() {
  // 每页展示数据发生改变重新发送网络请求
  fetchUserListData()
}
function handleCurrentChange() {
  // 页数改变重新发送网络请求
  fetchUserListData()
}

// 封装函数用于发送网络请求
function fetchUserListData(formData: any = {}) {
  const page = currentPage.value
  const size = pageSize.value
  const pageInfo = { page, size }
  const queryInfo = { ...pageInfo, ...formData }
  // 派发action发送网络请求
  systemStore.selectUsersListAction(queryInfo)
}

// 删除操作相关逻辑
async function handelDeleteClick(id: number) {
  // 发送删除网络请求
  await systemStore.deleteUserByIdAcion(id)

  // 展示删除操作的结果
  if (errorMsg.value != "") {
    ElMessage.error(errorMsg.value)
    errorMsg.value = ""
    return
  }
  if (successMsg.value != "") {
    ElMessage.success(successMsg.value)
    successMsg.value = ""
  }
}
// 新增用户相关逻辑
function handelNewUserClick() {
  emit("newClick")
}
// 修改编辑用户相关逻辑
function handelUpdateClick(itemData: any) {
  emit("updateClick", itemData)
}
// 修改状态相关逻辑
function handleStatusClick(id: number, status: number) {
  if (status === 0) {
    status = 1
  } else {
    status = 0
  }
  systemStore.updateUserAction({ id, status })
}

// 将封装的网络请求的函数暴露出去
defineExpose({ fetchUserListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;

    .title {
      font-size: 20px;
    }
  }

  .table {
    :deep(.el-table .el-table__cell) {
      padding: 14px 0;
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    padding: 0 20px;
  }
}
</style>

<!-- 解决elment不生效 -->
<style>
.el-table .warning-row {
  --el-table-tr-bg-color: #fdf6ec;
}
.el-table .success-row {
  --el-table-tr-bg-color: #f0f9eb;
}
</style>
