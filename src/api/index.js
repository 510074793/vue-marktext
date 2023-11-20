import request from "@/util/request"

export const testApi = () => {
  return request({
    url: '/api/test',
    method: 'get'
  });
};


/**
 * 登录
 * @param {username,password} data 
 * @returns 
 */
export const loginSys = (data) => {
  console.log('login');
  return request({
    url: '/api/Login',
    data: data,
    method: 'post'
  });
}


/**
 * 文章列表
 * @param {cId,del,page,size} params
 * @returns 
 */
export const articleList = (params) => {
  return request({
    url: '/api/article/list',
    params: params,
    method: 'get'
  });
};



/**
 * 文章详情
 * @param id
 * @returns 
 */
export const articleDetail = (id) => {
  return request({
    url: '/api/article/detail?aId=' + id,
    method: 'get'
  });
};


/**
 * 搜索文章
 * @param wd
 * @returns 
 */
export const articleSearch = (wd) => {
  return request({
    url: '/api/article/search?key=' + wd,
    method: 'get'
  });
};


/**
 * 添加文章
 * @param {title,content,status,formatType,categoryId,cover,tags} data 
 * @returns 
 */
export const articleAdd = (data) => {
  return request({
    url: '/api/article/add',
    data: data,
    method: 'post'
  });
};


/**
 * 更新文章
 * @param {id,title,content,status,formatType,categoryId,cover,tags} data 
 * @returns 
 */
export const articleEdit = (data) => {
  return request({
    url: '/api/article/edit',
    data: data,
    method: 'post'
  });
};


/**
 * 删除文章
 * @param {id,del} data 
 * @returns 
 */
export const articleDelete = (data) => {
  return request({
    url: '/api/article/delete',
    data: data,
    method: 'post'
  });
};


/**
 * 类别列表
 * @param {cId} params 
 * @returns 
 */
export const categoryList = (params) => {
  return request({
    url: '/api/category/list',
    params: params,
    method: 'get'
  });
};

/**
 * 添加类别
 * @param {name,cover,parentId} data 
 * @returns 
 */
export const categoryAdd = (data) => {
  return request({
    url: '/api/category/add',
    data: data,
    method: 'post'
  });
};

/**
 * 更新类别
 * @param {id,name,cover,parentId} data 
 * @returns 
 */
export const categoryEdit = (data) => {
  return request({
    url: '/api/category/edit',
    data: data,
    method: 'post'
  });
};

/**
 * 更新类别
 * @param {id,del} data 
 * @returns 
 */
export const categoryDelete = (data) => {
  return request({
    url: '/api/category/delete',
    data: data,
    method: 'post'
  });
};