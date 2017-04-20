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

app.controller('newsSection' , function($scope, api) {
    api.sidebar.get().then(function (response) {
        $scope.messageHistory = response.data.entries;
    });
});