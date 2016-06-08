<?php
namespace admin\controller;
use admin\core\Controller;

class LoginController extends Controller {
    use \CreateSalt;
    
    public function index() {
        return $this->View("login/login.php");
    }
    
    public function CheckLogin() {
        $info = $this->Request()->request()->getAny(array("username","email","password"));
//        var_dump($info);
//        die();
        $da = $this->SaltPassword($info['username'], $info['email'], $info['password']);  
        

        return new \lib\JsonResponse("تست");
        die();
        echo '<br><pre>';
        $user = $this->DB()->getTable("user")->findByWhere($info);
        var_dump($user);
    }

}
