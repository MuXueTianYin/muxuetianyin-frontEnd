// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** getSetmeal GET /api/setmeal */
export async function getSetmealUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSetmealUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageSetmealDto_>('/api/setmeal', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Delete DELETE /api/setmeal */
export async function DeleteUsingDELETE1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeleteUsingDELETE1Params,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/setmeal', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增套餐 POST /api/setmeal/add */
export async function saveUsingPOST3(body: API.SetmealDto, options?: { [key: string]: any }) {
  return request<API.Result>('/api/setmeal/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 套餐起售停售 POST /api/setmeal/status/${param0} */
export async function startOrStopUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.startOrStopUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { status: param0, ...queryParams } = params;
  return request<API.Result>(`/api/setmeal/status/${param0}`, {
    method: 'POST',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
