<?php

namespace app;

use app\core\Controller;

/**
 * Description of autoload
 *
 * @author Mr.Mostafa Hosseinzade
 */
class autoload {

    public function __construct() {
        
    }

    public function run() {
        try {
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

        if (isset($url[1])) {
            if ($url[1] != "") {
                if (\file_exists(__DIR__ . "/controller/" . $url[1] . "Controller.php")) {
                    require_once __DIR__ . "/controller/" . $url[1] . "Controller.php";
                    $url[1] = sprintf("app\controller\%sController", $url[1]);
                    if (class_exists($url[1], true)) {
                        $class = new $url[1]($url);
                    } else {
                        Controller::Error("error/404.php");
                    }
                }
            } else {
                if (\file_exists(__DIR__ . "/controller/DefaultController.php")) {
                    require_once __DIR__ . "/controller/DefaultController.php";
                    if (\class_exists("app\controller\DefaultController", true)) {
                        $class = new \app\controller\DefaultController($url);
                    } else {
                        echo 'Class Default Not Exists';
                    }
                } else {
                    echo 'Class Default Not Exists';
                }
            }
        }            
        } catch (\Exception $ex) {
            echo $ex->getTraceAsString();
        }

    }

}
