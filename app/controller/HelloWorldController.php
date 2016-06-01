<?php

namespace app\controller;

use app\core\Controller;
use app\model\HelloWorld;
use lib\Response;
use lib\WebService;

/**
 * Description of HelloWorld
 *
 * @author Mr.Mostafa Hosseinzade
 */
class HelloWorldController extends Controller {

    public function index() {
        var_dump($this->Model()->findBy(array("name"=>"Mr.Mostafa")));    
    }

    public function Show() {
        $requesst2 = $this->Request();
        return true;
    }

    public function add() {
        return "ok";
    }

}
