import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import UserList from "./components/UserList";
import OrderList from "./components/OrderList";
import BrandList from "./components/BrandList";
import "./App.css";

function App() {
  return (
  <div>
    <ProductList />;
    <CategoryList />
    <UserList />
    <OrderList />
    <BrandList />
  </div> 
  )
}

export default App;