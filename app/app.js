'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.login',
    'myApp.home',
    'myApp.quiz',
    'myApp.admin',
    'myApp.register',
    'myApp.emergencies',
    'myApp.neurology',
    'myApp.urology',
    'myApp.cardiology',
    'ui.bootstrap',
    'ngCookies'

]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    //$locationProvider.hashPrefix('!');

    $routeProvider.otherwise({ redirectTo: '/login' });
}]);