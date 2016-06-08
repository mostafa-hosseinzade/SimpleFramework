<?php
namespace admin\model;
use admin\core\Model;
use lib\Base\DataBase;
/**
 * Description of User
 *
 * @author administrator
 */
class User extends Model{
    public $table = "user";
    public $username;
    public $email;
    public $password;
    public $salt;

    public function __construct() {
        return new DataBase();
    }
    public function DB() {
        $db =new DataBase();
        return $db->getTable($this->table);
    }
}
