import { HomeOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Card, Col, Image, Row, Space, Tag } from 'antd';
import React from 'react';
import project1Image from '../../../../public/image/project1.png';
import project2Image from '../../../../public/image/project2.png';
import project3Image from '../../../../public/image/project3.png';

const { Meta } = Card;
const ProjectIntroPage: React.FC = () => {
  const projects = [
    {
      title: 'muxue-user',
      description:
        '独立开发的后端基于SpringBoot和前端React技术栈的系统信息流整合平台，采用前后端分离架构',
      imageUrl: project1Image,
      projectUrl: 'http://together.muxuetianyin.cn/login',
      tags: [
        'React',
        'SpringBoot',
        'Swagger',
        'Redis',
        'Nginx',
        'JWT(JSON Web Tokens)',
        'Interceptor',
        'Ant Design Pro',
      ],
      status: '正在进行',
      highlights: [
        '使用React和Ant Design Pro构建了一个现代化的用户界面',
        '在脚手架自带的 umi-request 请求库基础上进行改造和封装，添加全局请求拦截和全局异常处理逻辑、自动根据项目启动命令来区分环境，减少重复代码、提升项目可维护性。',
        '为了明确接口的返回，自定义统一的错误码，并封装了 全局异常处理器 ，从而规范了异常返回、屏蔽了项目冗余的报错细节',
        '使用SpringBoot和MyBatis Plus快速开发了后端应用',
        '对图片上传读取服务器本地路径，可以配置权限访问，实现修改完成自动删除原有图片保证服务器内存',
        '使用jjwt+token对会话维持方便跨设备同步和用户权限变更',
        '使用Swagger接口文档更方便开发维护',
        'RESTful API设计：这个项目遵循了RESTful API的设计原则，例如使用HTTP的GET方法来获取资源，使用POST方法来创建资源，使用PUT或PATCH方法来更新资源，使用DELETE方法来删除资源。',
        '为减轻数据库压力，使用Redis对搜索结果进行和短信发送缓存，同时极大缩短了应用响应时间',
        '实现了完整的用户管理功能，包括用户的增删改查、权限管理等',
        '项目的代码组织结构清晰，每个组件都有自己的文件，相关的样式和逻辑都在同一个文件中，便于维护和理解',
        '采用Nginx和宝塔面板进行前端部署和反向代理，提高了部署效率和增强了软件系统的安全性',
      ],
    },
    {
      title: 'muxue-together',
      description: '',
      imageUrl: project2Image,
      projectUrl: 'http://together.muxuetianyin.cn/login',
      tags: ['vue3', 'TypeScript', 'Nginx', 'vant4', 'EasyExcel', 'axios', 'pinia', 'vite'],
      status: '正在进行',
      highlights: [
        '使用vue3和vant4构建的一个移动端应用。',
        '使用EasyExcel读取表格导出表格',
        '使用Intro.js对用户进行引导',
        'showLoadingToast对页面加载动画提示',
        '使用axios请求拦截器配置全局请求异常处理,全局配置请求头',
        '使用beforeEach全局配置登录token和未登录拦截页面重定向跳转',
        '文件上传：这个项目提供了文件上传的功能，支持直接上传文件和上传Base64编码的文件。上传的文件会被保存到服务器的本地文件系统中。',
        '文件删除：在更新照片信息时，旧的照片文件会被从服务器的本地文件系统中删除。',
      ],
    },
    {
      title: 'only_You',
      description: '这是采用Flutter的一个跨平台多端的应用，接入OpenAi使用ChatGpt对话ai私人助理',
      imageUrl: project3Image,
      projectUrl: '',
      tags: ['Flutter', 'hi_download', ''],
      status: '正在进行',
      highlights: [''],
    },
    // 其他项目...
  ];
  return (
    <div style={{ padding: '30px', background: 'linear-gradient(to right, #ece9e6, #ffffff)' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button type="primary" icon={<HomeOutlined />} onClick={() => history.push('/')}>
          返回首页
        </Button>
      </div>
      <Row gutter={24}>
        {projects.map((project, index) => (
          <Col span={12} key={index}>
            <Card
              hoverable
              cover={<Image width={200} alt={project.title} src={project.imageUrl} />}
              style={{
                boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                transition: '0.3s',
                borderRadius: '15px',
                marginBottom: '24px',
              }}
            >
              <Meta title={project.title} description={project.description} />
              <Space direction="vertical" size="middle" style={{ marginTop: '16px' }}>
                <a href={project.projectUrl}>查看项目</a>
                {project.tags.map((tag) => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
                <p>项目状态：{project.status}</p>
                <p>项目亮点：</p>
                {project.highlights.map((highlight) => (
                  <p key={highlight}>- {highlight}</p>
                ))}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProjectIntroPage;
