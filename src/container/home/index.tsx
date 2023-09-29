import React, { useState,useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  setscrolltop, getresourcetags } from "../../reducer/resource.redux";
import { BackTop } from "antd";
import ForwardRefHeader from "../../component/head";
import List from "../../component/list";
import { Checkbox } from 'antd';
import "./index.css";
import { useParams,Link} from "react-router-dom";

const Home = (props) => {
  const [count, setCount] = useState(1);

  // 获取状态
  // @ts-ignore
  const resource = useSelector((state) => state.resource);
  // 获取 dipatch 方法
  const dipatch = useDispatch();
  const ref=useRef(null)

  const [resourceState, setResourceState] = useState({'tags':new Set(),'title':""});

  useEffect(() => {
    //todo 修正每次更新
    // 恢复页面滚动位置
    const { scrolltop } = resource;
    document && document.documentElement
      ? (document.documentElement.scrollTop = scrolltop)
      : null;

      
    //@ts-ignore
    dipatch(getresourcetags());
    setResourceState({
      'tags':resourceState.tags,
      'title':resourceState.title,
    }
   )

    return () => {
      // 存储页面滚动位置
      const top =
        document && document.documentElement
          ? document.documentElement.scrollTop
          : 0;
           //@ts-ignore
          dipatch(setscrolltop(top));
          setCount(count*2)
    };
  }, [])

  const handSearchClick = (inputValue) => {
    const newState ={
      'tags':resourceState.tags,
      'title':inputValue
    }
    setResourceState(newState)
    console.log(resourceState)
  };

  function onChange(e,value) {
    const isChecked = e.target.checked;
    if (isChecked) {
      // const url = `http://127.0.0.1:3000/search/` + searchTerm; // 替换为你的搜索URL
      // window.location.href = url;
      resourceState.tags.add(value);
    }else{
      resourceState.tags.delete(value);
    }
    const newState ={
      'tags':resourceState.tags,
      'title':resourceState.title
    }
   
    setResourceState(newState)
  }

  return (
    <div>
      <ForwardRefHeader handSearchClick={handSearchClick} ref={ref} ></ForwardRefHeader>
      <BackTop />
      <div className="navbar">
        <div className="navbar-items">
          {/* <div>tag搜索</div> */}
          {Object.keys(resource.tags).map((v: any) => (
            <Checkbox onChange={(e)=>onChange(e,v)}>{v}</Checkbox>
          ))}
        </div>
      <div>{resourceState.tags.size}</div>
        <div className="content-align">
          <List param={resourceState} />
        </div>
      </div>

      
    </div>
  );
};

export default Home;

