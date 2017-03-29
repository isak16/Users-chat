app.run(function($rootScope) {
$rootScope.lightTheme = false;
$rootScope.users = [];
});

app.controller('settingsProfile' , function ($scope, $document) {
    $scope.imgSrc = 'assets/img/jobs.png';
    $scope.showName = 'Visningsnamn';
    $scope.userName = 'Username';
    $scope.yourEmail = 'namn.efternamn@exempel.com';
    $scope.yourInfo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada, est vitae commodo dapibus, ipsum velit euismod nibh, sit amet efficitur justo est ac augue.';
    console.log($scope.lightTheme);
    $scope.test = function () {


    };
});
/*
app.directive( 'bodyClass', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, attrs, element, controller) {
            scope.$watch('lightTheme', function(newValue){
                console.log(newValue);
                if (newValue == true) {
                    angular.element('body').addClass('light');


                } else {
                    angular.element('body').removeClass('light');
                }
            });
        }
    }
});
*/
