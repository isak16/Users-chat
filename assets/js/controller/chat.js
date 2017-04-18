app.controller('chatSection' , function($scope, api, $state, $stateParams, $interval) {
    api.conversations.get($stateParams.chatId).then(function(response) {
        $scope.loadedChat = response.data;
    });
    $interval(function() {
        api.conversations.get($stateParams.chatId).then(function(response) {
            $scope.loadedChat = response.data;
        });
    }, 1000);

    $scope.send = function(a){
        if (a == null || a == "") {
            return false;
        }
        api.conversations.message($stateParams.chatId, a).then(function(response) {
            $scope.loadedChat = response.data;
            console.log($scope.loadedChat);
        });
        $scope.content.message = '';
    };

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
