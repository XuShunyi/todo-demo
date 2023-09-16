import { Button, Form, Input, Radio } from "antd";
import { useAppDispatch } from "../../../hooks";
import { addTodo } from "../todoSlice";


const TodoAdd: React.FC = () => {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    dispatch(addTodo(values))
    form.resetFields()
  };

  return (
    <Form
      layout="inline"
      form={form}
      initialValues={{ priority: 'high' }}
      style={{ marginTop: "1em" }}
      onFinish={onFinish}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '标题为必填项' }]}>
        <Input placeholder="请输入..." />
      </Form.Item>
      <Form.Item label="优先级" name="priority">
        <Radio.Group>
          <Radio.Button value="high">高</Radio.Button>
          <Radio.Button value="middle">中</Radio.Button>
          <Radio.Button value="low">低</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">添加</Button>
      </Form.Item>
    </Form>
  );
};

export default TodoAdd;
