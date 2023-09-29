import React, { useState, useEffect,forwardRef,useRef } from "react";
import { Link, Route } from "react-router-dom";
import "./header.css";
import DirectionsRunOutlined from "@mui/icons-material/DirectionsRunOutlined";

import SearchOutlined from "@mui/icons-material/SearchOutlined";

const Header = (props,ref) => {
  const [display, setDisplay] = useState(false);
  const [more, setMore] = useState(false);

  const handleButtonClick = () => {
    //@ts-ignore
    const inputValue = ref.current.value;
    console.log(inputValue);
   const {handSearchClick}= props
    handSearchClick(inputValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 阻止表单的默认提交行为
      //@ts-ignore
      const inputValue = ref.current.value;
     const {handSearchClick}= props
      handSearchClick(inputValue);
  };

    //   // 暴露给父组件的属性
    //   useImperativeHandle(onRef, () => ({
    //     isShow,
    //     setIsShow
    // }));

  //监听窗口事件及初始化数据
  useEffect(() => {
    //DidMount;
    const inputValue = ref.current.value;
    console.log(inputValue);
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
        <DirectionsRunOutlined />


        <ul className="header_nav">
        <li> <a href="/">首页</a></li>
        <li><a href="/">资讯</a></li>
        <li><a href="/">会议</a></li>
        <li><a href="/">工具</a></li>
        <li><a href="/">教程</a></li>
        <li><a href="/">论文</a></li>
        </ul>

    
          <form className="header-form" onSubmit={handleSubmit}>
            <input
              className="header-form-input"
              type="text"
              //@ts-ignore
              // placeholder={}
              ref={ref}
            />
            <button className="header-form-button" type="submit" >
              <SearchOutlined />
            </button>
          </form>
    

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

let ForwardRefHeader=forwardRef(Header)
export default ForwardRefHeader;
