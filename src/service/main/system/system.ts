import hyRequest from "@/service"

/**
 * 查询全部/分页查询/按条件查询用户数据
 * @param queryInfo 查询条件, 不传则查询全部数据
 * @returns 满足条件数据列表
 */
export function selectUserListData(queryInfo: any = {}) {
  return hyRequest.post({
    url: "/users/list",
    data: queryInfo
  })
}

/**
 * 根据id查询用户
 * @param id 查询用户id
 * @returns 符合条件的用户信息
 */
export function selectUserById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

/**
 * 根据id删除用户数据
 * @param id 删除数据的id
 * @returns 返回提示信息字符串
 */
export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}

/**
 * 新增用户信息
 * @param userInfo 新增数据对象
 * @returns 操作结果
 */
export function createUserData(userInfo: any) {
  return hyRequest.post({
    url: "/users",
    data: userInfo
  })
}

/**
 * 修改用户数据
 * @param userInfo 修改的数据对象
 * @returns 操作结果
 */
export function updateUserData(userInfo: any) {
  return hyRequest.put({
    url: "/users",
    data: userInfo
  })
}

/**
 * 查询全部/分页查询/按条件查询页面数据
 * @param pageName 查询数据页面名称
 * @param queryInfo 查询条件, 不传则查询全部数据
 * @returns 满足条件数据列表
 */
export function selectPageListData(pageName: string, queryInfo: any = {}) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

/**
 * 根据id删除页面数据
 * @param pageName 删除数据页面名称
 * @param id 删除数据的id
 * @returns 操作结果
 */
export function deletePageById(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}

/**
 * 新增用户信息
 * @param pageName 新建数据页面名称
 * @param pageInfo  新增数据对象
 * @returns 操作结果
 */
export function createPageData(pageName: string, pageInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}

/**
 * 修改用户操作
 * @param pageName 修改数据页面名称
 * @param pageInfo 修改的数据对象
 * @returns 操作结果
 *
 */
export function updatePageData(pageName: string, pageInfo: any) {
  return hyRequest.put({
    url: `/${pageName}`,
    data: pageInfo
  })
}
