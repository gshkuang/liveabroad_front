import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Radio, BackTop } from "antd";
import Header from "../../component/head";
import "./index.css";
import { getcontent_artical, save_content_artical } from "../../api/api";
import TextColorControl from "./color_control";

import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
} from "draft-js";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";

const StyleType = {
  Inline: 1,
  BlockType: 2,
  Block: 3,
};

function DraftEditor() {
  let { action } = useParams();

  const compositeDecorator = new CompositeDecorator([
    {
      strategy: handleStrategy,
      component: HandleSpan,
    },
    {
      strategy: hashtagStrategy,
      component: HashtagSpan,
    },
    {
      strategy: HeaderStrategy,
      component: onHeader,
    },
  ]);

  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(compositeDecorator)
  );
  const [styleMap, setStyleMap] = useState({
    COLOR: {
      color: "rgba(224,40,40,40)",
    },
  });
  const [blogInfo, setblogInfo] = useState({ content: "" });
  const [header, setHeader] = useState([]);

  const onHeader = (props) => {
    console.log("onHeader");
    console.log(props);
    setHeader(props.children);
  };

  const onChange = (editState) => {
    //todo 创建逻辑不一样
    setEditorState(editState);
  };

  const toggleStyle = (type, style) => {
    if (type == StyleType.Inline) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    } else if (type == StyleType.BlockType) {
      setEditorState(RichUtils.toggleBlockType(editorState, style));
    }
  };

  const saveData = () => {
    console.log(convertToRaw(editorState.getCurrentContent()));
    blogInfo.content = draftToMarkdown(
      convertToRaw(editorState.getCurrentContent())
    );
    if (blogInfo.content == null || blogInfo.content.length <= 0) {
      return;
    }
    save_content_artical(blogInfo).then((val) => {
      console.log(val);
    });
  };

  //监听窗口事件及初始化数据
  useEffect(() => {
    //DidMount;
    //初始化数据
    if (action != "create") {
      console.log("get from backend");
      getcontent_artical(action).then((val) => {
        console.log(val);
        setblogInfo(val);
        setEditorState(
          EditorState.createWithContent(
            convertFromRaw(markdownToDraft(val.content))
          )
        );
      });
    } else {
      //创建
      setEditorState(EditorState.createEmpty(compositeDecorator));
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
      <Header onHeader={onHeader}></Header>
      <BackTop />

      <div className="content">
        {/* <div id="resize"></div> */}
        <div className="content-nav">
          <div>导航</div>
          <ul className="content-nav-ul">
            {header.map((v) => (
              <li>{v}</li>
            ))}
          </ul>
        </div>
        <div className="content-basic">
          {action == "create" && (
            <InlineStyleControls
              editorState={editorState}
              onToggle={toggleStyle}
            />
          )}
          <TextColorControl
            textColorState={styleMap}
            onTextColorChange={setStyleMap}
          />
          <div className="content-editor">
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              onChange={onChange}
              //   spellCheck={true}
            />
          </div>
          <Radio.Button
            value="small"
            style={{ display: "flex", justifyContent: "right" }}
            onClick={saveData}
          >
            保存
          </Radio.Button>
        </div>

        {/* <View markdown={htmlToMarkdown(content)} /> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

//行内样式
var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
  { label: "Color", style: "COLOR" },
  //   { label: "加粗", style: "BOLD" },
  //   { label: "倾斜", style: "ITALIC" },
  //   { label: "下划线", style: "UNDERLINE" },
  { label: "删除线", style: "STRIKETHROUGH" },
];

//块样式
const blockTypes = [
  { label: "普通", style: "unstyled" },
  { label: "h1", style: "header-one" },
  { label: "h2", style: "header-two" },
  { label: "h3", style: "header-three" },
  { label: "h4", style: "header-four" },
  { label: "h5", style: "header-five" },
  { label: "h6", style: "header-six" },
  { label: "引用", style: "blockquote" },
  { label: "代码", style: "code-block" },
  // { label: 'atomic', style: 'atomic' },这个有问题
  { label: "有序列表", style: "ordered-list-item" },
  { label: "无序列表", style: "unordered-list-item" },
];

const InlineStyleControls = (props) => {
  console.log("props: " + props.editorState);
  const { editorState } = props;

  const currentStyle = editorState.getCurrentInlineStyle();
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {/* 行内样式 */}
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          styleType={StyleType.Inline}
        />
      ))}
      {/* //块样式 */}
      {blockTypes.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style == blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          styleType={StyleType.BlockType}
        />
      ))}
    </div>
  );
};

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      //需要改变的样式
      this.props.onToggle(this.props.styleType, this.props.style);
    };
  }
  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const HANDLE_REGEX = /\@[\w]+/g;
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
function handleStrategy(contentBlock, callback, contentState) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

const HandleSpan = (props) => {
  return (
    <span style={styles.handle} data-offset-key={props.offsetKey}>
      {props.children}
    </span>
  );
};

const HashtagSpan = (props) => {
  return (
    <span style={styles.hashtag} data-offset-key={props.offsetKey}>
      {props.children}
    </span>
  );
};

const styles = {
  root: {
    fontFamily: "'Helvetica', sans-serif",
    padding: 20,
    width: 600,
  },
  editor: {
    border: "1px solid #ddd",
    cursor: "text",
    fontSize: 16,
    minHeight: 40,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: "center",
  },
  handle: {
    color: "rgba(98, 177, 254, 1.0)",
    direction: "ltr",
    unicodeBidi: "bidi-override",
  },
  hashtag: {
    color: "rgba(95, 184, 138, 1.0)",
  },
};

const HEADER_REGEX = /(<h([1-6]).*?>(.+?)<\/h[1-6]>)/;
function HeaderStrategy(contentBlock, callback, contentState) {
  findWithRegex(HEADER_REGEX, contentBlock, callback);
}

export default DraftEditor;
