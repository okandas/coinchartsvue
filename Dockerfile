# Distribution
FROM node:13 as build

WORKDIR /coinchartsvue
COPY . .
RUN yarn install && yarn run build

# APP Final stage
FROM caddy:2.1.1

WORKDIR /app

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=build /toramari /app

RUN ls -al /app/dist
