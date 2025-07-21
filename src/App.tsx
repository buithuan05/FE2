import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail"; 
import CategoryList from "./components/CategoryList";
import UserList from "./components/UserList";
import OrderList from "./components/OrderList";
import BrandList from "./components/BrandList";
import DefaultLayout from "./layout/Header";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        { index: true, element: <Navigate to="/products" /> },
        { path: "products", element: <ProductList /> },
        { path: "products/:id", element: <ProductDetail /> }, 
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
