const searchConfig = {
  formItems: [
    {
      type: "input",
      prop: "name",
      label: "角色名称",
      placeholder: "请输入权限名称"
    },
    {
      type: "input",
      prop: "intro",
      label: "权限描述",
      placeholder: "请输入权限描述关键字"
    },
    {
      type: "date-picker",
      prop: "createTime",
      label: "创建时间"
    }
  ]
}

export default searchConfig
