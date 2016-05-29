<?php
namespace admin\controller;
use admin\core\Controller;

class LoginController extends Controller {

    public function index() {
        return $this->View("login/login.php");
    }
    
    public function CheckLogin() {
        $user = $this->DB();
        echo '<pre>';
        var_dump($user->getTable("user")->findAll());
        $request = $this->Request();
        var_dump($request->request()->getAll());
    }

}
