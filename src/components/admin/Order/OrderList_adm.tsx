import { useQuery } from "@tanstack/react-query";
import { Table, Tag, Spin } from "antd";

function OrderList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const [orders, users, products] = await Promise.all([
        fetch("http://localhost:3001/orders").then((res) => res.json()),
        fetch("http://localhost:3001/users").then((res) => res.json()),
        fetch("http://localhost:3001/products").then((res) => res.json()),
      ]);

      return orders.map((order: any) => {
        const product = products.find(
          (p: any) => String(p.id) === String(order.productId)
        );
        const user = users.find(
          (u: any) => String(u.id) === String(order.userId)
        );

        return {
          ...order,
          userName: user?.name || "Không rõ",
          productName: product?.name || "Không rõ",
        };
      });
    },
  });

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Người dùng", dataIndex: "userName" },
    { title: "Sản phẩm", dataIndex: "productName" },
    { title: "Số lượng", dataIndex: "quantity" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          shipped: "green",
          pending: "orange",
          delivered: "blue",
          cancelled: "red",
        };
        return <Tag color={colorMap[status] || "default"}>{status}</Tag>;
      },
    },
  ];

  if (isLoading) return <Spin />;
  if (error) return <p style={{ color: "red" }}>Lỗi: {(error as Error).message}</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ color: "black" }}>Danh sách đơn hàng</h2>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        locale={{ emptyText: "Không có đơn hàng nào" }}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default OrderList;
