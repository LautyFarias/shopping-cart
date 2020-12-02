<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require_once __DIR__ . '/core/config.php';
require_once __DIR__ . '/core/Autoload.php';
require_once __DIR__ . '/vendor/autoload.php';

new Autoload();

$app = AppFactory::create();

$app->get('/api/products', function (Request $request, Response $response) {
    $all_products = Product::all();
    $all_products_json = json_encode($all_products);
    $response->getBody()->write($all_products_json);
    return $response;
});

$app->run();
