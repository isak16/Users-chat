var app = angular.module('app', ['ui.router'] );
app.run(function($rootScope) {
    $rootScope.users = [];
});

app.controller('register', function($scope){
    var user = {};
    $scope.register = function(user){
        console.log('hej');
        console.log(user);
    };
});
