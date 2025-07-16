import { useQuery } from "@tanstack/react-query";
import { Image, Spin, Table } from "antd";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

function ProductList() {
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image: string, record: Product, index: number) => (
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
  ];

  return (
    <div>
      {isLoading ? (
        <Spin />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Table dataSource={data} columns={columns} rowKey="id" />
      )}
    </div>
  );
}

export default ProductList;
