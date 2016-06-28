'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.directives', 'myApp.controllers']).
        config(['$routeProvider', function($routeProvider) {
//    $routeProvider.when('/login', {templateUrl: '/pet-project/web/bundles/app/partials/login.html', controller: 'Login'});
                $routeProvider.when('/userInfo', {templateUrl: '../bundles/app/partials/doctors/panelUser.html', controller: 'panelUser'});
                $routeProvider.when('/userCertificate', {templateUrl: '../bundles/app/partials/doctors/UserCertificate.html', controller: 'userCertificate'});
                $routeProvider.when('/userTime', {templateUrl: '../bundles/app/partials/doctors/UserTime.html', controller: 'UserTime'});
                $routeProvider.when('/userReserve', {templateUrl: '../bundles/app/partials/doctors/UserReserve.html', controller: 'UserReserve'});

            }]);


///--------------------------------------------------------------------------------------------------------
///--------------------directive---------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------
angular.module('myApp.directives', [])
//------------------------------------------------------------------------------
////user directive control
        //change info user
        .directive('inputfile', function($routeParams, $compile) {
    return {
        template: '<input type="file"  class="form-control"   />',
        replace: true,
        scope: false,
        restrict: 'E',
        link: function($scope, elm, attrs) {
            $compile($(elm).next().html("<img class='pull-left' ng-click='editeImage($event)' ng-src='{{photo}}' style='max-width:100%' />"))($scope);
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
                            $scope.photo = evt.target.result;
                            console.log($scope.photo)
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
                $scope.imageLoadForEdit($scope.photo);
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

                            $scope.photo = $(cropper).cropper('getCroppedCanvas', {
                                width: 200,
                                height: 265
                            }).toDataURL("image/jpeg", 0.5);
                            $('#cropper').hide();
                        });
                    });
                };
            };
        }
    };
})
        .directive('informationUser', function() {
            return {
                restrict: 'E', //E = element, A = attribute, C = class, M = comment   
                templateUrl: '../bundles/app/partials/doctors/UserInformation.html',
                $scope: false,
                controller: function($scope, $http) {
                    $http.get(baseURL + "/doc_panel/user").success(function(response) {
                        $scope.userinfo = response;
                        $scope.name = response['user'].name;
                        $scope.family = response['user'].family;
                        $scope.email = response['user'].email;
                        $scope.phone = response['user'].phone;
                        $scope.mobile = response['user'].mobile;
                        $scope.address = response['user'].address;
                        $scope.username = response['user'].username;
                        $scope.photo = response['user'].photo;
                        $scope.imageInfo = response['user'].photo;


                        if ($scope.photo == "")
                        {
                            $scope.photo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABPhJREFUeNrsnV1olEcUhke3Gkn8CVaxSQz4EyFYNRJMC5FKMPjfC8FEFBELUlu9sFAvpIrGUiheeFPpRVTQCxEUUXtRjRqtQTEighJQEPGnpSrSiEHRQhtsfE/nDTFLEnY3+30z7JwX3gvN7pzZ8+x8c3b2m9khXV1dRuVOQzUFCkABqBSAAlApAAWgUgAKQKUAFIBKASgAlQJQACoFkPP6YLANVFdXx9nf4fAUeCJcQoue0I/hh/C/cXWotbXVLYCYNANeDtfDZXB+P4/7G74PH4d/gW/n/AiIWJ/CO+BaeEQKjxcws+jt8EX4B/i6zgHpqQDeBbfAy1JMfrJG8LktbKtAAaSmmfAluCHDxPcFooFtzlQAA2s2fBquiqDtKrY9WwH0rUr4V7g0whiljFGpAHprKhNTEkOsEsaaqgCsEvA+uCjGmEWMmVAAxnzLMjNu1TJ20AAqWaG4UoPr+cA1gJ2O6/MC9iFIAFIOLvHgErjEZWnqEsAmYxfXXGs4+xIUgMnwSo8+g6xkn4IBsBge4xGAMexTMABqjH+qCQXAKJ+WApJK4lEhACg39lst3zSFfct5AFXGz2XwoSaaVVjvABQZf1UUAoBxHgMYpwAUQOQq9BhAYQgAEh4DSIQA4KXHAF6GAKDDYwAdIQBo9xhAewgAnnsM4HkIAG55DOBWCADa4GceJv8Z+xbEHNDmIYC2UOYA0VUPATjpkysAZ+BOj5LfyT4FA+Am3OwRgGb2KRgAclDdXo8A7GWfggEg+g2+4UHyb7AvJjQAct3d7QGA3S7nI9dfDZ6EDzmMf4h9MKECEG2B7zmIe4+xTegAZAXyK/htjDHfMmaHArBqgTfA/8WU/A2MaRRAjw7CX0Q8IUrb6xjLhA5gpLH3Y/5k7E540WF4Dfw6gniv4FXwEf57BmMvZl+CAfAJvMfY3etN8GZWIt17eOWYgXnw2SzGbGKb3RVPBXyKsZvYlz3sW84CWGTsPt1rrD6mv/e3afB5PkYk6/Kyy32jsQdwZKrHnGw/Nz0rsBLjnLFnTnRrOvskfZMdlAtyCYC8+It8Ry8dIOZHxh6w8R2cxwm50djbBdcT0JsU4r3hY9fzufvZlrS5jTEmDJCPZXx+M/sbqYYM9vcDBjiuZhL8I7w6g2YvG3u+w6Wk/y9nUqXtUtOzqftP+ncuLdxNel4N/D0vQ+lK5gw5+OOPvv7o43E1cm/N10xgpneaSaIuwCfgAywZO5nYu2m8Nkn8l/AKk/k9P1IULCTAxmx/Xsk2gLHGboCuy9LlsZ5u4yVMLmUP+G5PLleHcUTIDvj5xm6+q8jS6xoP/0ygMqe88BFAOcvIORGMqgp6K1/8Xywru2+kki1Go5moDyO8ZNfx8rc2jZEYC4DP4KNwcQyT+ljaleZwJMpniis+VEFyOtWxmJLvi4r5mmc5rYJQAU1myVZmwpScT7cQldCj2AEg+XkcinNN2JK7KWoB4Z+4L0HfaPL/11zmIr4RgHf/x/IZhJWHylZk1RgFd+IaATs0+b00mjmJfgTg3V/GD0b5mvdekkNjKzAK7kc9AtZo8vtUPnMT3SUI7/5ElpYZclV1zFFkI2AircpSftIFIF/jFWqe+1Wh6fl6NSWluxb01Ng1fv0R4n6KGuYonqUI1eClv6ChABSASgEoAJUCUAAqBaAAVApAAagUgAJQKYAw9E6AAQCB5uxoxSQjeAAAAABJRU5ErkJggg==";
                        }
                    });

                    $scope.editMode = false;
                    $scope.textBtnEdit = 'ویرایش';
                    $scope.disablepassdemo = true;
                    $scope.submitEdit = function() {
                        var data = {
                            'name': $scope.name,
                            'family': $scope.family,
                            'email': $scope.email,
                            'phone': $scope.phone,
                            'address': $scope.address,
                            'photo': $scope.photo,
                            'mobile': $scope.mobile
                        };


                        console.log(data);

                        $http({
                            method: 'POST',
                            url: baseURL + '/doc_panel/user/edit',
                            data: data
                        });
                    };

                    $scope.submitChangePassword = function() {
                        var data2 = {
                            'password': $scope.password
                                    //'username': $scope.username
                        };
                        $http({
                            method: 'POST',
                            url: baseURL + '/doc_panel/user/edit/password',
                            data: data2
                        }).success(function(response) {
                            alert("اطلاعات شما با موفقیت ویرایش شد");

                        });

                    };
                    $scope.ClickEditForm = function() {
                        $scope.editMode = !$scope.editMode;

                        if ($scope.editMode)
                        {
                            $scope.textBtnEdit = 'خروج از ویرایش';
                        } else
                        {
                            $scope.textBtnEdit = 'ویرایش';
                        }
                    };
                }
            }
        })

        //match password inside panel user
        .directive('pwCheck', [function() {
                return {
                    require: 'ngModel',
                    link: function(scope, elem, attrs, ctrl) {
                        var firstPassword = '#' + attrs.pwCheck;
                        elem.add(firstPassword).on('keyup', function() {
                            scope.$apply(function() {
                                var v = elem.val() === $(firstPassword).val();
                                ctrl.$setValidity('pwmatch', v);
                            });
                        });
                    }
                }
            }])

