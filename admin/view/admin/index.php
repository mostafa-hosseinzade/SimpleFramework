
<html ng-app="admin">
    <head>
        <link rel="stylesheet" href="/bundles/public/css/bootstrap.rtl.css">
        <link rel="stylesheet" href="/bundles/admin/css/admin.css">
        <link rel="stylesheet" href="/bundles/public/css/loading-bar.css">
        <link rel="stylesheet" href="/bundles/public/css/cropper.min.css">
    </head>    
    <body ng-controller="MainController">
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <center>
                <ul class="nav navbar-nav pull-right" style="color:#126D6D">
                    <li ><a href="/mAdmin#/">Main</a></li>
                    <li ng-repeat="menu in entities"><a href="#/{{menu.table}}/-1/10/id/desc/0">{{menu.label}}</a></li>
                </ul>
                <ul class="nav navbar-nav pull-left">
                    <li class="dropdown">
                        <a style="cursor: pointer" class="dropdown-toggle menuitem" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Profile <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li> <a href="#">Profile</a></li>
                            <li><a href="/mAdmin/Login/Logout">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </center>
        </div>
        <div class="body">
            <div ng-view></div>
        </div>
        <div id="cropper"></div>
        <script type="text/javascript">
                    var BaseURL = "http://localhost:8000/mAdmin/Default/";
                    var csrf = "<?php echo csrf; ?>";
                    var entity = <?php echo $_SESSION['entity']; ?>;
        </script>
        <script src="/bundles/public/js/jquery-1.11.1.js"></script>
        <script src="/bundles/public/js/bootstrap.min.js"></script>
        <script src="/bundles/admin/js/angular.min.js"></script>
        <script src="/bundles/public/js/angular-route.min.js"></script>
        <script src="/bundles/public/js/angular-animate.min.js"></script>
        <script src="/bundles/public/js/angular/angular-resource.min.js"></script>
        <script src="/bundles/public/ckeditor/ckeditor.js"></script>
        <script src="/bundles/public/js/angular-ckeditor.min.js"></script>
        <script src="/bundles/public/js/loading-bar.js"></script>         
        <script src="/bundles/admin/js/controller.js"></script>
        <script src="/bundles/admin/js/directive.js"></script>
        <script src="/bundles/public/js/cropper.min.js"></script>

        <!-- PNotify -->
        <script type="text/javascript" src="/bundles/public/js/notify/pnotify.core.js"></script>
        <script type="text/javascript" src="/bundles/public/js/notify/pnotify.buttons.js"></script>
        <script type="text/javascript" src="/bundles/public/js/notify/pnotify.nonblock.js"></script> 
    </body>
</html>