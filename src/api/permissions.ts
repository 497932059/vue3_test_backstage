import request from "@/utils/request";

// 查询列表
export function fetchPermissionList(params?: any): Promise<any> {
  return request({
    url: "/admin/permissions",
    method: "get",
    params,
  });
}

// 查询单条
export interface Permission {
  api: string | null;
  component: string | null;
  icon: string | null;
  method: string | null;
  title: string;
  id: number;
  path: null | string;
  level: number;
  parentId: number;
  sort: number;
}
export interface fetchPermissionRes {
  data: {
    permission: Permission;
  };
}
export function fetchPermission(id: number): Promise<fetchPermissionRes> {
  return request({
    url: `/admin/permissions/${id}`,
    method: "get",
  });
}

// 创建
export function createPermission(data: {
  api: string | null;
  component: string | null;
  method: string | null;
  title: string;
  path: null | string;
  level: number;
  parentId: number;
  sort: number;
}): Promise<any> {
  return request({
    url: "/admin/permissions",
    method: "post",
    data,
  });
}

// 修改
interface updatePermissionData {
  api: string | null;
  component: string | null;
  icon: string | null;
  method: string | null;
  title: string;
  path: null | string;
  level: number;
  sort: number;
  parentId: number;
}
export function updatePermission(
  id: number,
  data: updatePermissionData
): Promise<any> {
  return request({
    url: `/admin/permissions/${id}`,
    method: "put",
    data,
  });
}

// 删除
export function deletePermission(id: number): Promise<any> {
  return request({
    url: `/admin/permissions/${id}`,
    method: "delete",
  });
}

// 修改排序
export interface SortData {
  id: number;
  sort: number;
}
export function changePermissionSort(data: {
  sorts: Array<SortData>;
}): Promise<any> {
  return request({
    url: `/admin/permissions/change_sort`,
    method: "patch",
    data: {
      sorts: data.sorts,
    },
  });
}
