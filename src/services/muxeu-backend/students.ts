// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 添加学生信息 POST /api/students/add */
export async function addStudentUsingPOST(body: API.Students, options?: { [key: string]: any }) {
  return request<API.Result>('/api/students/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除学生信息 POST /api/students/delete */
export async function deleteStudentUsingPOST(body: number, options?: { [key: string]: any }) {
  return request<API.Result>('/api/students/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出表excel（需要使用postman测试） GET /api/students/export/${param0} */
export async function exportTableDataToExcelUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.exportTableDataToExcelUsingGETParams,
  options?: { [key: string]: any },
) {
  const { tableName: param0, ...queryParams } = params;
  return request<any>(`/api/students/export/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分类获取学生数据 POST /api/students/list/page */
export async function getAllStudentsByPageUsingPOST(
  body: API.StudentsQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStudents_>('/api/students/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改学生信息 POST /api/students/update */
export async function updateStudentUsingPOST(body: API.Students, options?: { [key: string]: any }) {
  return request<API.Result>('/api/students/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导入接口，超级管理员专用 POST /api/students/uploadExcel */
export async function uploadExcelUsingPOST(options?: { [key: string]: any }) {
  return request<string>('/api/students/uploadExcel', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 上传接口，超级管理员专用 POST /api/students/uploadFile */
export async function uploadFileUsingPOST1(
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

  return request<string>('/api/students/uploadFile', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
