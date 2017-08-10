/**
 * Created by gatomulesei on 8/10/2017.
 */
'use strict';

angular.module('myApp.neurology', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/neurology', {
            templateUrl: 'neurology/neurology.html',
            controller: 'neurologyController'
        });
    }])

    .controller('neurologyController', [ '$scope', '$location', '$cookies', function($scope, $location, $cookies) {

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