<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace admin\core;
use lib\DBTable;
/**
 * Description of Model
 *
 * @author administrator
 */
abstract class Model {
    
    public function __construct($name = null) {
        return new DBTable($name);
    }
}
