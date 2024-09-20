// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// import {API} from "@/services/muxue-service/typings";

/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.result<API.LoginResult>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.RegisterResult>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 删除用户接口 POST /api/user/delete */
export async function handlerDelete(id: number) {
  return request<API.result<null>>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: id,
  });
}
/** 搜索用户 POST /api/user/search */
export async function searchUsers(params?: { [key: string]: any }) {
  return request<API.result<API.Current[]>>('/api/user/search', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 删除图片 POST /api/photoAlbum/delete */
export async function delImages(id?: number) {
  return request<API.result<String>>(`/api/photoAlbum/delete/${id}`, {
    method: 'DELETE',
  });
}

/** 搜索图片接口 POST /api/photoAlbum/search */
export async function searchImages(params?: { [key: string]: any }) {
  return request<API.getImageList>('/api/photoAlbum/search', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
/** 搜索获取照片分类接口 POST /api/photoAlbum/categories */
export async function getAllCategories() {
  return request<API.result<any>>('/api/photoAlbum/categories', {
    method: 'GET',
  });
}
/** 保存图片接口 POST /api/photoAlbum/save */
export async function ImageSave(body: API.ImageSaveParams) {
  return request<API.result<API.ImageList[]>>('/api/photoAlbum/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}
/** 上传图片接口 POST /api/photoAlbum/upload */
export async function upload(formData: any) {
  return request<API.result<any>>('/api/photoAlbum/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
}

/*
 *
 * 获取学生列表
 * POST /api/students/search */
export async function getStudents(params?: { [key: string]: any }) {
  return request<API.result<API.resultData<API.students>>>('/api/students/search', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/*
 *
 * 修改用户信息
 *  PUT /api/rule */
export async function updateUser(params?: { [key: string]: any }) {
  return request<API.result<null>>('/api/user/update', {
    method: 'PUT',
    params: {
      ...params,
    },
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
