# Usa una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias de npm
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Eliminar la carpeta 'dist' si es necesario (solo si ya no es útil para la ejecución)
RUN rm -rf /app/dist

# Exponer el puerto que la aplicación va a usar
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]

