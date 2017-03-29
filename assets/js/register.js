app.controller('register', function($scope, $rootScope){
    $scope.register = function(user){
         $scope.users.push(user);
         $scope.user = {};
    }
});
