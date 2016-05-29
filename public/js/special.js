/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = angular.module("myApp",[]);

app.controller("test",["$http","$scope",function($http,$scope){
        $scope.send = function(){
            console.log(csrf)
            $scope.item.csrf = csrf;
            $http({
                method:'post',
                url: '/HelloWorld/show',
                data:$scope.item
            }).success(function(){
            })
        }
}])