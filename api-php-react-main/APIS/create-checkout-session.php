<?php
include "../libs/stripe-php-master/init.php";
//require 'vendor/autoload.php';
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
\Stripe\Stripe::setApiKey('sk_test_H08xc050YQnMm56SsKcSIGPU');

header('Content-Type: application/json');

$YOUR_DOMAIN = 'http://localhost:3000';

$checkout_session = \Stripe\Checkout\Session::create([
  'line_items' => [[
    'price_data' => [
      'currency' => 'usd',
      'product_data' => [
        'name' => 'T-shirt',
      ],
      'unit_amount' => 2000,
    ],
    'quantity' => 1,
  ]],
  'mode' => 'payment',
    'success_url' => $YOUR_DOMAIN . '?success.html',
    'cancel_url' => $YOUR_DOMAIN . '?canceled=true',
]);

header("HTTP/1.1 303 See Other");
header("Location: " . $checkout_session->url);