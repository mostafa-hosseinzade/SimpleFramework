<html>
    <head>
        
    </head>
    <body ng-app="myApp">
        <div ng-controller="test">
            <form  ng-submit="send()">
                <input type="text" name="name" ng-model="item.name"><br>
                <input type="text" name="family" ng-model="item.family"><br>
            <input type="submit" value="Send">
        </form>            
        </div>
        <p>Not Ajax</p><br>
        <form action="/HelloWorld/show" method="post">
                <input type="text" name="name" ><br>
                <input type="text" name="family" ><br>
                <input type="hidden" name="csrf" value="<?= csrf?>">
            <input type="submit" value="Send">            
        </form>
        <script src="/js/angular/angular.js"></script>
        <script>
        var csrf = "<?= csrf ?>";
        </script>
        <script src="/js/special.js"></script>
        
    </body>
</html>
