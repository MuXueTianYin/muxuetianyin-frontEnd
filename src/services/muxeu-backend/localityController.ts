// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** serveFile GET /api/images/user-center/${param0} */
export async function serveFileUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.serveFileUsingGETParams,
  options?: { [key: string]: any },
) {
  const { filename: param0, ...queryParams } = params;
  return request<API.Resource>(`/api/images/user-center/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** serveFileBase64 GET /api/uploads/file/${param0} */
export async function serveFileBase64UsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.serveFileBase64UsingGETParams,
  options?: { [key: string]: any },
) {
  const { filename: param0, ...queryParams } = params;
  return request<API.Resource>(`/api/uploads/file/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
