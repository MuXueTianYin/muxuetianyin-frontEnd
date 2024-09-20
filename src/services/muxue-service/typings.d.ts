// @ts-ignore
/* eslint-disable */

declare namespace API {
  /*
   * 普通返回类
   * */
  type result<T> = {
    code?: number;
    message?: string;
    data: T;
  };
  /*
   * 分页返回类
   * */
  type resultData<T> = {
    list: T[];
    total: number;
    size: number;
    current: number;
  };

  type Current = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl: string;
    gender: number;
    phone: string;
    email: string;
    userStatus: number;
    createTime: Date;
    updateTime?: Date;
    isDelete?: number;
    userRole?: number;
    tags?: userDot[];
    signature?: string;
  };
  type fileParams = {
    file?: File;
  };

  type CurrentPageParams = fileParams & Current;

  type userDot = {
    id: Number;
    source: String;
    tagName: String;
  };
  //查询用户信息接口
  type CurrentUser = result<Current>;

  type LoginResult = {
    accessToken: string;
    refreshToken: string;
  };
  type photoalbumRequest = {
    id?: number;
    name: string;
    url: string;
    category: string;
  };
  type RegisterResult = {
    code?: number;
    message?: string;
    data?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };
  type students = {
    createTime?: string;
    email?: string;
    gender?: number;
    id?: number;
    isDelete?: number;
    phone?: string;
    profession?: string;
    studentClass?: string;
    studentGrade?: string;
    studentID?: string;
    studentName?: string;
    updateTime?: string;
    userID?: string;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };
  type RegisterParams = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
    type?: string;
  };
  type uploadParams = {
    formData?: formData;
  };

  type ImageSaveParams = {
    id?: number;
    name?: string;
    url?: string;
    category?: string;
  };
  type ImageList = {
    id?: number;
    name?: string;
    url?: string;
    category?: string;
    createTime?: string;
    is_deleted?: string;
    updateTime?: string;
  };
  type getImageList = result<resultData<ImageList>>;

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;

    type?: NoticeIconItemType;
  };

  /*
   * 生成的ts文件
   * */
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type getFakeCaptchaParams = {
    /** 手机号 */
    phone?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;

    type?: NoticeIconItemType;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type ruleParams = {
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  };
  type getAllTagByPageUsingGETParams = {
    current?: number;
    id?: number;
    pageSize?: number;
    parentId?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tagName?: string;
    userId?: number;
  };
}
