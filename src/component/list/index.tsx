import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getlist } from "../../reducer/resource.redux.js";
import { Skeleton, Button } from "antd";
import "./list.css";
import moment from "moment";

const List = (props) => {
  const { param } = props;
  const dipatch = useDispatch();
  // @ts-ignore
  const resource = useSelector((state) => state.resource);
  const size = 10

  const { list, count } = resource;
  const loadmore = (
    <div style={{ textAlign: "right" }}>
      <Button onClick={getMore}>加载更多</Button>
    </div>
  );


  useEffect(() => {
    // @ts-ignore
    dipatch(getlist({ biz_id: 0, param: param, page: 0, size: size }));
  }, [param])//

  function getMore() {
    const { param } = props;
    const { page } = resource;
    const nextpage = page + 1;
    // @ts-ignore
    dipatch(getlist({ biz_id: 0, param: param, page: nextpage })); //todo
  }


  const listhtml = (
    <div className="list">
      {list
        // .filter((v: any) => v.content.length > 0)
        .map((v: any) => (
          <div className="Artical-box">
            <div className="artical" key={v.id}>
              {/* <div className="dotts"></div> */}
              <div className="art-container">
                {/* <div className="line"></div> */}
                <div className="art-content">
                  <p className="art-title">
                    <img src="logo192.png" width="30" height="30" />
                    <Link to={`${v.url}`}>{v.title}</Link>
                  </p>
                  <div className="art-detail">
                    <p>{v.intro}</p>
                    {/* <p className="date">{timestampToTime(v.create_at)}</p> */}
                  </div>

                  <div className="art-detail_more">
                    <div > 标签:{v.tag}</div>
                    <div>  发布时间:{moment(v.publish_at * 1000).format("YYYY-MM-DD")}  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {list.length >= size ? loadmore : <div>没有更多了</div>}
    </div>
  );

  const none = <Skeleton active />;
  return (
    <div className="Artical-box">{list.length === 0 ? none : listhtml}</div>
  );
};

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
