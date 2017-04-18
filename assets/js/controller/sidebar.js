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
