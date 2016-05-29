<?php

namespace app\controller;

use app\core\Controller;

class CacheController extends Controller {

    public function index() {
        return $this->View("test/test.php");
    }

}

?>