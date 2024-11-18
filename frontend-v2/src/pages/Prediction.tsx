import { useState } from "react";
import axios from "axios";

export const Prediction = () => {
  const [productId, setProductId] = useState("");
  const [showPng, setShowPng] = useState(false);
  const [image, setImage] = useState("");

  const fetchPrediction = async () => {
    const API_URL = import.meta.env.VITE_FASTAPI_URL;
    try {
      const response = await axios.get(`${API_URL}/predict/${productId}`, {
        responseType: "arraybuffer",
      });
      const blob = new Blob([response.data], { type: "image/png" });

      // Usar FileReader para convertir el Blob a base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setImage(base64data);
        setShowPng(true);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error(error);
      setShowPng(false);
    }
  };

  return (
    <div>
      <h1>Prediction page</h1>
      <div>
        <input
          placeholder="Ingrese el ID del producto"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <button onClick={fetchPrediction}>Buscar producto</button>
      </div>

      {showPng && <img src={image} alt="Prediction" />}
    </div>
  );
};
