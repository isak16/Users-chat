var app = angular.module('app', ['ui.router', 'ngStorage'] );


app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("feed");

    $stateProvider
        .state('feed', {
            name: 'feed',
            controller: 'newsSection',
            templateUrl: 'partials/news-section.html',
            url: '/feed'
        })
        .state('chat', {
            name: 'chat',
            controller: 'chatSection',
            templateUrl: 'partials/Chat-section.html',
            url: '/chat/:chatId'
        })
        .state('settingsProfile', {
            name: 'settingsProfile',
            controller: 'settingsProfile',
            templateUrl: 'partials/profile-section.html',
            url: '/settingsProfile'
        })
}]);

app.directive("regexp" , function() {
    return {
        require: "ngModel",
        link: function(scope , ngModel) {
            scope.$watch( ngModel, function(newValue) {
                if ( newValue == null ) {
                    return true;
                }
                else {
                   console.log(/^[a-zA-Z0-9]{1,}$/.test(newValue));
                }
            } );
        }
    }
});

app.directive('autoResize', ["$window", function($window) {
    return {
        restrict: 'A',
        link: function(scope, element, controller) {
            scope.$watch('content.message', function(newValue) {
                var msg = element[0].children[1];
                var textarea = element[0].children[2].children[0].children[0].children[0];
                if (newValue == null || newValue == "") {
                    msg.style.height = "calc(100% - 181px)";
                    textarea.style.height = "54px";
                } else {
                    textarea.style.height = 'auto';
                    textarea.style.height = textarea.scrollHeight + "px";
                    var newHeight = $window.innerHeight - 129 - textarea.clientHeight;
                    msg.style.height = newHeight + "px";
                }
            });
        }
    }
}]);

app.directive('scrollDown', ["$timeout", "$window", function($timeout, $window) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.$watchCollection(attr.scrollDown, function(newVal) {
                $timeout(function() {
                    element[0].scrollTop = element[0].scrollHeight;
                }, 0);
            });
        }
    }
}]);

app.directive('enterSubmit', function () {
    return {
        restrict : 'A',
        link: function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {

                if(event.which === 13 && !event.shiftKey) {
                    scope.$apply(function (){
                    scope.$eval(attrs.enterSubmit);
                });

                event.preventDefault();
            }
        });
    }};
});

app.controller('chatSection' , ["$scope", "api", "$sessionStorage", "$state", "$stateParams", "$interval", function($scope, api,$sessionStorage, $state, $stateParams, $interval) {
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
}]);

app.controller('newsSection' , ["$scope", "$sessionStorage", "api", function($scope,$sessionStorage, api) {
    $scope.$storage = $sessionStorage;
    api.sidebar.get().then(function (response) {
        $scope.messageHistory = response.data.entries;
    });
}]);

app.controller('settingsProfile' , ["$scope", "$document", "$sessionStorage", "api", function ($scope, $document, $sessionStorage, api) {
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
}]);

app.run(["$rootScope", "$sessionStorage", function($rootScope, $sessionStorage) {
    $rootScope.$storage = $sessionStorage.$default(
        {
            loggedIn: false,
            user: {
                lightTheme: false
            }
        });
}]);

app.controller('register', ["$scope", "api", "$sessionStorage", function($scope, api, $sessionStorage){
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
        }, function(response){
            if (response.status === 401) {
               $scope.unAuthorized = response.data;
           }
        });
    };
    //$scope.userRegex = /^[a-zA-Z0-9]{1,}$/.test($scope.registerForm.username);
    $scope.loguser = function(){
        console.log($scope.registerForm.username.value)
    };

}]);

app.controller('startPage', ["$scope", "$sessionStorage", function($scope, $sessionStorage){
    $scope.$storage = $sessionStorage;
}]);

app.controller('newsSidebar', ["$scope", "api", "$sessionStorage", function ($scope, api, $sessionStorage) {
    $scope.$storage = $sessionStorage;
    $scope.sideFeed = null;
    api.sidebar.get().then(function (response) {
        $scope.sidebar = response.data.entries;
        $scope.sideFeed = $scope.sidebar;
    });

    $scope.logOut = function() {
        delete $scope.$storage.user;
        $scope.$storage.loggedIn = false;
    }

    // search
    $scope.searchquery = null;
    $scope.searchUser = function(query) {
        if (query == null || query == "") {
            $scope.sideFeed = $scope.sidebar;
        } else {
            api.sidebar.search(query).then(function(response) {
                $scope.sideFeed = response.data;
            });
        }
    }
}]);

