import request from "@/utils/request";

// 查询列表
export function fetchUserList(params?: any): any {
  return request({
    url: "/admin/users",
    method: "get",
    params,
  });
}

// 查询单条
export function fetchUser(id: number): any {
  return request({
    url: `/admin/users/${id}`,
    method: "get",
  });
}

// 创建
export function createUser(data: any): any {
  return request({
    url: "/admin/users",
    method: "post",
    data,
  });
}

// 修改
export function updateUser(id: number, data: any): any {
  return request({
    url: `/admin/users/${id}`,
    method: "put",
    data,
  });
}

// 删除
export function deleteUser(id: number): any {
  return request({
    url: `/admin/users/${id}`,
    method: "delete",
  });
}

// 查询登录后用户信息、用户组、获得的权限
export function getMe(): any {
  return request({
    url: "/admin/users/me",
    method: "get",
  });
}
