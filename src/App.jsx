import "./App.css";
import { Router, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import Store from "../src/pages/Store/Store";
import Social from "../src/pages/Social/Social";
import Vlogs from "../src/pages/Vlogs/Vlogs";
import Navigation from "../src/components/Navigation/Navigation";
import Order from "./pages/Order/Order";
import MusicPlayer from "../src/components/MusicPlayer/MusicPlayer";

function App() {
  return (
    <>
      <div className="container">
        <div className="layout">
          <header>
            <Navigation />
            {/* <MusicPlayer /> */}
          </header>
          <Routes>
            <Route path="/IDC_/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/social" element={<Social />} />
            <Route path="/vlogs" element={<Vlogs />} />
            <Route path="/order/:productId" element={<Order />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
