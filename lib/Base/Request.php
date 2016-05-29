<?php

namespace lib\Base;

/**
 * Return Info Send Data
 *
 * @author Mr.Mostafa Hosseinzade
 */
class Request {

    protected $GET;
    protected $POST;

    public function __construct($key = null) {
        if ($_GET || $_POST) {
            if ($this->CheckCsrf($key)) {
                $this->GET = $_GET;
                $this->POST = $_POST;
            }
        }
    }

    /**
     * Get Post Request
     * @param type $key
     * @return \lib\POST
     */
    public function request($key = null) {
        return new \lib\POST($key);
    }

    /**
     * Get Get Request
     * @param type $key
     * @return \lib\GET
     */
    public function query($key = null) {
        return new \lib\GET($key);
    }

    /**
     * Get Json Data Send
     */
    public function json() {
        return new \lib\Json();
    }

    /**
     * return value in get or post method
     * @param string $key
     * @return key
     */
    public function get($key) {
        if (isset($this->GET[$key])) {
            return $this->Secure($key, "Get");
        }

        if (isset($this->POST[$key])) {
            return $this->Secure($key, "Post");
        }
    }

    /**
     * return all data off post or get method
     * @return array
     */
    public function getAll() {
        if ($_GET) {
            if (isset($this->GET['csrf']))
                unset($this->GET['csrf']);
            return $this->GET;
        }
        if ($_POST) {
            if (isset($this->POST['csrf']))
                unset($this->POST['csrf']);
            return $this->POST;
        }
    }

    /**
     * Return URl
     * @return String
     */
    public function getRequestUrl() {
        return $_SERVER['REQUEST_URI'];
    }

    /**
     * Return Ip Client
     * @return type
     */
    public function getRequestIp() {
        return $_SERVER['REMOTE_ADDR'];
    }

    /**
     * Return Request Method
     * @return RequestMethod
     */
    public function getRequestMethod() {
        return $_SERVER['REQUEST_METHOD'];
    }

    /**
     * Return Protocol Http or Https
     * @return Protocol
     */
    public function getRequestProtocol() {
        return $_SERVER['SERVER_PROTOCOL'];
    }

    /**
     * Get Request Host
     * @return Host
     */
    public function getRequestHost() {
        return $_SERVER['HTTP_HOST'];
    }

    /**
     * if key not equal null check value key with csrf else check csrf off request
     * @param string $key
     * @return boolean
     */
    public function CheckCsrf($key = NULL) {
        if (CheckCsrf == false) {
            return true;
        }
        if ($_SESSION['expired'] < new \DateTime()) {
            return false;
        }
        $CsrfSession = $_SESSION['csrf'];
        if ($key != NULL) {
            if ($CsrfSession == $key) {
                return true;
            } else {
                return false;
            }
        }
        if ($this->getRequestMethod() == "GET") {
            if (isset($_GET['csrf'])) {
                $CsrfClient = $_GET['csrf'];
                if ($CsrfSession == $CsrfClient) {
                    return true;
                }
            }
            return false;
        }

        if ($this->getRequestMethod() == "POST") {
            if (isset($_POST['csrf'])) {
                $CsrfClient = $_POST['csrf'];
                if ($CsrfClient == $CsrfSession) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * This Function Return Csrf 
     * @return boolean
     */
    public function getCsrf() {
        if ($this->getRequestMethod() == "GET") {
            if (isset($_SESSION['csrf']))
                return $_SESSION['csrf'];
        }
        if ($this->getRequestMethod() == "POST") {
            if (isset($_SESSION['csrf']))
                return $_SESSION['csrf'];
        }
        return false;
    }

    protected function Secure($field, $type) {
        $output = "";
        switch ($type) {
            case "Get":
                if (isset($_GET[$field]))
                    $output = filter_var($_GET[$field], FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
                break;
            case "Post":
                if (isset($_POST[$field]))
                    $output = filter_var($_POST[$field], FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
                break;
            default :
                break;
        }
        return $output;
    }

}
