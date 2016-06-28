/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.directive('show', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: BaseURL + '../../bundles/admin/partials/Full/Show.html'
    }
});

app.directive('add', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: BaseURL + '../../bundles/admin/partials/Full/Add.html'
    }
});

app.directive('edit', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: BaseURL + '../../bundles/admin/partials/Full/Edit.html'
    }
});

app.directive('inputtext', function () {
    return {
        template: '<div  ckeditor="options" ng-model="AddItem.content" class="form-control"  ready="onReady()" />',
        replace: true,
        require: 'ngModel',
        restrict: 'E',
        link: function (scope, elm, attrs) {
            elm.removeAttr('inputtext');
            elm.removeAttr('index');
        }
    };
});

app.directive('editform', function ($compile, $routeParams, $http) {
    return{
        restrict: 'C',
        replace: true,
        link: function (scope, element, attrs, controller) {
            var fields = entity[$routeParams.entity].form;
            var h = '';
            $.each(fields, function (item) {
                if (fields[item].type == "text") {
                    h += '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
                } else {
                    h += '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">';
                }
                h += '<label>' + fields[item].label + '</label>';
                if (fields[item].type == "string") {
                    h += '<input type="text" ng-model="AddItem.'+fields[item].name+'" name="'+fields[item].name+'" required="true" ng-class="{invalid:FormAddContent.'+fields[item].name+'.$invalid}" placeholder="'+fields[item].name+'" class="form-control">';
                } else if (fields[item].type == "number") {
                    h += '<input type="number" ng-model="AddItem.'+fields[item].name+'" name="'+fields[item].name+'" required="true" ng-class="{invalid:FormAddContent.'+fields[item].name+'.$invalid}" placeholder="'+fields[item].name+'" class="form-control">';
                } else if (fields[item].type == "text") {
                    h += '<inputtext></inputtext>';
                } else if (fields[item].type == "file") {
                    h += '<inputfile></inputfile><div></div>';
                } else if (fields[item].type == "entity") {
                    $http.get(BaseURL+"getAllCategory/"+fields[item].target).success(function (response){
                        scope.ctg = response.ctg;
                    }).error(function (response){
                        
                    })
                    h += "<select ng-model='AddItem."+fields[item].name+"' class='form-control'><option value=''>انتخاب کنید</option><option ng-selected='c.id == AddItem.id' value='{{c.id}}' ng-repeat='c in ctg'>{{c.title}}</option></select>";
                }else if(fields[item].type == "boolean"){
                    h +="<select ng-model='AddItem."+fields[item].name+"' class='form-control'><option ng-selected='1 == AddItem.active' value='1'>فعال</option>\n\
<option ng-selected='0 == AddItem.active' value='0'>غیر فعال</option></select>";
                }
                h += '</div>';
            });
            angular.element(element).html(($compile(h)(scope)));
        }
    }
});

app.directive('showform', function ($compile, $routeParams, $http) {
    return{
        restrict: 'C',
        replace: true,
        link: function (scope, element, attrs, controller) {
            var fields = entity[$routeParams.entity].form;
            var h = '';
            $.each(fields, function (item) {
                if (fields[item].type == "text") {
                    h += '<div class="verydata col-lg-12 col-md-12 col-sm-12 col-xs-12">';
                } else {
                    h += '<div class="show col-lg-6 col-md-6 col-sm-12 col-xs-12">';
                }
                h += '<span>' + fields[item].label + '</span> : ';
                if (fields[item].type == "string") {
                    h += '<span> {{Selected.'+fields[item].name+'}}</span>';
                } else if (fields[item].type == "number") {
                    h += '<span> {{Selected.'+fields[item].name+'}}</span>';
                } else if (fields[item].type == "text") {
                    h += '<span> {{Selected.'+fields[item].name+'}}</span>';
                } else if (fields[item].type == "entity") {
                    h += '<span> {{ShowCtg(Selected.'+fields[item].name+')}}</span>';
                } else if(fields[item].type == "boolean"){
                    h += '<span ng-show="Selected.'+fields[item].name+'== 1">فعال</span><span ng-show="Selected.'+fields[item].name+' == 0">غیر فعال</span>';
                }else if(fields[item].type == "file"){
                     h += '<img ng-src="{{Selected.'+fields[item].name+'}}">';
                }
                h += '</div>';
            });
            angular.element(element).html(($compile(h)(scope)));
        }
    }
});

