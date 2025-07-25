import { Layout } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Content } = Layout;

const DefaultLayout = () => {
  const location = useLocation();

  const menuItems = [
    { label: "Danh sách sản phẩm", path: "/products" },
    { label: "Thêm sản phẩm", path: "/products/create" },
    { label: "Danh mục", path: "/categories" },
    { label: "Thương hiệu", path: "/brands" },
    { label: "Người dùng", path: "/users?name=&page=1&pageSize=5" },
    { label: "Đơn hàng", path: "/orders" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "fixed",
          top: 0,
          zIndex: 1000,
          width: "100%",
          background: "#001529",
          padding: "0 24px",
        }}
      >
        <div style={{ display: "flex", gap: "20px", alignItems: "center", height: "100%" }}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: location.pathname === item.path ? "#1890ff" : "#fff",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Header>

      <Content
  style={{
    width: "100%",
    marginTop: 64,
    padding: "24px",
    display: "flex",
    justifyContent: "center",  // căn giữa ngang
    alignItems: "flex-start",  // không căn giữa dọc
    backgroundColor: "#f0f2f5",
  }}
>
  <div
    style={{
      width: "100%"
    }}
  >
    <Outlet />
  </div>
</Content>

    </Layout>
  );
};

export default DefaultLayout;
