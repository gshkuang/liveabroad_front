import React from "react";
import Home from "../container/home";
import Editor from "../container/editor";
import Comments from "../container/comments";
import UserCenter from "../container/user_center";

const routers = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/home",
    component: <Home />,
  },
  {
    path: "/search",
    component: <Home />,
  },
  {
    path: "/blog/:action",
    component: <Editor />,
  },
  {
    path: "/comment",
    component: <Comments />,
  },
  {
    path: "/user",
    component: <UserCenter />,
  },
  {
    path: "/blog",
    component: <Editor />,
  },
  {
    path: "/blog/get/:id",
    component: <Editor />,
  },
  // {
  //   path: "/graph",
  //   component: <GraphEditor />,
  // },
];
export { routers };
