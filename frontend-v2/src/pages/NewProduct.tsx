import { ProductForm } from "../components/ProductForm";

export const NewProduct = () => {
  return (
    <div>
      <h1>New Product Page</h1>
      <ProductForm isCreating={true} />
    </div>
  );
};
