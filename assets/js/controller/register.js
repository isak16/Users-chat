app.run(function($rootScope, $sessionStorage) {
    $rootScope.users = [];
    $rootScope.lightTheme = false;
    $rootScope.users = [];
    $rootScope.$storage = $sessionStorage.$default({loggedIn: false});
});

app.controller('register', function($scope, api, $sessionStorage){
    $scope.$storage = $sessionStorage;
    var user = {};
    $scope.register = function(userReg){
            delete userReg.confirmPassword;
            api.users.add(userReg).then(function (response) {
                if (response.data.hasOwnProperty("_id")) {
                    $scope.$storage.user = response.data;
                    $scope.$storage.loggedIn = true;
                } else {
                    console.log(response.data);
                }
            });
    };

    $scope.login = function(userLogin){
        api.users.login(userLogin).then(function(response) {
            console.log(response);
            if (response.data.hasOwnProperty("_id")) {
                $scope.$storage.user = response.data;
                $scope.$storage.loggedIn = true;
            }
            console.log($scope.$storage);
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
