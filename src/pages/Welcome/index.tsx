import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Divider, Space, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledPageContainer = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
`;

const StyledCard = styled(Card)`
  width: 600px;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  margin: 20px auto;
`;

const Index: React.FC = () => {
  return (
    <StyledPageContainer>
      <StyledCard>
        <Typography.Title level={1} style={{ color: '#434343', fontSize: '2.5em' }}>
          欢迎来到muxue的世界！
        </Typography.Title>
        {/*<Image*/}
        {/*  width={100}*/}
        {/*  src="https://www.muxuetianyin.cn/wp-content/uploads/2023/08/logo-01.png"*/}
        {/*/>*/}
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Divider />
          <Typography.Paragraph>
            岁月悠悠，道路险阻，我们总是用顺其自然来敷衍人生道路上面的荆棘坎坷，却很少承认，真正的顺其自然是竭尽全部力量后的不强求，而并非是两手一摊，只有抱怨和埋怨的不作为。
          </Typography.Paragraph>
          <Divider />
          <Typography.Paragraph>不要放弃你的梦想，总有一天它会在你手中闪耀。</Typography.Paragraph>
          <Divider />
          {/*<Typography.Paragraph>*/}
          {/*  我们的目标是为你提供一个友好，开放，和富有创造力的环境，让你可以自由地探索，学习，和创造。*/}
          {/*</Typography.Paragraph>*/}
          {/*<Divider />*/}
        </Space>
        <Button type="primary" href="/profile" size="large" style={{ marginRight: '10px' }}>
          查看我的资料
        </Button>
        <Button type="default" href="/projects" size="large">
          查看我的项目
        </Button>
      </StyledCard>
    </StyledPageContainer>
  );
};

export default Index;
