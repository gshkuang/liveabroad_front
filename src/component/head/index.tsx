import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { Icon } from "antd";
import myAvator from "./header.jpg";
import "./header.css";
import DirectionsRunOutlined from "@mui/icons-material/DirectionsRunOutlined";

import SearchOutlined from "@mui/icons-material/SearchOutlined";

const Header = () => {
  const [display, setDisplay] = useState(false);
  const [more, setMore] = useState(false);

  //监听窗口事件及初始化数据
  useEffect(() => {
    //DidMount;

    //监听
    //定义handleScroll事件函数
    const handleScroll = (e: any) => {
      //即滚动到底部的判断 条件就是 scrollHeight = clientHeight + scrollTop
      if (e.deltaY <= -3) {
        setDisplay(true);
      }
      if (e.deltaY >= 3 || window.scrollY < 30) {
        setDisplay(false);
      }
    };
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  function setContentMore() {
    setMore(true);
  }

  function resetContentMore() {
    setTimeout(function () {
      setMore(false);
    }, 2000);
  }

  return (
    <div>
      <div className="header">
        {/* <div className="header-box fadein"><img src={myAvator} alt="我的头像" /><p className="my-id">作者名字</p></div> */}
        {/* todo 中间 */}
        {/* <div><p className="my-id">作者名字</p></div>   */}
        <DirectionsRunOutlined />
        <div>举头</div>

        <div className="header-content">
          <form className="header-form">
            <input
              className="header-form-input"
              type="text"
              placeholder="输入关键词搜索..."
            />
            <button className="header-form-button" type="submit">
              <SearchOutlined />
            </button>
          </form>
        </div>

        <div className="header_option">
          <button
            className="header_button"
            onMouseOver={setContentMore}
            onMouseLeave={resetContentMore}
          >
            ...
          </button>
        </div>
        {more && (
          <div className="header_more">
            <ul className="header_ul">
              <li>
                <Link className="header_more_link" to="/blog/create">
                  新建
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
