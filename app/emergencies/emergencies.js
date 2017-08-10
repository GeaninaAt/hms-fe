'use strict';

angular.module('myApp.emergencies', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/emergencies', {
            templateUrl: 'emergencies/emergencies.html',
            controller: 'emergenciesController'
        });
    }])

    .controller('emergenciesController', [ '$scope', '$location', '$cookies', function($scope, $location, $cookies) {

        /* $scope.takeQuiz = function(type){
         $location.path('/quiz').search({ quizType: type });
         }

         $scope.userRole = $cookies.get("userRole");
         console.log($scope.userRole);

         $scope.adminAdd = function(){
         $location.path('/admin')
         }*/

        $scope.goToHome = function(){
            $location.path('/home');
        }
    }]);