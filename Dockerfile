# Usa una imagen base oficial de Node
FROM node:18

# Crea el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Compila el proyecto NestJS (asumiendo TypeScript)
RUN npm run build

# Expone el puerto TCP (NO ES HTTP)
EXPOSE 5001

# Comando para correr la app
CMD ["node", "dist/main"]
