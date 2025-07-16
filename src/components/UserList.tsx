import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";

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
      render: (active: boolean) => (active ? "Hoạt động" : "Bị khóa"),
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

export default UserList;
