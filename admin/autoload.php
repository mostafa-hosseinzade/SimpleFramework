<?php

namespace admin;

use admin\core\Controller;

/**
 * Description of autoload
 *
 * @author Mr.Mostafa Hosseinzade
 */
class autoload {

    public function __construct() {
        
    }

    public function run() {
        $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $url = explode('/', $url);

        foreach (glob(__DIR__ . '/../lib/Base/*.php') as $file) {
            require_once $file;
        }

        foreach (glob(__DIR__ . '/../lib/*.php') as $file) {
            include_once $file;
        }

        $Token = new \lib\Token();
        define("csrf", $_SESSION['csrf']);

        require_once __DIR__ . '/../conf/conf.php';

        foreach (glob(__DIR__ . "/core/*.php") as $file) {
            require_once $file;
        }
        foreach (glob(__DIR__ . '/model/*.php') as $file) {
            require_once $file;
        }

        if ($this->CheckLogin() == false) {
            if (\file_exists(__DIR__ . "/controller/LoginController.php")) {
                require_once __DIR__ . "/controller/LoginController.php";
                if (\class_exists("admin\controller\LoginController", true)) {
                    $class = new \admin\controller\LoginController($url);
                    exit();
                } else {
                    echo 'Class Login Controller Does Not Exists';
                    exit();
                }
            }
        }
        if ($url[1] == "mAdmin" && !isset($url[2])) {
            if (\file_exists(__DIR__ . "/controller/DefaultController.php")) {
                require_once __DIR__ . "/controller/DefaultController.php";
                if (\class_exists("admin\controller\DefaultController", true)) {
                    $class = new \admin\controller\DefaultController($url);
                    exit();
                } else {
                    echo 'Class Default Not Exists';
                    exit();
                }
            } else {
                echo 'File Class Default Not Exists';
                exit();
            }
        }
        if (isset($url[2]) && $url[1] == "mAdmin") {
            if ($url[2] != "") {
                if (\file_exists(__DIR__ . "/controller/" . $url[2] . "Controller.php")) {
                    require_once __DIR__ . "/controller/" . $url[2] . "Controller.php";
                    $url[2] = sprintf("admin\controller\%sController", $url[2]);
                    if (class_exists($url[2], true)) {
                        $class = new $url[2]($url);
                        exit();
                    } else {
                        Controller::Error("error/404.php");
                        exit();
                    }
                }
            }
            if (\file_exists(__DIR__ . "/controller/DefaultController.php")) {
                require_once __DIR__ . "/controller/DefaultController.php";
                if (\class_exists("admin\controller\DefaultController", true)) {
                    $class = new \admin\controller\DefaultController($url);
                } else {
                    echo 'Class Default Not Exists';
                }
            } else {
                echo 'Class Default Not Exists';
            }
        }
    }

    public function CheckLogin() {
        $user_s = \lib\Session::get("User");
        if (empty($user_s)) {
            return false;
        }
        $expire = \lib\Session::get("UserExpire");
        $now = new \DateTime();
        if($now > $expire){
            \lib\Session::destroy();
            return false;
        }
        $salt = file_get_contents(__DIR__ . "/Resource/salt.txt");
        if (empty($salt))
            return false;
        if ($salt == md5($user_s['salt'].$user_s['id'].$user_s['email'])) {
            $time = new \DateInterval("P30M");
            \lib\Session::set("UserExpire", $time);
            return true;
        }
        return false;
    }

}
