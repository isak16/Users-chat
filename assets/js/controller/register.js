app.run(function($rootScope) {
    $rootScope.users = [];
});

app.controller('register', function($scope, api){
    var user = {};
    $scope.validator = {};
    $scope.register = function(userReg){
        api.users('add', userReg);
    $scope.regexpuser = /^[a-zA-Z0-9\_\-]{1,12}$/;

    };

    $scope.login = function(userLogin){
        console.log("hej");
    };
    //$scope.userRegex = /^[a-zA-Z0-9]{1,}$/.test($scope.registerForm.username);
    $scope.loguser = function(){
        console.log($scope.registerForm.username.value)
    };

});

