<?php

namespace lib;

/**
 * This Class Prepare access to session php
 * @author Mr.Mostafa
 */
class Session {
    public function __construct() {
        session_start();
    }
    
    public function set($name,$value) {
        $_SESSION[$name] = $value;
    }
    
    public function get($name) {
        if(isset($_SESSION[$name]))
            return $_SESSION[$name];
        return false;
    }
    
    public function remove($name) {
        if(isset($_SESSION[$name]))
            unset ($_SESSION[$name]);
        return false;
    }
    
    public function destroy() {
        session_destroy();
    }
}
