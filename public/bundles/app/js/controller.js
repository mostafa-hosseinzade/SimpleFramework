'use strict';

var app = angular.module('MySite', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'infinite-scroll']);
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: baseUrl + 'bundles/app/partials/Home/index.html', controller: 'Index'});
        $routeProvider.when('/Portfolio', {templateUrl: baseUrl + 'bundles/app/partials/Portfolio/index.html', controller: 'Portfolio'});
        $routeProvider.when('/isi/:id/:title', {templateUrl: baseUrl + 'bundles/app/partials/Isi/index.html', controller: 'Isi'});
        $routeProvider.when('/services/:id', {templateUrl: baseUrl + 'bundles/app/partials/Services/index.html', controller: 'Services'});
        $routeProvider.when('/seo', {templateUrl: baseUrl + "bundles/app/partials/Seo/index.html", controller: 'Seo'});
        $routeProvider.when('/news', {templateUrl: baseUrl + "bundles/app/partials/News/index.html", controller: 'News'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

app.controller('Index', function ($scope, $http, portfolioService) {
    $('html, body').stop().animate({
            scrollTop: $('body').offset().top - 90
        }, 0);
    $scope.news = {};

    $scope.data = portfolioService.getPortfolio(4);

    $http.get(baseUrl + "Default/news/-1/0/3/id/desc").success(function (response) {
        $scope.news = response.news;
    });

    $scope.ShowImg = function (id) {
        try {
            return portfolioService.ShowImg($scope.data.portfolioImg, id);
        } catch (e) {
        }
    }

    $scope.ShowPortfolio = function (portfolio) {
        $scope.PortfolioInfo = portfolio;
        $('.ShowPortfolio').modal('show');
    }

    $scope.ShowNews = function (item) {
        $scope.NewsInfo = item;
        $('.ShowNews').modal("show");
    };
});

app.controller('Portfolio', function ($scope, $http, portfolioService) {
     $('html, body').stop().animate({
            scrollTop: $('body').offset().top - 90
        }, 0);  
    $scope.data = {};
    var after = 0;
    $scope.busyScroll = false;
    $scope.showMessage = "اطلاعاتی جهت نمایش موجود نمی باشد";
//    setTimeout(function(){
     
        
        $scope.loadMore = function () {
        if ($scope.busyScroll)
        {
            return false;
        }
        if ($scope.filter == undefined)
            $scope.filter = -1;
        //(baseUrl + "Default/isi/" + $routeParams.id
        //"Default/portfolio/0/4/id/desc"
        $scope.busyScroll = true;
        var url = baseUrl + "Default/portfolio/" + after + "/4/id/desc";
        $http.get(url, {cache: true}).success(function (data) {
            var items = 0;
            if (data.portfolio != undefined)
                items = data.portfolio.length;
            if (items > 0)
            {
                $('.msg').fadeOut();
                if ($scope.data.portfolio == undefined) {
                    $scope.data = data;
                } else {
                    for (var i = 0; i < items; i++) {
                        $scope.data.portfolio.push(data.portfolio[i]);
                        after++;
                    }
                }
                if (items === 4)
                    $scope.busyScroll = false;
                else
                    $('.msg').fadeIn();
            } else {
                $('.msg').fadeIn();
            }
        });
    };
    
    
//    },500);
    

//    $scope.data = portfolioService.getPortfolio(-1);

    $scope.ShowImg = function (id) {
        try {
            return portfolioService.ShowImg($scope.data.portfolioImg, id);
        } catch (e) {
        }
    }
    $scope.ShowPortfolio = function (portfolio) {
        $scope.PortfolioInfo = portfolio;
        $('.ShowPortfolio').modal('show');
    }
});

app.controller('Isi', function ($scope, $http, $routeParams, portfolioService) {
    $('html, body').stop().animate({
            scrollTop: $('body').offset().top - 90
        }, 0);
    $scope.ISI = {};
    $scope.title = $routeParams.title;

    $scope.data = portfolioService.getPortfolio(-1);

    $scope.ShowImg = function (id) {
        try {
            return portfolioService.ShowImg($scope.data.portfolioImg, id);
        } catch (e) {
        }
    }

    $scope.ShowPortfolio = function (portfolio) {
        $scope.PortfolioInfo = portfolio;
        $('.ShowPortfolio').modal('show');
    }

    $scope.ShowIsiImg = function (img) {
        if (img != undefined)
            return img;
        return "/bundles/public/img/isi.jpg";
    }

    $scope.ShowIsi = function (isi) {
        $scope.IsiInfo = isi;
        $('.ShowIsi').modal("show");
    }
    var after = 0;
    $scope.busyScroll = false;
    $scope.showMessage = "اطلاعاتی جهت نمایش موجود نمی باشد";
    $scope.entities = [];
    $scope.ISI = {};
    $scope.idImage = [];
    $scope.filter = $scope.inputsearch;
    $scope.loadMore = function () {
        if ($scope.busyScroll)
        {
            return false;
        }
        if ($scope.filter == undefined)
            $scope.filter = -1;
        //(baseUrl + "Default/isi/" + $routeParams.id
        $scope.busyScroll = true;
        var url = baseUrl + "Default/isi/" + $routeParams.id + "/" + $scope.filter + "/" + after + "/3/id/desc";
        $http.get(url, {cache: true}).success(function (data) {
            var items = 0;
            if (data.isi != undefined)
                items = data.isi.length;
            if (items > 0)
            {
                $('.msg').fadeOut();
                if ($scope.ISI.length == undefined) {
                    $scope.ISI = data.isi;
                } else {
                    for (var i = 0; i < items; i++) {
                        $scope.ISI.push(data.isi[i]);
                        after++;
                    }
                }
                if (items === 3)
                    $scope.busyScroll = false;
                else
                    $('.msg').fadeIn();
            } else {
                $('.msg').fadeIn();
            }
        });
    };
    var filterTextTimeout;
    $scope.search = function () {
        $scope.filter = $scope.inputsearch;
        if ($scope.filter == '') {
            $scope.filter = -1;
        }
        var route = baseUrl + "Default/isi/" + $routeParams.id + "/" + $scope.filter + "/0/3/id/desc";
        if (filterTextTimeout) {
            clearTimeout(filterTextTimeout);
        }
        filterTextTimeout = setTimeout(function () {
            $http.get(route).success(function (response) {
                console.log(response);
                if (response.msg != undefined) {
                    $('.msg').fadeIn();
                } else {
                    $scope.ISI = response.isi;
                }
            }).error(function (r) {
                console.log('مشکل در برقراری ارتباط با سرور با پشتیبانی تماس بگیرید');
            });
        }, 2000);
    };
});

app.controller('Seo', function ($scope, $http) {
    $('html, body').stop().animate({
            scrollTop: $('body').offset().top - 90
        }, 0);
    console.log("Ok This is seo page")
});

app.controller("News", function ($scope, $http) {
$('html, body').stop().animate({
            scrollTop: $('body').offset().top - 90
        }, 0);
    $scope.ShowNews = function (item) {
        $scope.NewsInfo = item;
        $('.ShowNews').modal("show");
    };

    var after = 0;
    $scope.busyScroll = false;
    $scope.showMessage = "اطلاعاتی جهت نمایش موجود نمی باشد";
    $scope.entities = [];
    $scope.news = {};
    $scope.idImage = [];
    $scope.filter = $scope.inputsearch;
    $scope.loadMore = function () {
        if ($scope.busyScroll)
        {
            return false;
        }
        if ($scope.filter == undefined)
            $scope.filter = -1;
        //(baseUrl + "Default/isi/" + $routeParams.id
        $scope.busyScroll = true;
        var url = baseUrl + "Default/news/" + $scope.filter + "/" + after + "/3/id/desc";
        $http.get(url, {cache: true}).success(function (data) {
            var items = 0;
            if (data.news != undefined)
                items = data.news.length;
            if (items > 0)
            {
                $('.msg').fadeOut();
                if ($scope.news.length == undefined) {
                    $scope.news = data.news;
                } else {
                    for (var i = 0; i < items; i++) {
                        $scope.news.push(data.news[i]);
                        after++;
                    }
                }
                if (items === 3)
                    $scope.busyScroll = false;
                else
                    $('.msg').fadeIn();
            } else {
                $('.msg').fadeIn();
            }
        });
    };
    var filterTextTimeout;
    $scope.search = function () {
        $scope.filter = $scope.inputsearch;
        if ($scope.filter == '') {
            return false;
        }
        var route = baseUrl + "Default/news/" + $scope.filter + "/0/3/id/desc";
        if (filterTextTimeout) {
            clearTimeout(filterTextTimeout);
        }
        filterTextTimeout = setTimeout(function () {
            $http.get(route).success(function (response) {
                console.log(response);
                if (response.msg != undefined) {
                    $('.msg').fadeIn();
                } else {
                    $scope.news = response.news;
                }
            }).error(function (r) {
                console.log('مشکل در برقراری ارتباط با سرور با پشتیبانی تماس بگیرید');
            });
        }, 2000);
    };
});

app.controller("Footer", function ($scope, $http) {
    $scope.SendContact = function () {
        if ($scope.contact == undefined) {
            return false;
        }
        if ($scope.contact.name == undefined || $scope.contact.mobile == undefined || $scope.contact.email == undefined) {
            $scope.modal("فیلد های ارسال پیام نمی تواند خالی باشد");
        }
        $scope.contact.csrf = csrf;
        $http({
            "method": "post",
            "url": baseUrl + "Default/Contact",
            "data": $scope.contact
        }).success(function (response) {
            $scope.modal(response);
            $scope.SendsData = $scope.contact;
            $scope.DisableBtn = true;
        }).error(function (response) {
            $scope.modal("در حال حاضر سرور مشغول است زمانی دیگر امتحان کنید با شرکت تماس حاصل نمائید")
        })
    }
    $scope.modal = function (msg) {
        $scope.modalmsg = msg;
        $('.MessageModal').modal("show");
    }

    $http.get(baseUrl + "Default/Services").success(function (response) {
        $scope.Services = response;
    });
});

app.controller("Services", function ($routeParams, $scope, $http) {
    $('html, body').stop().animate({
            scrollTop: $('body').offset().top - 90
        }, 0);
    var id = $routeParams.id;
    $http.get(baseUrl + "Default/Service/" + id).success(function (response) {
        $scope.Service = response[0];
    });
    $scope.ShowContent = function (content) {
        $('#ShowContent').append(content);
    };

    $scope.portfolio = {};
    $scope.portfolioImg = {};
    $http.get(baseUrl + "Default/portfolio/4").success(function (response) {
        $scope.portfolio = response.portfolio;
        $scope.portfolioImg = response.portfolioImg;
    });

    $scope.ShowImg = function (id) {
        var img = '';
        for (var i = 0; i < $scope.portfolioImg.length; i++) {
            if ($scope.portfolioImg[i].portfolio_id == id) {
                img = $scope.portfolioImg[i].file;
                break;
            }
        }
        if (img != '')
            return img;
        return "/bundles/public/img/4.jpg";
    }

    $scope.ShowPortfolio = function (portfolio) {
        $scope.PortfolioInfo = portfolio;
        $('.ShowPortfolio').modal('show');
    }
});


















//$offset, $limit, $attr, $asc
app.factory("portfolioService", function ($http) {
    var data = {};
    return {
        getPortfolio: function (count) {
            var url = "Default/portfolio/0/4/id/desc";
            $http.get(baseUrl + url).success(function (response) {
                data.portfolio = response.portfolio;
                data.portfolioImg = response.portfolioImg;
            });
            return data;
        },
        ShowImg: function (d, id) {
            var img = '';
            for (var i = 0; i < d.length; i++) {
                if (d[i].portfolio_id == id) {
                    img = d[i].file;
                    break;
                }
            }
            if (img != '')
                return img;
            return "/bundles/public/img/4.jpg";
        }
    };
});




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

// paginate
//    //variable for pagination comments
//    var count, orderBy, field;
//    orderBy = '';
//    field = '';
//
//    //init pagination value
//    var current = 1;
//    var constPageItems = 10;
//    var allPage = 0;
//    var row = new Array();
//    $scope.RefreshPagination = function () {
//        //alert(parameterUrl);
//
//        $http.get(baseUrl + 'UserAll').success(function (data) {
//
//            console.log(data.count);
//            allPage = Math.floor(data.count / constPageItems); //Math.floor(CountItems / constPageItems);
//            $scope.Allpaginate = paginationCreateArray.array(row, data.count, constPageItems, current);
//            //function paginate
//            $scope.paginate = function (offset) {
//
//                if (orderBy === '') {
//                    orderBy = "asc";
//                }
//
//                if (field === '') {
//                    field = 'id';
//                }
//
//                current = offset;
//                offset = offset * constPageItems - constPageItems;
//
//                var parameterurlPagination = "";
//
//                parameterurlPagination = baseUrl + "Default/-1/" + $scope.attr + "/" + $scope.asc + "/" + offset + "/" + constPageItems;
//
//
//                $http.get(parameterurlPagination).success(function (response) {
//                    $scope.RefreshPagination();
//                    $scope.data = response.user;
//
//                });
//            };
//
//            //next offset
//            $scope.pageNext = function () {
//                $scope.paginate(current + 1);
//            };
//
//            //preview offset
//            $scope.pagePreview = function () {
//                if (current > 1) {
//                    $scope.paginate(current - 1);
//                }
//            };
//
//            //for print ...
//            $scope.checkZero = function (x) {
//                if (x == 0)
//                {
//                    return false;
//                } else {
//                    return true;
//                }
//            };
//
//            //checking Visible Next Button
//            $scope.checkVisibleNext = function () {
//
//                if ((current) > allPage - 1)
//                {
//                    return false;
//                }
//                return true;
//            };
//
//            //checking Visible prev Button
//            $scope.checkVisiblePrev = function () {
//
//                if (current > 1)
//                {
//                    return true;
//                }
//                return false;
//            };
//
//            // Sort Order By desc
//            $scope.sortDesc = function (field_in) {
//                field = field_in;
//                orderBy = "desc";
//                $scope.desc = true;
//                $scope.asc = false;
//                var offset = current * constPageItems - constPageItems;
//
//                var parameterurlPagination = "";
//                if (typeof parameterRoot == "undefined")
//                {
//                    parameterurlPagination = BaseUrl + "/api/comments/-1/filters/" + offset + "/offsets/" + constPageItems + "/limits/" + field + "/orders/" + orderBy + ".json";
//                } else
//                {   //api/comments/{filter}/filters/{offset}/offsets/{limit}/limits/{attr}/orders/{asc}/posts/{itemGroup}.{_format} 
//                    parameterurlPagination = BaseUrl + "/api/comments/-1/filters/" + offset + "/offsets/" + constPageItems + "/limits/" + field + "/orders/" + orderBy + "/posts/" + parameterRoot + ".json";
//                }
//
//
//                $http.get(parameterurlPagination,
//                        {headers: {'x-wsse': TokenHandler.getCredentials($rootScope.userAuth.username, $rootScope.userAuth.secret)}}).success(function (response) {
//                    $scope.PostsShow = response;
//                });
//                current = $scope.CountPaginate;
//                $scope.RefreshPagination();
//                $('.paginate').last().click();
//            };
//
//            //Sort Order By Asc
//            $scope.sortAsc = function (field_in) {
//                field = field_in;
//                orderBy = "asc";
//                var offset = current * constPageItems - constPageItems;
//                $scope.asc = true;
//                $scope.desc = false;
//
//                var parameterurlPagination = "";
//                if (typeof parameterRoot == "undefined")
//                {
//                    parameterurlPagination = BaseUrl + "/api/comments/-1/filters/" + offset + "/offsets/" + constPageItems + "/limits/" + field + "/orders/" + orderBy + ".json";
//                } else
//                {   //api/comments/{filter}/filters/{offset}/offsets/{limit}/limits/{attr}/orders/{asc}/posts/{itemGroup}.{_format} 
//                    parameterurlPagination = BaseUrl + "/api/comments/-1/filters/" + offset + "/offsets/" + constPageItems + "/limits/" + field + "/orders/" + orderBy + "/posts/" + parameterRoot + ".json";
//                }
//
//                $http.get(parameterurlPagination,
//                        {headers: {'x-wsse': TokenHandler.getCredentials($rootScope.userAuth.username, $rootScope.userAuth.secret)}}).success(function (response) {
//                    $scope.content = response;
//                    current = 1;
//                    $scope.RefreshPagination();
//                    $('.paginate').first().click();
//                });
//            };
//
//        });
//    };
//
//    //call Pagination for first
//    $scope.RefreshPagination();