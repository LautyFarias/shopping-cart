<?php

define('SMTP_HOST', $_ENV['SMTP_HOST']);
define('SMTP_EMAIL', $_ENV['SMTP_EMAIL']);
define('SMTP_EMAIL_PASSWORD', $_ENV['SMTP_EMAIL_PASSWORD']);
define('SMTP_EMAIL_FROM_NAME', $_ENV['SMTP_EMAIL_FROM_NAME']);
define('SMTP_PORT', $_ENV['SMTP_PORT']);

define('MYSQL_DSN', $_ENV['MYSQL_ADDON_DSN']);
define('MYSQL_USER', $_ENV['MYSQL_ADDON_USER']);
define('MYSQL_PASSWORD', $_ENV['MYSQL_ADDON_PASSWORD']);

define('ROOT', dirname(__DIR__));
define('CORE_ROOT', ROOT . '/core');
define('MODELS_ROOT', ROOT . '/models');
