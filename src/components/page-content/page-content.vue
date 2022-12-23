<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? "数据列表" }}</h3>
      <el-button size="large" type="primary" @click="handelNewUserClick">
        {{ contentConfig?.header?.btnText ?? "新建数据" }}
      </el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" style="width: 100%" :row-class-name="tableRowClassName">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <!-- 创建/修改人类型 -->
          <template v-if="item.type === 'user' && item.prop !== undefined">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ relNameAndId[scope.row[item.prop]] }}
              </template>
            </el-table-column>
          </template>
          <!-- 用户状态按钮类型 -->
          <template v-else-if="item.type === 'userStatus'">
            <el-table-column align="center" v-bind="item">
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
          </template>
          <!-- 操作按钮类型 -->
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button type="success" @click="handelUpdateClick(scope.row)">编辑</el-button>
                <el-button type="danger" @click="handelDeleteClick(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </template>
          <!-- 预留插槽自定义类型 -->
          <template v-else-if="item.type === 'costom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <!-- 通用字段类型 -->
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[2, 10, 20, 30]"
        layout="sizes, prev, pager, next, jumper, total"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { storeToRefs } from "pinia"

import useSystemStore from "@/store/main/system/system"
import { ElMessage } from "element-plus"
import { localCache } from "@/utils/cache"

interface IPropsList {
  type: string // 展示类型
  label: string // 字段名
  prop?: string // 绑定的变量
  width?: string // 表格字段宽度
  slotName?: string // 自定义插槽名称
}
interface IProps {
  contentConfig: {
    pageName: string // 操作的页面名称
    header?: {
      title?: string // 表格标题
      btnText?: string // 按钮文本
    }
    propsList: IPropsList[]
  }
}
const props = defineProps<IProps>()
const emit = defineEmits(["newClick", "updateClick"])

// 获取store派发action请求数据 初始化
const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()
// 调用封装的函数发送网络请求
fetchPageListData()
// 派发action 映射id和真实姓名到relNameAdnId中
systemStore.selectAllUserListAction()

// 获取store中的数据
const { pageTotalCount, pageList, successMsg, errorMsg, relNameAndId } = storeToRefs(systemStore)

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

// 分页器相关逻辑
function handleSizeChange() {
  // 每页展示数据发生改变重新发送网络请求
  fetchPageListData()
}
function handleCurrentChange() {
  // 页数改变重新发送网络请求
  fetchPageListData()
}

// 封装函数用于发送网络请求, 请求页面的数据
function fetchPageListData(formData: any = {}) {
  const page = currentPage.value
  const size = pageSize.value
  const pageInfo = { page, size }
  const queryInfo = { ...pageInfo, ...formData }
  // 派发action发送网络请求
  systemStore.selectPageListAction(props.contentConfig.pageName, queryInfo)
}

// 删除操作相关逻辑
async function handelDeleteClick(id: number) {
  // 发送删除网络请求
  await systemStore.deletePageByIdAction(props.contentConfig.pageName, id)

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
  systemStore.updatePageDataAction("users", { id, status })
}

// 将封装的网络请求的函数暴露出去
defineExpose({ fetchPageListData })
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
