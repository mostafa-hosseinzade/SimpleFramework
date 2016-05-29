<?php

namespace lib;

use SoapClient;

class HelperFunction {

    public function __construct() {
        
    }

    public static function SMS($url, $username, $password, $senderNumbers, $recipientNumbers, $messageBodies) {
        $client = new \SoapClient($url);
        if (is_array($recipientNumbers)) {
            $params = array(
                'username' => $username,
                'password' => $password,
                'from' => $senderNumbers,
                'to' => $recipientNumbers,
                'text' => $messageBodies,
                'isflash' => true,
                'udh' => "",
                'recId' => array(0),
                'status' => 0x0
            );
        } else {
            $params = array(
                'username' => $username,
                'password' => $password,
                'from' => $senderNumbers,
                'to' => array($recipientNumbers),
                'text' => $messageBodies,
                'isflash' => true,
                'udh' => "",
                'recId' => array(0),
                'status' => 0x0
            );
        }

        $result = $client->SendSms($params)->SendSmsResult;
        return $result;
    }

    public static function EMAIL($TO, $SUBJECT, $MessageBody) {

        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        // More headers
        $headers .= 'From: <seminars@piramonco.com>' . "\r\n";

        $send = \mail($TO, $SUBJECT, $MessageBody, $headers);
        if ($send) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public static function base64_to_jpeg($data,$name_file,$directory) {
        try {
            $data = str_replace('data:image/jpeg;base64,', '', $data);
            $data = str_replace(' ', '+', $data);
            $data = base64_decode($data);
            $file =$directory . $name_file . '.jpg';
            $success = file_put_contents($file, $data);
            if ($success == true) {
                return $name_file . '.jpg';
            } else {
                return false;
            }
        } catch (\Exception $e) {
            return false;
        }
    }

}
