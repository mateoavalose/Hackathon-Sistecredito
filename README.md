# Proyecto Inventario

## Requisitos Funcionales y Criterios de Aceptación para la Hackatón

### Propósito

El propósito de esta hackatón es fomentar la creatividad, innovación y calidad técnica en el desarrollo de soluciones relacionadas con la **gestión de inventario en tiempo real utilizando inteligencia artificial (IA) o machine learning (ML)**. Los equipos participantes deberán trabajar en el desarrollo de una solución que permita a los tenderos gestionar eficientemente su inventario, **optimizando los niveles de stock mediante predicciones basadas en modelos de machine learning**. Además, deberán construir un microservicio para la gestión de productos y proporcionar interfaces intuitivas para su uso. Se evaluará la calidad del código, la creatividad en la solución propuesta, la adherencia a los lineamientos técnicos, y el nivel de innovación.

### Objetivos

1. **Implementar un modelo de IA o Machine Learning** que permita predecir los niveles de stock óptimos para los productos en función del comportamiento de compra de los clientes.
2. Proveer una interfaz gráfica desarrollada en **Angular** que permita a los tenderos visualizar en tiempo real el estado de su inventario, con reportes descargables y gráficos interactivos.
3. Desarrollar un **microservicio en .NET** para la gestión de productos, que permita a los tenderos realizar CRUD de productos.
4. **Generar un archivo Excel** con la orden de compra de los productos faltantes cuando el inventario esté por debajo del nivel mínimo, basado en las predicciones generadas por el modelo de IA.
5. Asegurar que todo el sistema esté **contenarizado**, para facilitar el despliegue en un entorno de nube.
6. **Registrar el ingreso de nuevas unidades** cuando lleguen los productos del proveedor, permitiendo verificar y actualizar los productos y las cantidades ingresadas a través del frontend del sistema.
7. **Exponer un API** para que un servicio de órdenes externo notifique cuando se vende un producto, registrando la cantidad de productos vendidos, el número de productos y el identificador de la orden, asegurando que estas operaciones queden registradas en los logs.

### Requisitos Funcionales

1. **Microservicio de Gestión de Productos (Backend en .NET)**: Crear un CRUD sencillo para la administración de productos, permitiendo a los tenderos gestionar su inventario de manera eficiente. Esto incluye:
    - Crear nuevos productos.
    - Leer o consultar productos existentes.
    - Actualizar detalles de productos.
    - Eliminar productos cuando ya no estén disponibles.
2. **Gestión de Máximos y Mínimos con IA o Machine Learning**: Utilizar un modelo de machine learning para predecir los niveles de stock mínimos y máximos de cada producto. Este modelo debe analizar el comportamiento de compra de los clientes y generar predicciones precisas.
3. **(Valor agregado) Visualización de Tendencias de Inventario**: Gráficos desarrollados en **Angular** que muestren productos más vendidos, alertas de stock bajo y proyecciones futuras basadas en los datos históricos y predicciones generadas por el modelo de machine learning.
4. **Registro de Nuevas Unidades**: El frontend debe permitir el registro de nuevas unidades de productos cuando lleguen del proveedor. Los tenderos deben poder verificar los productos y actualizar las unidades ingresadas, reflejando estos cambios en el inventario.
5. **API para Gestión de Inventario (Backend en .NET)**: Crear una API que permita:
    - Descontar y agregar inventario automáticamente, incluyendo la capacidad de registrar logs de las acciones realizadas (ingresos y ventas).
    - Recibir notificaciones de un servicio de órdenes externo sobre la venta de productos, registrando la cantidad vendida, el número de productos y el identificador de la orden.
6. **(Valor agregado) Generación de Orden de Compra en Excel**: En lugar de conectarse con proveedores, el sistema debe generar un archivo **Excel** con la orden de compra de los productos que estén por debajo del nivel mínimo, basándose en las predicciones del modelo de IA. Este archivo debe incluir:
    - Nombre del producto.
    - Cantidad requerida.
    - Precio estimado (si aplica).
    - Fecha de generación de la orden.
