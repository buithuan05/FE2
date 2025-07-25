import {
  Table,
  Tag,
  Input,
  Button,
  Space,
  message,
  Select,
} from "antd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const { Option } = Select;

function UserList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // Get URL params
  const name = searchParams.get("name") || "";
  const isActive = searchParams.get("IsActive") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "5");

  const [searchTerm, setSearchTerm] = useState(name);
  const [statusFilter, setStatusFilter] = useState(isActive);

  // Fetch users
  const fetchUsers = async () => {
    const params = new URLSearchParams();
    if (name) params.append("name_like", name);
    if (isActive === "true" || isActive === "false") {
      params.append("IsActive", isActive);
    }
    params.append("_page", String(page));
    params.append("_limit", String(pageSize));

    const res = await fetch(`http://localhost:3001/users?${params}`);
    if (!res.ok) throw new Error("Lỗi khi fetch người dùng");
    const total = res.headers.get("X-Total-Count");
    return { data: await res.json(), total: Number(total) };
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", name, isActive, page, pageSize],
    queryFn: fetchUsers,
  });

  const handleSearch = () => {
    setSearchParams({
      name: searchTerm,
      IsActive: statusFilter,
      page: "1",
      pageSize: String(pageSize),
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/users/${id}`, { method: "DELETE" });
      message.success("Xoá thành công");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch {
      message.error("Lỗi khi xoá người dùng");
    }
  };

  const toggleActive = async (user: any) => {
    try {
      await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, IsActive: !user.IsActive }),
      });
      message.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch {
      message.error("Lỗi cập nhật trạng thái");
    }
  };

  const handleTableChange = (pagination: any) => {
    setSearchParams({
      name,
      IsActive: isActive,
      page: String(pagination.current),
      pageSize: String(pagination.pageSize),
    });
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Tên", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Trạng thái",
      dataIndex: "IsActive",
      render: (val: boolean) => (
        <Tag color={val ? "green" : "red"}>
          {val ? "Hoạt động" : "Ngừng"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" href={`/users/edit/${record.id}`}>Sửa</Button>
          <Button
            type="link"
            danger
            onClick={() =>
              window.confirm("Xoá người dùng?") && handleDelete(record.id)
            }
          >
            Xoá
          </Button>
          <Button type="link" onClick={() => toggleActive(record)}>
            {record.IsActive ? "Ngừng" : "Kích hoạt"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Danh sách người dùng</h2>

      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tên người dùng"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onPressEnter={handleSearch}
        />
        <Select
          placeholder="Trạng thái"
          value={statusFilter || undefined}
          onChange={(val) => setStatusFilter(val)}
          style={{ width: 150 }}
          allowClear
        >
          <Option value="">Tất cả</Option>
          <Option value="true">Hoạt động</Option>
          <Option value="false">Ngừng</Option>
        </Select>
        <Button type="primary" onClick={handleSearch}>
          Tìm kiếm
        </Button>
      </Space>

      {error && <p style={{ color: "red" }}>{error.message}</p>}

      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={data?.data}
        columns={columns}
        pagination={{
          current: page,
          pageSize,
          total: data?.total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
        }}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default UserList;
