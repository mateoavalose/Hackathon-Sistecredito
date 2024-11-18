# Usa una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias de npm
RUN npm install

# Configurar una carpeta local para la caché de npm
RUN npm config set cache /app/.npm-cache --global

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto que la aplicación va a usar
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]

