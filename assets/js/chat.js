app.controller('chatSection' , function($scope) {
    $scope.testChat = [
        {author:'you', image: 'assets/img/you.jpg',status: 'online', message:'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'other', image: 'assets/img/other.jpg',status: 'offline', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'other', image: 'assets/img/other.jpg',status: 'offline', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/you.jpg',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/you.jpg',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/you.jpg',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/you.jpg',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/you.jpg',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/you.jpg',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/you.jpg',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/you.jpg',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/you.jpg',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/you.jpg',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/you.jpg',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/you.jpg',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/you.jpg',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/you.jpg',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/you.jpg',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'}
    ];
    $scope.send = function(a){
        var content = {
            author:'you',
            image: 'assets/img/you.jpg',
            status: 'online',
            message: a
        };
        $scope.testChat.push(content);
        $scope.content.message = '';
    }
});

app.controller('newsSection' , function($scope) {
    $scope.fakeNews = [
        {author: 'Bill Gates',status: 'online', excerpt: 'Im going to destroy you',time: '16:30',image: 'assets/img/other.jpg'},
        {author: 'Bill Gates',status: 'online', excerpt: 'Im going to destroy them',time: '16.29',image: 'assets/img/other.jpg'},
        {author: 'Bill Gates',status: 'online', excerpt: 'Im going to destroy her', time: '16:28',image: 'assets/img/other.jpg'},
        {author: 'Bill Gates',status: 'online', excerpt: 'Im going to destroy him', time: '16:27',image: 'assets/img/other.jpg'},
        {author: 'Bill Gates',status: 'online', excerpt: 'Im going to destroy this', time: '16:26',image: 'assets/img/other.jpg'},
        {author: 'Bill Gates',status: 'online', excerpt: 'Im going to destroy that', time: '16:25',image: 'assets/img/other.jpg'},
        {author: 'Bill Gates',status: 'online', excerpt: 'Im going to destroy shit', time: '16:24',image: 'assets/img/other.jpg'},
        {author: 'Bill Gates',status: 'online', excerpt: 'Im going to destroy rofl', time: '16:23',image: 'assets/img/other.jpg'}
    ];
});




app.directive('autoResize', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, controller) {
            scope.$watch('content.message', function(newValue) {
                if (newValue == null || newValue == "") {
                    element[0].style.height = "40px";
                } else {
                    element[0].style.height = 'auto';
                    element[0].style.height = element[0].scrollHeight + "px";
                }
            });
        }
    }
});

app.directive('scrollDown', function($timeout, $window) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.$watchCollection(attr.scrollDown, function(newVal) {
                console.log("hej");
                $timeout(function() {
                    element[0].scrollTo(0, element[0].scrollHeight);
                }, 0);
            });
        }
    }
});
