<?php

namespace lib;

use lib\Base\Request;

/**
 * return request get
 *
 * @author Mr.Mostafa Hosseinzade
 */
class GET extends Request {

    /**
     * this function for Method Get And Get value and not very secure
     * @param type $key
     * @return $key
     */
    public function get($key) {
        if (isset($this->GET[$key])) {
            return $this->Secure($key, "Get");
        }
    }

    /**
     * This Function For Check Int Off Input Get
     * @param string $key
     * @return Int Return Int Or False If Value Is Not Int
     */
    public function getInt($key) {
        if (isset($this->GET[$key])) {
            return filter_input(INPUT_GET, $key, FILTER_VALIDATE_INT);
        }
    }

    /**
     * Check Key Value If Email Return Else Return False
     * @param string $key
     * @return Email Return Email Or False
     */
    public function getEmail($key) {
        if (isset($this->GET[$key])) {
            return filter_input(INPUT_GET, $key, FILTER_VALIDATE_EMAIL);
        }
    }

    /**
     * This Finction For Return String Data
     * @param String $key
     * @return String
     */
    public function getString($key) {
        if (isset($this->GET[$key])) {
            return (string) filter_input(INPUT_GET, $key, FILTER_SANITIZE_STRING);
        }
    }

    /**
     * Return All Data With Get Request
     * @return RequestGet
     */
    public function getAll() {
        if(isset($this->GET['csrf']))unset($this->GET['csrf']);
        return $this->GET;
    }
    
    /**
     * get any key send with request post
     * @param array $keys
     * @return array
     */
    public function getAny(array $keys) {
        $data = array();
        foreach ($keys as $value) {
            if(isset($this->GET[$value]))
                $data[$value] = $this->GET[$value];
        }
        return $data;
    }
}
