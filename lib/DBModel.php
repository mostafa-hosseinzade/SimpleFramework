<?php

namespace lib;
use lib\Base\DataBase;

/**
 * This Class Return DataBase Data With Model
 *
 * @author Mr.Mostafa Hosseinzade
 */
class DBModel extends DataBase {
    private $model;
    public function __construct($model) {
        $this->model = $model;
        parent::__construct();
    }

    /**
     * Find All Data From DataBase With Model
     * @return type
     */
    public function findAll() {
        try {
            $m = sprintf("app\model\%s", $this->model);
            $m = new $m();
            $stmt = $this->pdo->prepare(sprintf("select * from %s", $m->getTableName()));
            $stmt->execute();
            $data = array();
            while ($row = $stmt->fetchObject(sprintf("app\model\%s", $this->model))) {
                $data[] = $row;
            }
            return $data;
        } catch (\PDOException $exc) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
    }

    /**
     * Find One Data With Id
     * @param type $id
     * @return type
     */
    public function findOneById($id) {
        try {
            $m = sprintf("app\model\%s", $this->model);
            $m = new $m();
            $stmt = $this->pdo->prepare(sprintf("select * from %s where id = '%s'", $m->getTableName(), $id));
            $stmt->execute();
            $data = array();
            $data = $stmt->fetchObject(sprintf("app\model\%s", $this->model));
            return $data;
        } catch (\PDOException $exc) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
    }

//    /**
//     * This Function Insert to DataBase With Model
//     * @param array $data
//     * @return type
//     * @throws \Exception
//     */
//    public function insert(array $data) {
//        try {
//            $model = sprintf("app\model\%s", $this->model);
//            if (!class_exists($model)) {
//                throw new \Exception("This Model Not Exists");
//            }
//            $model = new $model();
//            $field = get_object_vars($model);
//
//            unset($field['id']);
//            $sql_field = "insert into " . $field['table'];
//            unset($field['table']);
//            $diff = array_diff_key($field, $data);
//            if (!empty($diff)) {
//                throw new \Exception("Data Not Equals With Model");
//            }
//            $sql_data = "";
//            $i = 1;
//            $count_field = count($field);
//            foreach ($field as $key => $value) {
//                if ($i == 1) {
//                    $sql_field .= "(" . $key . "";
//                    $sql_data .= " values ('" . $data[$key] . "'";
//                } else {
//                    if ($i == $count_field) {
//                        $sql_field .= "," . $key . ")";
//                        $sql_data .= ",'" . $data[$key] . "')";
//                    } else {
//                        $sql_field .= "," . $key;
//                        $sql_data .= ",'" . $data[$key] . "'";
//                    }
//                }
//                $i++;
//            }
//            $sql = $sql_field . $sql_data;
//            $stmt = $this->pdo->prepare($sql);
//            return $stmt->execute();
//        } catch (Exception $ex) {
//            return $ex->getMessage();
//        }
//    }

    /**
     * This Function For Insert Data With Model
     * @return boolean
     * @throws \PDOException
     */
    public function insert() {
        try {
            $field = get_object_vars($this->model);
            $sql_field = "insert into " . $field['table'];
            $sql_data = "";
            unset($field['id']);
            unset($field['table']);
            $i = 1;
            $count_field = count($field);
            foreach ($field as $key => $value) {
                if ($i == 1) {
                    $sql_field .= "(" . $key . "";
                    $sql_data .= " values ('" . $value . "'";
                } else {
                    if ($i == $count_field) {
                        $sql_field .= "," . $key . ")";
                        $sql_data .= ",'" . $value . "')";
                    } else {
                        $sql_field .= "," . $key;
                        $sql_data .= ",'" . $value . "'";
                    }
                }
                $i++;
            }
            $stmt = $this->pdo->prepare($sql_field . $sql_data);
            if ($stmt->execute() == false) {
                throw new \PDOException("Cant Insert To Data Base Error Code Mysql Is : " . $this->pdo->errorCode());
            }
            return true;
        } catch (\PDOException $exc) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
    }

    /**
     * Update Info DataBase By Model
     * @return boolean
     * @throws \PDOException
     */
    public function updateByModel() {
        try {
            $field = get_object_vars($this->model);
            $sql = "update " . $this->model->getTableName() . " set ";
            $count_field = count($field);
            $i = 2;
            foreach ($field as $key => $value) {
                if ($key != "id" && $key != "table") {
                    if ($i == $count_field) {
                        $sql .=sprintf(" %s ='%s' where id='%s'", $key, $value, $field['id']);
                    } else {
                        $sql .=sprintf(" %s ='%s' ,", $key, $value);
                    }
                }
                $i++;
            }
            $stmt = $this->pdo->prepare($sql);
            if (!$stmt->execute()) {
                throw new \PDOException("Cant Update Data With Error " . $this->pdo->errorCode());
            }
            return true;
        } catch (\PDOException $ex) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
    }

}
