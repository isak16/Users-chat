var app = angular.module('app', ['ui.router'] );
app.run(function($rootScope) {
    $rootScope.users = [];
});

app.controller('register', function($scope, api, users){
    var user = {};
    $scope.register = function(userReg){
        api.users('add', userReg);

    };
    $scope.login = function(userLogin){

    };
    $scope.userRegex = '/^[a-z0-9]{1,}$/';
});

var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};

app.directive("compareTo", compareTo);
