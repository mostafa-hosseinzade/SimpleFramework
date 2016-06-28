<html ng-app="user">
    <head>
        <link rel="stylesheet" href="/bundles/public/css/bootstrap.rtl.css">
        <link rel="stylesheet" href="/bundles/public/css/custom.css">
        <link href="/bundles/public/fonts/css/font-awesome.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/bundles/public/css/loading-bar.css">
    </head>
    <body>
        <div ng-view></div>
        <script>
        var csrf = "<?php echo csrf; ?>";
        </script>
        <script src="/bundles/public/angular/jquery.js"></script>
        <script src="/bundles/admin/js/angular.min.js"></script>
        <script src="/bundles/public/js/angular-route.min.js"></script>
        <script src="/bundles/public/js/angular-animate.min.js"></script>
        <script src="/bundles/public/js/angular/angular-resource.min.js"></script>
        <script src="/bundles/public/js/loading-bar.js"></script> 
        <script src="/bundles/public/js/bootstrap.min.js"></script>
        <script src="/bundles/login/js/controller.js"></script>
    </body>
</html>
