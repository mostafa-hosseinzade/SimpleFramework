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
        if ($this->CheckLogin() == true) {
            if (isset($url[2]) && $url[1] == "mAdmin") {
                if ($url[2] != "") {
                    if (\file_exists(__DIR__ . "/controller/" . $url[2] . "Controller.php")) {
                        require_once __DIR__ . "/controller/" . $url[2] . "Controller.php";
                        $url[2] = sprintf("admin\controller\%sController", $url[2]);
                        if (class_exists($url[2], true)) {
                            $class = new $url[2]($url);
                        } else {
                            Controller::Error("error/404.php");
                        }
                    }
                } else {
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
            } else{
                if (\file_exists(__DIR__ . "/controller/DefaultController.php")) {
                    require_once __DIR__ . "/controller/DefaultController.php";
                    if (\class_exists("admin\controller\DefaultController", true)) {
                        $class = new \admin\controller\DefaultController($url);
                    } else {
                        echo 'Class Default Not Exists';
                    }
                } else {
                    echo 'File Class Default Not Exists';
                }
            }
        } else {
            if (\file_exists(__DIR__ . "/controller/LoginController.php")) {
                require_once __DIR__ . "/controller/LoginController.php";
                if (\class_exists("admin\controller\LoginController", true)) {
                    $class = new \admin\controller\LoginController($url);
                }else{
                    echo 'Class Login Controller Does Not Exists';
                }
            }
        }
    }

    public function CheckLogin() {
        return false;
    }

}
