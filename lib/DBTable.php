<?php

namespace lib;

use lib\Base\DataBase;

/**
 * Description of DBTable
 *
 * @author Mr.Mostafa Hosseinzade
 */
class DBTable extends DataBase {

    private $table;

    public function __construct($table) {
        $this->table = $table;
        parent::__construct();
    }

    /**
     * Find All Data In Table
     * @return array Data off Tabale
     */
    public function findAll() {
        try {
            $stmt = $this->pdo->prepare("select * from " . $this->table);
            $stmt->execute();
            $data = $stmt->fetchAll();
            $this->CloseLink();
            return $data;
        } catch (\PDOException $exc) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
    }

    /**
     * Return One Child Off Table
     * @param int $id
     * @return array
     */
    public function find($id) {
        try {
            $stmt = $this->pdo->prepare(sprintf("select * from %s where id = '%s'", $this->table, $id));
            $stmt->execute();
            $data = $stmt->fetchAll();
            $this->CloseLink();
            return $data;
        } catch (\PDOException $exc) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
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
        try {
            $stmt = $this->pdo->prepare(
                    sprintf("select * from %s order by %s %s limit %s offset %s", $this->table, $attr, $order, $limit, $offset
            ));
            $stmt->execute();
            $data = $stmt->fetchAll();
            $this->CloseLink();
            return $data;
        } catch (\PDOException $exc) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
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
            $data = $stmt->fetchAll();
            $this->CloseLink();
            return $data;
        } catch (\PDOException $exc) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
    }

    /**
     * Delete Data With Id
     * @param int $id
     * @return boolean
     */
    public function remove($id) {
        try {
            $stmt = $this->pdo->prepare(sprintf("delete from %s where id = '%s'", $this->table, $id));
            $this->CloseLink();
            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (\PDOException $exc) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
    }

    /**
     * Delete Data With array Id
     * @param array $id
     * @return boolean
     */
    public function removeByArrayId(array $id) {
        try {
            $sql = sprintf("delete from %s where ", $this->table);
            for ($i = 0; $i < count($id); $i++) {
                if (isset($id[$i + 1]))
                    $sql .= sprintf(" id = '%s' or ", $id[$i]);
                else
                    $sql .= sprintf(" id = '%s' ", $id[$i]);
            }
            $stmt = $this->pdo->prepare($sql);
            $this->CloseLink();
            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (\PDOException $exc) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
    }

    /**
     * array key and value for Delete in table
     * @param array $criteria like array("name" => "test")
     * @return boolean
     */
    public function removeBy(array $criteria) {
        try {
            $sql = sprintf("delete from %s where ", $this->table);
            $count = count($criteria);
            $i = 1;
            foreach ($criteria as $key => $val) {
                if ($i != $count)
                    $sql .= sprintf(" %s = '%s' or ", $key, $val);
                else
                    $sql .= sprintf(" %s = '%s' ", $key, $val);
                $i++;
            }
            $stmt = $this->pdo->prepare($sql);
            $this->CloseLink();
            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (\PDOException $exc) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
    }

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
    public function findBy(array $criteria, $attr = NULL, $order = NULL, $limit = NULL, $offset = NULL) {
        try {
            $key_field = array_keys($criteria);
            $count_key = count($key_field);

            $sql = "select * from " . $this->table . " where";
            foreach ($key_field as $c => $key) {
                if (is_array($criteria[$key])) {
                    // count all this array
                    $count = count($criteria[$key]);
                    //find data in child array of type is array
                    foreach ($criteria[$key] as $key2 => $val) {
                        // check this is last key or not
                        if ($key2 + 1 == $count && $c + 1 == $count_key) {
                            $sql .= sprintf(" %s='%s' ", $key, $val);
                        } else {
                            $sql .= sprintf(" %s='%s' or ", $key, $val);
                        }
                    }
                } else {
                    // check this is last key or not
                    if ($c + 1 != $count_key) {
                        $sql .= sprintf(" %s='%s' or ", $key, $criteria[$key]);
                    } else {
                        $sql .= sprintf(" %s='%s'", $key, $criteria[$key]);
                    }
                }
            }
            if ($order != null && $attr != null) {
                $sql .= " order by " . $attr . " " . $order;
            }

            if ($limit != null) {
                $sql .=" limit " . $limit;
            }

            if ($offset != null) {
                $sql .=" offset " . $offset;
            }

            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $data = $stmt->fetchAll();
            $this->CloseLink();
            return $data;
        } catch (\PDOException $ex) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
    }

    /**
     * Find List Off Object Data
     * @return type
     */
    public function findObject() {
        try {
            $stmt = $this->pdo->prepare(sprintf("select * from %s", $this->table));
            $stmt->execute();
            $data = array();
            while ($row = $stmt->fetchObject("stdClass")) {
                $data[] = $row;
            }
            $this->CloseLink();
            return $data;
        } catch (\PDOException $exc) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
    }

    /**
     * This Function Insert to dabaset with array data and name table
     * @param array $data
     * @return type
     * @throws \PDOException
     */
    public function insert(array $data) {
        try {
            $sql_field = "insert into " . $this->table;
            $sql_data = "";
            $i = 1;
            $count_field = count($data);
            foreach ($data as $key => $value) {
                if ($i == 1) {
                    $sql_field .= "(" . $key . "";
                    $sql_data .= " values ('" . $data[$key] . "'";
                } else {
                    if ($i == $count_field) {
                        $sql_field .= "," . $key . ")";
                        $sql_data .= ",'" . $data[$key] . "')";
                    } else {
                        $sql_field .= "," . $key;
                        $sql_data .= ",'" . $data[$key] . "'";
                    }
                }
                $i++;
            }
            $stmt = $this->pdo->prepare($sql_field . $sql_data);
            $stmt->execute();
            $this->CloseLink();
            return true;
        } catch (\PDOException $exc) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
    }

    /**
     * This Function Update with name table
     * @param array $data
     * @return boolean
     * @throws \PDOException
     */
    public function update(array $data) {
        try {
            $sql = "update " . $this->table . " set ";
            $count_field = count($data);
            $i = 1;
            foreach ($data as $key => $value) {
                if ($key != "id") {
                    if ($i == $count_field) {
                        $sql .=sprintf(" %s ='%s' where id='%s'", $key, $value, $data['id']);
                    } else {
                        $sql .=sprintf(" %s ='%s' ,", $key, $value);
                    }
                }
                $i++;
            }
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $this->CloseLink();
            return true;
        } catch (\PDOException $exc) {
            echo $exc->getMessage();
            echo '<br><pre>';
            echo $exc->getTraceAsString();
        }
    }

}
