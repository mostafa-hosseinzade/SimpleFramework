<?php

namespace lib;

use lib\Base\DataBase;
use lib\DBTable;

/**
 * This Class Return DataBase Data With Model
 *
 * @author Mr.Mostafa Hosseinzade
 */
class DBModel extends DataBase {

    private $model;
    private $ClassTable;

    public function __construct($model) {
        try {
            $m = sprintf("app\model\%s", $model);
            if (!class_exists($m)) {
                throw new \Exception(sprintf("%s Model Not Exists",$model));
            }
            $this->model = new $m();
            $this->ClassTable = new DBTable($this->model->getTableName());
            parent::__construct();
        } catch (\Exception $e) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
    }

    /**
     * Find All Data From DataBase With Model
     * @return type
     */
    public function findAll() {
        try {
            $stmt = $this->pdo->prepare(sprintf("select * from %s", $this->model->getTableName()));
            $stmt->execute();
            $data = array();
            while ($row = $stmt->fetchObject(get_class($this->model))) {
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
    public function find($id) {
        try {
            $stmt = $this->pdo->prepare(sprintf("select * from %s where id = '%s'", $this->model->getTableName(), $id));
            $stmt->execute();
            $data = array();
            $data = $stmt->fetchObject(get_class($this->model));
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
//    /**
//     * This Function For Insert Data With Model
//     * @return boolean
//     * @throws \PDOException
//     */
//    public function insert() {
//        try {
//            $field = get_object_vars($this->model);
//            $sql_field = "insert into " . $this->model->getTableName();
//            $sql_data = "";
//            $i = 1;
//            $count_field = count($field);
//            foreach ($field as $key => $value) {
//                if ($i == 1) {
//                    $sql_field .= "(" . $key . "";
//                    $sql_data .= " values ('" . $value . "'";
//                } else {
//                    if ($i == $count_field) {
//                        $sql_field .= "," . $key . ")";
//                        $sql_data .= ",'" . $value . "')";
//                    } else {
//                        $sql_field .= "," . $key;
//                        $sql_data .= ",'" . $value . "'";
//                    }
//                }
//                $i++;
//            }
//            $stmt = $this->pdo->prepare($sql_field . $sql_data);
//            if ($stmt->execute() == false) {
//                throw new \PDOException("Cant Insert To Data Base Error Code Mysql Is : " . $this->pdo->errorCode());
//            }
//            return true;
//        } catch (\PDOException $exc) {
//            echo $exc->getMessage();
//            echo '<br><pre>';
//            echo $exc->getTraceAsString();
//        }
//    }
//    /**
//     * Update Info DataBase By Model
//     * @return boolean
//     * @throws \PDOException
//     */
//    public function update() {
//        try {
//            $field = get_object_vars($this->model);
//            $sql = "update " . $this->model->getTableName() . " set ";
//            $count_field = count($field);
//            $i = 2;
//            foreach ($field as $key => $value) {
//                if ($key != "id" && $key != "table") {
//                    if ($i == $count_field) {
//                        $sql .=sprintf(" %s ='%s' where id='%s'", $key, $value, $field['id']);
//                    } else {
//                        $sql .=sprintf(" %s ='%s' ,", $key, $value);
//                    }
//                }
//                $i++;
//            }
//            $stmt = $this->pdo->prepare($sql);
//            if (!$stmt->execute()) {
//                throw new \PDOException("Cant Update Data With Error " . $this->pdo->errorCode());
//            }
//            return true;
//        } catch (\PDOException $ex) {
//            echo $exc->getMessage();
//            echo '<br><pre>';
//            echo $exc->getTraceAsString();
//        }
//    }

    /**
     * Finds array by a set of criteria.
     *
     * Optionally sorting and limiting details can be passed. An implementation may throw
     * an UnexpectedValueException if certain values of the sorting or limiting details are
     * not supported.
     *
     * @param array      $criteria array field data for query
     * @param string     $order asc or desc orders
     * @param string     $attr field for order
     * @param int|null   $limit count data 
     * @param int|null   $offset offset first result
     *
     * @return array The string.
     *
     * @throws \UnexpectedValueException
     */    
    public function findBy(array $criteria, $attr = null, $order = null, $limit = null, $offset = null) {
        return $this->ClassTable->findBy($criteria, $attr, $order, $limit, $offset);
    }
  
    /**
     * This Function Insert to dabaset with array data and name table
     * @param array $data
     * @return type
     * @throws \PDOException
     */    
    public function insert(array $data) {
        return $this->ClassTable->insert($data);
    }
    
    /**
     * This Function For Paginate in DataBase
     * @param int $offset
     * @param int $limit
     * @param string $order
     * @param string $attr
     * @return array
     */    
    public function paginate($offset, $limit, $order, $attr) {
        return $this->ClassTable->paginate($offset, $limit, $order, $attr);
    }
 
    /**
     * This Function Update with name table
     * @param array $data
     * @return boolean
     * @throws \PDOException
     */    
    public function update(array $data) {
        return $this->ClassTable->update($data);
    }
    
    /**
     * This Function for Speciale Query
     * @param string $sql
     * @return array
     */    
    public function query($sql) {
        return $this->ClassTable->query($sql);
    }
    
    /**
     * Delete Data With Id
     * @param int $id
     * @return boolean
     */    
    public function remove($id) {
        return $this->ClassTable->remove($id);
    }
   
    /**
     * array key and value for Delete in table
     * @param array $criteria like array("name" => "test")
     * @return boolean
     */    
    public function removeBy(array $criteria) {
        return $this->ClassTable->removeBy($criteria);
    }
    
    /**
     * Delete Data With array Id
     * @param array $id
     * @return boolean
     */    
    public function removeByArrayId(array $id) {
        return $this->ClassTable->removeByArrayId($id);
    }

}
