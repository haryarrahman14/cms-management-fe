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

FROM btpns/nginx:1.22.0-btpns-latest AS production-stage

USER root

COPY --from=build-stage /app/dist/ /usr/share/nginx/html
COPY templates/ /etc/nginx/templates/
COPY nginx.conf /etc/nginx/nginx.conf
COPY env_init.sh /docker-entrypoint.d/90-env-init.sh

RUN chmod 777 /usr/share/nginx/html/config.json
RUN chmod 777 -R /var/cache/nginx 
RUN chmod -R 777 /etc/nginx/conf.d
RUN chmod -R 777 /var/run 

RUN mkdir -p /var/log/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chmod -R 755 /var/log/nginx

RUN chmod +x /docker-entrypoint.d/90-env-init.sh && \
	ls -lh /var/log/nginx
 
EXPOSE 5173
USER nginx

# EXPOSE 5173

# CMD ["nginx", "-g", "daemon off;"]