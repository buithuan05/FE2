import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import ProductList from "./components/client/ProductList";
import ProductDetail from "./components/client/ProductDetail"; 
import CategoryList from "./components/client/CategoryList";
import UserList from "./components/client/UserList";
import OrderList from "./components/client/OrderList";
import BrandList from "./components/client/BrandList";
import DefaultLayout from "./layout/Header";
import ProductCreate from "./components/admin/ProductCreate";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        { index: true, element: <Navigate to="/products" /> },
        { path: "products", element: <ProductList /> },
        { path: "products/:id", element: <ProductDetail /> }, 
        { path: "products/create", element: <ProductCreate /> },
        { path: "categories", element: <CategoryList /> },
        { path: "users", element: <UserList /> },
        { path: "orders", element: <OrderList /> },
        { path: "brands", element: <BrandList /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
