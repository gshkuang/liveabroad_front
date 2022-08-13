import React from "react";
import { Button, Popover } from "antd";
import { SketchPicker } from "react-color";

interface IProp {
  textColorState: any;
  onTextColorChange: Function;
}

export default class AddColorControl extends React.Component<IProp> {
  constructor(props: IProp) {
    super(props);
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  // 颜色选择器选择的颜色改变，draft.js不支持更改文字透明度
  handleChangeComplete = (color: any) => {
    console.log(this.props.textColorState.COLOR.color);
    const newTextColor = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    this.props.onTextColorChange({
      COLOR: {
        color: newTextColor,
      },
    });
    console.log(this.props.textColorState.COLOR.color);
  };

  // 渲染颜色选择器
  renderColorPicker = () => {
    return (
      <SketchPicker
        color={this.props.textColorState.COLOR.color}
        onChangeComplete={this.handleChangeComplete}
      />
    );
  };

  render() {
    return (
      <Popover content={this.renderColorPicker()}>
        <Button style={{ marginLeft: 8 }}>
          文本颜色
          <div
            style={{ backgroundColor: this.props.textColorState.COLOR.color }}
          />
        </Button>
      </Popover>
    );
  }
}
