<?php

namespace lib\Base;

use lib\DBModel;
use lib\DBTable;

/**
 * This Class Can Connect To DataBase
 *
 * @author Mr.Mostafa Hosseinzade
 */
class DataBase {

    private $DB_HOST = DB_HOST;
    private $DB_USERNAME = DB_USER_NAME;
    private $DB_PASSWORD = DB_USER_PASSWORD;
    private $DB_TYPE = DB_TYPE;
    private $DB_NAME = DB_NAME;
    private $DB_PORT = DB_PORT;
    protected $pdo;

    /**
     * Connect To DataBase
     */
    public function __construct() {
        try {
            $this->pdo = new \PDO(
                    $this->DB_TYPE .
                    ":host=" . $this->DB_HOST .
                    ";port=" . $this->DB_PORT .
                    ";charset=utf8" .
                    ";dbname=" . $this->DB_NAME, $this->DB_USERNAME, $this->DB_PASSWORD, array(
                \PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
            ));
            $this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        } catch (\PDOException $e) {
            return 'Can,t Connect to database' . $e->getMessage();
        }
    }

    /**
     * Close Connection  To DataBase
     */
    public function CloseLink() {
        $this->pdo = NULL;
    }

    /**
     * @param string $model
     * @return \lib\DBModel
     */
    public function getModel($model) {
        return new DBModel($model);
    }

    /**
     * @param string $table
     * @return \lib\DBTable
     */
    public function getTable($table) {
        return new DBTable($table);
    }
    
     /**
     * This Function for Speciale Query
     * @param string $sql
     * @return array
     */
    public function query($sql) {
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $data = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            
            return $data;
        } catch (\PDOException $exc) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
    }

}
