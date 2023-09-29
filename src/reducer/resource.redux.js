import { list_resource,get_resource_tags,search_resource } from '../api/api';

const SAVELIST = 'SAVALIST';
const CLEARLIST = 'CLEARLIST';
const SETSCROLLTOP = 'SETSCROLLTOP';
const SETDETAIL = 'SETDETAIL';
const GETTAGS = 'GETTAGS';

const initState = {
  list: [],
  count: 0,
  scrolltop: 0,
  page: 0,
  detail: {},
  tags:{}
}

export function resource(state = initState, action) {
  switch(action.type) {
    case SAVELIST:
      const { list: newlist, ...others } = action.payload;
      const { list } = state;
      return {...state, list: list.concat(newlist || []), ...others};
    case CLEARLIST:
      return {...initState}
    case SETSCROLLTOP:
      return {...state, scrolltop: action.payload}
    case SETDETAIL:
      return {...state, detail: action.payload}
    case GETTAGS:
      return {...state, tags: action.payload}
    default:
      return state
  }
} 
// 获取资源列表
export function getlist({biz_id,author_id,param,page, size}) {
  return async dispatch =>{
    let  list,count;
    console.log(param)
    if ( param==null ||( param.tags.size== 0 && "".localeCompare(param.title)===0)) {
    ({ data: list, count } = await list_resource({ biz_id, author_id, page, size }));
    } else {
    ({ data: list, count } = await search_resource({ param, page }));
    }
	  
    dispatch({
      type: SAVELIST,
      payload: {list, count, page}
    })
  }
}
// 初始化 resource
export function clearlist() {
  return async dispatch =>{
    dispatch({
      type: CLEARLIST
    })
  }
}

// 初始化 detail
export function cleardetail() {
  return async dispatch =>{
    dispatch({
      type: SETDETAIL,
      payload: {}
    })
  }
}
// 设置文章页据顶高度
export function setscrolltop(data) {
  return async dispatch =>{
    dispatch({
      type: SETSCROLLTOP,
      payload: data
    })
  }
}

// 获取资源tags列表
export function getresourcetags() {
  return async dispatch =>{
	  const  data  = await get_resource_tags();
    console.log(data)
    dispatch({
      type: GETTAGS,
      payload: data
    })
  }
}