import { Button, Form, Input, Select, message } from "antd";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  IsActive: boolean;
}

const createUser = async (newUser: User) => {
  const response = await axios.post("http://localhost:3001/users", newUser);
  return response.data;
};

const UserCreate_adm = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      message.success("Tạo người dùng thành công!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      form.resetFields();
      navigate("/users?name=&page=1&pageSize=5");
    },
    onError: () => {
      message.error("Có lỗi xảy ra khi tạo người dùng.");
    },
  });

  const onFinish = (values: User) => {
    mutation.mutate(values);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ color: "black" }}>Tạo người dùng mới</h2>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên người dùng"
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="IsActive"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select>
            <Select.Option value={true}>Hoạt động</Select.Option>
            <Select.Option value={false}>Ngừng hoạt động</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={mutation.isPending}>
            Tạo người dùng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserCreate_adm;
