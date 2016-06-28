<?php

namespace admin\controller;

use lib\Session;
use admin\core\Controller;

class LoginController extends Controller {

    use \CreateSalt;

    public function index() {
        return $this->View("login/login.php");
    }

    public function CheckLogin() {
        $info = $this->Request()->json()->request()->getAny(array("username", "email", "password"));
        if (empty($info)) {
            $data['msg'] = "لطفا صفحه را مجددا بارگزاری نمائید";
            $data['success'] = FALSE;
            return new \lib\JsonResponse($data);
        }
        if (empty($info['username']) || empty($info['email']) || empty($info['password'])) {
            $data['msg'] = "مشکل در اطلاعات ارسال شده";
            $data['success'] = FALSE;
            return new \lib\JsonResponse($data);
        }
        $info['table'] = "User";
        $result = $this->CheckUser($info);
        if (empty($result)) {
            $data['msg'] = "اطلاعات وارد شده اشتباه می باشد";
            $data['success'] = FALSE;
            return new \lib\JsonResponse($data);
        }
        $result = $this->MsgResponse($result[0]);
        return new \lib\JsonResponse($result);
    }

    private function MsgResponse($user) {
        $data = array("success" => false, "url" => "");
        if ($user['enabled'] != 1) {
            $data['msg'] = "حساب کاربری شما غیر فعال شده است";
            return $data;
        }
        if ($user['expired'] != 0) {
            $data['msg'] = "حساب کاربری شما منقضی شده است";
            return $data;
        }
        $now = new \DateTime();
        $expires_at = new \DateTime($user['expires_at']);
        if ($now > $expires_at) {
            $user['expired'] = 1;
            $this->setExpires_at("User", $user);
            $data['msg'] = "حساب کاربری شما منقضی شده است";
            return $data;
        }
//        $time = $now->add(new \DateInterval("P0Y0M1DT0H0M0S"));
//        if ($user['password_requested_at'] > $time) {
//            $data['msg'] = "شما در خواست رمز عبور جدید کرده اید";
//            return $data;
//        }
        $out = $now->add(new \DateInterval("P0Y0M0DT0H30M0S"));
        $session = new Session();
        $session->set("User", $user);
        $session->set("UserExpire", $out);
        file_put_contents(__DIR__ . "/../Resource/salt.txt", md5($user['salt'].$user['id'].$user['email']));
        $data['msg'] = "شما با موفقیت وارد شدید لطفا کمی صبر کنید...";
        $data['url'] = "/mAdmin";
        $data['success'] = true;
        return $data;
    }

    public function Resset() {
        $info = $this->Request()->json()->request()->getAny(array("email", "username"));
        if (empty($info)) {
            $data['msg'] = "لطفا صفحه را مجددا بارگزاری نمائید";
            $data['success'] = FALSE;
            return new \lib\JsonResponse($data);
        }
        if (empty($info['username']) || empty($info['email'])) {
            $data['msg'] = "مشکل در اطلاعات ارسال شده";
            $data['success'] = FALSE;
            return new \lib\JsonResponse($data);
        }
        $info['table'] = "User";
        $result = $this->forgetPassword($info);
        return new \lib\JsonResponse($result);
    }

    public function Logout() {
        Session::destroy();
        return $this->redirect("/mAdmin");
    }

}
