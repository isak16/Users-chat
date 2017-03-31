app.directive("regexp" , function() {
    return {
        restrict: 'A',
        link: function(scope, controller) {
            scope.$watch('userReg.userName', function(newValue) {
                if (newValue == null) {
                    scope.validator.username = true;
                } else {
                    if (/^[a-zA-Z0-9]{1,}$/.test(newValue)) {
                        scope.validator.username = true;
                    } else {
                        scope.validator.username = false;
                    }
                }
            });
        }
    }
});

app.directive('autoResize', function($window) {
    return {
        restrict: 'A',
        link: function(scope, element, controller) {
            scope.$watch('content.message', function(newValue) {
                var msg = element[0].children[1];
                var textarea = element[0].children[2].children[0].children[0].children[0];
                if (newValue == null || newValue == "") {
                    msg.style.height = "calc(100% - 181px)";
                    textarea.style.height = "54px";
                } else {
                    textarea.style.height = 'auto';
                    textarea.style.height = textarea.scrollHeight + "px";
                    var newHeight = $window.innerHeight - 129 - textarea.clientHeight;
                    msg.style.height = newHeight + "px";
                }
            });
        }
    }
});

app.directive('scrollDown', function($timeout, $window) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.$watchCollection(attr.scrollDown, function(newVal) {
                $timeout(function() {
                    element[0].scrollTop = element[0].scrollHeight;
                }, 0);
            });
        }
    }
});

app.directive('enterSubmit', function () {
    return {
        restrict : 'A',
        link: function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {

                if(event.which === 13 && !event.shiftKey) {
                    scope.$apply(function (){
                    scope.$eval(attrs.enterSubmit);
                });

                event.preventDefault();
            }
        });
    }};
});
