// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 修改商品 PUT /api/product */
export async function updateUsingPUT1(
  body: API.ProductAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/product', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增商品 POST /api/product */
export async function saveUsingPOST2(
  body: API.ProductAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Delete DELETE /api/product */
export async function DeleteUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeleteUsingDELETEParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/product', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据id查询商品和商品属性 GET /api/product/${param0} */
export async function getUsingGET2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsingGET2Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Result>(`/api/product/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** page GET /api/product/list/page */
export async function pageUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageProductDto_>('/api/product/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
