// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 根据id获取标签 GET /api/tags/${param0} */
export async function getTagUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTagUsingGETParams,
  options?: { [key: string]: any },
) {
  const { tagId: param0, ...queryParams } = params;
  return request<API.Result>(`/api/tags/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除标签 DELETE /api/tags/${param0} */
export async function deleteTagUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTagUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { tagId: param0, ...queryParams } = params;
  return request<API.BaseResponseString_>(`/api/tags/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 创建新的标签 POST /api/tags/add */
export async function createUsingPOST1(body: API.TagAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseTag_>('/api/tags/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取标签 GET /api/tags/list/page */
export async function getAllTagByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllTagByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageTag_>('/api/tags/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新标签 PUT /api/tags/update */
export async function updateTagUsingPUT(
  body: API.TagUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/tags/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户的所有标签 GET /api/tags/user/${param0}/tags */
export async function getUserTagsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserTagsUsingGETParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.Result>(`/api/tags/user/${param0}/tags`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
