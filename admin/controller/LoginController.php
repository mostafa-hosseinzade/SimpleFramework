<?php
namespace admin\controller;
use admin\core\Controller;

class LoginController extends Controller {

    public function index() {
        return $this->View("login/login.php");
    }
    
    public function CheckLogin() {
        $info = $this->Request()->request()->getAny(array("username","email","password"));
        var_dump($info);
        echo '<br><pre>';
        $user = $this->DB()->getTable("user")->find(6);
        var_dump($user);
    }

}
