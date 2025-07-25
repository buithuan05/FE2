import { useQuery } from "@tanstack/react-query";
import { Table, Tag, Input, Button, Space } from "antd";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function UserList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "5", 10);

  const [searchTerm, setSearchTerm] = useState(name);

  const fetchUsers = async () => {
    const res = await fetch(
      `http://localhost:3001/users?name_like=${name}&_page=${page}&_limit=${pageSize}`
    );
    if (!res.ok) throw new Error("Lỗi khi fetch dữ liệu người dùng");

    const totalCount = res.headers.get("X-Total-Count"); 
    const data = await res.json();
    return { data, total: Number(totalCount || 0) };
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", name, page, pageSize],
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
    params.page = "1";
    params.pageSize = String(pageSize);
    setSearchParams(params);
  };

  const handleTableChange = (pagination: any) => {
    const current = pagination.current;
    const size = pagination.pageSize;

    setSearchParams({
      name: name,
      page: String(current),
      pageSize: String(size),
    });
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
        dataSource={data?.data}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: data?.total || 0,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default UserList;
