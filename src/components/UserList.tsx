import { useQuery } from "@tanstack/react-query";
import { Table, Tag, Input, Button, Space } from "antd";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function UserList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const [searchTerm, setSearchTerm] = useState(name);
  const [pageSize, setPageSize] = useState(5);

  const fetchUsers = async () => {
    const res = await fetch(`http://localhost:3001/users?name_like=${name}`);
    if (!res.ok) throw new Error("Lỗi khi fetch dữ liệu người dùng");
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", name],
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

  const handleSearch = () => {
    const params: any = {};
    if (searchTerm.trim()) params.name = searchTerm.trim();
    setSearchParams(params);
  };

  return (
    <div>
      <h2 style={{ color: "black" }}>Danh sách người dùng</h2>
    
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Nhập tên người dùng"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onPressEnter={handleSearch}
        />
        <Button type="primary" onClick={handleSearch}>
          Tìm kiếm
        </Button>
      </Space>

      {error && <p style={{ color: "red" }}>Lỗi: {error.message}</p>}

      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          onShowSizeChange: (_, newSize) => setPageSize(newSize),
        }}
      />
    </div>
  );
}

export default UserList;
