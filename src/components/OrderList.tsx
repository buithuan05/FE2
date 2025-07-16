import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";

function OrderList() {
  const fetchOrders = async () => {
    const [orders, users, products] = await Promise.all([
      fetch("http://localhost:3001/orders").then((res) => res.json()),
      fetch("http://localhost:3001/users").then((res) => res.json()),
      fetch("http://localhost:3001/products").then((res) => res.json()),
    ]);

    return orders.map((order: any) => ({
      ...order,
      userName: users.find((u: any) => u.id === order.userId)?.name || "Không rõ",
      productName:
        products.find((p: any) => p.id === order.productId)?.name || "Không rõ",
    }));
  };

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Người dùng",
      dataIndex: "userName",
    },
    {
      title: "Sản phẩm",
      dataIndex: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
  ];

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={"id"}
        loading={isLoading}
      />
    </div>
  );
}

export default OrderList;