//------------------------------------------------------------------------------
//animals directive control
        .directive('myAnimalsDirective', ['Base64', function(Base64) {
                return {
                    restrict: 'E', //E = element, A = attribute, C = class, M = comment   
                    templateUrl: '../bundles/app/partials/animals/AnimalsInformation.html',
                    $scope: false,
                    controller: function($scope, $http) {
                        //$scope.base64sample = Base64.encode("hamidDarash")  ;
                        //cli_panel/animals/user.{_format}

                        $http.get(baseURL + "/cli_panel/animals/user.json").success(function(response) {
                            $scope.animalsUser = response;
                        });

                        $scope.galleryShow = function(animals) {

                            $http.get(baseURL + "/cli_panel/pictures/" + animals + "/animals.json").success(function(response) {
                                $scope.listImageGallery = response;
                                $("#galleryFull").fadeIn(100);
                            });
                        };

                        $scope.editAnimalsInfo = function(animalId) {

                        };

                    }
                };
            }]).directive('maskedInput', function()
{
    return {
        restrict: 'A',
        scope: false,
        link: function($scope, elem, attrs) {
            $.mask.definitions['~'] = "[+-]";
            var check = false;
//            $(elem).on('keydown', function(e) {
//                var val = $(elem).val();
//                if (val.length == 0) {
//                  
//                    if (!((e.keyCode >= 48 && e.keyCode <= 50) || (e.keyCode >= 96 && e.keyCode <= 98) || e.keyCode == 8 || e.keyCode == 46)) {
//                        e.preventDefault();
//                    }
//                } else if (val.length == 1) {
//                      alert('ok');
//                    var digit;
//                    if (parseInt(val) < 2) {
//                        if (!((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 8 || e.keyCode == 46)) {
//                            e.preventDefault();
//                        } else if(((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 8 || e.keyCode == 46)) {
//                            alert('45');
//                            digit = e.keyCode - 48;
//                        }else if (!((e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 46)) {
//                            e.preventDefault();
//                        } else {
//                            alert('95');
//                            digit = e.keyCode - 96;
//                        }
//                    } else {
//                        if (!((e.keyCode >= 48 && e.keyCode <= 51) || (e.keyCode >= 96 && e.keyCode <= 99) || e.keyCode == 8 || e.keyCode == 46)) {
//                            e.preventDefault();
//                        }else if (e.keyCode >= 48 && e.keyCode <= 52) {
//                            digit = e.keyCode - 48;
//                        }else if (e.keyCode >= 96 && e.keyCode <= 100) {
//                            digit = e.keyCode - 96;
//                        }
//                    }
//
//                    if (digit) {
//                        alert(val + digit);
//                        $(elem).val(val + digit + ":");
//                        e.preventDefault();
//                    }
//                } else if (val.length == 3) {
////                    var digit;
//                    if (!((e.keyCode >= 48 && e.keyCode <= 54) || (e.keyCode >= 96 && e.keyCode <= 102) || e.keyCode == 8 || e.keyCode == 46)) {
//                        e.preventDefault();
//                    } else if (!(e.keyCode == 8 || e.keyCode == 46)) {
//                        $(elem).val(val + "0");
//                        e.preventDefault();
//                    }
//                } else if (val.length == 4) {
//                    var digit;
//                    if (!((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 46)) {
//                        e.preventDefault();
//                    }
//                } else {
//                    if (!(e.keyCode == 8 || e.keyCode == 46)) {
//                        e.preventDefault();
//                    }
//                }
//
//            });

//            $(elem).mask("29:59")
//                    .keypress(function() {
////                        var currentMask = $(this).data('mask').mask;
//                        var newMask = $(this).val().match(/^2.*/) ? "23:59" : "29:59";
//                        $(this).mask(newMask);
////                        if (newMask != currentMask) {
////                            $(this).setMask(newMask);
////                        }
//                    });

            var def = $(elem).mask(attrs.pattern);
            //console.log(def);
            $(elem).on('keyup', function() {
                if (check == true) {
                    $(elem).val("");
                    $(elem).text("");
                    check = false;
                }
                var value = $(elem).val();
                $scope.$apply(function() {
                    //console.log(attrs.septrator);
                    var re = new RegExp(attrs.septrator, "g");
                    $scope[attrs.id] = value.replace(re, '');
                });

            });
        }
    };
});


