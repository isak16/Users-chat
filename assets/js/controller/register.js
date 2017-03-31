var app = angular.module('app', ['ui.router'] );
app.run(function($rootScope) {
    $rootScope.users = [];
});

app.controller('register', function($scope, api){
    var user = {};
    $scope.register = function(userReg){
        api.users('add', userReg);

    };

    $scope.login = function(userLogin){

    };
    //$scope.userRegex = /^[a-zA-Z0-9]{1,}$/.test($scope.registerForm.username);
    $scope.loguser = function(){
        console.log($scope.registerForm.username.value)
    };

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

app.directive("regexp" , function() {
    return {
        require: "ngModel",
        link: function(scope , ngModel) {
            scope.$watch( ngModel, function(newValue) {
                if ( newValue == null ) {
                    return true;
                }
                else {
                   console.log(/^[a-zA-Z0-9]{1,}$/.test(newValue));
                }
            } );
        }
    }
});
