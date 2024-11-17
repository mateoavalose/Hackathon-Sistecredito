import { Link } from "react-router-dom";

export const ProductsPage = () => {
  return (
    <div>
      <h1>Products Page</h1>
      <Link to="/all-products">
        <button>Todos</button>
      </Link>
      <Link to="/one-product">
        <button>Uno</button>
      </Link>
    </div>
  );
};