app.directive('inputfile', function($routeParams, $compile) {
    return {
        template: '<input type="file"  class="form-control"   />',
        replace: true,
        scope: false,
        restrict: 'E',
        link: function($scope, elm, attrs) {
            $compile($(elm).next().html("<img class='pull-left' ng-click='editeImage($event)' ng-src='{{AddItem.file}}' style='max-width:100%' />"))($scope);
            elm.change(function(evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                    reader.onload = function(evt) {
                        $scope.imageLoadForEdit(evt.target.result);
                    };
                } else {
                    reader.onload = function(evt) {
                        $scope.$apply(function($scope) {
                            $scope.AddItem.file = evt.target.result;
                            console.log($scope.AddItem.file)
                        });
                    };
                }
                reader.readAsDataURL(file);
            });
        },
        controller: function($scope, $element) {
            $scope.editeImage = function(event) {
                console.log($(event.target).before());
                $(event.target).before().val('/');
                $scope.imageLoadForEdit($scope.AddItem.file);
            };

            $scope.imageLoadForEdit = function(src) {
                var image = new Image();
                image.src = src;
                var img;
                var croper;
                image.onload = function() {
                    var width = this.width;
                    var height = this.height;

                    $('#cropper').html($compile("<div style='position:relative;height:100vh'><img ng-src='{{myImage}}'  />\n\
                                        <div class='panelcrop'>\n\
                                        <button id='cancel' data-toggle='tooltip' data-placement='bottom' title='انصراف'><i class='fa fa-remove'></i></button>\n\
                                        <button id='submit' data-toggle='tooltip' data-placement='bottom' title='تایید'><i class='fa fa-check-square-o'></i></button>\n\
                                        <button id='reset' data-toggle='tooltip' data-placement='bottom' title='پاک کردن تغییرات'><i class='fa fa-refresh'></i></button>\n\
                                        <button id='left' data-toggle='tooltip' data-placement='bottom' title='حرکت به چپ'><i class='fa fa-hand-o-left'></i></button>\n\
                                        <button id='right' data-toggle='tooltip' data-placement='bottom' title='حرکت به راست'><i class='fa fa-hand-o-right'></i></button>\n\
                                        <button id='up' data-toggle='tooltip' data-placement='bottom' title='حرکت به بالا'><i class='fa fa-hand-o-up'></i></button>\n\
                                        <button id='bottom' data-toggle='tooltip' data-placement='bottom' title='حرکت به پایین'><i class='fa fa-hand-o-down'></i></button>\n\
                                        <button id='reversev' data-toggle='tooltip' data-placement='bottom' title='وارون افقی'><i class='fa fa-arrows-v'></i></button>\n\
                                        <button id='reverseh' data-toggle='tooltip' data-placement='bottom' title='وارون عمودی'><i class='fa fa-arrows-h'></i></button>\n\
                                        <button id='rotatel' data-toggle='tooltip' data-placement='bottom' title='چرخش به چپ'><i class='fa fa-undo'></i></button>\n\
                                        <button id='rotater' data-toggle='tooltip' data-placement='bottom' title='چرخش به راست'><i class='fa fa-repeat'></i></button>\n\
                                        <span class='selection'>(طول : {{selection.width}} , ارتفاع : {{selection.height}} )</span></div></div>")($scope));
                    var allElements = document.getElementsByTagName('*');
                    for (var i = 0, n = allElements.length; i < n; i++)
                    {
                        if (allElements[i].getAttribute('data-toggle') !== null)
                        {
                            $(allElements[i]).tooltip();
                        }
                    }

                    $scope.$apply(function($scope) {
                        $scope.myImage = image.src;
                    });

                    var width2 = 200;
                    var height2 = 265;

                    var cropper = $('#cropper').find('img').cropper({aspectRatio: 3 / 4, modal: false, minCropBoxWidth: width2, minCanvasWidth: height2, maxWidth: 1024, minWidth: 640,
                        build: function() {
                            img = $('#cropper').find('img');

                            if (width < width2 || height < height2) {
                                var r = confirm("اندازه تصویر مناسب نیست در صورت تایید تصویر کیفیت  خود را از دست می دهد.");
                                if (r == true) {
                                    if (img.width() < width2)
                                        img.width(width2);
                                    else
                                        img.height(height2);
                                } else {
                                    return;
                                }
                            }
                            $('#cropper').show();
                            $scope.$apply(function($scope) {
                                $scope.selection = {'width': img.width(), 'height': img.height()};
                            });
                            $(this).on('crop.cropper', function(e) {
                                var size = $(this).cropper('getCropBoxData', true);
                                $scope.$apply(function($scope) {
                                    $scope.selection = {'width': Math.round(size.width), 'height': Math.round(size.height)};
                                });

                            });
                        }
                    });
                    $('.cropplus').on('click', function(e) {
                        e.preventDefault();
                        img = $(elm).next().find('img');
                        if (img.width() + 30 <= 1024 || img.height() + 20 <= 576) {
                            img.width(img.width() + 30);
                            croper.update();
                        }
                    });

                    $('#cancel').on('click', function(e) {
                        e.preventDefault();
                        $('#cropper').hide();
                        $(cropper).cropper('destroy');
                    });
                    $('#left').on('click', function(e) {
                        e.preventDefault();
                        $(cropper).cropper('move', -10, 0);
                    });
                    $('#right').on('click', function(e) {
                        e.preventDefault();
                        $(cropper).cropper('move', 10, 0);
                    });
                    $('#up').on('click', function(e) {
                        e.preventDefault();
                        $(cropper).cropper('move', 0, -10);
                    });
                    $('#bottom').on('click', function(e) {
                        e.preventDefault();
                        $(cropper).cropper('move', 0, 10);
                    });
                    $('#reverseh').on('click', function(e) {
                        e.preventDefault();
                        $(cropper).cropper('scaleX', -$(cropper).cropper('getData').scaleX);
                    });
                    $('#reversev').on('click', function(e) {
                        e.preventDefault();
                        $(cropper).cropper('scaleY', -$(cropper).cropper('getData').scaleY);
                    });
                    $('#rotatel').on('click', function(e) {
                        e.preventDefault();
                        $(cropper).cropper('rotate', -5);
                    });
                    $('#rotater').on('click', function(e) {
                        e.preventDefault();
                        $(cropper).cropper('rotate', 5);
                    });
                    $('#reset').on('click', function(e) {
                        e.preventDefault();
                        $(cropper).cropper('reset');
                    });
                    $('#submit').on('click', function(e) {
                        e.preventDefault();
                        $scope.$apply(function($scope) {
                            var size = $(cropper).cropper('getCropBoxData', true);
                            var width = size.width;
                            var height = size.height;

                            $scope.AddItem.file = $(cropper).cropper('getCroppedCanvas', {
                                width: 600,
                                height: 500
                            }).toDataURL("image/jpeg", 0.8);
                            $('#cropper').hide();
                        });
                    });
                };
            };
        }
    };
});