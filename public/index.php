<?php
/* Set internal character encoding to UTF-8 */
require_once __DIR__ . '/../app/autoload.php';
require_once __DIR__.'/../admin/autoload.php';

use app\autoload;
ob_start('ob_gzhandler'); 
$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$url = explode('/', $url);
if (isset($url[1])) {
    if ($url[1] == 'madmin') {
        $app = new \admin\autoload();
        $app->run();
    } else {
        $app = new autoload();
        $app->run();
    }
}
ob_end_flush();
