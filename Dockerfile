FROM node:16.14 as build

WORKDIR /app
COPY . .
RUN npm install

ENV REACT_APP_API_BASE_URL=http://127.0.0.1:5000

RUN npm run build

FROM nginx:alpine as prod
RUN mkdir -p /var/www

COPY --from=build /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]