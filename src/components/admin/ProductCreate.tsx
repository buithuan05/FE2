import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface Product {
  name: string;
  price: number;
  description: string;
  image: string;
}

const createProduct = async (newProduct: Product) => {
  const response = await axios.post("http://localhost:3001/products", newProduct);
  return response.data;
};

const ProductCreate = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      message.success("Tạo sản phẩm thành công!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      form.resetFields();
      navigate("/products"); 
    },
    onError: () => {
      message.error("Có lỗi xảy ra khi tạo sản phẩm.");
    },
  });

  const onFinish = (values: Product) => {
    mutation.mutate(values);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ color: "black" }}>Tạo sản phẩm mới</h2>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Tên sản phẩm" 
            rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Giá" 
            rules={[{ required: true , min: 0, type: 'number' }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="image" label="Link ảnh" 
            rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={mutation.isPending}>
            Tạo sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductCreate;
