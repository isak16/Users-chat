app.controller('chatSection' , function($scope, api,$sessionStorage, $state, $stateParams, $interval) {
    $scope.$storage = $sessionStorage;
    $scope.finder = [];
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

     $scope.removeUserFromChat = function(userid) {
        api.conversations.manage($scope.loadedChat._id, "remove", {_id: userid}).then(function(response) {
            $scope.loadedChat = response.data;
        })
    };

    $scope.addUserToChat = function(n) {
        api.conversations.manage($scope.loadedChat._id, "add", {_id: n._id}).then(function(response) {
            $scope.loadedChat = response.data;
            $scope.finder = [];
            $scope.tempMember = null;
        })
    };

    $scope.updateConversation = function() {
        var updateObject = {
            avatar: $scope.loadedChat.avatar,
            display_name: $scope.loadedChat.display_name
        };

        api.conversations.update($scope.loadedChat._id, updateObject).then(function(response) {
            $scope.loadedChat.avatar = response.data.avatar;
            $scope.loadedChat.display_name = response.data.display_name;
        });
    };

    $scope.checkMember = function() {
        if ($scope.tempMember == null || $scope.tempMember == "") {
            $scope.finder = [];
        } else {
            api.sidebar.search($scope.tempMember).then(function(response) {
                $scope.finder = response.data;
            });
        }
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
