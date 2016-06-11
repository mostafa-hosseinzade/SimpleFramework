<?php

namespace admin\core;

use lib\Base\Request;
use lib\jResponse;

/**
 * Controller Base For Connect To View Or Model
 *
 * @author Mr.Mostafa Hosseinzade
 */
abstract class Controller {
    
    private $url;
    public function __construct($param) {
        if ($param[1] == "mAdmin") {
            if (isset($param[2])) {
                if (method_exists($this, $param[2])) {
                    $method = $param[2];
                    unset($param[0]);
                    unset($param[1]);
                    unset($param[2]);
                    call_user_method_array($method, $this, $param);
                } else {
                    return $this->View('error/404.php');
                }
            } else {
                return $this->index();
            }
        } else {
            if (isset($param[3])) {
                $this->url = $param[2];
                if (method_exists($this, $param[3])) {
                    $method = $param[3];
                    unset($param[0]);
                    unset($param[1]);
                    unset($param[2]);
                    unset($param[3]);
                    call_user_method_array($method, $this, $param);
                } else {
                    return $this->View('error/404.php');
                }
            } else {
                return $this->index();
            }
        }
    }

    abstract function index();

    /**
     * Name Or Address In View File
     * @param NameFile $view
     * @param string or array $data data you want send to page
     */
    public function View($view,$data = null) {
        if (file_exists(__DIR__ . '/../view/' . $view)) {
            require_once __DIR__ . '/../view/' . $view;
        } else {
            echo 'Cant Find Template '.$view;
        }
    }

    /**
     * Go To Error Page Static Method
     * @param type $view
     */
    public static function Error($view) {
        require_once __DIR__ . '/../view/' . $view;
    }

    /**
     * This Function Create DataBase Class
     * @return \lib\DataBase
     */
    public function DB() {
        return new \lib\Base\DataBase();
    }

    /**
     * this function return class Request
     * @param string $key
     * @return Request
     */
    public function Request($key = null) {
        return new Request();
    }

    /**
     * this function redirect to new url
     * @param string $url
     */
    public function redirect($url) {
        $response = new Response();
        $response->redirect($url);
    }

    /**
     * this function return new response with error code
     * @param number $code
     * @param string $data
     */
    public function Response($code, $data = "") {
        if (!filter_var($code, FILTER_VALIDATE_INT))
            return false;
        $response = new Response();
        return $response->Response($code, $data);
    }

    /**
     * this function for return json response
     * @param string $response
     * @return \lib\JsonResponse
     */
    public function JsonResponse($response) {
        if (!empty($response))
            return new \lib\JsonResponse($response);
    }
    
    /**
     * this function return a model
     * @param type $name
     */
    public function Model($name = null) {
        if($name == null){
            if(\file_exists(__DIR__."/../model/".$this->url.".php")){
                require_once __DIR__."/../model/".$this->url.".php";
                $name = sprintf("\admin\model\%s",$this->url);
                if(\class_exists($name)){
                   return new $name();
                }
            }
        }else{
            if(\file_exists(__DIR__."/../model/".$name.".php")){
                require_once __DIR__."/../model/".$name.".php";
                $name = sprintf("\admin\model\%s",$name);
                if(\class_exists($name)){
                    return new $name();
                }
            }            
        }
    }

}
