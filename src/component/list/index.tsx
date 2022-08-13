import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getlist, clearlist } from "../../reducer/artical.redux.js";
import { Skeleton, Button } from "antd";
import "./list.css";

interface Props {
  artical: any;
  getlist: Function;
  clearlist: Function;
}
interface State {
  size: number;
}
// @ts-ignore
@connect((state) => state, { getlist, clearlist })
class List extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      size: 15,
    };
    this.getMore = this.getMore.bind(this);
  }

  async componentDidMount() {
    const { size } = this.state;
    const { getlist } = this.props;

    console.log(this.props);
    size != 0 ? await getlist({ biz_id: 0, page: 0, size: size }) : null;
  }

  async getMore() {
    const { size } = this.state;
    const { getlist } = this.props;
    const { page } = this.props.artical;
    const nextpage = page + 1;
    await getlist({ biz_id: 0, page: nextpage, size: size }); //todo
  }
  render() {
    const { artical } = this.props;
    const { list, count } = artical;
    console.log(artical);
    const loadmore = (
      <div style={{ textAlign: "center" }}>
        <Button onClick={this.getMore}>加载更多</Button>
      </div>
    );

    const listhtml = (
      <div>
        {list
          .filter((v: any) => v.title.length > 0)
          .map((v: any) => (
            <div className="artical" key={v.id}>
              {/* <div className="dotts"></div> */}
              <div className="art-container">
                <div className="line"></div>
                <div className="art-content">
                  <p className="art-title">
                    <Link to={`/blog/${v.id}`}>{v.title}</Link>
                  </p>
                  <div className="art-detail">
                    <p>{v.content}</p>
                    {/* <p className="date">{timestampToTime(v.create_at)}</p> */}
                  </div>
                  <div className="art-detail_more">
                    评论：{v.review_info.review_num} 点赞：
                    {v.review_info.approve_num}
                    {timestampToTime(v.create_at)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        {list.length >= this.state.size ? loadmore : null}
      </div>
    );
    const none = <Skeleton active />;
    return (
      <div className="Artical-box">{list.length === 0 ? none : listhtml}</div>
    );
  }
}

function timestampToTime(timestamp: any) {
  if (timestamp == null || timestamp <= 0) {
    return "";
  }
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D =
    date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
  var h =
    date.getHours() < 10 ? "0" + date.getHours() + ":" : +date.getHours() + ":";
  var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return " 发布于 " + Y + M + D + h + m;
}
export default List;
