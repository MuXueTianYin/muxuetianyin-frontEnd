// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 设置店铺的营业状态 PUT /api/shop/${param0} */
export async function setStatusUsingPUT(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setStatusUsingPUTParams,
  options?: { [key: string]: any },
) {
  const { status: param0, ...queryParams } = params;
  return request<API.Result>(`/api/shop/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取店铺的营业状态 GET /api/shop/status */
export async function getStatusUsingGET(options?: { [key: string]: any }) {
  return request<API.Result>('/api/shop/status', {
    method: 'GET',
    ...(options || {}),
  });
}