///-----------------------------------------------------------------------------------------------------------
///------------------------------------------- controller-----------------------------------------------------
///---------------------------------------------------------------------------------------------------------
angular.module('myApp.controllers', []).
        controller('Login', ['$rootScope', '$scope', '$window', function($rootScope, $scope, $window) {
                // On Submit function
                $scope.getSalt = function() {
                    var username = $scope.username;
                    var password = $scope.password;
                    // Get Salt
                    Salt.get({username: username}, function(data) {
                        var salt = data.salt;
                        // Encrypt password accordingly to generate secret
                        Digest.cipher(password, salt).then(function(secret) {
                            // Display salt and secret for this example
                            $scope.salt = salt;
                            $scope.secret = secret;
                            // Store auth informations in cookies for page refresh
                            $cookies.username = $scope.username;
                            $cookies.secret = secret;
                            // Store auth informations in rootScope for multi views access
                            $rootScope.userAuth = {username: $scope.username, secret: $scope.secret};
                        }, function(err) {
                            console.log(err);
                        });
                    });
                };
            }])
        .controller('panelUser', ['$http', '$rootScope', '$scope', '$window', function($http, $rootScope, $scope, $window) {
                try {
                    tinymce.init({
                        selector: 'textarea',
                        height: 300,
                        plugins: [
                            'advlist autolink lists link charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table contextmenu paste code'
                        ],
                        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                        content_css: [
                            '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
                            '//www.tinymce.com/css/codepen.min.css'
                        ]
                    });
                } catch (error) {
//                    alert('no');
                }
            }])
        .controller('userCertificate', ['$http', '$rootScope', '$scope', '$window', function($http, $rootScope, $scope, $window) {
                $http.get(baseURL + "/doc_panel/usercertificate").success(function(response) {
                    if (response === 'Not Info') {
                        NotifyCation("مدارک", 'اطلاعاتی برای نمایش وجود ندارد', "error", true);
                    } else {
                        for (var i = 0; i < response.LengthCertificate; i++) {
                            var data = response.certificate[i]['photo'].split(';');
                            if (data[0] == 'data:application/pdf') {
                                response.certificate[i].pdf = response.certificate[i]['photo'];
                            } else {
                                response.certificate[i].photo = response.certificate[i]['photo'];
                            }
                        }
                        $scope.certificate = response.certificate;
                    }

                });
                $scope.File = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABylJREFUeNrsnbFu20gURW+ClCqUL1ilcM/0AiIT7lRE7g2ErlzG+gHJ4Q/YLlVZAtRHW7gzZApgH6ZWscwfsHC/W/DJywiyQ4kccoZzL2DAcGxG5D3z3hty5vENatLT/VEHQA9AB8CnzD85ACL5PgHwE0DQ6q8DUKXrTcWmtwEMAHwVo/fVAsCs1V8vaJ1BAIjxl2J8u4RDxgC+tfrrKS3UHICn+6MBgLuSjN9WBOC81V9HtFIzAGTUXwPwKjiPYau/vqGdmgAg5j8emOcP1bTVX5/T0poBqMl8QqADADWbTwgO0NuSj3dds/kA4D3dH3m0tuIIIBf9TpPzSgB8bPXXMS2uIAJkKn5d1NYIRitSwLWieX4R9eQeBKUSALmnr2vOHdNi9RFA54LLebo/6tFmtQB80fwcv9BmRQA83R85SB/n6izWAQojgAnhtS2gUgoA+GTIeRIARQC0DTnPDq22NwWYFKmMnAVQBIAiABQB0FgJrVYDQGDIef6k1WoAMGVkxbRaDQArQ84zotX2poCE+wYUASAXVvfwuqDNamcBM83PcUab1QIw1Tn3c1exYgBk5a2uEHyjxeojAAAMNZwSBtxGXhEArf46EQi0qfwBcHdQhREAsldfl1Qw5KaQigHIpIK659xTNo7IL+4OJgDli/0B7E0B2aLwuMKaYEjzNYoAW9FgAPYIsheATEq4BLuE2QnAFggDsE+gnQDsgKEnILy0bDuBQZ1Czx4uevJtR6JUPD+ZxASgwTp7uGgj3YbuvZDeAgC385PJggA0z/wegO8565opgOH8ZJI0fhpokfmPexS1nsACAtCMsH+Imb2zh4srAmC+xgWms18FIAJgsLwCf9uGRm11CMBhub/oCP5MACgt9K7Mg7l+uBkdjvxo1w2eXsH/JsbupeirzLw7WY66Ee1VCIDrhx0x85MY7lT0mTvY3fGjlynQ4PrhBoZI4AiWo25CywsAIKYPkLZecww4v558XcrnXwD4G8CCMOwBgIT2rzC/5dpAvu5cP5wCuLU9VbzLYfwY5vQC2ncq50lUGC5H3dhGAN6+YHzb9cPvSG919hp+DQYA/nH98IoApOY7AH7Avg6bY9cPf0idYycArh96Muo7sFMO9G5+ra4GkHzPlyzYmAJcP2xDw0eVVHUpQMc3flBVACBFj8dLYW8EoPmWA8BGypYDwNxPACibAYh5GezVO8MBiOTrV4nHDGwDYGXYTCBG2v2Lz/RLAiAwyPjhctRd0LYSawB5Dq57GrhZjrofaL6aInCTS3VUAuB8OeoOaZVaAFaamn+8HHWntEk9ADrWAUMu7a4IALnQOlXUNxz51ei5P4Drh7qs/4uXo+6Hff4gs13LqeDz/VXCtDlGNW3sE6nvXuxUkl0VvNIEgGFO09tI1zEMYN7t7A5kA0tVOnu4iAB82+5Uko0APaTrAbUf/Xt25qB+1xSZTiXPi0KXo64OheBtTvMfaf7B8pBZ/re9LLxuCBY5wj7XLhbXc6eSbQDqnHZFOXbnjDnyS9P47OGivQ1AnTeE8sDn0bdy04FOKeBXzqkeVZ4+/waAPF6NeF3s0dsDQzHVDHV2AbDidbFG8S4AAl0/LP2qAACZiiU1fJhX9yfIveyAnpWq2Utt4uq40E6O3+GbQMtTMD+ZBC8BUEcd0Hb9cPCHKBBA73cVm6IE8tBNpwgA5OugOWQqKG7+/GQSAa+8L8D1w39r+oDv8yz3lnvZY/q5X9jPmv9aBKgzClzn+aX5yeQKwPtMRGBU2D1z2qTN4/nJ5Dhr/p8iQJ0j7KOu6wEzj6OLFmDHOpyPjhEAAL5L2xqqLgBqXiDSAZ/71x4BgHqfC/RcP7xjJKgXgLoLKw/Ao23NG3UCQIcHQw6AH9LEkrIsAmzURtrhmyCUrFe7hS9H3cT1wxj6tI51BIQx0gWkK+RbS0gdAkAmCug26jpIXwJxCTy/HWRTtCZ7HuvU5kYTeQAwqYOIs+fvx7Z3Gcnz1rCowecfwHL9EQANdw6XqRUBsHukMAJYPFJizh7yA9DEOiAClQ8ATXYOM//XGAGamC8D2r8fAE0aMXy38AEALBp03gtavycAMmKaUjXPaP3+EQBoxsaMqKFFrXoApHef6VGAu4sKRADTL2DAhtMFAZAoYGIITQCc0/LiEQByIRPDznXIW78lASAX8tSg85yy93C5EWBze/jcEPMZ+ssGIFMPnFtmfqzJMeoHIAPBqYY1wY2KkV9Sp5JZYwAQCBYAjqHHI9YE6UJPla+ZKTIVDqTRRXMAEAii5aj7seb7BAukO4uVzvULdCpJkLMdvnEAZEC4AvAB1bZyCZC+X+i0wqnevp1KEmw1Z9BBb1QeXPb0eQC+oPzNJYmM+Ns6H+3m7FQS6Gi+cgB2wDBA+soVR37cyQFGkqktEgA/kd7S1SaPSht7D//3OOpIpR8DmOmU87f13wA7fF1mDNqJrQAAAABJRU5ErkJggg=="
                try {
                    tinymce.init({
                        selector: 'textarea',
                        height: 300,
                        plugins: [
                            'advlist autolink lists link charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table contextmenu paste code'
                        ],
                        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                        content_css: [
                            '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
                            '//www.tinymce.com/css/codepen.min.css'
                        ]
                    });
                } catch (error) {
//                    alert('no');
                }



                $scope.CertificateDelete = function() {
                    var id = $scope.DeleteId;
                    $http.get(baseURL + "/doc_panel/usercertificatedelete/" + id).then(function successCallback(response) {
                        NotifyCation("مدارک", 'اطلاعات با موفقیت حذف شد', "success", true);
                        $('#' + id).slideUp();
                        $('#CloseDeleteBtn').click();
                    }, function errorCallback(response) {
                        NotifyCation("مدارک", 'مشکل در حذف اطلاعات با پشتیبانی تماس بگیرید', "error", true);
                    });
                    ;

                };
                $scope.AddCertificate = function() {
                    var file = $scope.FileInfo;

                    var spli = file.split(';');
                    if (spli[0] != 'data:application/pdf' && spli[0] != 'data:image/jpeg' && spli[0] != 'data:image/png') {
                        NotifyCation("مدارک", 'فرمت فایل قابل قبول نیست. فرمت های مجاز pdf و png  وjpeg می باشد', "error", true);
                    } else {
                        var data = {
                            'expiryDate': $('#expired').val(), //$scope.expired,
                            'DateOfRegistration': $('#started').val(), // $scope.started,
                            'certificate': tinyMCE.activeEditor.getContent(),
                            'photo': $scope.FileInfo
                        };
                        $http({
                            method: 'POST',
                            url: baseURL + '/doc_panel/usercertificateadd',
                            data: data
                        }).success(function(response) {
                            NotifyCation("مدارک", 'اطلاعات با موفقیت ثبت شد', "success", true);
                            $http.get(baseURL + "/doc_panel/usercertificate").success(function(response) {
                                if (response === 'Not Info') {
                                    NotifyCation("مدارک", 'اطلاعاتی برای نمایش وجود ندارد', "error", true);
                                } else {
                                    for (var i = 0; i < response.LengthCertificate; i++) {
                                        var data = response.certificate[i]['photo'].split(';');
                                        if (data[0] == 'data:application/pdf') {
                                            response.certificate[i].pdf = response.certificate[i]['photo'];
                                        } else {
                                            response.certificate[i].photo = response.certificate[i]['photo'];
                                        }
                                    }
                                    $scope.certificate = response.certificate;
                                }

                            });
                        });
                    }
                };



            }])
        .controller('UserTime', ['$http', '$rootScope', '$scope', '$window', '$routeParams', function($http, $rootScope, $scope, $window, $routeParams) {
                var date = [];
                var index;
                $http.get(baseURL + "/doc_panel/usertime").then(function successCallback(response) {
//                    console.log(response);
//                    console.log(response.data);
                    if (response.data != 'Not Info') {
                        date = response.data;
                        index = 0;
                        Time(date, index);
                        $scope.data = response.data;
                    }
                }, function errorCallback(response) {
                    NotifyCation("زمانبندی حضور", 'مشکل در برقراری ارتباط با پشتیبانی تماس بگیرید', "error", true);
                });

                $scope.TimeNext = function(data) {
                    if (index == 52) {
                        NotifyCation("زمانبندی حضور", 'این آخر تاریخ ها می باشد', "error", true);
                    } else {
                        index = index + 1;
                        Time(data, index);
                    }
                };

                $scope.TimeBefor = function(data) {
                    if (index == 0) {
                        NotifyCation("زمانبندی حضور", 'این اول تاریخ ها می باشد', "error", true);
                    } else {
                        index = index - 1;
                        Time(data, index);
                    }
                };

                $scope.TimeMonth = function() {
                    var month = $scope.timemonth;
                    if (month != 'defualt') {
                        index = parseInt(month);
                        Time(date, month);
                    }
                };

                function Time(date, index) {
                    $scope.MaxWeek = 52 - index;
                    var timeMorning, timeAfter, day, ele, ele1, ele2;
                    $scope.Id = date[index]['Id'];
                    $scope.StartDate = date[index]['started'][2] + '-' + date[index]['started'][1] + '-' + date[index]['started'][0];
                    $scope.day = date[index]['started'][2];
                    $scope.month = date[index]['started'][1];
                    $scope.year = date[index]['started'][0];
                    try {
                        var dayExpired = date[parseInt(index) + 1]['started'][2] - 1;
                        $scope.ExpiredDate = dayExpired + '-' + date[parseInt(index) + 1]['started'][1] + '-' + date[parseInt(index) + 1]['started'][0];
                    } catch (error) {
                        $scope.ExpiredDate = "New Year";
                    }
                    var days = ['One', 'Tow', 'Three', 'Four', 'Five', 'Six', 'Seven'];
                    for (var i = 0; i < 7; i++) {
                        ele = date[index][days[i]].split(';');
                        day = ele[0];
                        if (day != 'false') {
                            if (days[i] == 'One') {
//                                alert('one');
                                $scope.OneTrue = true;
                                $scope.OneFalse = false;
                            } else if (days[i] == 'Tow') {
//                                alert('tow');
                                $scope.TowTrue = true;
                                $scope.TowFalse = false;
                            }
                            else if (days[i] == 'Three') {
//                                alert('three');
                                $scope.ThreeTrue = true;
                                $scope.ThreeFalse = false;
                            }
                            else if (days[i] == 'Four') {
//                                alert('four');
                                $scope.FourTrue = true;
                                $scope.FourFalse = false;
                            }
                            else if (days[i] == 'Five')
                            {
//                                alert('five');
                                $scope.FiveTrue = true;
                                $scope.FiveFalse = false;
                            }
                            else if (days[i] == 'Six') {
//                                alert('six');
                                $scope.SixTrue = true;
                                $scope.SixFalse = false;
                            }
                            else if (days[i] == 'Seven') {
//                                alert('seven');
                                $scope.SevenTrue = true;
                                $scope.SevenFalse = false;
                            }
                            ele1 = ele[1];
                            ele2 = ele1.split('|');
                            timeMorning = ele2[0].split('-');
                            timeAfter = ele2[1].split('-');

                            timeMorning[0] = timeMorning[0].split(':');
                            if (timeMorning[0][1] != undefined) {
                                if (timeMorning[0][0].length == 1) {
                                    timeMorning[0][0] = '0' + String(timeMorning[0][0]);
                                }
                                timeMorning[0] = timeMorning[0][0] + ':' + timeMorning[0][1];
                            } else {
                                if (timeMorning[0][0].length == 1) {
                                    timeMorning[0] = '0' + String(timeMorning[0]);
                                }
                                timeMorning[0] = timeMorning[0] + ':00';
                            }

                            timeMorning[1] = timeMorning[1].split(':');
                            if (timeMorning[1][1] != undefined) {
                                if (timeMorning[1][0].length == 1) {
                                    timeMorning[1][0] = '0' + String(timeMorning[1][0]);
                                }
                                timeMorning[1] = timeMorning[1][0] + ':' + timeMorning[1][1];
                            } else {
                                if (timeMorning[1][0].length == 1) {
                                    timeMorning[1] = '0' + String(timeMorning[1]);
                                }
                                timeMorning[1] = timeMorning[1] + ':00';
                            }

                            timeAfter[0] = timeAfter[0].split(':');
                            if (timeAfter[0][1] != undefined) {
                                timeAfter[0] = timeAfter[0][0] + ':' + timeAfter[0][1];
                            } else {
                                timeAfter[0] = timeAfter[0] + ':00';
                            }

                            timeAfter[1] = timeAfter[1].split(':');
                            if (timeAfter[1][1] != undefined) {
                                timeAfter[1] = timeAfter[1][0] + ':' + timeAfter[1][1];
                            } else {
                                timeAfter[1] = timeAfter[1] + ':00';
                            }
                            $('#' + days[i] + 'MorningLow').val(timeMorning[0]);
                            $('#' + days[i] + 'MorningHigh').val(timeMorning[1]);
                            $('#' + days[i] + 'AfterLow').val(timeAfter[0]);
                            $('#' + days[i] + 'AfterHigh').val(timeAfter[1]);
                        } else {
//                        console.log('This Is False : '+ele[1]);
                            if (days[i] == 'One') {
                                $scope.OneTrue = false;
                                $scope.OneFalse = true;
                            } else if (days[i] == 'Tow') {
                                $scope.TowTrue = false;
                                $scope.TowFalse = true;
                            }
                            else if (days[i] == 'Three') {
                                $scope.ThreeTrue = false;
                                $scope.ThreeFalse = true;
                            }
                            else if (days[i] == 'Four') {
                                $scope.FourTrue = false;
                                $scope.FourFalse = true;
                            }
                            else if (days[i] == 'Five') {
                                $scope.FiveTrue = false;
                                $scope.FiveFalse = true;
                            }
                            else if (days[i] == 'Six') {
                                $scope.SixTrue = false;
                                $scope.SixFalse = true;
                            }
                            else if (days[i] == 'Seven') {
                                $scope.SevenTrue = false;
                                $scope.SevenFalse = true;
                            }
                            $('#' + days[i] + 'MorningLow').val('08:00');
                            $('#' + days[i] + 'MorningHigh').val('12:00');
                            $('#' + days[i] + 'AfterLow').val('14:00');
                            $('#' + days[i] + 'AfterHigh').val('18:00');
                        }
                    }
                }


                $scope.submitTime = function() {
                    var Id;
                    var error = 'ساعت شروع نمی تواند از ساعت پایان بزرگ تر باشد ';
                    Id = $scope.Id;
                    var data = {
                        "One": null,
                        "Tow": null,
                        "Three": null,
                        "Four": null,
                        "Five": null,
                        "Six": null,
                        "Seven": null,
                        "CountWeek":null,
                        "id": Id
                    };
                    
                    var i = 0;
                    var days = ['One', 'Tow', 'Three', 'Four', 'Five', 'Six', 'Seven'];
                    var DayMorningLow, DayMorningHigh, DayAfterLow, DayAfterHigh;
                    for (var j = 0; j < 7; j++) {
                        if (parseFloat($('#' + days[j] + 'MorningLow').val()) > parseFloat($('#' + days[j] + 'MorningHigh').val()) || parseFloat($('#' + days[j] + 'AfterLow').val()) > parseFloat($('#' + days[j] + 'AfterHigh').val())) {
//                        alert('One ' +$('#OneMorningLow').val() +'   '+$('#OneMorningHigh').val()+'    '+$('#OneAfterLow').val() + '     '+$('#OneAfterHigh').val());
                            $('#' + days[j] + 'MorningLow').addClass('AlertRed');
                            $('#' + days[j] + 'MorningHigh').addClass('AlertRed');
                            $('#' + days[j] + 'AfterLow').addClass('AlertRed');
                            $('#' + days[j] + 'AfterHigh').addClass('AlertRed');
                            setTimeout(function() {
                                $('#' + days[j] + 'MorningLow').removeClass('AlertRed');
                            }, 8000);

                            setTimeout(function() {
                                $('#' + days[j] + 'MorningHigh').removeClass('AlertRed');
                            }, 8000);
                            setTimeout(function() {
                                $('#' + days[j] + 'AfterLow').removeClass('AlertRed');
                            }, 8000);
                            setTimeout(function() {
                                $('#' + days[j] + 'AfterHigh').removeClass('AlertRed');
                            }, 8000);

                            NotifyCation("زمانبندی حضور", error, "error", true);
                            i++;
                            break;
                        } else {
                            if ($('.' + days[j] + 'True').is(':checked') == true) {

                                DayMorningLow = $('#' + days[j] + 'MorningLow').val();
                                DayMorningLow = DayMorningLow.split(':');
                                if (DayMorningLow[0] > 12) {
                                    $('#' + days[j] + 'MorningLow').addClass('AlertRed');
                                    setTimeout(function() {
                                        $('#' + days[j] + 'MorningLow').removeClass('AlertRed');
                                    }, 8000);
                                    NotifyCation("زمانبندی حضور", "زمان شروع نمی تواند از ۱۲ بیشتر باشد", "error", true);
                                    i++;
                                    break;
                                } else if (DayMorningLow[1] > 59) {
                                    $('#' + days[j] + 'MorningLow').addClass('AlertRed');
                                    setTimeout(function() {
                                        $('#' + days[j] + 'MorningLow').removeClass('AlertRed');
                                    }, 8000);
                                    NotifyCation("زمانبندی حضور", "حداکثر ۵۹ دقیقه می تواند باشد", "error", true);
                                    i++;
                                    break;
                                } else {
                                    DayMorningLow = DayMorningLow[0] + ":" + DayMorningLow[1];
                                }

                                DayMorningHigh = $('#' + days[j] + 'MorningHigh').val();
                                DayMorningHigh = DayMorningHigh.split(':');
                                if (DayMorningHigh[0] > 12) {
                                    $('#' + days[j] + 'MorningHigh').addClass('AlertRed');
                                    setTimeout(function() {
                                        $('#' + days[j] + 'MorningHigh').removeClass('AlertRed');
                                    }, 8000);
                                    NotifyCation("زمانبندی حضور", "زمان شروع نمی تواند از ۱۲ بیشتر باشد", "error", true);
                                    i++;
                                    break;
                                } else if (DayMorningHigh[1] > 59) {
                                    $('#' + days[j] + 'MorningHigh').addClass('AlertRed');
                                    setTimeout(function() {
                                        $('#' + days[j] + 'MorningHigh').removeClass('AlertRed');
                                    }, 8000);
                                    NotifyCation("زمانبندی حضور", "حداکثر ۵۹ دقیقه می تواند باشد", "error", true);
                                    i++;
                                    break;
                                } else {
                                    DayMorningHigh = DayMorningHigh[0] + ":" + DayMorningHigh[1];
                                }

                                DayAfterLow = $('#' + days[j] + 'AfterLow').val();
                                DayAfterLow = DayAfterLow.split(':');
                                if (DayAfterLow[0] > 24) {
                                    $('#' + days[j] + 'AfterLow').addClass('AlertRed');
                                    setTimeout(function() {
                                        $('#' + days[j] + 'AfterLow').removeClass('AlertRed');
                                    }, 8000);
                                    NotifyCation("زمانبندی حضور", "زمان شروع نمی تواند از 24 بیشتر باشد", "error", true);
                                    i++;
                                    break;
                                } else if (DayAfterLow[1] > 59) {
                                    $('#' + days[j] + 'AfterLow').addClass('AlertRed');
                                    setTimeout(function() {
                                        $('#' + days[j] + 'AfterLow').removeClass('AlertRed');
                                    }, 8000);
                                    NotifyCation("زمانبندی حضور", "حداکثر ۵۹ دقیقه می تواند باشد", "error", true);
                                     i++;
                                    break;
                                } else {
                                    DayAfterLow = DayAfterLow[0] + ":" + DayAfterLow[1];
                                }

                                DayAfterHigh = $('#' + days[j] + 'AfterHigh').val();
                                DayAfterHigh = DayAfterHigh.split(':');
                                if (DayAfterHigh[0] > 24) {
                                    $('#' + days[j] + 'AfterHigh').addClass('AlertRed');
                                    setTimeout(function() {
                                        $('#' + days[j] + 'AfterHigh').removeClass('AlertRed');
                                    }, 8000);
                                    NotifyCation("زمانبندی حضور", "زمان شروع نمی تواند از 24 بیشتر باشد", "error", true);
                                    i++;
                                    break;
                                } else if (DayAfterHigh[1] > 59) {
                                    $('#' + days[j] + 'AfterHigh').addClass('AlertRed');
                                    setTimeout(function() {
                                        $('#' + days[j] + 'AfterHigh').removeClass('AlertRed');
                                    }, 8000);
                                    NotifyCation("زمانبندی حضور", "حداکثر ۵۹ دقیقه می تواند باشد", "error", true);
                                     i++;
                                    break;
                                } else {
                                    DayAfterHigh = DayAfterHigh[0] + ":" + DayAfterHigh[1];
                                }
//                                alert('ok this is true '+days[j]);
                                data[days[j]] = 'true;' + $('#' + days[j] + 'MorningLow').val() + '-' + $('#' + days[j] + 'MorningHigh').val() +
                                        '|' + $('#' + days[j] + 'AfterLow').val() + '-' + $('#' + days[j] + 'AfterHigh').val();
                            } else {
//                                alert('ok this is false ' + days[j]);
                                data[days[j]] = 'false;-:-';
                            }
                        }
                    }
//                    alert('one is : '+One);
//                    alert('tow is : '+Tow);
//                    alert('three is : '+Three);
//                    alert('Four is : '+Four);
//                    alert('Five is : '+Five);
//                    alert('Six  is : '+Six);
//                    alert('seven is : '+Seven);
                    if (i == 0) {
                        var CW = $('#CountWeek').val();
                        if(CW == ''){
                            CW=0;
                        }
                        data['CountWeek'] = CW;
                        console.log(data);
                        $http({
                            method: 'POST',
                            url: baseURL + '/doc_panel/usertimeedit/' + Id,
                            data: data
                        }).success(function(response) {
                            var msg=response.split(";");
                            NotifyCation(msg[0],msg[1],msg[2],msg[3]);
                        });
                    } else {
                        i = 0;
                    }


                };


            }])
        .controller('UserReserve', ['$http', '$rootScope', '$scope', '$window', '$routeParams', function($http, $rootScope, $scope, $window, $routeParams) {
                $scope.SubmitEnable = function() {
                    var id, enable, time;
                    id = $scope.EditId;
                    enable = $scope.EditEnableSend;
                    time = $scope.EditTime;
//                    alert('Time is : ' + time + " enable is : " + enable + " \n\
//                    id is : " + id);
                    if (time != "") {
                        var spli = time.split(":");
                    }
                    if (time == "" && enable == 'true') {
                        NotifyCation("رزرواسیون", 'زمان حضور نمی تواند خالی باشد', "error", true);
                    } else if (time == "" && enable == undefined) {
                        NotifyCation("رزرواسیون", 'لطفا اطلاعات را کامل کنید', "error", true);
                    } else if (parseInt(spli[0]) > 24 || parseInt(spli[1]) > 59) {
                        NotifyCation("رزرواسیون", 'زمان وارد شده صحیح نمی باشد', "error", true);
                    } else {
                        $http({
                            method: 'POST',
                            url: baseURL + '/doc_panel/usertimereserveenable/' + id,
                            data: {
                                "enable": enable,
                                "time": time
                            }
                        }).success(function(response) {
                            $http.get(baseURL + "/doc_panel/usertimereserve").then(function successCallback(response) {
                                if (response.data == 'Not Info') {
                                    NotifyCation("رزرواسیون", "اطلاعاتی جهت نمایش وجود ندارد", "warning", true);
                                } else {
                                    $scope.reserve = response.data.reserve;
                                }
                            });

                            var msg = response.split(':');
                            if (msg[2] !== 'error') {
                                $('.EditTime').modal('hide');
                            }
                            NotifyCation(msg[0], msg[1], msg[2], msg[3]);
                        });
                    }


                };
                $scope.Edit = function(data) {
                    $scope.EditEnable = data.active;
                    $scope.EditId = data.ticketid;
                    $scope.EditTime = data.fieldtime;
                    $('.EditTimeManual').val(data.fieldtime);
                    $('.EditTime').modal();
                }

                $scope.Show = function(data) {
                    $scope.username = data.username;
                    $scope.phone = data.phone;
                    $scope.mobile = data.mobile;
                    $scope.animalename = data.animalename;
                    $scope.animaleage = data.animaleage;
                    $scope.animalesex = data.animalesex;
                    $scope.animalecode = data.animalecode;
                    $scope.ticketnumber = data.ticketnumber;
//                    var day = data['fieldtime'].split(';');
//                    var spelday;
//                    if(day[0] == 'one'){
//                        day[0]='شنبه';
//                    }
//                    if(day[0]== 'tow'){
//                        day[0]='یکشنبه';
//                    }
//                    if(day[0]== 'three'){
//                        day[0]='دوشنبه';
//                    }
//                    if(day[0]== 'tow'){
//                        day[0]='سه شنبه';
//                    }
//                    if(day[0]== 'tow'){
//                        day[0]='چهارشنبه';
//                    }
//                    if(day[0]== 'tow'){
//                        day[0]='پنج شنبه';
//                    }
//                    if(day[0]== 'tow'){
//                        day[0]='جمعه';
//                    }

//                    $scope.field = day[0];
//                    $scope.time = day[1];
                    $scope.desc = data.desc;
                    $scope.date = data.date;
                    $('.bs-example-modal-lg').modal();
                };

                $http.get(baseURL + "/doc_panel/usertimereserve").then(function successCallback(response) {
                    if (response.data == 'Not Info') {
                        NotifyCation("نمایش اطلاعات", "اطلاعاتی جهت نمایش وجود ندارد", "warning", true);
                    } else {
                        $scope.reserve = response.data.reserve;
                    }
                }, function errorCallback(response) {
                    NotifyCation("نمایش اطلاعات", "مشکل در برقراری ارتباط با سرور با پشتیبانی تماس بگیرید", "error", true);
                });

            }]);



///-----------------------------------------------------------------------------------------
///----------------------------------filter-------------------------------------------------
///-----------------------------------------------------------------------------------------
angular.module('myApp.filters', []);
angular.module('ng').filter('ConvertedToDateShamsi', function() {
    return function(dateString) {
        if (dateString != null)
        {
            return moment(dateString, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
        } else {
            return "تاریخ ندارد";
        }
    };
}
);

function NotifyCation(title, text, type, hide) {
    new PNotify({
        title: title,
        text: text,
        type: type,
        hide: hide,
        nonblock: {
            nonblock: true
        },
        before_close: function(PNotify) {
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

function TimeOut(input) {
    var count = input.length;
    setTimeout(function() {
        for (var t = 0; t < count; t++) {
            $(input[t]).css("border-color", "#E96152");
        }
    }, 3000);
}