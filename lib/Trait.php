<?php

trait CreateSalt {

    private $username;
    private $password;
    private $email;
    private $salt;

    public function SaltPassword($username, $email, $password) {
        $this->username = $username;
        $this->password = $password;
        $this->email = $email;
        return $this->Create();
    }

    private function Create() {
        $data = array();
        $password = $this->password.date("Y-m-d H:i:s");
        $salt = $this->email.$this->password.$this->username.date("Y-m-d H:i:s");
        $key = pack('H*', "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
        //Create Password
        for ($index = 0; $index < 100; $index++) {
            $password = hash('SHA256', $password . $key, true);
        }
        $password = \base64_encode($password);
        $data['password'] = $password;
        //Create Salt
        for ($i = 0; $i < 100; $i++) {
            $salt = hash('SHA256', $salt . $key, true);
        }
        $salt = \base64_encode($salt);
        $data['salt'] = $salt;
        return $data;
    }

}
