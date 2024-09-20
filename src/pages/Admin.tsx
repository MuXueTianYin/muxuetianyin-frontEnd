import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { Alert, Card, Typography } from 'antd';
import React from 'react';
const Admin: React.FC = () => {
  return (
    <PageContainer content={' 这个页面只有 Admin 权限才能查看'}>
      <Card>
        <Alert
          message={'Love ya!'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48,
          }}
        />
        <Typography.Title
          level={2}
          style={{
            textAlign: 'center',
          }}
        >
          <SmileTwoTone /> You complete me I <HeartTwoTone twoToneColor="#eb2f96" /> You
        </Typography.Title>
      </Card>
      <p
        style={{
          textAlign: 'center',
          marginTop: 24,
        }}
      >
        今天遇到一个人，背影好像你-
        <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
          陌上花开
        </a>
      </p>
    </PageContainer>
  );
};
export default Admin;
