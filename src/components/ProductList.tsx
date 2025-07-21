import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Image, Spin, Table, Input } from "antd";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const filteredData = data?.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string, record: Product) => (
        <Link to={`/products/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image: string, record: Product) => (
        <Image
          src={image}
          alt={record.name}
          style={{ width: 200, height: 150 }}
          fallback="https://via.placeholder.com/200x150?text=No+Image"
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Product) => (
        <Link to={`/products/${record.id}`}>View Details</Link>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ color: "black" }}>Danh sách sản phẩm</h2>

      <Input.Search
        placeholder="Tìm kiếm theo tên sản phẩm"
        allowClear
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
      />

      {isLoading ? (
        <Spin />
      ) : error ? (
        <p style={{ color: "red" }}>Lỗi: {error.message}</p>
      ) : (
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
}

export default ProductList;
