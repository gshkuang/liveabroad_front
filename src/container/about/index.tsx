import React, { Component } from "react";
import axios from "axios";

export default class About extends Component {
  getData = () => {
    axios
      .get("/api/api/note/v1/get_note_detail", {
        params: {
          id: "627002099046736d0934f74b",
        },
      })
      .then(
        (res) => {
          console.log(res.data);
        },
        (error) => {
          console.log("失败了", error);
        }
      );
  };

  render() {
    this.getData();
    return <h3>我是About的内容</h3>;
  }
}
