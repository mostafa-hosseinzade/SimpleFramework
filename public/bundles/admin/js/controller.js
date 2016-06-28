'use strict';

var app = angular.module('admin', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'ckeditor']);
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: '../../bundles/admin/partials/index/index.html', controller: 'index'});
        $routeProvider.when('/:entity/:filter/:limit/:attr/:order/:offset', {templateUrl: '../../bundles/admin/partials/Full/index.html', controller: 'FullController'});
        $routeProvider.when('/content', {templateUrl: '../../bundles/admin/partials/content/index.html', controller: 'content'});
        $routeProvider.when('/content', {templateUrl: '../../bundles/admin/partials/content/index.html', controller: 'content'});

    }]);
app.controller('index', ['$scope', function ($scope) {
        console.log("this is index")
    }]);

app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
        $scope.entities = entity;

    }]).controller('FullController', ['$scope', '$http', '$routeParams','paginationCreateArray', function ($scope, $http, $routeParams,paginationCreateArray) {
        //$routeProvider.when('/:entity/:filter/:limit/:attr/:order/:offset',
        //{templateUrl: '../bundles/admin/partials/content/index.html',
        // controller: 'FullController'});
        $scope.entity = $routeParams.entity;
        $scope.filter = $routeParams.filter;
        $scope.ConstOfPage = $routeParams.limit;
        $scope.field = $routeParams.attr;
        $scope.order = $routeParams.order;
        $scope.offset = $routeParams.offset;

        $scope.entities = entity[$scope.entity];
        $scope.th = $scope.entities.table_show.th;
        $scope.td = $scope.entities.table_show.td;
        $scope.info = $scope.entities.info;
        $scope.form = $scope.entities.form;
        console.log($scope.entities);

        /// getContentFilterLimitAttrOrderOffset($entity,$filter, $limit, $attr, $order, $offset)
//        $scope.FirstRequest = function () {
//            $http.get(
//                    BaseURL + 'getContentFilterLimitAttrOrderOffset/' +
//                    $scope.entity + "/" +
//                    $scope.filter + "/" +
//                    $scope.ConstOfPage + "/" +
//                    $scope.field + "/" + $scope.order +
//                    "/" + $scope.offset).success(function (response) {
//                if (response.msg != undefined) {
//                    var msg = response.msg.split(';');
//                    NotifyCation(msg[0], msg[1], msg[2], msg[3]);
//                } else {
//                    console.log($scope.info.rel != undefined && $scope.info.field == "portfolio_id");
//                    $scope.data = response[$scope.info.main];
//                    if ($scope.info.rel != undefined) {
//                        $scope.Rel = response[$scope.info.rel];
//                    }
//                }
//            }).error(function (response) {
//                NotifyCation("محتوا", "مشکل در برقراری ارتباط با سرور", "error", true);
//            });
//        };
        $scope.current = 1;
        $scope.constPageItems=10;
        //function paginate
        $scope.paginate = function (offset) {
            offset = offset * $scope.constPageItems - $scope.constPageItems;
            var route = BaseURL + 'getContentFilterLimitAttrOrderOffset/' +
                    $scope.entity + "/" +
                    $scope.filter + "/" +
                    $scope.constPageItems + "/" +
                    $scope.field + "/" + $scope.order +
                    "/" + $scope.offset;
            $http.get(route).success(function (response) {
                if (response.msg != undefined) {
                    var msg = response.msg.split(';');
                    NotifyCation(msg[0], msg[1], msg[2], msg[3]);
                } else {
                $scope.data = response[$scope.info.main];
                $scope.count = response.count;
                if ($scope.info.rel != undefined) {
                        $scope.Rel = response[$scope.info.rel];
                    }
                $scope.allPage = Math.floor($scope.count / $scope.constPageItems);
                if ($scope.count % $scope.constPageItems > 0 && $scope.count > $scope.constPageItems) {
                    $scope.allPage++;
                }
                $scope.Allpaginate = paginationCreateArray.array($scope.allPage, $scope.current);
            }
            });
        };
        
        $scope.setOffset = function(index){
            return index*$scope.constPageItems;    
        }
        
        $scope.next = function(){
            return parseInt($scope.offset) + parseInt($scope.constPageItems);   
        }
        
        $scope.before = function(){
            if($scope.offset - $scope.constPageItems < 0)
                return 0;
            return $scope.offset - $scope.constPageItems;
        }
        
        if ($routeParams.offset != 0) {
            $scope.paginate($routeParams.offset);
            $scope.current =parseInt($routeParams.offset) / 10 + 1;
            console.log($scope.current)
        } else {
            $scope.paginate(1);
            $scope.current = 1;
        }
        $scope.numberShowChange = function(){
            $scope.paginate($scope.current);
        }
//        $scope.FirstRequest();
        var filterTextTimeout;
        $scope.Search = function () {
            $scope.filter = $scope.inputsearch;
            if ($scope.filter == "") {
                $scope.filter = -1;
            }
            if (filterTextTimeout) {
                clearTimeout(filterTextTimeout);
            }
            filterTextTimeout = setTimeout(function () {
                $http.get(
                        BaseURL + 'getContentFilterLimitAttrOrderOffset/' +
                        $scope.entity + "/" +
                        $scope.filter + "/" +
                        $scope.ConstOfPage + "/" +
                        $scope.field + "/" + $scope.order +
                        "/" + $scope.offset).success(function (response) {
                    if (response.msg != undefined) {
                        var msg = response.msg.split(';');
                        NotifyCation(msg[0], msg[1], msg[2], msg[3]);
                    } else {
                        $scope.data = response[$scope.info.main];
                        if ($scope.info.rel != undefined) {
                            $scope.Rel = response[$scope.info.rel];
                        }
                    }
                }).error(function (response) {
                    NotifyCation("محتوا", "مشکل در برقراری ارتباط با سرور", "error", true);
                });
            }, 2000);
        }
        $scope.ShowCtg = function (id) {
            if ($scope.Rel != undefined) {
                for (var i = 0; i < $scope.Rel.length; i++) {
                    if ($scope.Rel[i].id == id) {
                        return $scope.Rel[i].title;
                        break;
                    }
                }
            }
            return "";
        }

//        $scope.paginate = function (offset) {
//            $http.get(
//                    BaseURL + 'getContentFilterLimitAttrOrderOffset/' +
//                    $scope.entity + "/" +
//                    $scope.filter + "/" +
//                    $scope.ConstOfPage + "/" +
//                    $scope.field + "/" + $scope.order +
//                    "/" + $scope.offset).success(function (response) {
//                if (response.msg != undefined) {
//                    var msg = response.msg.split(';');
//                    NotifyCation(msg[0], msg[1], msg[2], msg[3]);
//                } else {
//                    $scope.data = response.content;
//                }
//            }).error(function (response) {
//                NotifyCation("محتوا", "مشکل در برقراری ارتباط با سرور", "error", true);
//            });
//        };
        $scope.Selected;
        $scope.SelectedItems = function (item) {
            $scope.Selected = item;
        };

        $scope.Show = function () {
            $scope.ShowContentInfo = true;
            $scope.AddContentInfo = false;
            $scope.EditContentInfo = false;
            $('.ModalShowContent').modal();
        };

        $scope.options = {
            language: 'fa',
            allowedContent: true,
            entities: false
        };
        $scope.prepareCreate = function () {
            $scope.AddItem = {};
            $scope.Selected = {};
            $scope.ShowContentInfo = false;
            $scope.AddContentInfo = true;
            $scope.EditContentInfo = false;
            if ($scope.info.rel != undefined) {
                $http.get(BaseURL + "getAllCategory/" + $scope.info.rel).success(function (response) {
                    $scope.ctg = response.ctg;
                });
            }
            $('.ModalShowContent').modal();
        }

        $scope.prepareDelete = function () {
            $('.ModalDeleteContent').modal("show");
        }

        $scope.prepareEdit = function () {
            $scope.ShowContentInfo = false;
            $scope.AddContentInfo = false;
            $scope.EditContentInfo = true;
            $scope.AddItem = $scope.Selected;
            $scope.DefaultData = $scope.Selected;
            $('.ModalShowContent').modal();
        }

        $scope.SendAdd = function () {
            var str = $scope.AddItem.content;
            if ($scope.AddItem.content != undefined) {
                $scope.AddItem.content = str.replace(/↵/gi, "<br>");
            }
            $scope.AddItem.csrf = csrf;
            $http({
                url: BaseURL + 'Add/' + $scope.entity,
                data: $scope.AddItem,
                method: "post"
            }).success(function (response) {
                var msg = response.split(";");
                NotifyCation(msg[0], msg[1], msg[2], msg[3]);
                $scope.FirstRequest();
            }).error(function (response) {
                var msg = response.split(";");
                NotifyCation(msg[0], msg[1], msg[2], msg[3]);
            });

        };

        $scope.SendEdit = function () {
            var str = $scope.AddItem.content;
            if ($scope.AddItem.content != undefined) {
                $scope.AddItem.content = str.replace(/↵/gi, "<br>");
            }
            $scope.AddItem.csrf = csrf;
            $http({
                url: BaseURL + 'Edit/' + $scope.entity,
                data: $scope.AddItem,
                method: "post"
            }).success(function (response) {
                var msg = response.split(";");
                NotifyCation(msg[0], msg[1], msg[2], msg[3]);
            }).error(function (response) {
                var msg = response.split(";");
                NotifyCation(msg[0], msg[1], msg[2], msg[3]);
            });
        }

        $scope.SendDelete = function () {
            if ($scope.Selected.id != undefined) {
                $http.get(BaseURL + "Remove/" + $scope.entity + "/" + $scope.Selected.id).success(function (response) {
                    var msg = response.split(";");
                    NotifyCation(msg[0], msg[1], msg[2], msg[3]);
                    $('.tr' + $scope.Selected.id).slideUp();
                    $('.ModalDeleteContent').modal("hide");
                    $scope.Selected = undefined;
                }).error(function (response) {
                    var msg = response.split(";");
                    NotifyCation(msg[0], msg[1], msg[2], msg[3]);
                });
            }
        }

    }]);


