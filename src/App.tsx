import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import ProductList from "./components/client/ProductList";
import ProductDetail from "./components/client/ProductDetail"; 
import CategoryList from "./components/client/CategoryList";
import UserList from "./components/client/UserList";
import OrderList from "./components/client/OrderList";
import BrandList from "./components/client/BrandList";
import DefaultLayout from "./layout/Header";
import ProductCreate from "./components/admin/Product/ProductCreate_adm";
import ProductList_adm from "./components/admin/Product/ProductList_adm";
import UserList_adm from "./components/admin/User/UserList_adm";
import ProductUpdate_adm from "./components/admin/Product/ProductUpdate_adm";
import UserCreate_adm from "./components/admin/User/UserCreate_adm";
import UserUpdate_adm from "./components/admin/User/UserUpdate_adm";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        { index: true, element: <Navigate to="/products" /> },
        { path: "products", element: <ProductList_adm /> },
        { path: "products/:id", element: <ProductDetail /> }, 
        { path: "products/create", element: <ProductCreate /> },
        { path: "categories", element: <CategoryList /> },
        { path: "users", element: <UserList_adm /> },
        { path: "orders", element: <OrderList /> },
        { path: "brands", element: <BrandList /> },
        { path: "products/update/:id", element: <ProductUpdate_adm /> },
        { path: "users/create", element: <UserCreate_adm /> },
        { path: "users/update/:id", element: <UserUpdate_adm /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
