
FROM node:lts-alpine AS BUILD_IMAGE

# hacer la carpeta 'app' el directorio de trabajo actual
WORKDIR /app

# copiar 'package.json' y 'package-lock.json' (si están disponibles)
COPY package*.json ./

# configuramos las env var

#ARG VUE_APP_I18N_LOCALE 
ARG VUE_APP_WHITELABEL

# instalar dependencias del proyecto
RUN npm install

# copiar los archivos y carpetas del proyecto al directorio de trabajo actual (es decir, la carpeta 'app')
COPY . .

# construir aplicación para producción minificada
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=BUILD_IMAGE /app/dist ./dist
RUN npm install -g serve
EXPOSE 8080
CMD [ "serve", "-s", "-p", "8080", "dist"]