export default [
  // { path: '/home', layout: false, routes: [{ path: '/home', component: './home' }] },
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  {
    path: '/user',
    layout: false,
    routes: [{ path: '/user/register', component: './User/Register' }],
  },
  { path: '/welcome', icon: 'smile', component: './Welcome', name: '首页' },
  { path: '/profile', component: './profile', layout: false, name: '个人资料' },
  { path: '/projects', component: './projects', layout: false, name: '个人项目' },
  { path: '/Album', component: './Album', name: '相册', icon: 'PictureOutlined' },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: '管理员页面',
    routes: [
      // {path: '/admin', redirect: '/admin/item'},
      // {path: '/admin/item', component: './Admin', name: '介绍'},
      { path: '/admin/UserManage', component: './Admin/UserManage', name: '用戶管理' },
      { path: '/admin/students', component: './Admin/Students', name: '学生信息' },
    ],
  },
  {
    path: '/interfaceInfo',
    component: './interfaceInfo',
    name: '接口信息',
    icon: 'MessageOutlined',
  },
  { path: '/tag', component: './tag', name: '标签表', icon: 'TagOutlined' },
  {
    path: '/productModels',
    name: '产品模块',
    icon: 'ShopOutlined',
    routes: [
      {
        icon: 'table',
        path: '/productModels/product',
        component: './productModels/product',
        name: '产品表格',
      },
    ],
  },
  {
    path: '/MarkdownDocument',
    name: '文章',
    icon: 'ReadOutlined',
    routes: [
      {
        document: 'table',
        path: '/MarkdownDocument/Recommend',
        component: './MarkdownDocument/recommend',
        name: '文章推荐',
      },
      {
        path: '/MarkdownDocument/search',
        name: 'search',
        component: './MarkdownDocument/search',
        routes: [
          {
            path: '/MarkdownDocument/search',
            redirect: '/MarkdownDocument/search/articles',
          },
          {
            name: 'articles',
            icon: 'smile',
            path: '/MarkdownDocument/search/articles',
            component: './MarkdownDocument/search/articles',
          },
          {
            name: 'projects',
            icon: 'smile',
            path: '/MarkdownDocument/search/projects',
            component: './MarkdownDocument/search/projects',
          },
          {
            name: 'applications',
            icon: 'smile',
            path: '/MarkdownDocument/search/applications',
            component: './MarkdownDocument/search/applications',
          },
        ],
      },
      {
        path: '/MarkdownDocument/read/:id',
        component: './MarkdownDocument/ReadArticle',
        name: '阅读文章',
        hideInMenu: true,
        layout: false,
      },
      {
        path: '/MarkdownDocument/publish',
        component: './MarkdownDocument/publishArticle',
        name: '发布文章',
        hideInMenu: true,
        layout: false,
      },
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
  // {
  //   path: '/test',
  //   icon: 'CoffeeOutlined',
  //   name: '测试页面',
  //   routes: [
  //     { icon: 'table', path: '/test/list', component: './test/TableList', name: '测试表格' },
  //     { icon: '', path: '/test/ProList', component: './test/ProList', name: '测试列表' },
  //   ],
  // },
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

  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
