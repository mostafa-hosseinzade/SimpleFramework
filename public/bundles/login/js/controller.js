
var app =angular.module('user',['ngRoute', 'angular-loading-bar', 'ngAnimate']);
app.config(function($routeProvider){
    $routeProvider.when("/",{templateUrl:"/bundles/login/partials/login.html",controller:"login"});
    $routeProvider.when("/resset",{templateUrl:"/bundles/login/partials/resset.html",controller:"login"});
    $routeProvider.otherwise({redirectTo:"/"});
});

app.controller('login',function($http,$scope){
    $scope.login = function(){
        $scope.user.csrf = csrf;
        $http({
            "method":"post",
            "url":"/mAdmin/Login/CheckLogin",
            "data":$scope.user
        }).success(function(response){
            $scope.ErrorMsg=response.msg;
            if(response.success == true){
                setTimeout(function(){
                    window.location = response.url;
                },1500);
            }
        })
    };
    $scope.resset = function(){
        $scope.user.csrf = csrf;
        $http({
            "method" : "post",
            "url":"/mAdmin/Login/Resset",
            "data":$scope.user
        }).success(function(response){
           $scope.ErrorMsg = response.msg; 
        });
    };
});