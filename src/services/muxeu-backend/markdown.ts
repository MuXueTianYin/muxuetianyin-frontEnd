// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** createDocument POST /api/markdown */
export async function createDocumentUsingPOST(
  body: API.DocumentModificationRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseMarkdowndocuments_>('/api/markdown', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteDocuments DELETE /api/markdown */
export async function deleteDocumentsUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDocumentsUsingDELETEParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/markdown', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateDocument PUT /api/markdown/${param0} */
export async function updateDocumentUsingPUT(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateDocumentUsingPUTParams,
  body: API.DocumentModificationRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseMarkdowndocuments_>(`/api/markdown/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** getDocumentsByTags POST /api/markdown/by-tags */
export async function getDocumentsByTagsUsingPOST(
  body: API.MarkdowmIdsRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageMarkdowmDto_>('/api/markdown/by-tags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getDocuments POST /api/markdown/documents */
export async function getDocumentsUsingPOST(
  body: API.MarkdowmRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageMarkdowmDto_>('/api/markdown/documents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** recommend GET /api/markdown/recommend */
export async function recommendUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponsePageMarkdowmDto_>('/api/markdown/recommend', {
    method: 'GET',
    ...(options || {}),
  });
}

/** uploadMarkdown POST /api/markdown/uploadMarkdown */
export async function uploadMarkdownUsingPOST(
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

  return request<API.BaseResponseMarkdowndocuments_>('/api/markdown/uploadMarkdown', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** uploadPdfToText POST /api/markdown/uploadPdf */
export async function uploadPdfToTextUsingPOST(
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

  return request<API.BaseResponseMarkdowndocuments_>('/api/markdown/uploadPdf', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** uploadWordToMarkdown POST /api/markdown/uploadWord */
export async function uploadWordToMarkdownUsingPOST(
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

  return request<API.BaseResponseMarkdowndocuments_>('/api/markdown/uploadWord', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
