<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace lib;

/**
 * Read Annotation Method Or Class
 *
 * @author administrator
 */
class readAnnotation {

    public function getClassAnnotations($class) {
        $r = new \ReflectionClass($class);
        $doc = $r->getDocComment();
        preg_match_all('#@(.*?)\n#s', $doc, $annotations);
        return $annotations[1];
    }

    public function getMethodAnnotation($class, $method) {
        $r = new \ReflectionClass($class);
        $r = $r->getMethod($method);
        $doc = $r->getDocComment();
        preg_match_all('#@(.*?)\n#s', $doc, $annotations);
        return $annotations[1];
    }

}
