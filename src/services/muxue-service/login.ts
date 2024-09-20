// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(body: {
  // query
  /** 手机号 */
  phoneNumber?: string;
  //短信类型
  message: String;
  code: '';
}) {
  return request<API.result<any>>('/api/user/sendSms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

/** 手机号登录 POST /api/user/phoneLogin */
export async function mobiLogon(body: {
  // query
  /** 手机号 */
  phoneNumber: string;
  autoLogin: boolean;
  //短信类型
  message?: String;
  code: String;
}) {
  return request<API.result<any>>('/api/user/phoneLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}
