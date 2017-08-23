'use strict';

angular.module('myApp.login', ['ngRoute', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'loginController'
    });
}])

.controller('loginController', ['$scope', '$http', 'loginFactory', '$location','$rootScope', '$cookies', function($scope, $http, loginFactory, $location, $rootScope, $cookies) {
    $scope.login = function(username, password){
        loginFactory.login(username, password).then(function(response){
            switch(response.status){
                case 200:
                    $cookies.put("username", username);
                    $location.path("/home");
                    break;
                case 401:
                    $rootScope.failedLogin = true;
                    alert("Unauthorized");
                    break;
                default:
                    $rootScope.failedLogin = true;
                    alert("Some error occured during the authentication");
            }
        })
    };

    $scope.goToRegisterPage = function(){
        $location.path("/register");
    }
}]);