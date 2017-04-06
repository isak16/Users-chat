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

function setOffline() {
    document.getElementById("yourStatus").setAttribute("class", "offline");
}
function setBusy() {
    document.getElementById("yourStatus").setAttribute("class", "busy");
}
function setOnline() {
    document.getElementById("yourStatus").setAttribute("class", "online");
}