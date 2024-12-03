export default [
  { path: '/home', layout: false, routes: [{ path: '/home', component: './home', name: '首页'  }] },
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  {
    path: '/user',
    layout: false,
    routes: [{ path: '/user/register', component: './User/Register' }],
  },
  {
    path: '/account',
    name: '个人页',
    icon: 'UserOutlined',
    routes: [
      {
        name: '账号信息',
        icon: 'smile',
        path: '/account/settings',
        component: './account/AccountSettings',
      },
      {
        path: '/account',
        redirect: '/account/center',
      },
      {
        name: 'center',
        icon: 'smile',
        path: '/account/center',
        component: './account/center',
      },
    ],
  },
  {
    path: '/Welcome',
    name: '欢迎',
    icon: 'UserOutlined',
    routes: [
      { path: './Welcome', icon: 'smile', component: './Welcome', name: '欢迎' },
      { path: '/Welcome/profile', component: './Welcome/profile', name: '个人资料' },
      { path: '/Welcome/projects', component: './Welcome/projects', name: '个人项目' },
    ],
  },
  {
    path: '/list',
    icon: 'table',
    name: 'list',
    routes: [
      {
        path: '/list',
        redirect: '/list/table-list',
      },
      {
        name: 'table-list',
        icon: 'smile',
        path: '/list/table-list',
        component: './list/table-list',
      },
      {
        name: 'basic-list',
        icon: 'smile',
        path: '/list/basic-list',
        component: './list/basic-list',
      },
      {
        name: 'card-list',
        icon: 'smile',
        path: '/list/card-list',
        component: './list/card-list',
      },
    ],
  },
  // 后台管理路由
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: '管理員页面',
    routes: [
      { path: '/admin/UserManage', component: './Admin/UserManage', name: '用戶管理' },
      { path: '/admin/students', component: './Admin/Students', name: '学生信息' },
      { path: '/admin/Album', component: './Admin/Album', name: '相册', icon: 'PictureOutlined',  },
      { path: '/admin/tag', component: './Admin/tag', name: '标签表', icon: 'TagOutlined', },
      {
        path: '/admin/interfaceInfo',
        component: './Admin/interfaceInfo',
        name: '接口信息',
        icon: 'MessageOutlined',
      },
      {
        path: '/admin/productModels',
        name: '产品模块',
        icon: 'ShopOutlined',
        routes: [
          {
            icon: 'table',
            path: '/admin/productModels/product',
            component: './Admin/productModels/product',
            name: '产品表格',
          },
        ],
      },
      {
        path: '/admin/MarkdownDocument',
        name: '文章',
        icon: 'ReadOutlined',
        routes: [
          {
            document: 'table',
            path: '/admin/MarkdownDocument/Recommend',
            component: './Admin/MarkdownDocument/recommend',
            name: '文章推荐',
          },
          {
            path: '/admin/MarkdownDocument/search',
            name: 'search',
            component: './Admin/MarkdownDocument/search',
            routes: [
              {
                path: '/admin/MarkdownDocument/search',
                redirect: '/MarkdownDocument/search/articles',
              },
              {
                name: 'articles',
                icon: 'smile',
                path: '/admin/MarkdownDocument/search/articles',
                component: './Admin/MarkdownDocument/search/articles',
              },
              {
                name: 'projects',
                icon: 'smile',
                path: '/admin/MarkdownDocument/search/projects',
                component: './Admin/MarkdownDocument/search/projects',
              },
              {
                name: 'applications',
                icon: 'smile',
                path: '/admin/MarkdownDocument/search/applications',
                component: './Admin/MarkdownDocument/search/applications',
              },
            ],
          },
          {
            path: '/admin/MarkdownDocument/read/:id',
            component: './Admin/MarkdownDocument/ReadArticle',
            name: '阅读文章',
            hideInMenu: true,
            layout: false,
          },
          {
            path: '/admin/MarkdownDocument/publish',
            component: './Admin/MarkdownDocument/publishArticle',
            name: '发布文章',
            hideInMenu: true,
            layout: false,
          },
        ],
      },
    ],
  },
  // {
  //   path: '/test',
  //   icon: 'CoffeeOutlined',
  //   name: '测试页面',
  //   routes: [
  //     { icon: 'table', path: '/test/list', component: './test/TableList', name: '测试表格' },
  //     { icon: '', path: '/test/ProList', component: './test/ProList', name: '测试列表' },
  //   ],
  // }
  { path: '/', redirect: '/home' },
  { path: '*', layout: false, component: './404' },
];
