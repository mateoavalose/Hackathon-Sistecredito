import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { ProductsPage } from "./pages/Products";
import { ListProducts } from "./pages/ListProducts";
import { ShowAProduct } from "./pages/ShowAProduct";
import { NewProduct } from "./pages/NewProduct";
import { ModifyProduct } from "./pages/ModifyProduct";
import { DeleteProduct } from "./pages/DeleteProduct";
import { Prediction } from "./pages/Prediction";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/all-products" element={<ListProducts />} />
        <Route path="/one-product" element={<ShowAProduct />} />
        <Route path="/add-product" element={<NewProduct />} />
        <Route path="/modify-product" element={<ModifyProduct />} />
        <Route path="/delete-product" element={<DeleteProduct />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </Router>
  );
}

export default App;
