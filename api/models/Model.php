<?php

abstract class Model
{
    private static $connectionManager;

    private static function getTableName()
    {
        return strtolower(get_called_class());
    }

    private static function getConnection()
    {
        self::$connectionManager = new Connection();
        return self::$connectionManager;
    }

    public static function all()
    {
        $sql = "SELECT * FROM " . self::getTableName();
        $all_products = self::getConnection()->executeQuery($sql);
        return $all_products;
    }
}
