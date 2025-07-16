import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";

function BrandList() {
  const fetchBrands = async () => {
    const res = await fetch("http://localhost:3001/brand");
    return res.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "name",
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

export default BrandList;
