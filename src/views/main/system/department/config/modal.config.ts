const modalConfig = {
  pageName: "deps",
  header: {
    newTitle: "新建部门",
    updateTitle: "编辑部门"
  },
  formItems: [
    { type: "input", label: "部门名称", prop: "name", placeholder: "请输入部门名称" },
    { type: "input", label: "部门领导", prop: "leader", placeholder: "请输入部门领导" }
  ]
}

export default modalConfig
