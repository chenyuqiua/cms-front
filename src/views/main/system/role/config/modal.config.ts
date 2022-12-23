const modalConfig = {
  pageName: "roles",
  header: {
    newTitle: "新建角色",
    updateTitle: "编辑角色"
  },
  formItems: [
    { type: "input", label: "角色名称", prop: "name", placeholder: "请输入角色名称" },
    { type: "input", label: "角色描述", prop: "intro", placeholder: "请输入角色描述" },
    { type: "custom", prop: "", slotName: "menuList", placeholder: "请分配权限" }
  ]
}

export default modalConfig
