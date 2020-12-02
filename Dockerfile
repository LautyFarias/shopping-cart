FROM php:8-fpm-alpine
WORKDIR /code
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
RUN docker-php-ext-install pdo_mysql