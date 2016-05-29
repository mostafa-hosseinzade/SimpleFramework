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
class HelloWorldController extends Controller{

    public function index() {
        return new \lib\JsonResponse("All Its Ok");
        $db = $this->DB();
        var_dump($db->getTable("test")->update(array("id"=>25,"name"=>"MyName","family"=>"MyFamily")));
    }

    public function Show() {
        $requesst2 = $this->Request();
        return true;
    }
    
    public function add() {
        return "ok";
    }

}
