<?php
//settings
$cache_ext  = '.html'; //فرمت فایل
$cache_time     = 3600;  //کش کردن فایل برای 1 ساعت و یا 3600 ثانیه
$cache_folder   = 'cache/'; //فلدر برای نگهداری فایل های کش
$ignore_pages   = array('', '');//در صورتی که نمی خواهید فایل خاصی کش شود

$dynamic_url    = 'http://'.$_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] . $_SERVER['QUERY_STRING']; // پیدا کردن آدرس صفحه
$cache_file     = $cache_folder.md5($dynamic_url).$cache_ext; // نام فایل کش
$ignore = (in_array($dynamic_url,$ignore_pages))?true:false; //چک کردن اینکه آیا فایل جزو فایل های درخواست نشده نباشد

if (!$ignore && file_exists($cache_file) && time() - $cache_time < filemtime($cache_file)) { //check Cache exist and it's not expired.
    ob_start('ob_gzhandler'); //فعال نمودن بافر با متغیر ob_gzhandler که محتوا را به صورت فشرده شده به خروجی می فرستد.
    readfile($cache_file); //خواندن فایل کش
    echo '<!-- cached page - '.date('l jS \of F Y h:i:s A', filemtime($cache_file)).', Page : '.$dynamic_url.' -->';
    ob_end_flush(); //چاپ خروجی و پایان بافر
    exit(); //خروج از حلقه در صورتی که فایل کش موجود و فعال می باشد.
}
//فعال سازی بافر توسط فشرده سازی gzip.
ob_start('ob_gzhandler'); 
######## محتوای وب سایت شما در بخش زیر#########
?>
<!DOCTYPE html>
<html>
    <head>
        <title>عنوان صفحه</title>
    </head>
        <body>
           بدنه صفحه.
        </body>
</html>
<?php
######## محتوای صفحه#########

if (!is_dir($cache_folder)) { //ایجاد یک فلدر برای نگهداری فایل های کش در صورتی که وجود نداشته باشد
    mkdir($cache_folder);
}
if(!$ignore){
    $fp = fopen($cache_file, 'w');  //باز نمودن فایل برای نوشتن
    fwrite($fp, ob_get_contents()); //نوشتن محتوای بافر در یک فایل
    fclose($fp); //بستن فایل
}
ob_end_flush(); //چاپ محتوای صفحه در خروجی

?>