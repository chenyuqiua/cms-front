import hyRequest from ".."

/**
 * 查询全部/分页查询/按条件查询权限(角色)信息
 * @param queryInfo 查询条件, 不传则查询全部
 * @returns 满足条件数据列表
 */
export function selectRoleListData(queryInfo: any) {
  return hyRequest.post({
    url: "/roles/list",
    data: queryInfo
  })
}

/**
 * 查询全部/分页查询/按条件查询部门信息
 * @param queryInfo 查询条件, 不传则查询全部
 * @returns 满足条件数据列表
 */
export function selectDepListData(queryInfo: any) {
  return hyRequest.post({
    url: "/deps/list",
    data: queryInfo
  })
}

/**
 * 查询全部菜单信息
 * @param queryInfo
 * @returns
 */
export function selectMenuListData(queryInfo: any = {}) {
  return hyRequest.post({
    url: "/menus/list",
    data: queryInfo
  })
}
