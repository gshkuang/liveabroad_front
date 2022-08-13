import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { getlist } from '../../reducer/comment.redux';
import { delComments } from '../../api/api';
import CommentList from '../../component/comment_list';


interface Props{
  comment: any,
  getlist: Function,
}
interface State{
  msg: string,
  time: number,
  size: number
}
// @ts-ignore
@connect(
  state=>state,
  {getlist}
)
class Comments extends PureComponent<Props,State>{
  constructor(props: Props){
    super(props)
    this.state={
      msg: '',
      time: 0,
      size: 15,
    } 
    this.getMore = this.getMore.bind(this);
    this.delComment = this.delComment.bind(this);
    this.getComments = this.getComments.bind(this);
  }
  componentDidMount(){
    const { size } = this.state;
    const { list, count } = this.props.comment;//这是第一次请求
    // count == 0 ? this.props.getInfo() : null;

	  list.length == 0 ? this.props.getlist({ page: 0, size }) : null;
	  
  }
 
 
  async delComment(fId: any, _id:any){
    const issuccess = await delComments(fId, _id);
    if(!issuccess) { message.error('删除失败'); return };
    message.success('删除成功');
    const { size } = this.state;
    this.props.getlist({ page: 0, size })
  }
  async getComments(){
    const { size } = this.state;
    await (this.props as any).getlist({page: 0, size});
  }
  async getMore(){
    const { size } = this.state;
    const { page } = (this.props as any).comment;
    await (this.props as any).getlist({ page: page + 1, size });
  }
  showToast(msg: string, time: number){
    this.setState({
      msg: msg,
      time: time
    })
    setTimeout(()=>{
      this.setState({
        msg: ""
      })
    }, time*1000)
  }
  render(){
    const { msg, size} = this.state;
    const { comment } = this.props;
    return(
		<div>
			 <h1>留言板</h1>
        <CommentList 
          list={comment.list} 
          getMore={this.getMore} 
          size={size} 
          count={comment.count} 
        //   replyTo={this.replyTo} 
          userid ={"test"}
          delComment={this.delComment}
        />

      </div>
    )
  }
}
export default Comments;