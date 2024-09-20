declare namespace API {
  type AddressBook = {
    cityCode?: string;
    cityName?: string;
    consignee?: string;
    createTime?: string;
    createUser?: number;
    detail?: string;
    districtCode?: string;
    districtName?: string;
    id?: number;
    isDefault?: number;
    isDelete?: number;
    label?: string;
    phone?: string;
    provinceCode?: string;
    provinceName?: string;
    sex?: number;
    updateTime?: string;
    updateUser?: number;
    userId?: number;
  };

  type addStudentUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type BaseResponse = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponseAddressBook_ = {
    code?: number;
    data?: AddressBook;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseFiles_ = {
    code?: number;
    data?: Files;
    message?: string;
  };

  type BaseResponseInterfaceInfo_ = {
    code?: number;
    data?: InterfaceInfo;
    message?: string;
  };

  type BaseResponseListAddressBook_ = {
    code?: number;
    data?: AddressBook[];
    message?: string;
  };

  type BaseResponseMarkdowndocuments_ = {
    code?: number;
    data?: Markdowndocuments;
    message?: string;
  };

  type BaseResponsePageInterfaceInfo_ = {
    code?: number;
    data?: PageInterfaceInfo_;
    message?: string;
  };

  type BaseResponsePageMarkdowmDto_ = {
    code?: number;
    data?: PageMarkdowmDto_;
    message?: string;
  };

  type BaseResponsePageProductCategory_ = {
    code?: number;
    data?: PageProductCategory_;
    message?: string;
  };

  type BaseResponsePageProductDto_ = {
    code?: number;
    data?: PageProductDto_;
    message?: string;
  };

  type BaseResponsePageSetmealDto_ = {
    code?: number;
    data?: PageSetmealDto_;
    message?: string;
  };

  type BaseResponsePageStudents_ = {
    code?: number;
    data?: PageStudents_;
    message?: string;
  };

  type BaseResponsePageTag_ = {
    code?: number;
    data?: PageTag_;
    message?: string;
  };

  type BaseResponsePageUserDto_ = {
    code?: number;
    data?: PageUserDto_;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseTag_ = {
    code?: number;
    data?: Tag;
    message?: string;
  };

  type BaseResponseTokenResponse_ = {
    code?: number;
    data?: TokenResponse;
    message?: string;
  };

  type BaseResponseUserDto_ = {
    code?: number;
    data?: UserDto;
    message?: string;
  };

  type createDocumentUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type createUsingPOST1Params = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type createUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type deleteDocumentsUsingDELETEParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** ids */
    ids: number[];
  };

  type deleteFileUsingDELETEParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** url */
    url: string;
  };

  type deletePhotoUsingDELETEParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** id */
    id: number;
  };

  type deleteStudentUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type deleteTagUsingDELETE1Params = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** userId */
    userId: number;
  };

  type deleteTagUsingDELETEParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** tagId */
    tagId: number;
  };

  type deleteUsingDELETE1Params = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** id */
    id?: number;
  };

  type DeleteUsingDELETE1Params = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** ids */
    ids: number[];
  };

  type deleteUsingDELETEParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** id */
    id: number;
  };

  type DeleteUsingDELETEParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** ids */
    ids: number[];
  };

  type DocumentModificationRequest = {
    content?: string;
    coverImage?: string;
    tags?: number[];
    title?: string;
  };

  type downloadUsingGETParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** name */
    name?: string;
  };

  type exportTableDataToExcelUsingGETParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** tableName */
    tableName: string;
  };

  type File = {
    absolute?: boolean;
    absoluteFile?: File;
    absolutePath?: string;
    canonicalFile?: File;
    canonicalPath?: string;
    directory?: boolean;
    file?: boolean;
    freeSpace?: number;
    hidden?: boolean;
    name?: string;
    parent?: string;
    parentFile?: File;
    path?: string;
    totalSpace?: number;
    usableSpace?: number;
  };

  type Files = {
    contentType?: string;
    createTime?: string;
    filePath?: string;
    fileSize?: number;
    filename?: string;
    id?: number;
    saveFilename?: string;
    userID?: number;
  };

  type getAllCategoriesUsingGETParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type getAllPhotoAlbumsUsingGETParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** category */
    category?: string;
    /** name */
    name?: string;
    /** page */
    page?: number;
    /** size */
    size?: number;
  };

  type getAllStudentsByPageUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type getAllTagByPageUsingGETParams = {
    current?: number;
    description?: string;
    id?: number;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tagName?: string;
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type getCurrentUserUsingGETParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type getDefaultUsingGETParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type getDocumentsByTagsUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type getDocumentsUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type getSetmealUsingGETParams = {
    code?: string;
    current?: number;
    description?: string;
    maxPrice?: number;
    minPrice?: number;
    name?: string;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type getStatusUsingGETParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type getTagUsingGETParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** tagId */
    tagId: number;
  };

  type getUserTagsUsingGETParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** userId */
    userId: number;
  };

  type getUsingGET1Params = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** id */
    id: number;
  };

  type getUsingGET2Params = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** id */
    id: number;
  };

  type getUsingGETParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** id */
    id: number;
  };

  type handleAvatarUploadUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** name */
    name: string;
  };

  type handleFileSaveUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type handleFileUploadBase64UsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** file */
    file: string;
    /** mimeType */
    mimeType: string;
  };

  type handleFileUploadUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type handlePhotoAlbumsUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** category */
    category: string;
    /** category */
    category: string;
    /** category */
    category: string;
    /** name */
    name: string;
  };

  type InputStream = true;

  type InterfaceInfo = {
    createTime?: string;
    description?: string;
    id?: number;
    isDelete?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type InterfaceInfoAddRequest = {
    createTime?: string;
    description?: string;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type InterfaceInfoQueryRequest = {
    current?: number;
    id?: number;
    method?: string;
    name?: string;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: number;
  };

  type InterfaceInfoUpdateRequest = {
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    url?: string;
  };

  type listInterfaceInfoByPageUsingPOST1Params = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type listInterfaceInfoByPageUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type listUsingGETParams = {
    cityCode?: string;
    cityName?: string;
    consignee?: string;
    current?: number;
    detail?: string;
    districtCode?: string;
    districtName?: string;
    id?: number;
    isDefault?: number;
    label?: string;
    pageSize?: number;
    phone?: string;
    provinceCode?: string;
    provinceName?: string;
    searchText?: string;
    sex?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type logicalDeleteUserUsingPOST1Params = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** ids */
    ids: number[];
  };

  type logicalDeleteUserUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type logoutUsingPOSTParams = {
    /**   */
    Authorization?: string;
  };

  type MarkdowmDto = {
    avatarUrl?: string;
    commentCount?: number;
    content?: string;
    coverImage?: string;
    createTime?: string;
    favoriteCount?: number;
    id?: number;
    likeCount?: number;
    signature?: string;
    tags?: MarkdowmTsgdDto[];
    title?: string;
    updateTime?: string;
    userID?: number;
    username?: string;
    viewCount?: number;
  };

  type MarkdowmIdsRequest = {
    current?: number;
    ids?: number[];
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type MarkdowmRequest = {
    content?: string;
    current?: number;
    id?: number;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string;
    title?: string;
    userID?: number;
  };

  type MarkdowmTsgdDto = {
    description?: string;
    documentId?: number;
    id?: number;
    tagName?: string;
  };

  type Markdowndocuments = {
    content?: string;
    coverImage?: string;
    createTime?: string;
    id?: number;
    title?: string;
    updateTime?: string;
    userID?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageInterfaceInfo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: InterfaceInfo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageMarkdowmDto_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: MarkdowmDto[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageProductCategory_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ProductCategory[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageProductDto_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ProductDto[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageSetmealDto_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: SetmealDto[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageStudents_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Students[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageTag_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Tag[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserDto_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserDto[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type pageUsingGET1Params = {
    code?: string;
    current?: number;
    description?: string;
    image?: string;
    maxPrice?: number;
    minPrice?: number;
    name?: string;
    pageSize?: number;
    productCategoryId?: number;
    searchText?: string;
    sort?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type pageUsingGETParams = {
    createUser?: number;
    current?: number;
    name?: string;
    pageSize?: number;
    searchText?: string;
    sort?: number;
    sortField?: string;
    sortOrder?: string;
    type?: number;
    updateUser?: number;
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type phoneLoginUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type PhotoalbumRequest = {
    category?: string;
    id?: number;
    name?: string;
    title?: string;
    url?: string;
  };

  type ProductAddRequest = {
    attribute?: ProductAttribute[];
    categoryName?: string;
    code?: string;
    copies?: number;
    createTime?: string;
    createUser?: number;
    description?: string;
    id?: number;
    image?: string;
    isDelete?: number;
    name?: string;
    price?: number;
    productCategoryId?: number;
    sort?: number;
    status?: number;
    updateTime?: string;
    updateUser?: number;
  };

  type ProductAttribute = {
    createTime?: string;
    createUser?: number;
    id?: number;
    isDelete?: number;
    name?: string;
    productId?: number;
    updateTime?: string;
    updateUser?: number;
    value?: string;
  };

  type ProductCategory = {
    createTime?: string;
    createUser?: number;
    id?: number;
    isDelete?: number;
    name?: string;
    sort?: number;
    type?: number;
    updateTime?: string;
    updateUser?: number;
  };

  type ProductCategoryAddRequest = {
    name?: string;
    sort?: number;
    type?: number;
  };

  type ProductDto = {
    code?: string;
    createTime?: string;
    createUser?: number;
    createUserName?: string;
    description?: string;
    id?: number;
    image?: string;
    isDelete?: number;
    name?: string;
    price?: number;
    productCategoryId?: number;
    sort?: number;
    status?: number;
    updateTime?: string;
    updateUser?: number;
    updateUserName?: string;
  };

  type recommendUsingGETParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type refreshAccessTokenUsingPOSTParams = {
    /**   */
    Authorization?: string;
  };

  type RefreshTokenRequest = {
    refreshToken?: string;
  };

  type Resource = {
    description?: string;
    file?: File;
    filename?: string;
    inputStream?: InputStream;
    open?: boolean;
    readable?: boolean;
    uri?: URI;
    url?: URL;
  };

  type Result = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type saveUsingPOST1Params = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type saveUsingPOST2Params = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type saveUsingPOST3Params = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type saveUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type sendSmsUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type serveFileBase64UsingGETParams = {
    /**   */
    Authorization?: string;
    /** filename */
    filename: string;
  };

  type serveFileUsingGETParams = {
    /**   */
    Authorization?: string;
    /** filename */
    filename: string;
  };

  type setDefaultUsingPUTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type SetmealDto = {
    categoryName?: string;
    code?: string;
    createTime?: string;
    createUser?: number;
    description?: string;
    id?: number;
    image?: string;
    isDelete?: number;
    name?: string;
    price?: number;
    productCategoryId?: number;
    setmealProducts?: SetmealProduct[];
    status?: number;
    updateTime?: string;
    updateUser?: number;
  };

  type SetmealProduct = {
    copies?: number;
    createTime?: string;
    createUser?: number;
    id?: number;
    isDelete?: number;
    name?: string;
    price?: number;
    productId?: string;
    setMealId?: string;
    sort?: number;
    updateTime?: string;
    updateUser?: number;
  };

  type setStatusUsingPUTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** status */
    status: number;
  };

  type SmsRequest = {
    code?: string;
    message?: string;
    phoneNumber?: string;
  };

  type startOrStopUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** id */
    id?: number;
    /** status */
    status: number;
  };

  type Students = {
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

  type StudentsQueryRequest = {
    current?: number;
    email?: string;
    gender?: number;
    id?: number;
    pageSize?: number;
    phone?: string;
    profession?: string;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    studentClass?: string;
    studentGrade?: string;
    studentID?: string;
    studentName?: string;
    userID?: string;
  };

  type Tag = {
    createTime?: string;
    description?: string;
    id?: number;
    isDelete?: number;
    tagName?: string;
    updateTime?: string;
  };

  type TagAddRequest = {
    description?: string;
    tagName?: string;
  };

  type TagDTO = {
    description?: string;
    id?: number;
    source?: string;
    tagName?: string;
  };

  type TagUpdateRequest = {
    description?: string;
    id?: number;
    tagName?: string;
  };

  type TokenResponse = {
    accessToken?: string;
    refreshToken?: string;
  };

  type updateDocumentUsingPUTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
    /** id */
    id: number;
  };

  type updateInterfaceInfoUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type updateMyUserUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type updateStudentUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type updateTagUsingPUTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type updateUserPasswordUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type updateUserTagUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type updateUserUsingPUTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type updateUsingPUT1Params = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type updateUsingPUTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type uploadExcelUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type uploadFileUsingPOST1Params = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type uploadLocalityUsingPATCHParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type uploadMarkdownUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type uploadPdfToTextUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type uploadWordToMarkdownUsingPOSTParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type URI = {
    absolute?: boolean;
    authority?: string;
    fragment?: string;
    host?: string;
    opaque?: boolean;
    path?: string;
    port?: number;
    query?: string;
    rawAuthority?: string;
    rawFragment?: string;
    rawPath?: string;
    rawQuery?: string;
    rawSchemeSpecificPart?: string;
    rawUserInfo?: string;
    scheme?: string;
    schemeSpecificPart?: string;
    userInfo?: string;
  };

  type URL = {
    authority?: string;
    content?: Record<string, any>;
    defaultPort?: number;
    file?: string;
    host?: string;
    path?: string;
    port?: number;
    protocol?: string;
    query?: string;
    ref?: string;
    userInfo?: string;
  };

  type UserDto = {
    avatarUrl?: string;
    createTime?: string;
    email?: string;
    gender?: number;
    id?: number;
    phone?: string;
    signature?: string;
    tags?: TagDTO[];
    updateTime?: string;
    userAccount?: string;
    userRole?: number;
    userStatus?: number;
    username?: string;
  };

  type userInfoUsingGETParams = {
    /** 前端需要全局配置token */
    Authorization?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type userLoginUsingPOSTParams = {
    /**   */
    Authorization?: string;
  };

  type UserPasswordUpdateRequest = {
    newPassword?: string;
    userAccount?: string;
  };

  type UserQueryRequest = {
    current?: number;
    email?: string;
    gender?: number;
    id?: number;
    pageSize?: number;
    phone?: string;
    searchText?: string;
    signature?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string;
    userAccount?: string;
    username?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type userRegisterUsingPOSTParams = {
    /**   */
    Authorization?: string;
  };

  type UserTagQueryRequest = {
    tagNames?: string[];
    userId?: number;
  };

  type UserUpdateMyRequest = {
    avatarUrl?: string;
    email?: string;
    gender?: number;
    phone?: string;
    signature?: string;
    tags?: string[];
    username?: string;
  };

  type UserUpdateRequest = {
    avatarUrl?: string;
    email?: string;
    gender?: number;
    id?: number;
    phone?: string;
    signature?: string;
    tags?: string[];
    username?: string;
  };
}
