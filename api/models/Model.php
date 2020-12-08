<?php

abstract class Model
{
    private static Connection $connectionManager;

    private static function getTableName(): string
    {
        return strtolower(get_called_class());
    }

    private static function getConnection(): Connection
    {
        self::$connectionManager = new Connection();
        return self::$connectionManager;
    }

    public static function all(): ?array
    {
        $sql = "SELECT * FROM " . self::getTableName();
        $all_products = self::getConnection()->executeQuery($sql);
        return $all_products;
    }

    public static function get(array $args)
    {
        $where = self::getCondition($args);
        $sql = "SELECT * FROM " . self::getTableName() . " WHERE " . $where['condition'];
        $product = self::getConnection()->executeQuery($sql, $where['drive_options']);
        return $product;
    }

    private static function getCondition(array $fields): array
    {
        foreach ($fields as $field => $field_value) {
            $where_data[]                = $field . '=:' . $field;
            $drive_options[':' . $field] = $field_value;
        }
        $where_data_string = implode(' and ', $where_data);
        return [
            "condition"     => $where_data_string,
            "drive_options" => $drive_options
        ];
    }
}
