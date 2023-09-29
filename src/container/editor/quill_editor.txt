import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import * as Emoji from "quill-emoji";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import axios from "axios";
import { Radio, BackTop } from "antd";
import "../../index.css";
import Header from "../../component/head";
import Footer from "../../component/footer";
import { getcontent_artical, save_content_artical } from "../../api/api";

Quill.register("modules/emoji", Emoji);

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["emoji"],
  ["clean"],
];

// interface BlogInfo{
// 	content:string
// }

function QuillEditor() {
  let { action } = useParams();

  const [content, setContent] = useState("");
  const [blogInfo, setblogInfo] = useState({ content: "" });

  const onChange = (article) => {
    setContent(article);
  };

  const saveData = () => {
    console.log(blogInfo);
    blogInfo.content = content;
    save_content_artical(blogInfo).then((val) => {
      console.log(val);
    });
  };

  //监听窗口事件及初始化数据
  useEffect(() => {
    //DidMount;
    //初始化数据
    if (action != "create") {
      getcontent_artical(action).then((val) => {
        console.log(val);
        setblogInfo(val);
        setContent(val.content);
      });
    } else {
      //创建
    }

    //监听
    const listener = (ev) => {
      //有bug
      saveData();
      ev.preventDefault();
      ev.returnValue = "你确定离开此页面吗?";
    };
    window.addEventListener("beforeunload", listener);
    return () => {
      window.removeEventListener("beforeunload", listener);
    };
  }, []);

  return (
    <div>
      <Header></Header>
      <BackTop />
      <div className="content-align">
        <ReactQuill
          theme="snow"
          modules={{
            // 去掉toolbar
            toolbar: action == "create" ? true : false,
            "emoji-toolbar": true,
            "emoji-textarea": false,
            "emoji-shortname": true,
          }}
          readOnly={action == "create" ? false : true}
          value={content}
          onChange={onChange}
        />
        <Radio.Button
          value="small"
          style={{ display: "flex", justifyContent: "right" }}
          onClick={saveData}
        >
          保存
        </Radio.Button>
        {/* <View markdown={htmlToMarkdown(content)} /> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default QuillEditor;
