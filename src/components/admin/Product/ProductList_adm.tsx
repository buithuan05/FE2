import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Image, Spin, Table, Input, Button, Popconfirm, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId: string;
}

function ProductList_adm() {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const fetchCategory = async () => {
    const res = await fetch("http://localhost:3001/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  };
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
  });

  

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xóa thất bại");

      message.success("Đã xóa sản phẩm");
      queryClient.invalidateQueries({ queryKey: ["products"] }); 
    } catch (err) {
      message.error("Lỗi khi xóa sản phẩm");
    }
  };

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
  title: "Category",
  render: (_: any, record: Product) =>
    categories?.find((cat: any) => cat.id === record.categoryId)?.name || "Không rõ",
}
,
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
      render: (_: any, record: Product) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="link"
            onClick={() => navigate(`/products/update/${record.id}`)}
          >
            Sửa
          </Button>

          <Button
        type="link"
        danger
        onClick={() => {
          const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa?");
          if (confirmDelete) {
            handleDelete(record.id);
          }
        }}
      >
        Xóa
      </Button>

        </div>
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
        <p style={{ color: "red" }}>Lỗi: {(error as Error).message}</p>
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

export default ProductList_adm;
