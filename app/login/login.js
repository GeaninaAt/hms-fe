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
            console.log(response);
            switch(response.status){
                case 200:
                    /*var user = {
                        "username" : response.
                    }*/
                    $cookies.put("username", username);

                    $location.path("/home");
                    break;
                case 401:
                    $rootScope.failedLogin = true;
                    alert("Unauthorized!");
                    break;
                default:
                    $rootScope.failedLogin = true;
                    alert("Incorrect username or password!");
            }
        })
    };

    $scope.goToRegisterPage = function(){
        $location.path("/register");
    }
}]);