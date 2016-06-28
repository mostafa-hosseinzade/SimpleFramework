app.directive('news', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: baseUrl + 'bundles/app/partials/Home/news.html'
    }
});

app.directive('comment', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: baseUrl + 'bundles/app/partials/Home/comment.html'
    }
});

app.directive('services', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: baseUrl + 'bundles/app/partials/Home/services.html'
    }
});

app.directive('footerservices', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: baseUrl + 'bundles/app/partials/Home/footer-services.html'
    }
});

app.directive('servicesApp', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: baseUrl + 'bundles/app/partials/Application/services.html'
    }
});

app.directive('why', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: baseUrl + 'bundles/app/partials/Home/why.html'
    }
});

app.directive('infolist', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: baseUrl + 'bundles/app/partials/Home/InfoList.html'
    }
});

app.directive('about', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: baseUrl + 'bundles/app/partials/Home/about.html'
    }
});
app.directive('footer', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: baseUrl + 'bundles/app/partials/Home/footer.html'
    }
});

app.directive('slider', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: baseUrl + 'bundles/app/partials/Home/slider.html'
    }
});

app.directive('sample', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: baseUrl + 'bundles/app/partials/Home/sample.html'
    }
});
app.factory('paginationCreateArray', function () {
            return {
                array: function (arr, CountItems, constPageItems, current) {
                    arr = new Array();

                    var CountPaginate = Math.floor(CountItems / constPageItems);
                    var CountPaginateRemane = CountItems % constPageItems;

                    if (CountPaginateRemane === 0)
                    {
                        CountPaginate--;
                    }

                    var difference = CountPaginate - current;
                    var low_range = current - 1;
                    var high_range = current + 3;

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
        })