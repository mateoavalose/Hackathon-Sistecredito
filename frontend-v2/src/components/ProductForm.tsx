import { useEffect, useState } from "react";
import axios from "axios";

interface ProductFormProps {
  isCreating: boolean;
  productIdToEdit?: string;
}

export const ProductForm = ({
  isCreating,
  productIdToEdit,
}: ProductFormProps) => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState<number | undefined>(
    undefined
  );
  const [productPrice, setProductPrice] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchProduct = async () => {
      if (!isCreating && productIdToEdit) {
        const API_URL = import.meta.env.VITE_BACKEND_URL;
        try {
          const response = await axios.get(
            `${API_URL}/products/${productIdToEdit}`
          );
          const product = response.data;
          setProductId(product.product_id);
          setProductName(product.product_name);
          setProductStock(product.product_stock);
          setProductPrice(product.product_price);
        } catch (error) {
          console.error("Error al obtener el producto:", error);
          alert("No se pudo cargar el producto para editar.");
        }
      }
    };

    fetchProduct();
  }, [isCreating, productIdToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const method = isCreating ? "post" : "patch";
    const endpoint = isCreating
      ? `${API_URL}/products`
      : `${API_URL}/products/${productId}`;
    const payload = {
      product_id: productId,
      product_name: productName,
      product_stock: productStock,
      product_price: productPrice,
    };

    try {
      const response = await axios[method](endpoint, payload);
      alert("Producto guardado");
      setProductId("");
      setProductName("");
      setProductStock(undefined);
      setProductPrice(undefined);
      console.log(response.data);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      alert("Error al guardar el producto");
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="productId">Product ID</label>
            <input
              type="text"
              id="productId"
              name="productId"
              placeholder="Ingrese el id del producto"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="product_name">Product Name</label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              placeholder="Ingrese el nombre del producto"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="product_stock">Product Stock</label>
            <input
              type="number"
              id="product_stock"
              name="product_stock"
              placeholder="Ingrese el stock del producto"
              value={productStock}
              onChange={(e) => setProductStock(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label htmlFor="product_price">Product Price</label>
            <input
              type="number"
              id="product_price"
              name="product_price"
              placeholder="Ingrese el precio del producto"
              value={productPrice}
              onChange={(e) => setProductPrice(Number(e.target.value))}
              required
            />
          </div>
          <button type="submit">
            {isCreating ? "Añadir producto" : "Modificar producto"}
          </button>
        </form>
      </div>
    </>
  );
};
