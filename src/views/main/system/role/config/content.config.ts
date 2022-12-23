const contentConfig = {
  pageName: "roles",
  header: {
    title: "角色列表",
    btnText: "新建角色"
  },
  propsList: [
    { type: "selection", label: "选择" },
    { type: "index", label: "序号", width: "60px" },
    { type: "normal", label: "角色名称", prop: "name" },
    { type: "normal", label: "权限描述", prop: "intro" },
    { type: "normal", label: "创建时间", prop: "createTime", width: "170px" },
    { type: "normal", label: "更新时间", prop: "updateTime", width: "170px" },
    { type: "user", label: "创建人", prop: "createUser" },
    { type: "user", label: "更新人", prop: "updateUser" },
    { type: "handler", label: "操作", width: "170px" }
  ]
}

export default contentConfig
