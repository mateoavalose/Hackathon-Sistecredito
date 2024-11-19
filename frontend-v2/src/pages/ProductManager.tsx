import { useState } from "react";
import { ProductForm } from "../components/ProductForm";
import { AllProducts } from "../components/GetAllProducts";
import { ShowAProduct } from "../pages/ShowAProduct";
import { DeleteProduct } from "../pages/DeleteProduct";
import { ModifyProduct } from "../pages/ModifyProduct";

const ProductPage = () => {
  const [selectedPage, setSelectedPage] = useState<string>("allProducts");

  const renderPage = () => {
    switch (selectedPage) {
      case "allProducts":
        return <AllProducts />;
      case "showProduct":
        return <ShowAProduct />;
      case "deleteProduct":
        return <DeleteProduct />;
      case "modifyProduct":
        return <ModifyProduct />;
      case "newProduct":
        return <ProductForm isCreating={true} />;
      default:
        return <AllProducts />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl font-extrabold text-center text-white mb-10">
        Gestión de Productos
      </h1>

      {/* Botones en un grid más ancho con responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md font-semibold text-lg"
          onClick={() => setSelectedPage("allProducts")}
        >
          Ver Todos
        </button>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md font-semibold text-lg"
          onClick={() => setSelectedPage("showProduct")}
        >
          Buscar Producto
        </button>
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md font-semibold text-lg"
          onClick={() => setSelectedPage("newProduct")}
        >
          Añadir Producto
        </button>
        <button
          className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all shadow-md font-semibold text-lg"
          onClick={() => setSelectedPage("modifyProduct")}
        >
          Modificar Producto
        </button>
        <button
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-md font-semibold text-lg"
          onClick={() => setSelectedPage("deleteProduct")}
        >
          Eliminar Producto
        </button>
      </div>

      {/* Contenedor con max-width y flex */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">{renderPage()}</div>
      </div>
    </div>
  );
};

export default ProductPage;
