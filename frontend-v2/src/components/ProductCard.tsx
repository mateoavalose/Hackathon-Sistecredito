interface ProductCardProps {
  product_id: string;
  product_name: string;
  product_stock: number;
  product_price: number;
}

export const ProductCard = ({
  product_id,
  product_name,
  product_stock,
  product_price,
}: ProductCardProps) => {
  return (
    <div>
      <h1>
        {product_id}--{product_name}
      </h1>
      <p>Stock: {product_stock}</p>
      <p>Price: {product_price}</p>
    </div>
  );
};
