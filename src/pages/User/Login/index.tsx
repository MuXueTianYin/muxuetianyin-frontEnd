import Footer from '@/components/Footer';
import { login } from '@/services/muxue-service/api';
import { getFakeCaptcha, mobiLogon } from '@/services/muxue-service/login';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Helmet, history } from '@umijs/max';
import { Alert, Divider, Form, message, Space, Tabs } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Settings from '../../../../config/defaultSettings';
import './css/login.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  // const isDev = process.env.NODE_ENV === 'development';
  // console.log(isDev)
  // @ts-ignore
  const [userLoginState, setUserLoginState] = useState<API.result<API.LoginResult>>({});
  const [type, setType] = useState<string>('account');

  const handleSubmit = async (values: any) => {
    try {
      // 登录
      let response;
      delete values.autoLogin;
      if (type === 'mobile') {
        response = await mobiLogon({
          ...values,
        });
      } else {
        response = await login({
          ...values,
        });
      }
      if (response.code === 0) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        localStorage.setItem('token', response.data.accessToken); // 保存 token 到 localStorage
        localStorage.setItem('refreshToken', response.data.refreshToken); // 保存 token 到 localStorage
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      console.log(response.message);
      setUserLoginState(response);
    } catch (error) {
      // const defaultLoginFailureMessage = '登录失败，请重试！';
      // console.log(error);
      // message.error(defaultLoginFailureMessage);
    }
  };
  const { code, message: msg } = userLoginState;
  const [form] = Form.useForm();
  return (
    <ProConfigProvider dark>
      <div className="containerClassName">
        <Helmet>
          <title>
            {'登录'} {Settings.title}
          </title>
        </Helmet>
        {/*<Lang />*/}
        <div
          style={{
            flex: '1',
            padding: '32px 0',
          }}
          className="content-wrap"
        >
          <LoginForm
            contentStyle={{
              width: 'max-content',
              minWidth: 280,
              maxWidth: '75vw',
              backgroundColor: 'rgba(0, 0, 0,0.65)',
              padding: '30px',
              color: 'white',
            }}
            logo={<img alt="logo" src="/login1.svg" />}
            title={<span className="loginFormTitle">暮雪天音</span>}
            subTitle={
              <span className="loginFormSubTitle">蒹葭苍苍，白露为霜。所谓伊人，在水一方</span>
            }
            initialValues={{
              autoLogin: true,
            }}
            form={form}
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            <Tabs
              activeKey={type}
              onChange={setType}
              centered
              items={[
                {
                  key: 'account',
                  label: '账户密码登录',
                },
                {
                  key: 'mobile',
                  label: '手机号登录',
                },
              ]}
            />

            {code !== 0 && msg === '请求参数错误' && (
              <LoginMessage content={'错误的用户名和密码'} />
            )}
            {type === 'account' && (
              <>
                <ProFormText
                  name="userAccount"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined />,
                  }}
                  placeholder={'请输入用户名'}
                  rules={[
                    {
                      required: true,
                      message: '用户名是必填项！',
                    },
                    {
                      min: 4,
                      type: 'string',
                      message: '长度不能小于4位！',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="userPassword"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined />,
                  }}
                  placeholder={'请输入密码'}
                  rules={[
                    {
                      required: true,
                      message: '密码是必填项！',
                    },
                    {
                      min: 8,
                      type: 'string',
                      message: '长度不能小于8位！',
                    },
                  ]}
                />
              </>
            )}

            {/*{code !== 0  && msg  && <LoginMessage content="验证码错误" />}*/}
            {type === 'mobile' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined />,
                  }}
                  name="phoneNumber"
                  placeholder={'请输入手机号！'}
                  rules={[
                    {
                      required: true,
                      message: '手机号是必填项！',
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: '不合法的手机号！',
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  placeholder={'请输入验证码！'}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${'秒后重新获取'}`;
                    }
                    return '获取验证码';
                  }}
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: '验证码是必填项！',
                    },
                  ]}
                  onGetCaptcha={async () => {
                    const phoneNumber = form.getFieldValue('phoneNumber');
                    const result = await getFakeCaptcha({
                      phoneNumber,
                      message: '登录短信',
                      code: '',
                    });
                    if (result.code !== 0) {
                      message.error(result.message);
                      return;
                    }
                    message.success('获取验证码成功~');
                  }}
                />
              </>
            )}
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <Space split={<Divider type="vertical" />} size={'small'}>
                <ProFormCheckbox noStyle name="autoLogin">
                  自动登录
                </ProFormCheckbox>
                <Link
                  // onClick={()=>{ history.push( '/user/register');}}
                  to="/user/register"
                >
                  没有账号去注册
                </Link>
                <a href="#">忘记密码？</a>
              </Space>
            </div>
          </LoginForm>
        </div>
        <div className="Footer">
          <Footer />
        </div>
      </div>
    </ProConfigProvider>
  );
};
export default Login;
