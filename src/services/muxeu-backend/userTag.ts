// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** deleteTag DELETE /api/userTag */
export async function deleteTagUsingDELETE1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTagUsingDELETE1Params,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.Result>('/api/userTag', {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新用户标签 POST /api/userTag/update */
export async function updateUserTagUsingPOST(
  body: API.UserTagQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/userTag/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
