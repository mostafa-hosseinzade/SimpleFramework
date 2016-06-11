<?php

namespace lib;

use lib\Base\Request;

/**
 * Description of POST
 *
 * @author administrator
 */
class POST extends Request {

    /**
     * This Function For Method Post And get Value Not Very Secure
     * @param type $key
     * @return type
     */
    public function get($key) {
        if (isset($this->POST[$key])) {
            return $this->Secure($key, "Post");
        }
    }

    /**
     * This Function For Check Int Off Input Post
     * @param type $key
     * @return Int Return Int Or False If Value Is Not Int
     */
    public function getInt($key) {
        if (isset($this->POST[$key])) {
            return filter_input(INPUT_POST, $key, FILTER_VALIDATE_INT);
        }
    }

    /**
     * Check Key Value If Email Return Else Return False
     * @param string $key
     * @return Email Return Email Or False
     */
    public function getEmail($key) {
        if (isset($this->POST[$key])) {
            return filter_input(INPUT_POST, $key, FILTER_VALIDATE_EMAIL);
        }
    }

    /**
     * This Finction For Return String Data
     * @param String $key
     * @return String
     */
    public function getString($key) {
        if (isset($this->POST[$key])) {
            return (string) filter_input(INPUT_POST, $key, FILTER_SANITIZE_STRING);
        }
    }

    /**
     * Return All Data With Post Request
     * @return RequestPost
     */
    public function getAll() {
        if(isset($this->POST['csrf']))unset($this->POST['csrf']);
        return $this->POST;
    }
    
    /**
     * get any key send with request post
     * @param array $keys
     * @return array
     */
    public function getAny(array $keys) {
        $data = array();
        foreach ($keys as $value) {
            if(isset($this->POST[$value]))
                if(!empty ($this->POST[$value]))
                $data[$value] = $this->POST[$value];
        }
        return $data;
    }
}
