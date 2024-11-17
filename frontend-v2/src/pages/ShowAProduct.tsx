import { useState } from "react";

type Product = {
  product_id: string;
  product_name: string;
  product_stock: number;
  product_price: number;
};

export const ShowAProduct = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [productId, setProductId] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const fetchProduct = async () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await fetch(`${API_URL}/products/${productId}`);
      if (!response.ok) {
        setProduct(null);
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
      setProduct(null);
    }
    setHasSearched(true);
  };
  return (
    <div>
      <h1>Show A Product Page</h1>
      <input
        placeholder="Ingrese el ID del producto"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button onClick={fetchProduct}>Buscar producto</button>
      {hasSearched &&
        (product ? (
          <div>
            <h1>
              {product.product_id}--{product.product_name}
            </h1>
            <p>Stock: {product.product_stock}</p>
            <p>Price: {product.product_price}</p>
          </div>
        ) : (
          <p>Producto no encontrado</p>
        ))}
    </div>
  );
};
