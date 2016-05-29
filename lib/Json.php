<?php

namespace lib;

use lib\Base\Request;

/**
 * This Class Check Value Json And Decod Value
 *
 * @author Mr.Mostafa Hosseinzade
 */
class Json extends Request {

    public function __construct($key = null) {
        if ($this->getRequestMethod() == "POST") {
            $data = file_get_contents("php://input");
            if (!empty($data) && \json_decode($data) != null) {
                $data = \json_decode($data);
                $data = get_object_vars($data);
                $_POST = $data;
            }
        }
        if ($this->getRequestMethod() == "GET") {
            $data = file_get_contents("php://input");
            if (!empty($data) && \json_decode($data) != null) {
                $data = \json_decode($data);
                $data = get_object_vars($data);
                $_GET = $data;
            }            
        }
        parent::__construct($key);
    }

}
