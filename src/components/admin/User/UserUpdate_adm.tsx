import { Button, Form, Input, Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

function UserUpdate_adm() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  // Lấy dữ liệu user theo id
  const { data: user } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3001/users/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Set dữ liệu vào form khi load xong
  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  // Gọi API cập nhật user
  const mutation = useMutation({
    mutationFn: async (values: any) => {
      return axios.put(`http://localhost:3001/users/${id}`, values);
    },
    onSuccess: () => {
      message.success("Cập nhật người dùng thành công!");
      navigate("/users?name=&page=1&pageSize=5");
    },
    onError: () => {
      message.error("Có lỗi xảy ra khi cập nhật.");
    },
  });

  const handleSubmit = (values: any) => {
    mutation.mutate(values);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ color: "black" }}>Cập nhật người dùng</h2>

      <Form layout="vertical" form={form} onFinish={handleSubmit}>
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
            Cập nhật người dùng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserUpdate_adm;
