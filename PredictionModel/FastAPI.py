from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO
from xgboost import XGBRegressor
import asyncpg
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Configuración de FastAPI
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todos los orígenes, incluidas todas las IPs
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

# Variables de entorno para la conexión a la base de datos
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise ValueError("La variable de entorno DATABASE_URL no está definida")

# Función para cargar datos de PostgreSQL
async def fetch_product_history(product_id: str):
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        query = f"SELECT * FROM product_history WHERE product_id = $1 ORDER BY date"
        rows = await conn.fetch(query, product_id)
        if not rows:
            raise HTTPException(status_code=404, detail=f"No data found for ProductID {product_id}")
        
        # Convertir los resultados a un DataFrame de pandas
        df_producto = pd.DataFrame(rows, columns=["UUID", "ProductID", "Stock", "Price", "Date"])
        df_producto['Date'] = pd.to_datetime(df_producto['Date'])
        return df_producto
    finally:
        await conn.close()

# Función para predecir el stock de un producto específico
def predict_stock(df_producto: pd.DataFrame, lags: int = 3, future_periods: int = 6):
    # Convertir fechas y ordenar
    df_producto['Date'] = pd.to_datetime(df_producto['Date'], errors='coerce')
    df_producto = df_producto.sort_values('Date').reset_index(drop=True)

    # Ajustar número de lags dinámicamente
    lags = min(lags, len(df_producto) - 1)  # Asegurarse de que haya suficientes registros
    if len(df_producto) <= lags:
        raise ValueError(f"Insuficientes registros históricos para calcular lags. Necesitas al menos {lags + 1} registros.")

    # Crear rango de fechas futuras
    last_date = df_producto['Date'].max()
    futuros_meses = pd.date_range(
        start=last_date + pd.DateOffset(months=1),
        periods=future_periods,
        freq='M'
    )

    # Crear variables de lag
    for i in range(1, lags + 1):
        df_producto[f'Stock_t-{i}'] = df_producto['Stock'].shift(i)
    df_producto = df_producto.dropna().reset_index(drop=True)

    # Variables independientes y dependiente
    X = df_producto[[f'Stock_t-{i}' for i in range(1, lags + 1)] + ['Price']]
    y = df_producto['Stock']

    # Entrenar el modelo
    modelo = XGBRegressor(n_estimators=200, learning_rate=0.1, max_depth=3)
    modelo.fit(X, y)

    # Generar predicciones para los próximos periodos
    predicciones_futuras = []
    ultimos_valores = list(df_producto['Stock'].tail(lags).values)

    for fecha in futuros_meses:
        precio_promedio = df_producto['Price'].mean()
        prediccion = modelo.predict([ultimos_valores + [precio_promedio]])
        predicciones_futuras.append(prediccion[0])
        ultimos_valores = ultimos_valores[1:] + [prediccion[0]]

    # Crear DataFrame para las predicciones
    df_predicciones = pd.DataFrame({'Date': futuros_meses, 'Stock': predicciones_futuras, 'ProductID': df_producto['ProductID'].iloc[0]})

    # Graficar los datos históricos y las predicciones
    plt.figure(figsize=(12, 6))
    plt.plot(df_producto['Date'], df_producto['Stock'], label='Histórico Real', marker='o')
    plt.plot(df_predicciones['Date'], df_predicciones['Stock'], label='Predicción', linestyle='--', marker='x')
    plt.xlabel('Fecha')
    plt.ylabel('Stock')
    plt.title(f'Histórico de Stock y Predicciones del Modelo para ProductID = {df_producto['ProductID'].iloc[0]}')
    plt.legend()
    plt.grid()

    # Guardar el gráfico en un objeto BytesIO
    buf = BytesIO()
    plt.savefig(buf, format="png")
    plt.close()
    buf.seek(0)
    return buf

# Endpoint para probar la base de datos
@app.get("/")
async def read_root():
    try:
        conn = await asyncpg.connect(DATABASE_URL)
        await conn.close()
        return {"status": "Database connection successful!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint para realizar la predicción
@app.get("/predict/{product_id}")
async def predict(product_id: str):
    try:
        # Cargar datos del producto desde la base de datos
        df_producto = await fetch_product_history(product_id)
        
        # Realizar la predicción y obtener la imagen
        buf = predict_stock(df_producto)
        return StreamingResponse(buf, media_type="image/png")
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
