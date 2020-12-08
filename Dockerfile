FROM php:7-fpm-alpine
WORKDIR /code
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
COPY ./api /code
RUN docker-php-ext-install pdo_mysql && composer install
