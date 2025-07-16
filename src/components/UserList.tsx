import { useQuery } from "@tanstack/react-query";
import { Table, Tag } from "antd";

function UserList() {
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3001/users");
    return res.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Trạng thái",
      dataIndex: "IsActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Hoạt động" : "Ngừng hoạt động"}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ color: "black" }}>Danh sách người dùng</h2>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={"id"}
        loading={isLoading}
        pagination={{ pageSize: 5 }} 
      />
    </div>
  );
}

export default UserList;
