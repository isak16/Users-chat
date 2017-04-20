app.controller('settingsProfile' , function ($scope, $document, $sessionStorage, api) {
    $scope.$storage = $sessionStorage;

    $scope.resetSettings = function() {
        api.users.get($scope.$storage.user._id).then(function(response){
            $scope.$storage.user = response.data;
        });
    }

    $scope.updateSettings = function() {
        api.users.update().then(function(response) {
            $scope.$storage.user = response.data;
        });
    }
});