7. **(Valor agregado) Dashboards y Reportes (Frontend en Angular)**: Desarrollar un dashboard para los tenderos que muestre visualmente el estado de su inventario en tiempo real, con alertas configurables y reportes descargables.
8. **(Valor agregado) Notificaciones Automatizadas**: Implementar un sistema de notificaciones que alerte a los tenderos cuando un producto esté por debajo del nivel mínimo, generando automáticamente la orden de compra en formato Excel.

### Lineamientos Técnicos

1. **Arquitectura**:
    - Backend en **.NET** para los microservicios.
    - Frontend en **Angular** para la visualización de los datos y la interacción con los usuarios.
    - Los servicios deben estar **contenarizados** usando Docker, para asegurar que el despliegue sea flexible y escalable.
2. **Principios de Desarrollo**:
    - Seguir los **principios SOLID** para asegurar que el código sea fácil de mantener y escalar.
    - Aplicar **patrones de diseño** adecuados (por ejemplo, patrón repositorio, inyección de dependencias, etc.) para estructurar el código de manera robusta y reutilizable.
    - La solución debe ser diseñada teniendo en cuenta la escalabilidad y la modularidad de los componentes.
3. **Base de Datos**:
    - Se permite el uso de **bases de datos relacionales** (como SQL Server ) o **no relacionales** (como MongoDB) según las necesidades de los equipos.
    - La base de datos debe ser capaz de almacenar eficientemente los datos de productos, los ingresos de nuevas unidades y las ventas.
4. **Despliegue**:
    - Los servicios deben ser contenarizados y deben poder desplegarse fácilmente en entornos de nube como **Azure**.
    - La documentación de despliegue y configuración debe estar incluida para garantizar que el sistema pueda ponerse en funcionamiento de manera rápida y eficiente.

### Criterios de Aceptación

1. El microservicio de gestión de productos debe permitir el registro, actualización, eliminación y consulta de productos de manera sencilla, manteniendo siempre la relación con el sistema de inventarios.
2. El sistema de gestión de máximos y mínimos debe configurarse automáticamente usando el modelo de machine learning, y ajustarse en tiempo real con base en los datos de comportamiento de compra.
3. El frontend debe permitir el registro de nuevas unidades cuando lleguen del proveedor, verificando productos y actualizando las cantidades ingresadas en el sistema de inventario.
4. Los gráficos de tendencias deben mostrar productos más vendidos, proyecciones basadas en el historial de ventas y alertas automáticas cuando el stock esté bajo.
5. La API debe registrar en logs tanto las acciones de ingreso de productos como las ventas, recibiendo notificaciones del servicio de órdenes externo sobre las ventas, y actualizando el inventario de manera precisa.
6. El sistema debe generar un archivo Excel que contenga una orden de compra detallada cuando los productos alcancen el nivel mínimo de stock, y este archivo debe ser descargable desde el dashboard de inventario.
7. Las notificaciones deben llegar en tiempo real a los usuarios cuando el inventario esté por debajo del nivel mínimo, con la generación automática del archivo Excel de la orden de compra.

### Criterios de Evaluación

1. **Calidad del Código**: La solución debe estar bien documentada, con un código limpio y mantenible, siguiendo las mejores prácticas de desarrollo.
2. **Creatividad**: Se evaluará la originalidad de la solución propuesta y la manera en que resuelve los problemas planteados.
3. **Lineamientos Técnicos**: Los equipos deben seguir los lineamientos técnicos establecidos, incluyendo el uso adecuado de APIs, microservicios y contenerización.
4. **Innovación**: La solución debe demostrar un uso innovador de la tecnología, especialmente en la implementación de IA o machine learning para la predicción de inventarios.
5. **Usabilidad**: La interfaz desarrollada debe ser intuitiva y fácil de usar, proporcionando una experiencia fluida a los usuarios finales.

## Arquitectura planteada:

### **Contexto**

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/baeb9af6-1da7-4059-a02f-7d655d06358f/dab58783-27ad-4d76-ad78-830a6c152577/image.png)

### 1. **Arquitectura MVP (Minimum Viable Product)**:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/baeb9af6-1da7-4059-a02f-7d655d06358f/0b9d3f65-f79a-4e74-a81c-f88bf802715c/image.png)

