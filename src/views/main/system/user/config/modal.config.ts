const modalConfig = {
  pageName: "users",
  header: {
    newTitle: "新建用户",
    updateTitle: "编辑用户"
  },
  formItems: [
    { type: "input", label: "用户名", prop: "name", placeholder: "请设置用户名" },
    { type: "input", label: "真实姓名", prop: "realname", placeholder: "请设置真实姓名" },
    { type: "input", label: "密码", prop: "password", placeholder: "请设置登录密码" },
    { type: "input", label: "电话号码", prop: "cellphone", placeholder: "请设置电话号码" },
    { type: "select", label: "选择角色", prop: "roleId", placeholder: "请选择角色", options: [] },
    { type: "select", label: "选择部门", prop: "depId", placeholder: "请选择部门", options: [] }
  ]
}

export default modalConfig
