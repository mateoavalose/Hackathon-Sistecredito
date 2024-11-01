import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import mean_absolute_error

# Cargar los datos
file_path = './Data/product-history.csv'
df_historial = pd.read_csv(file_path)

# Convertir la columna 'Date' a tipo datetime y ordenar por fecha
df_historial['Date'] = pd.to_datetime(df_historial['Date'], errors='coerce')
df_historial = df_historial.dropna(subset=['Date']).sort_values(by='Date')

# Filtrar para el producto específico
product_id = "PID-8"  # Cambia este valor al ID del producto que deseas analizar
df_producto = df_historial[df_historial['ProductID'] == product_id].copy()

# Verificar que haya datos suficientes para el producto
if df_producto.empty:
    print(f"No se encontraron datos para el ProductID {product_id}.")
else:
    # Crear variables de lag para los periodos previos
    lags = 3  # Número de periodos anteriores a considerar
    for i in range(1, lags + 1):
        df_producto[f'Stock_t-{i}'] = df_producto['Stock'].shift(i)
    
    # Eliminar filas con NaN generados por el desplazamiento
    df_producto = df_producto.dropna().reset_index(drop=True)

    # Variables independientes (lag features) y dependiente
    X = df_producto[[f'Stock_t-{i}' for i in range(1, lags + 1)] + ['Price']]
    y = df_producto['Stock']

    # División de los datos en entrenamiento y prueba
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

    # Ajuste de hiperparámetros
    modelo_xgb = XGBRegressor()
    parametros = {
        'n_estimators': [100, 200],
        'learning_rate': [0.01, 0.1, 0.2],
        'max_depth': [3, 5]
    }
    grid_search = GridSearchCV(modelo_xgb, parametros, cv=3, scoring='neg_mean_absolute_error')
    grid_search.fit(X_train, y_train)
    modelo = grid_search.best_estimator_

    # Evaluación en el conjunto de prueba
    y_pred = modelo.predict(X_test)
    print(f"Mean Absolute Error en conjunto de prueba: {mean_absolute_error(y_test, y_pred):.2f}")

    # Predicción para los próximos 6 meses
    futuros_meses = pd.date_range(start=df_producto['Date'].max() + pd.DateOffset(months=1), periods=6, freq='ME')
    predicciones_futuras = []

    ultimos_valores = list(df_producto['Stock'].tail(lags).values)  # Últimos valores de stock para predicciones futuras

    for fecha in futuros_meses:
        precio_promedio = df_producto['Price'].mean()  # Promedio de precios para el producto
        prediccion = modelo.predict([ultimos_valores + [precio_promedio]])
        predicciones_futuras.append(prediccion[0])
        ultimos_valores = ultimos_valores[1:] + [prediccion[0]]  # Actualizar valores de lag para la siguiente predicción

    # Crear un DataFrame para las predicciones futuras
    df_predicciones = pd.DataFrame({
        'Date': futuros_meses,
        'Stock': predicciones_futuras,
        'ProductID': product_id
    })

    # Graficar los datos históricos y las predicciones futuras
    plt.figure(figsize=(12, 6))
    plt.plot(df_producto['Date'], df_producto['Stock'], label='Histórico Real', marker='o')
    plt.plot(df_predicciones['Date'], df_predicciones['Stock'], label='Predicción', linestyle='--', marker='x')
    plt.xlabel('Fecha')
    plt.ylabel('Stock')
    plt.title(f'Histórico de Stock y Predicciones del Modelo para ProductID = {product_id}')
    plt.legend()
    plt.grid()
    plt.show()
