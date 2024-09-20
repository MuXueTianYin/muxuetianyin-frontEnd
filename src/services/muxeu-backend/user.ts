// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前用户 GET /api/user/current */
export async function getCurrentUserUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserDto_>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除用户 POST /api/user/delete */
export async function logicalDeleteUserUsingPOST1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.logicalDeleteUserUsingPOST1Params,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/user/delete', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询用户列表 POST /api/user/list/page */
export async function listInterfaceInfoByPageUsingPOST1(
  body: API.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserDto_>('/api/user/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/login */
export async function userLoginUsingPOST(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseTokenResponse_>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注销接口 POST /api/user/logout */
export async function logoutUsingPOST(
  body: API.RefreshTokenRequest,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/user/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 手机号登录接口 POST /api/user/phoneLogin */
export async function phoneLoginUsingPOST(body: API.SmsRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseTokenResponse_>('/api/user/phoneLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register */
export async function userRegisterUsingPOST(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送短信接口 POST /api/user/sendSms */
export async function sendSmsUsingPOST(body: API.SmsRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponse>('/api/user/sendSms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 刷新Token 使用刷新Token来获取新的访问Token POST /api/user/token/refresh */
export async function refreshAccessTokenUsingPOST(
  body: API.RefreshTokenRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseTokenResponse_>('/api/user/token/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改用户信息 PUT /api/user/update */
export async function updateUserUsingPUT(
  body: API.UserUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/api/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改当前用户信息 POST /api/user/update/my */
export async function updateMyUserUsingPOST(
  body: API.UserUpdateMyRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/update/my', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改用户密码 POST /api/user/updatePassword */
export async function updateUserPasswordUsingPOST(
  body: API.UserPasswordUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/user/updatePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userInfo GET /api/user/user/info */
export async function userInfoUsingGET(options?: { [key: string]: any }) {
  return request<string>('/api/user/user/info', {
    method: 'GET',
    ...(options || {}),
  });
}
