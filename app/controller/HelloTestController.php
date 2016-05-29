<?php

namespace app\controller;
use app\core\Controller;
/**
 * Description of HelloTest
 *
 * @author Mr.Mostafa Hosseinzade
 */
class HelloTestController extends Controller {
    
    public function index() {
        echo 'Hello Test Controller Index';
    }
    
    public function show() {
        echo '<br>show';
    }
}
