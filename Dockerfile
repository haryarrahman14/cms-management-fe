FROM btpns/node:22.16-alpine AS build-stage
ADD . /app
WORKDIR /app
RUN mkdir -p /app && chmod -R 777 /app
RUN mkdir -p /app/node_modules && chmod -R 777 /app/node_modules
RUN mkdir -p /app/node_modules/.vite-temp && chmod -R 777 /app/node_modules/.vite-temp
RUN npm config set cache /.npm
RUN mkdir -p /.npm/_logs && chmod -R 777 /.npm
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist/ /usr/share/nginx/html
COPY default.conf  /etc/nginx/conf.d/default.conf


RUN chmod 777 -R /var/cache/nginx 
RUN chmod -R 777 /var/run 

 
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]