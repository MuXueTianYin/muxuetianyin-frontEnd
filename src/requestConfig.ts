import { refreshAccessTokenUsingPOST } from '@/services/muxeu-backend/user';
import { eventBus } from '@/utils/EventBus';
import { history } from '@@/core/history';
import type { RequestConfig, RequestOptions } from '@@/plugin-request/request';
import { message } from 'antd';
import { request } from 'umi';
// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}
// 辅助函数，用于处理登录失败后的操作
function handleLoginFailure(msg: string) {
  message.error(msg);
  localStorage.removeItem('token');
  history.replace({
    pathname: '/user/login',
  });
}
// 处理 token 刷新逻辑
function handleTokenRefresh(refreshToken: string) {
  return refreshAccessTokenUsingPOST({ refreshToken })
    .then((res) => {
      const accessToken = res.data ? res.data.accessToken : '';
      if (accessToken) {
        localStorage.setItem('token', accessToken);
        eventBus.emit('tokenRefreshed');
        return true; // 表示成功刷新
      } else {
        handleLoginFailure('无法获取新的访问令牌');
        return false; // 表示刷新失败
      }
    })
    .catch((error) => {
      console.error(error);
      handleLoginFailure('登录状态已过期，请重新登录');
      return false; // 表示刷新失败
    });
}
/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      let url = config?.url;
      console.log(url, config, process.env.NODE_ENV, '请求拦截器');
      if (url !== '/api/user/login' && url !== '/api/user/register') {
        const token = localStorage.getItem('token');
        if (token) {
          // @ts-ignore
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      } else {
        localStorage.removeItem('token');
      }
      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      const { data } = response as unknown as ResponseStructure;
      if (response.status !== 200) {
        message.error('网络请求失败');
        throw new Error('网络请求失败');
      }
      if (data?.code === 40100) {
        message.error('请先登录！');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        history.replace({
          pathname: '/user/login',
        });
        throw new Error('请先登录！');
      }
      if (data?.code === 40102) {
        const { url, ...restConfig } = response.config;
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          handleTokenRefresh(refreshToken).then((success) => {
            if (success) {
              // 重新尝试原请求
              if (typeof url === 'string') {
                return request(url, restConfig);
              } else {
                console.error('URL is undefined');
                message.error(data.message);
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                history.replace({ pathname: '/user/login' });
                throw new Error('URL is undefined');
                // return Promise.reject(new Error('URL is undefined'));
              }
            } else {
              message.error(data.message);
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              history.replace({ pathname: '/user/login' });
              throw new Error('Token refresh failed');
            }
          });
        } else {
          message.error(data.message);
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          history.replace({ pathname: '/user/login' });
          throw new Error(data.message);
        }
      }
      if (data?.code !== 0) {
        message.error(data.message);
        throw new Error(String(data.message));
      }
      return response;
    },
  ],
};
