<?php

namespace app\controller;
use app\core\Controller;
use app\controller\HelloWorldController;

/**
 * Description of DefaultController
 *
 * @author administrator
 */
class DefaultController extends Controller{
    
    public function index() {
        return $this->View("Default/index.php");
    }

}
