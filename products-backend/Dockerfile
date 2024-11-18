# Usa la imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json (o yarn.lock) primero para aprovechar la cache de Docker
COPY package*.json ./

# Establecer los permisos correctos para la carpeta .npm
RUN chown -R 1002:1003 /root/.npm

# Instala las dependencias del proyecto
RUN npm install

# Configurar una carpeta local para la caché de npm
RUN npm config set cache /app/.npm-cache --global

# Copia todos los archivos del proyecto al contenedor
COPY . .

# Expón el puerto en el que el proyecto de NestJS estará escuchando
EXPOSE 3000

# Comando para iniciar el servidor NestJS
CMD ["npm", "run", "start"]

