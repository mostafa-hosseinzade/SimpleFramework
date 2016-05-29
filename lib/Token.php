<?php

namespace lib;

/**
 * Create Csrf Token
 *
 * @author Mr.Mostafa Hosseinzade
 */
class Token {

    private $csrf;

    public function __construct() {
        session_start();
        if (isset($_SESSION['expired'])) {
            if ($_SESSION['expired'] < new \DateTime()) {
                session_destroy();
                $time = new \DateTime();
                $time = $time->add(new \DateInterval("P0Y0M0DT0H30M0S"));
                $_SESSION['expired'] = $time;
                $_SESSION['csrf'] = $this->CreateCsrf();
            }
        } else {
            $time = new \DateTime();
            $time = $time->add(new \DateInterval("P0Y0M0DT0H30M0S"));
            $_SESSION['expired'] = $time;
            $_SESSION['csrf'] = $this->CreateCsrf();
        }
    }

    public function CreateCsrf() {
        $time = new \DateTime();
        $time = $time->format("Y-m-d H:i:s");
        $string = "Davood RokhBakhsh , Nima Asady , Hamid Darash , Mr.Mostafa Hosseinzade , Mohammad Bahramy " . $time;
        $csrf = md5($string);
        return $csrf;
    }

}
