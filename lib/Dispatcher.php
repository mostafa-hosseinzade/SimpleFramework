<?php

namespace lib;

class Dispatcher {

    function __construct() {
        
    }
    
    public function redirect($url) {
       header("Location:".$url);
    }

}
