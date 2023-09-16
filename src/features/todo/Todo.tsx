import { Layout, Space, Typography } from "antd";
import { Header, Content } from "antd/es/layout/layout";

import TodoList from "./components/todoList";
import TodoAdd from "./components/todoAdd";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  // backgroundColor: '#7dbcea',
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  // backgroundColor: '#108ee9',
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  // backgroundColor: '#7dbcea',
};

export default function () {
  return (
    <Layout>
      <Header style={headerStyle}>Todo App</Header>
      <Content style={contentStyle}>
        <Space size="large" direction="vertical" style={{ display: "flex" }}>
          <TodoAdd />
          <TodoList />
        </Space>
      </Content>
    </Layout>
  );
}
