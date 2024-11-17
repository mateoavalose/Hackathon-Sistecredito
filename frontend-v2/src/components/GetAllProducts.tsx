import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "../components/ProductCard";

type Product = {
  product_id: string;
  product_name: string;
  product_stock: number;
  product_price: number;
};

export const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    axios
      .get(`${API_URL}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      {products.map((product) => (
        <div key={product.product_id}>
          <ProductCard
            product_id={product.product_id}
            product_name={product.product_name}
            product_stock={product.product_stock}
            product_price={product.product_price}
          />
        </div>
      ))}
    </>
  );
};