La arquitectura MVP es una solución simple que incluye lo esencial para implementar el sistema de gestión de inventario. Esta opción se enfoca en ser funcional rápidamente, permitiendo un despliegue ágil y rápido desarrollo. Se centra en los siguientes componentes:

- **Frontend (Angular)**: Una interfaz para la configuración y gestión de productos e inventario. Permite a los tenderos realizar operaciones básicas, como agregar productos, actualizar inventario, y visualizar el estado del stock.
- **Microservicio de Productos e Inventario (.NET)**: Un microservicio unificado que se encarga de manejar tanto los productos como el inventario, realizando actualizaciones y gestionando la lógica de negocio.
- **Base de Datos (SQL o NoSQL)**: Almacena toda la información de productos e inventario. La arquitectura MVP puede trabajar con bases de datos relacionales o no relacionales.
- **Modelo de Predicción (Python u otra opción)**: Este componente se encargará de generar las predicciones para los niveles de inventario. Se conectará al microservicio de productos e inventario para validar las transacciones y realizar ajustes.
- **Servicio de Órdenes**: Este servicio externo se conectará con el sistema de inventario, notificando las ventas y ajustes, y permitiendo actualizar el inventario en consecuencia.

La arquitectura MVP es la opción más rápida para tener una solución funcional en un corto período de tiempo, dado que consolida la lógica de productos e inventarios en un solo microservicio, reduciendo la complejidad inicial.

### 2. **Arquitectura Ideal**:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/baeb9af6-1da7-4059-a02f-7d655d06358f/a907e69f-da44-45f3-8368-d3ab3d577190/image.png)

La arquitectura ideal es una solución más modular y escalable, diseñada para soportar un crecimiento a largo plazo. Aquí, los productos y el inventario están separados en microservicios diferentes, lo que permite una mayor flexibilidad y mejor mantenimiento.

- **Frontend (Angular)**: Se divide en dos micro frontends:
    - **Micro Front Productos**: Se encarga de la gestión de productos.
    - **Micro Front Inventario**: Se encarga de la gestión de inventarios.
- **Microservicio de Productos (.NET)**: Este microservicio es responsable únicamente de la gestión de productos. Permite CRUD de productos y actualiza la base de datos de productos de forma independiente.
- **Microservicio de Inventario (.NET)**: Este microservicio se encarga exclusivamente de las operaciones relacionadas con el inventario. Es el encargado de actualizar las cantidades de productos en función de las ventas, devoluciones y nuevas entradas de inventario.
- **Base de Datos de Productos**: Almacena únicamente la información de productos.
- **Base de Datos de Inventario**: Almacena toda la información relacionada con el inventario, incluyendo las transacciones de entradas y salidas.
- **Modelo de Predicción (Python u otra opción)**: Similar a la arquitectura MVP, este componente está conectado al microservicio de inventario para predecir los niveles óptimos de stock y validar las transacciones.
- **Servicio de Órdenes**: Similar al MVP, este servicio externo se conecta con el sistema de inventario para notificar las ventas y ajustar el inventario.

La **arquitectura ideal** está diseñada para una mayor escalabilidad y modularidad. Al separar la lógica de productos e inventarios en microservicios independientes, se mejora el mantenimiento, la capacidad de prueba, y la posibilidad de desplegar cada servicio de manera independiente. Es la mejor opción para proyectos a largo plazo donde se prevé un crecimiento significativo del sistema.

### Comparación y Elección

- **Arquitectura MVP**:
    - **Ventajas**: Rápida implementación, menor complejidad, más fácil de mantener en etapas iniciales.
    - **Desventajas**: Menos flexible y escalable en el largo plazo.
- **Arquitectura Ideal**:
    - **Ventajas**: Alta modularidad, fácil mantenimiento a largo plazo, mejor escalabilidad.
    - **Desventajas**: Mayor complejidad y tiempo de desarrollo.

Ambas arquitecturas son opciones válidas, dependiendo de los recursos y el enfoque del equipo. Para proyectos que necesitan salir al mercado rápidamente, la arquitectura MVP es una excelente elección. Si el objetivo es construir una solución a largo plazo que pueda crecer y adaptarse, la arquitectura ideal es preferible.