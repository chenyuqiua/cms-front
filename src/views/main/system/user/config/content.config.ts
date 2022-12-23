const contentConfig = {
  pageName: "users",
  header: {
    title: "用户列表",
    btnText: "新建用户"
  },
  propsList: [
    { type: "selection", label: "选择" },
    { type: "index", label: "序号", width: "60px" },
    { type: "normal", label: "用户名", prop: "name" },
    { type: "normal", label: "真实姓名", prop: "realname" },
    { type: "normal", label: "手机号码", prop: "cellphone", width: "115px" },
    { type: "userStatus", label: "状态", prop: "status" },
    { type: "normal", label: "创建时间", prop: "createTime", width: "170px" },
    { type: "normal", label: "更新时间", prop: "updateTime", width: "170px" },
    { type: "user", label: "创建人", prop: "createUser" },
    { type: "user", label: "更新人", prop: "updateUser" },
    { type: "handler", label: "操作", width: "170px" }
  ]
}

export default contentConfig
