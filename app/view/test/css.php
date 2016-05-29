<?php
use lib\CssCache;
$CSS_FILES = array(
    PUBLIC_FOLDER . 'css/Style.css'
);
//        if(file_exists(PUBLIC_FOLDER . 'css/Style2.css')){
//            echo 'file exists <br>';

$css_cache = new CssCache($CSS_FILES);
$css_cache->dump_style();
?>