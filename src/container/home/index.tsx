import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getlist, clearlist, setscrolltop } from "../../reducer/artical.redux";
import { BackTop } from "antd";
import Header from "../../component/head";
import List from "../../component/list";

interface State {}
interface Props {
  artical: any;
  getlist: Function;
  clearlist: Function;
  setscrolltop: Function;
}
// @ts-ignore
@connect((state) => state, { getlist, clearlist, setscrolltop })
export default class Home extends PureComponent<Props, State> {
  constructor(props: Props) {
    console.log(props);
    super(props);
  }
  componentDidMount() {
    // 恢复页面滚动位置
    const { scrolltop } = this.props.artical;
    document && document.documentElement
      ? (document.documentElement.scrollTop = scrolltop)
      : null;
  }

  async componentWillUnmount() {
    // 存储页面滚动位置
    const top =
      document && document.documentElement
        ? document.documentElement.scrollTop
        : 0;
    await this.props.setscrolltop(top);
  }
  render() {
    const { artical, getlist, clearlist } = this.props;
    return (
      <div>
        <Header></Header>
        <BackTop />
        <div className="content-align">
          <List artical={artical} getlist={getlist} clearlist={clearlist} />
        </div>
      </div>
    );
  }
}
