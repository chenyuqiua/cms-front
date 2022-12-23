const contentConfig = {
  pageName: "menus",
  header: {
    title: "菜单列表",
    btnText: "新建菜单"
  },
  isFooterShow: false,
  propsList: [
    { label: "菜单名称", prop: "name", width: "120px" },
    { label: "菜单级别", prop: "type" },
    { label: "菜单地址", prop: "url", width: "170px" },
    { label: "菜单图标", prop: "icon", width: "190px" },
    { label: "创建时间", prop: "createTime", width: "170px" },
    { label: "更新时间", prop: "updateTime", width: "170px" },
    { type: "user", label: "创建人", prop: "createUser" },
    { type: "user", label: "更新人", prop: "updateUser" }
  ],
  childrenTree: {
    rowKey: "id"
  }
}

export default contentConfig
