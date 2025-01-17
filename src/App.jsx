import "./App.css";
import { Router, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import Store from "../src/pages/Store/Store";
import Social from "../src/pages/Social/Social";
import Vlogs from "../src/pages/Vlogs/Vlogs";
import Navigation from "../src/components/Navigation/Navigation";

function App() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/social" element={<Social />} />
        <Route path="/vlogs" element={<Vlogs />} />
      </Routes>
    </>
  );
}

export default App;
