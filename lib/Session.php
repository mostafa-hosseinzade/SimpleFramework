<?php

namespace lib;

/**
 * This Class Prepare access to session php
 * @author Mr.Mostafa
 */
class Session {

    public function __construct() {
        try {
            session_start();
        } catch (\Exception $ex) {
            
        }
    }
    
    public static function start() {
      try {
            session_start();
        } catch (Exception $ex) {
            
        }  
    }
    public static function set($name, $value) {
        self::start();
        $_SESSION[$name] = $value;
    }

    public static function get($name) {
        if (isset($_SESSION[$name]))
            return $_SESSION[$name];
        return false;
    }

    public static function remove($name) {
        if (isset($_SESSION[$name]))
            unset($_SESSION[$name]);
        return false;
    }

    public static function destroy() {
        session_destroy();
    }

}
