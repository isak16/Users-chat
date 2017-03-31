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
