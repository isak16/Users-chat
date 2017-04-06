app.run(function($rootScope) {
    $rootScope.users = [];
    $rootScope.lightTheme = false;
    $rootScope.users = [];
});

app.controller('register', function($scope, api){
    var user = {};
    $scope.register = function(userReg){

            delete userReg.confirmPassword;
            api.users.add(userReg).then(function (response) {
                console.log("added user: " + response);
            });

    };

    $scope.login = function(userLogin){
        api.users.login(userLogin).then(function(response) {
            console.log(response);
        });
    };
    //$scope.userRegex = /^[a-zA-Z0-9]{1,}$/.test($scope.registerForm.username);
    $scope.loguser = function(){
        console.log($scope.registerForm.username.value)
    };

});

app.controller('startPage', function($scope){
   $scope.loggedIn = true;
});
