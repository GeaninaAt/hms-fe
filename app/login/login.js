'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'loginController'
    });
}])

.controller('loginController', ['$rootScope', '$scope', '$http', 'loginFactory', '$location', function($scope, $http, loginFactory, $location, $rootScope) {
    $scope.login = function(username, password){
        loginFactory.login(username, password).then(function(response){
            switch(response.status){
                case 200:
                    $location.path("/home");
                    break;
                case 401:
                    $rootScope.failedLogin = true;
                    alert("Unauthorized");
                    break;
                default:
                    $rootScope.failedLogin = true;
                    alert("some error occured during the authentication");
            }
        })
    }

    $scope.goToRegisterPage = function(){
        $location.path("/register");
    }
}]);