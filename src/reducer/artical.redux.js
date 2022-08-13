import { list_artical } from '../api/api';

const SAVELIST = 'SAVALIST';
const CLEARLIST = 'CLEARLIST';
const SETSCROLLTOP = 'SETSCROLLTOP';
const SETDETAIL = 'SETDETAIL';

const initState = {
  list: [],
  count: 0,
  scrolltop: 0,
  page: 0,
  detail: {}
}

export function artical(state = initState, action) {
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
    default:
      return state
  }
} 
// 获取文章列表
export function getlist({biz_id,author_id,page, size}) {
  return async dispatch =>{
	  const { data, count } = await list_artical({ biz_id, author_id, page, size });
	  let  list=data
    dispatch({
      type: SAVELIST,
      payload: {list, count, page}
    })
  }
}
// 初始化 artical
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