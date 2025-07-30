import { Button, Form, Input, InputNumber, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

function ProductUpdate() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  // Lấy dữ liệu sản phẩm theo id
  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3001/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Set lại dữ liệu cho form
  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  // Gọi API cập nhật sản phẩm
  const mutation = useMutation({
    mutationFn: async (values: any) => {
      return axios.put(`http://localhost:3001/products/${id}`, values);
    },
    onSuccess: () => {
      message.success("Cập nhật sản phẩm thành công!");
      navigate("/products");
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
      <h2 style={{ color: "black" }}>Cập nhật sản phẩm</h2>

      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Giá" rules={[{ required: true, min: 0, type: "number" }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="image" label="Link ảnh" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={mutation.isPending}>
            Cập nhật sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProductUpdate;
