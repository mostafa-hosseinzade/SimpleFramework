<?php

namespace app\model;
use app\core\Model;
/**
 * Description of HelloWorld
 *
 * @author Mr.Mostafa Hosseinzade
 */
class HelloWorld extends Model{
    public $id;
    public $name ;
    public $family;
    public $table = "test";
    public function getId() {
        return $this->id;
    }
    public function setName($name) {
        $this->name = $name;
    }

    public function setFamily($family) {
        $this->family = $family;
    }

    
    public function getName() {
        return $this->name;
    }

    public function getFamily() {
        return $this->family;
    }

    public function getTable() {
        return $this->table;
    }
    
    public function setId($id) {
        $this->id = $id;
    }
    
    public function Serialize() {
        $data = array();
        $data['id'] = $this->id;
        $data['name'] = $this->name;
        $data['family'] = $this->family;
        return $data;
    }
}
