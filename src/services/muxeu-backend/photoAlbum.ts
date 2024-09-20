// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取所有不同的分类 GET /api/photoAlbum/categories */
export async function getAllCategoriesUsingGET(options?: { [key: string]: any }) {
  return request<API.Result>('/api/photoAlbum/categories', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除文件（逻辑删除） POST /api/photoAlbum/delete */
export async function logicalDeleteUserUsingPOST(body: number, options?: { [key: string]: any }) {
  return request<API.Result>('/api/photoAlbum/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除图片和数据(相册表) DELETE /api/photoAlbum/delete/${param0} */
export async function deletePhotoUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletePhotoUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Result>(`/api/photoAlbum/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 通用删除已上传文件 DELETE /api/photoAlbum/deleteFile/${param0} */
export async function deleteFileUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteFileUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { url: param0, ...queryParams } = params;
  return request<API.Result>(`/api/photoAlbum/deleteFile/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 保存照片到相册 POST /api/photoAlbum/save */
export async function handleFileSaveUsingPOST(
  body: API.PhotoalbumRequest,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/photoAlbum/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取照片列表 GET /api/photoAlbum/search */
export async function getAllPhotoAlbumsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllPhotoAlbumsUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/photoAlbum/search', {
    method: 'GET',
    params: {
      // size has a default value: 10
      size: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 上传照片 POST /api/photoAlbum/upload */
export async function handleFileUploadUsingPOST(
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<API.Result>('/api/photoAlbum/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 上传头像 POST /api/photoAlbum/uploadAvatar */
export async function handleAvatarUploadUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.handleAvatarUploadUsingPOSTParams,
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<API.Result>('/api/photoAlbum/uploadAvatar', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 上传文件（Base64） POST /api/photoAlbum/uploadBase64 */
export async function handleFileUploadBase64UsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.handleFileUploadBase64UsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/photoAlbum/uploadBase64', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 上传图片并保存到相册 POST /api/photoAlbum/uploadPhotoAlbums */
export async function handlePhotoAlbumsUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.handlePhotoAlbumsUsingPOSTParams,
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<API.Result>('/api/photoAlbum/uploadPhotoAlbums', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
