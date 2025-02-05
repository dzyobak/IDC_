import "./App.css";
import { Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext"; // Імпортуємо CartProvider
import Cart from "./components/Cart/Cart"; // Імпортуємо Cart
import Home from "../src/pages/Home/Home";
import Store from "../src/pages/Store/Store";
import Social from "../src/pages/Social/Social";
import Vlogs from "../src/pages/Vlogs/Vlogs";
import Navigation from "../src/components/Navigation/Navigation";
import Order from "./pages/Order/Order";
import AdminPage from "../src/pages/AdminPages/AdminPages"; // Імпортуємо сторінку адміна

function App() {
  return (
    <>
      <div className="container">
        <div className="layout">
          <header>
            <Navigation />
          </header>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/social" element={<Social />} />
              <Route path="/vlogs" element={<Vlogs />} />
              <Route path="/order/:productId" element={<Order />} />
              <Route path="/admin" element={<AdminPage />} />{" "}
              <Route path="/cart" element={<Cart />} />
              {/* Додаємо маршрут для адміна */}
            </Routes>
          </CartProvider>
        </div>
      </div>
    </>
  );
}

export default App;
