angular.module('eyDial').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    'use strict';

    $stateProvider
        .state('search', {
            url: '/',
            templateUrl: './app/modules/dashBoard/dashBoard.html',
            controller: 'dashBoardController'
        })

    .state('favourites', {
            url: '/favourites',

            templateUrl: './app/modules/favourite/favourite.html',
            controller: 'favouriteController',


        })
        .state('recent', {
            url: '/recent',

            templateUrl: './app/modules/recentCalls/recentCalls.html',
            controller: 'recentCallsController',



        })
        .state('help', {
            url: '/help',

            templateUrl: './app/modules/help/help.html',
            controller: 'helpController',



        });

    $urlRouterProvider.otherwise('/');

}]);
