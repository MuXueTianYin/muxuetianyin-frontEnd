// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** save POST /api/addressBook */
export async function saveUsingPOST(body: API.AddressBook, options?: { [key: string]: any }) {
  return request<API.BaseResponseAddressBook_>('/api/addressBook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get GET /api/addressBook/${param0} */
export async function getUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseAddressBook_>(`/api/addressBook/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getDefault GET /api/addressBook/default */
export async function getDefaultUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseAddressBook_>('/api/addressBook/default', {
    method: 'GET',
    ...(options || {}),
  });
}

/** setDefault PUT /api/addressBook/default */
export async function setDefaultUsingPUT(body: API.AddressBook, options?: { [key: string]: any }) {
  return request<API.BaseResponseAddressBook_>('/api/addressBook/default', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** list GET /api/addressBook/list */
export async function listUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListAddressBook_>('/api/addressBook/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
