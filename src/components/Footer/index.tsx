import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
import './Footer.less';
const Footer: React.FC = () => {
  const defaultMessage = '版权归苏永儿所有';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
        padding: '0',
        margin: '0',
        color: '#807e7d',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'muxeutianyin',
          title: '暮雪天音',
          href: 'https://www.muxuetianyin.cn',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/MuXueTianYin',
          blankTarget: true,
        },
        {
          key: 'suyonger',
          title: 'muxeutianyin',
          href: 'https://www.muxuetianyin.cn',
          blankTarget: true,
        },
        {
          key: 'beian',
          title: (
            <React.Fragment>
              <div style={{ fontSize: '16px', color: '#999', padding: '10px 0' }}>
                <a
                  href="https://beian.miit.gov.cn/"
                  style={{
                    marginRight: '10px',
                    color: '#807e7d',
                    fontSize: '14px',
                    fontStyle: 'italic',
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  备案号
                </a>
                <a
                  href="https://beian.miit.gov.cn/"
                  style={{ color: '#807e7d', fontSize: '14px', fontStyle: 'italic' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  粤ICP备2022126574号-2
                </a>
              </div>
            </React.Fragment>
          ),
          href: '#', // 占位符
        },
      ]}
    ></DefaultFooter>
  );
};
export default Footer;
