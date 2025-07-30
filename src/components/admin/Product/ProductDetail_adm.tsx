import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Image, Spin, Card, Typography, Descriptions, Button } from "antd";

const { Title, Paragraph } = Typography;

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProductDetail = async () => {
    const res = await fetch(`http://localhost:3001/products/${id}`);
    if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProductDetail,
    enabled: !!id,
  });

  if (isLoading) return <Spin style={{ display: "block", margin: "50px auto" }} />;
  if (error) return <p style={{ color: "red" }}>Lỗi: {error.message}</p>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <Button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        ← Quay lại
      </Button>

      <Card bordered style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "flex", gap: 24 }}>
          <Image
            src={data.image}
            width={300}
            fallback="https://via.placeholder.com/300"
            alt={data.name}
            style={{ borderRadius: 8 }}
          />
          <div style={{ flex: 1 }}>
            <Title level={3}>{data.name}</Title>
            <Descriptions column={1} bordered size="middle">
              <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
              <Descriptions.Item label="Giá">{data.price} đ</Descriptions.Item>
              <Descriptions.Item label="Mô tả">
                <Paragraph style={{ margin: 0 }}>{data.description}</Paragraph>
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProductDetail;
