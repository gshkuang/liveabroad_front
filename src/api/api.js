import axios from 'axios';

axios.interceptors.request.use(config => {
  config = {
    ...config,
    withCredentials: false,
    baseURL: '/api',
  }
  return config
})
axios.interceptors.response.use(response => {
  return response
})
// 验证用户名是否可用
export async function validate_user({
  user
}) {
  return new Promise((resolve, reject) => {
    axios.post('/api/user/validate', {
        user,
        ip: window.userip,
        city: window.usercity
      })
      .then(res => {
        // code: 0 数据库已有同名账号
        res.status === 200 ? resolve(false) : resolve(true)
      })
      .catch(err => {
        resolve(false)
      })
  })
}
// 登陆
export async function login_api({
  user,
  email,
  weburl
}) {
  return new Promise((resolve, reject) => {
    axios.post('/api/user/login', {
        user,
        email,
        weburl,
        ip: window.userip,
        city: window.usercity
      })
      .then(res => {
        res.status === 200  ? resolve(res.data) : resolve(res.data)
      })
      .catch(err => {
        resolve(false)
      })
  })
}

// 退出登陆
export function logout_api() {
  return new Promise((resolve, reject) => {
    axios.post('/api/user/logout')
      .then(res => {
        res.status === 200  ? resolve(true) : resolve(false)
      })
      .catch(err => {
        resolve(false)
      })
  })
}

// 资源列表
export function list_resource({
	biz_id ,
author_id,
  page = 0,
  size
}) {
  return new Promise((resolve, reject) => {
    axios.get('/api/resources/recommend',{
        params: {
      biz_id: biz_id,
			page_size: size,
			author_id:author_id,
			page_no:page
        },
      })
		.then(res => {

        const {
          data,
          count,
		} = res.data;
         res.status === 200? resolve({
          data,
          count
        }) : resolve({
          data: [],
          count: 0
        })
      })
      .catch(err => {
        reject({})
      })
  });
}


// 资源列表
export function search_resource({
  param,
  page = 0,
}) {
  return new Promise((resolve, reject) => {
    axios.post('/api/resources/search',{
      title: param.title,
      tags: param.tags,
      start_create_at: param.start_create_at,
      end_create_at: param.end_create_at,
			page_no:page
      })
		.then(res => {
        const {
          data,
          count,
		} = res.data;
         res.status === 200? resolve({
          data,
          count
        }) : resolve({
          data: [],
          count: 0
        })
      })
      .catch(err => {
        reject({})
      })
  });
}

// 资源详情
export function save_resource(blogInfo) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "/api/save_resource",
        { data: blogInfo },
        { headers: { "Content-Type": "application/json" } }
      )
		.then(res => {
			res.status === 200 ? resolve(res.data.id) : resolve({})
      })
		.catch(err => {
		console.log("失败了", err);
        reject({})
      })
  });
}

// 资源详情
export function get_resource(_id) {
  return new Promise((resolve, reject) => {
    axios.get('/api/get_resource',{
        params: {
          id: _id,
        },
      })
		.then(res => {
			res.status === 200 ? resolve(res.data.data) : resolve({})
      })
      .catch(err => {
        reject({})
      })
  });
}

// 获取详情
export function get_resource_tags() {
  return new Promise((resolve, reject) => {
    axios.get('/api/resource/get_tags',{})
		.then(res => {
			res.status === 200 ? resolve(res.data.data) : resolve({})
      })
      .catch(err => {
        reject({})
      })
  });
}

// 验证cookie获取个人信息
export function getinfo() {
  return new Promise((resolve, reject) => {
    axios.post('/api/user/v1/get', {
        ip: window.userip,
        city: window.usercity
      })
      .then(res => {
        res.status === 200  ? resolve(res.data.data) : resolve(false)
      })
      .catch(err => {
        resolve(false)
      })
  })

}

// 评论
export function sendComment({
  content,
  associated_id
}) {
  return new Promise((resolve, reject) => {
    axios.post('/api/save_comment', {
        content,
        associated_id,
        ip: window.userip,
        city: window.usercity
      })
      .then(res => {
        res.status === 200  ? resolve(true) : resolve(false)
      })
      .catch(err => {
        resolve(false)
      })
  });
}

// 评论列表
export function getComments({
	id,
  page,
}) {
  return new Promise((resolve, reject) => {
    axios.get('/api/get_comments', {
        params: {
			id: id,
			page_num:page
        },
      }).then(res => {
        const {
          data,
          total_count,
		} = res.data;
		  console.log(  total_count)
         res.status === 200? resolve({
          data,
          total_count
        }) : resolve({
          data: [],
          total_count: 0
        })
      })
      .catch(err => {
        resolve({
          data: [],
          total_count: 0
        })
      })
  });
}
// 删除留言
export function delComments(fId, id) {
  return new Promise((resolve, reject) => {
    axios.post('/api/delete_comment', {
        fId,
        id
      })
      .then(res => {
        const {
          code
        } = res.data;
        code === 0 ? resolve(true) : resolve(false)
      })
      .catch(err => {
        resolve(false)
      })
  });
}