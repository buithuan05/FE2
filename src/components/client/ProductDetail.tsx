import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Image, Spin } from "antd";

function ProductDetail() {
  const { id } = useParams();

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

  if (isLoading) return <Spin />;
  if (error) return <p style={{ color: "red" }}>Lỗi: {error.message}</p>;

  return (
    <div>
      <h2>Chi tiết sản phẩm</h2>
      <Image src={data.image} width={300} fallback="https://via.placeholder.com/300" />
      <p><strong>ID:</strong> {data.id}</p>
      <p><strong>Tên:</strong> {data.name}</p>
      <p><strong>Giá:</strong> {data.price}</p>
      <p><strong>Mô tả:</strong> {data.description}</p>
    </div>
  );
}

export default ProductDetail;
