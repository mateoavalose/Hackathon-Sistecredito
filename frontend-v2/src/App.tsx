import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { ShowAProduct } from "./pages/ShowAProduct";
import { ModifyProduct } from "./pages/ModifyProduct";
import { DeleteProduct } from "./pages/DeleteProduct";
import { Prediction } from "./pages/Prediction";
import ProductPage from "./pages/ProductManager";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/one-product" element={<ShowAProduct />} />
        <Route path="/modify-product" element={<ModifyProduct />} />
        <Route path="/delete-product" element={<DeleteProduct />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/productManager" element={<ProductPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
