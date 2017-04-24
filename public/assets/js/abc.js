$("body").tooltip({
    selector: '[data-toggle="tooltip"]'
});

var app = angular.module('app', ['ui.router', 'ngStorage'] );


app.config(function ($stateProvider, $urlRouterProvider){
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
});
