<?php

class Autoload
{
    public function __construct()
    {
        spl_autoload_register(function ($class_name) {
            if (file_exists(MODELS_ROOT . '/' . $class_name . '.php')) {
                require_once MODELS_ROOT . '/' . $class_name . '.php';
            } elseif (file_exists(CORE_ROOT . '/' . $class_name . '.php')) {
                require_once CORE_ROOT . '/' . $class_name . '.php';
            } elseif (file_exists(CONTROLLERS_ROOT . '/' . $class_name . '.php')) {
                require_once CONTROLLERS_ROOT . '/' . $class_name . '.php';
            }
        });
    }
}
