import request from "@/utils/request";

// 查询列表
export function fetchRoleList(params?: any): Promise<any> {
  return request({
    url: "/admin/roles",
    method: "get",
    params,
  });
}

// 查询单条
export function fetchRole(id: number): Promise<any> {
  return request({
    url: `/admin/roles/${id}`,
    method: "get",
  });
}

//修改和创建的data参数的接口类型
interface RoleData {
  name: string;
  sort: number;
  permissions: number[];
}
// 创建
export function createRole(data: RoleData): Promise<any> {
  return request({
    url: "/admin/roles",
    method: "post",
    data,
  });
}

// 修改
export function updateRole(id: number, data: RoleData): Promise<any> {
  return request({
    url: `/admin/roles/${id}`,
    method: "put",
    data,
  });
}

// 删除
export function deleteRole(id: number): Promise<any> {
  return request({
    url: `/admin/roles/${id}`,
    method: "delete",
  });
}

// 修改排序
export function changeRoleSort(id: number, data: any): Promise<any> {
  return request({
    url: `/admin/roles/${id}/change_sort`,
    method: "patch",
    data,
  });
}
