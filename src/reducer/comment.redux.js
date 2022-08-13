import { getComments } from '../api/api';

const GETCOMMENT = 'GETCOMMENT';
const CLEARCOMMENT = 'CLEARCOMMENT';
const initState = {
  page: 0,
  count: 0,
  list: []
}
export function comment(state = initState, action){
  switch(action.type){
	  case GETCOMMENT:
		  console.log(action)
		  console.log(state)
      const { page } = action.payload;
      const list =  page === 0 ? [] : state.list;
      const { list: newlist, ...others} = action.payload;
      return {...state, ...others, list: list.concat(newlist || [])};
    case CLEARCOMMENT:
      return initState;
    default:
      return state;
  }
}
// 获取留言列表
export function getlist ({id="627002099046736d0934f74b", page=0, size}){
  return async dispatch =>{
	  const { data, total_count } = await getComments({ id, page, size });
	  let list = data
	  let count=total_count
    dispatch({
      type: GETCOMMENT,
      payload: {
        list, count, page
      }
    })
  }
}
// 初始化留言
export function clearlist(){
  return async dispatch => {
    dispatch({
      type: CLEARCOMMENT
    })
  }
}





