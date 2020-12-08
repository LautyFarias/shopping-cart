<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require_once __DIR__ . '/core/config.php';
require_once __DIR__ . '/core/Autoload.php';
require_once __DIR__ . '/vendor/autoload.php';

new Autoload();

$app = AppFactory::create();

$errorMiddleware = $app->addErrorMiddleware(false, false, false);

$app->get('/api/products', function (Request $request, Response $response) {
    $all_products = Product::all();
    $all_products_json = json_encode($all_products);
    $response->getBody()->write($all_products_json);
    return $response;
});

$app->get('/api/products/{slug}', function (Request $request, Response $response, $slug) {
    $product = Product::get($slug);
    $product_json = json_encode($product[0]);
    $response->getBody()->write($product_json);
    return $response;
});

$app->post('/api/mail/send', function (Request $request, Response $response) {
    $contents = json_decode(file_get_contents('php://input'), true);
    $parsed_request = $request->withParsedBody($contents);
    $parsed_req_body = $parsed_request->getParsedBody();

    $cart_summary = "";
    foreach ($parsed_req_body["items"] as $item) {
        $cart_summary .= "${item['name']} x${item['stock']} = $${item['price']}<br/>";
    }

    $message = file_get_contents('./templates/email-template.html');
    $message = str_replace('%cart%', $cart_summary, $message);

    $mail = new Mail($message, "New Purchase - SMART CART", $parsed_req_body["email"]);
    $mail_response = json_encode(["response" => $mail->send()]);

    $response->getBody()->write($mail_response);
    return $response;
});

$app->run();
