<?php

namespace app\core;

use lib\Base\Request;
use lib\Response;

/**
 * Controller Base For Connect To View Or Model
 *
 * @author Mr.Mostafa Hosseinzade
 */
abstract class Controller {

    public function __construct($param) {
        if (isset($param[2])) {
            if (method_exists($this, $param[2])) {
                $method = $param[2];
                unset($param[0]);
                unset($param[1]);
                unset($param[2]);
                call_user_func_array(array($this, $method), $param);
            } else {
                return $this->View('error/404.php');
            }
        } else {
            return $this->index();
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
    public function Response($data = "",$code=200) {
        if (!filter_var($code, FILTER_VALIDATE_INT))
            return false;
        $response = new Response($data,$code);
    }

    /**
     * this function for return json response
     * @param string $response
     * @return \lib\JsonResponse
     */
    public function JsonResponse($response) {
        return new \lib\JsonResponse($response);
    }
    
    /**
     * This function create a new dbModel
     * @param tstring $model
     * @return Class Model
     */
    public function Model($model = null) {
        if($model != null){
        if(file_exists(__DIR__."/../model/".$model.".php"))
            require_once __DIR__."/../model/".$model.".php";
        $model = $this->DB()->getModel($model);
        return $model;            
        }
        $class = get_class($this);
        $class = trim($class, "app\controller\Controller");
        if(file_exists(__DIR__."/../model/".$class.".php"))
            require_once __DIR__."/../model/".$class.".php";
        $model = $this->DB()->getModel($class);
        return $model;
    }
    
}
