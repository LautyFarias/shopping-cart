<?php

class Connection
{
    private $connection;

    public function __construct()
    {
        if (!isset($this->connection)) {
            try {
                $this->connection = new PDO(
                    MYSQL_DSN,
                    MYSQL_USER,
                    MYSQL_PASSWORD
                );
            } catch (PDOException $e) {
                http_response_code(500);
                die("Unexpected Error.");
            }
        }
    }

    public function executeQuery(string $sql, array $options = array())
    {
        try {
            $sth = $this->connection->prepare($sql);
            $sth->execute($options);
            $res = $sth->fetchAll(PDO::FETCH_ASSOC);
            $sth->closeCursor();
            return $res;
        } catch (\Throwable $th) {
            http_response_code(500);
            return new Error("Unexpected Error.", 500);
        }
    }
}
