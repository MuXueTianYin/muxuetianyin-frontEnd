import { SmileOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Result, Typography } from 'antd';
import React from 'react';
import './404.less'; // 引入自定义的样式文件

const { Title, Paragraph } = Typography;

const NoFoundPage: React.FC = () => (
  <div className="not-found-page">
    <Result
      icon={<SmileOutlined style={{ color: '#f5222d' }} />} // 使用Ant Design的图标，并添加自定义颜色
      status="404"
      title={
        <Title level={2} style={{ color: '#f5222d' }}>
          未能找到你的女朋友
        </Title>
      }
      subTitle={<Paragraph>强化身高、颜值和银行卡存款等属性</Paragraph>}
      extra={
        <div>
          <Button type="primary" onClick={() => history.replace('/')} style={{ marginRight: '10px' }}>
            重新降临该世界
          </Button>
          <Button type="default" onClick={() => history.push('/')}>
            查看热门内容
          </Button>
        </div>
      }
    />
    <div className="additional-info">
      <Paragraph style={{ color: '#000000', textAlign: 'center' }}>请试试以下方法...</Paragraph>
    </div>
  </div>
);

export default NoFoundPage;
