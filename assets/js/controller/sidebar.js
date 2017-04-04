app.controller('newsSidebar', function ($scope) {
    $scope.sideFeed = [
        {name: 'Bill Gates', image: 'assets/img/hash-tag-white-2.png'},
        {name: '@IsakProvideIT', image: 'assets/img/jobs.png'},
        {name: '@IsakProvideIT', image: 'assets/img/jobs.png'},
        {name: '@IsakProvideIT', image: 'assets/img/jobs.png'},
        {name: '@IsakProvideIT', image: 'assets/img/jobs.png'},
        {name: '@IsakProvideIT', image: 'assets/img/jobs.png'},
        {name: '@IsakProvideIT', image: 'assets/img/jobs.png'},
        {name: '@IsakProvideIT', image: 'assets/img/jobs.png'},
        {name: '@IsakProvideIT', image: 'assets/img/jobs.png'},
        {name: '@IsakProvideIT', image: 'assets/img/jobs.png'},
        {name: '@IsakProvideIT', image: 'assets/img/jobs.png'}
    ]
});

// sidebar search animation
document.getElementById("search-button").addEventListener("click", function(e) {
    if (document.getElementById("sidebar-search").style.visibility == "visible") {
        document.getElementById("sidebar-search").style.visibility = "hidden";
        document.getElementById("sidebar-search").style.opacity = 0;
    } else {
        document.getElementById("sidebar-search").style.visibility = "visible";
        document.getElementById("sidebar-search").style.opacity = 1;
    }
});
