import { CaretRightOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Collapse, Divider, Image, List, Tag, Timeline, Typography } from 'antd';
import React from 'react';
import myImage from '../../../../public/image/2.jpg';

const skills = [
  'React',
  'Java',
  'SpringBoot',
  'Vue',
  'uni-app',
  '微信小程序',
  'Flutter',
  'ReactNative',
  'MySQL',
  'redis',
  'Nginx',
  'Python',
  'Node.js',
  'TypeScript',
];
const { Panel } = Collapse;

const data = [
  {
    title: '姓名',
    description: <Typography.Text strong>苏卓彬</Typography.Text>,
  },
  {
    title: '职位',
    description: '全栈开发工程师',
  },
  {
    title: '电话',
    description: '18718322554',
  },
  {
    title: '邮箱',
    description: 'muxuetianyin.@163.com',
  },
  {
    title: '教育背景',
    description: '北京大学 计算机科学与技术',
  },
  {
    title: '工作经验',
    description: '阿里巴巴 2018-2021',
  },
  {
    title: '其他链接',
    description: <a href="https://www.muxuetianyin.cn/">http://center.muxuetianyin.cn</a>,
  },
  {
    title: '技能',
    description: skills.map((skill) => (
      <Tag color="blue" key={skill}>
        {skill}
      </Tag>
    )),
  },
];

const Profile: React.FC = () => {
  return (
    <PageContainer content="个人资料">
      <Card>
        <Image width={200} src={myImage} />
        <Typography.Title level={2}>个人资料</Typography.Title>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<Typography.Text strong>{item.title}</Typography.Text>}
                description={item.description}
              />
            </List.Item>
          )}
        />
        <Divider />
        <Typography.Title level={4}>个人项目</Typography.Title>
        <Collapse
          defaultActiveKey={['1']}
          bordered={false}
          ghost
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          className="site-collapse-custom-collapse"
        >
          <Panel
            header={<Typography.Text strong>项目一：muxue-user</Typography.Text>}
            key="1"
            className="site-collapse-custom-panel"
          >
            <Typography.Title level={5}>项目概述：</Typography.Title>
            <p>
              这是一个前后端分类的项目，包括用户的增删改查、权限管理等功能。该项目使用了最新的前端和后端技术栈，具有高性能、易维护和良好的用户体验。
            </p>
            <Typography.Title level={5}>接口文档：</Typography.Title>
            <p>
              {/*<a href="https://muxuetianyin.cn/api/doc.html#/home">地址</a>*/}
              暂不公开
            </p>
            <Typography.Title level={5}>展示地址：</Typography.Title>
            <p>
              <a href="http://center.muxuetianyin.cn/user/login">http://center.muxuetianyin.cn</a>
            </p>
            <Typography.Title level={5}>项目亮点：</Typography.Title>
            <ul>
              <li>使用React和Ant Design Pro构建了一个现代化的用户界面。</li>
              <li>
                在脚手架自带的 umi-request
                请求库基础上进行改造和封装，添加全局请求拦截和全局异常处理逻辑、自动根据项目启动命令来区分环境，减少重复代码、提升项目可维护性。
              </li>
              <li>
                为了明确接口的返回，自定义统一的错误码，并封装了 全局异常处理器
                ，从而规范了异常返回、屏蔽了项目冗余的报错细节。
              </li>
              <li>使用Spring Boot和MyBatis Plus快速开发了后端应用。</li>
              <li>
                对图片上传读取服务器本地路径，可以配置权限访问，实现修改完成自动删除原有图片保证服务器内存
              </li>
              <li>使用Swagger接口文档更方便开发维护</li>
              <li>使用jjwt+token多端登录方便维护</li>
              <li>
                为减轻数据库压力，使用Redis对搜索结果进行和短信发送缓存，同时极大缩短了应用响应时间
              </li>
              <li>实现了完整的用户管理功能，包括用户的增删改查、权限管理等。</li>
              <li>
                采用Nginx和宝塔面板进行前端部署和反向代理，提高了部署效率和增强了软件系统的安全性{' '}
              </li>
            </ul>
          </Panel>
          <Panel
            header={<Typography.Text strong>项目二：muxue-together</Typography.Text>}
            key="2"
            className="site-collapse-custom-panel"
          >
            <Typography.Title level={5}>项目概述：</Typography.Title>
            <p>独立开发的基于vue3技术栈的移动端信息平台，采用前后端分离架构</p>
            <Typography.Title level={5}>项目亮点：</Typography.Title>
            <ul>
              <li>使用vue3和vant4构建的一个移动端应用。</li>
              <li>使用Intro.js对用户进行引导</li>
              <li>使用EasyExcel读取表格导出表格</li>
              <li>使用axios请求拦截器配置全局请求异常处理,全局配置请求头</li>
              <li>使用beforeEach全局配置登录token和未登录拦截页面重定向跳转</li>
              <li>
                文件上传：这个项目提供了文件上传的功能，支持直接上传文件和上传Base64编码的文件。上传的文件会被保存到服务器的本地文件系统中。
              </li>
              <li>文件删除：在更新照片信息时，旧的照片文件会被从服务器的本地文件系统中删除。</li>
            </ul>
          </Panel>
          <Panel
            header={<Typography.Text strong>项目三：only_You</Typography.Text>}
            key="3"
            className="site-collapse-custom-panel"
          >
            <Typography.Title level={5}>项目概述：</Typography.Title>
            <p>这是采用Flutter的一个跨平台多端的应用，接入OpenAi使用ChatGpt对话ai私人助理</p>
            <Typography.Title level={5}>项目亮点：</Typography.Title>
            <ul>
              <li>开发中</li>
            </ul>
          </Panel>
        </Collapse>
        <Divider />
        <Typography.Title level={4}>工作经历</Typography.Title>
        <Timeline>
          <Timeline.Item color="green">2018-2021 在阿里巴巴担任全栈开发工程师</Timeline.Item>
          <Timeline.Item color="green">2021-至今 在腾讯担任高级全栈开发工程师</Timeline.Item>
        </Timeline>
        <Divider />
        <Button type="primary" href="/welcome">
          返回欢迎页面
        </Button>
      </Card>
    </PageContainer>
  );
};

export default Profile;
