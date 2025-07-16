import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";

function CategoryList() {
  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3001/categories");
    return res.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
    },
  ];

  return (
    <div>
      <h2 style={{color: "black"}}>Danh mục</h2>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={"id"}
        loading={isLoading}
      />
    </div>
  );
}

export default CategoryList;