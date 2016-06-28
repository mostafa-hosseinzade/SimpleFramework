<?php

namespace admin\controller;
use admin\core\Controller;

class HelloWorldController extends Controller{
    use \compress;
    public function index() {
//        $this->compress([
//            __DIR__.'/../../public/bundles/public/css/bootstrap.rtl.css',
//            __DIR__.'/../../public/bundles/public/css/custom.css',
//            __DIR__.'/../../public/bundles/public/fonts/css/font-awesome.min.css',
//            __DIR__.'/../../public/bundles/public/css/loading-bar.css'
//        ], __DIR__."/../../public/bundles/production/production"
//                , "css");
//        $this->compress([
//            __DIR__.'/../../public/bundles/public/jquery.min.js',
//            __DIR__.'/../../public/bundles/admin/js/angular.min.js',
//            __DIR__.'/../../public/bundles/public/js/angular-route.min.js',
//            __DIR__.'/../../public/bundles/public/js/angular-animate.min.js',
//            __DIR__.'/../../public/bundles/public/js/angular/angular-resource.min.js',
//            __DIR__.'/../../public/bundles/public/js/bootstrap.min.js',
//            
//        ], __DIR__."/../../public/bundles/production/production"
//                , "js");
        echo 'ok';
    }
}

