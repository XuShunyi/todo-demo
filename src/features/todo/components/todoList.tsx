import { useState, useCallback } from "react";

import { Avatar, Button, Col, List, Radio, RadioChangeEvent, Row, Skeleton, Switch } from "antd";
import Title from "antd/es/typography/Title";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { TodoItem, removeTodo, toggleTodo, updateTodo } from "../todoSlice";

interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const TodoList: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);

  const todos = useAppSelector((state) => state.todo.todos);

  const dispatch = useAppDispatch();

  const onDelete = useCallback((item: TodoItem) => {
    dispatch(removeTodo(item));
  }, []);

  const onToggle = useCallback((item: TodoItem) => {
    dispatch(toggleTodo(item));
  }, []);

  const onUpdateTodo = (item: TodoItem, val: RadioChangeEvent) => {
    let obj = { ...item, priority: val.target.value}
    dispatch(updateTodo(obj));
  }

  return (
    <List
      header={
        <Row>
          <Col span={6}>标题</Col>
          <Col span={6}>优先级</Col>
          <Col span={6}>完成情况</Col>
          <Col span={6}>操作</Col>
        </Row>
      }
      itemLayout="horizontal"
      dataSource={todos}
      renderItem={(item, index) => (
        <List.Item key={index}>
          <Skeleton loading={false} active>
            <List.Item.Meta title={item.title} />
            <List.Item.Meta
              title={
                <Radio.Group
                  value={item.priority}
                  onChange={(val) => onUpdateTodo(item, val)}
                >
                  <Radio.Button value="high">高</Radio.Button>
                  <Radio.Button value="middle">中</Radio.Button>
                  <Radio.Button value="low">低</Radio.Button>
                </Radio.Group>
              }
            />
            <List.Item.Meta
              title={
                <Switch
                  checkedChildren="已完成"
                  unCheckedChildren="未完成"
                  checked={item.completed}
                  onChange={() => onToggle(item)}
                />
              }
            />
            <List.Item.Meta
              title={[
                <Button type="text" danger onClick={() => onDelete(item)}>
                  删除
                </Button>,
              ]}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default TodoList;
