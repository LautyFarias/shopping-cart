<?php

define('MYSQL_DSN', $_ENV['MYSQL_ADDON_DSN']);
define('MYSQL_USER', $_ENV['MYSQL_ADDON_USER']);
define('MYSQL_PASSWORD', $_ENV['MYSQL_ADDON_PASSWORD']);

define('ROOT', dirname(__DIR__));
define('CORE_ROOT', ROOT . '/core');
define('CONTROLLERS_ROOT', ROOT . '/controllers');
define('MODELS_ROOT', ROOT . '/models');
