app.run(function($rootScope, $sessionStorage) {
    $rootScope.users = [];
    $rootScope.lightTheme = false;
    $rootScope.users = [];
    $rootScope.$storage = $sessionStorage.$default({loggedIn: false});
});

app.controller('register', function($scope, api, $sessionStorage){
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
            if (response.data.hasOwnProperty("_id")) {
                $sessionStorage.user = response.data;
                $sessionStorage.loggedIn = true;
            }
        });
    };
    //$scope.userRegex = /^[a-zA-Z0-9]{1,}$/.test($scope.registerForm.username);
    $scope.loguser = function(){
        console.log($scope.registerForm.username.value)
    };

});

app.controller('startPage', function($scope, $sessionStorage){
    $scope.$storage = $sessionStorage;
});