function NotifyCation(title, text, type, hide) {
    new PNotify({
        title: title,
        text: text,
        type: type,
        hide: hide,
        nonblock: {
            nonblock: true
        },
        before_close: function (PNotify) {
            // You can access the notice's options with this. It is read only.
            //PNotify.options.text;

            // You can change the notice's options after the timer like this:
            PNotify.update({
                title: PNotify.options.title + " - Enjoy your Stay",
                before_close: null
            });
            PNotify.queueRemove();
            return false;
        }
    });
}
//angular.module('ng').filter('tel', function (){});
app.filter('nl2br', function () {
    return function (text) {
        return text ? text.replace(/\n/g, '<br/>') : '';
    };
})
        ;
app.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value)
            return '';

        max = parseInt(max, 10);
        if (!max)
            return value;
        if (value.length <= max)
            return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }
        return value + (tail || ' …');
    };
});

//darash Comment
//This For set text checkbox
app.filter('boolean', function () {
    return function (value) {
        if (value) {
            return 'فعال';
        } else {
            return 'غیر فعال';
        }
    };
});

//darash Comment  
// This Filter For Remove Tag HTML  
app.filter('htmlToPlaintext', function () {
    return function (text) {
        return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
}).filter('Rial', function () {
    return function (dateString) {
        return dateString + 'ریال';
    };
}).filter('ConvertedToDateShamsi', function () {
    return function (dateString) {
        if (dateString != null)
        {
            return moment(dateString, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD');
        } else {
            return "تاریخ ندارد";
        }
    };
});
app.factory('paginationCreateArray', function () {
            return {
                array: function (CountPaginate, current) {
                    var arr = new Array();
                    if (CountPaginate < 10)
                    {  // kamtar az 10
                        for (var i = 0; i < CountPaginate; i++) {
                            arr[i] = i + 1;
                        }
                    } else {
                        if (current > 8 && current <= CountPaginate - 8)
                        {
                            // vasat
                            arr[0] = 1;
                            arr[1] = 0;
                            var j = 2;
                            for (var i = current - 2; i < current + 4; i++) {
                                arr[j] = i;
                                j++;
                            }
                            arr[8] = 0;
                            arr[9] = CountPaginate;
                        } else if (current > CountPaginate - 8)
                        {
                            //last
                            arr[0] = 1;
                            arr[1] = 0;
                            var j = 2;
                            for (var i = CountPaginate - 7; i <= CountPaginate; i++) {
                                arr[j] = i;
                                j++;
                            }
                        } else {
                            //first
                            for (var i = 0; i <= 7; i++) {
                                arr[i] = i + 1;
                            }
                            arr[8] = 0;
                            arr[9] = CountPaginate;
                        }
                    }
                    return arr;
                }
            };
        });