app.controller('conversationController', ["$scope", "api", "$sessionStorage", function($scope, api, $sessionStorage) {
    $scope.$storage = $sessionStorage;
    $scope.finder = [];
    // controller for the modal where you add new converastions
    // new conversation modal
    $scope.conv = {
        display_name: null,
        members: [],
        tempmembers: [],
        avatar: null
    };

    // typahead search function
    $scope.checkMember = function() {
        if ($scope.tempMember == null || $scope.tempMember == "") {
            $scope.finder = [];
        } else {
            api.sidebar.search($scope.tempMember).then(function(response) {
                $scope.finder = response.data;
            });
        }
    }

    // when user clicks the name, push id into member array and reset tempMember
    $scope.addMemberToConversation = function(n) {
        $scope.conv.tempmembers.push(n);
        $scope.tempMember = null;
        $scope.finder = [];
    };

    $scope.removeMemberFromConversation = function(n) {
        $scope.conv.tempmembers.splice($scope.conv.tempmembers.indexOf(n), 1);
    }

    $scope.cleanUpCreateWindow = function() {
        $scope.conv = {
            display_name: null,
            tempmembers: [],
            members: [],
            avatar: null
        };
    }

    // when pressing create, send a request to the API
    $scope.addConversation = function() {
        for (var i = 0; i < $scope.conv.tempmembers.length; i++) {
            $scope.conv.members.push({_id:$scope.conv.tempmembers[i]._id});
        }
        delete $scope.conv.tempmembers;
        $scope.conv.members.push({_id:$scope.$storage.user._id});
        api.conversations.add($scope.conv).then(function(response) {
            $scope.cleanUpCreateWindow();
        });
    }
}]);

// sidebar search animation
function toggleSearchBar() {
    if (document.getElementById("sidebar-search").style.visibility == "visible") {
        document.getElementById("sidebar-search").style.visibility = "hidden";
        document.getElementById("sidebar-search").style.opacity = 0;
    } else {
        document.getElementById("sidebar-search").style.visibility = "visible";
        document.getElementById("sidebar-search").style.opacity = 1;
    }
}

function setOffline() {
    document.getElementById("yourStatus").setAttribute("class", "offline");
}
function setBusy() {
    document.getElementById("yourStatus").setAttribute("class", "busy");
}
function setOnline() {
    document.getElementById("yourStatus").setAttribute("class", "online");
}

app.factory('api', ["$http", "$sessionStorage", function($http, $sessionStorage) {
    var url = "https://userschat.herokuapp.com/";
    var $storage = $sessionStorage;
    return {
        users: {
            get: function(id) {
                return $http.get(url + "users/" + id);
            },
            add: function(user) {
                return $http.post(url + "users", user);
            },
            remove: function(user) {
                return $http.delete(url + "users", user);
            },
            update: function() {
                return $http.put(url + "users/" + $storage.user._id, $storage.user);
            },
            login: function(loginCredentials) {
                return $http.post(url + "login", loginCredentials);
            }
        },
        conversations: {
            get: function(id) {
                return $http.get(url + "conversations/" + $storage.user._id + "/" + id);
            },
            add: function(conversation) {
                return $http.post(url + "conversations", conversation);
            },
            remove: function(id) {
                return $http.delete(url + "conversations", conversation);
            },
            message: function(id, message) {
                return $http.put(url + "conversations/message/" + id + "/" + $storage.user._id, {content: message});
            },
            update: function(id, updatedObject) {
                return $http.put(url + "conversations/" + id, updatedObject);
            },
            manage: function(id, action, query) {
                return $http.put(url + "conversations/members/" + action + "/" + id, query);
            }
        },
        sidebar: {
            get: function() {
                return $http.get(url + "conversations/" + $storage.user._id);
            },
            search: function(query) {
                return $http.get(url + "users/search/" + query);
            }
        }
    };
}]);
