import Footer from '@/components/Footer';
import { register } from '@/services/muxue-service/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProConfigProvider, ProFormText } from '@ant-design/pro-components';
import { Helmet, history } from '@umijs/max';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Settings from '../../../../config/defaultSettings';
import './register.less';

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
const Register: React.FC = () => {
  // const isDev = process.env.NODE_ENV === 'development';
  // console.log(isDev)
  const [userRegisterState, setuserRegisterState] = useState<API.RegisterResult>({});
  const [type, setType] = useState<string>('account');
  const handleSubmit = async (values: API.RegisterParams) => {
    const { userPassword, checkPassword } = values;
    if (userPassword !== checkPassword) {
      message.error('两次输入的密码不一致');
      return;
    }
    try {
      // 注册接口
      const data = await register({
        ...values,
      });
      if (data.code === 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        const urlParams = new URL(window.location.href).searchParams;
        /*
         * 注册成功跳转到登录页，注册的位置
         * */
        history.push('/user/login?redirect=' + urlParams.get('redirect'));
        // history.push(urlParams.get('redirect') || '/');
        return;
      } else {
        throw new Error('register error result=' + data);
      }
      // console.log(data);
      // 如果失败去设置用户错误信息
      setuserRegisterState(data);
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { code, message: msg } = userRegisterState;
  return (
    <ProConfigProvider dark>
      <div className="containerClassName">
        <Helmet>
          <title>
            {'注册'}- {Settings.title}
          </title>
        </Helmet>
        {/*<Lang />*/}
        <div className="content-wrap">
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
            submitter={{
              searchConfig: {
                submitText: '注册',
              },
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.RegisterParams);
            }}
          >
            <Tabs
              activeKey={type}
              onChange={setType}
              centered
              items={[
                {
                  key: 'account',
                  label: '账号密码注册',
                },
              ]}
            />

            {code !== 0 && msg && <LoginMessage content={'注册失败'} />}
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
                <ProFormText.Password
                  name="checkPassword"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined />,
                  }}
                  placeholder={'请确认密码'}
                  rules={[
                    {
                      required: true,
                      message: '确认密码是必填项！',
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

            <div>
              <Link
                style={{
                  float: 'right',
                  marginBottom: 14,
                  // color: "blue"
                }}
                to="/user/login"
                // onClick={() => {
                //   history.push('/user/login');
                // }}
              >
                已有账号去登录
              </Link>
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
export default Register;
