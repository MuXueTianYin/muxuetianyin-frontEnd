// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 修改分类 PUT /api/ProductCategory */
export async function updateUsingPUT(body: API.ProductCategory, options?: { [key: string]: any }) {
  return request<API.Result>('/api/ProductCategory', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 DELETE /api/ProductCategory */
export async function deleteUsingDELETE1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingDELETE1Params,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/ProductCategory', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分頁查詢 GET /api/ProductCategory/list */
export async function pageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageProductCategory_>('/api/ProductCategory/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建商品分类 POST /api/ProductCategory/save */
export async function saveUsingPOST1(
  body: API.ProductCategoryAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/ProductCategory/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
