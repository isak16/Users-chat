app.controller('newsSidebar', function ($scope, api, $sessionStorage) {
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
});

app.controller('conversationController', function($scope, api, $sessionStorage) {
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
});

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
