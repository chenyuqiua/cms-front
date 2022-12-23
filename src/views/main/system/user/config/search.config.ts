const searchConfig = {
  formItems: [
    {
      type: "input",
      prop: "name",
      label: "用户名",
      placeholder: "请输入用户名"
    },
    {
      type: "input",
      prop: "realname",
      label: "真实姓名",
      placeholder: "请输入真实姓名"
    },
    {
      type: "input",
      prop: "cellphone",
      label: "手机号码",
      placeholder: "请输入手机号码"
    },
    {
      type: "select",
      prop: "status",
      label: "状态",
      placeholder: "请选择状态",
      options: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 }
      ]
    },
    {
      type: "date-picker",
      prop: "createTime",
      label: "创建时间"
    }
  ]
}

export default searchConfig
