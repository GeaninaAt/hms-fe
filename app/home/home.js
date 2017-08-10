'use strict';

angular.module('myApp.home', ['ngRoute', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeController'
    });
}])

.controller('homeController', [ '$scope', '$location', '$cookies', function($scope, $location, $cookies) {

   /* $scope.takeQuiz = function(type){
            $location.path('/quiz').search({ quizType: type });
        }

    $scope.userRole = $cookies.get("userRole");
    console.log($scope.userRole);

    $scope.adminAdd = function(){
        $location.path('/admin')
    }*/

   $scope.goToEmergencies = function() {
       $location.path('/emergencies');
   }

    $scope.goToNeurology = function() {
        $location.path('/neurology');
    }

    $scope.goToUrology = function() {
        $location.path('/urology');
    }

    $scope.goToCardiology = function() {
        $location.path('/cardiology');
    }

    $scope.goToAdmitPatient = function() {
       $location.path('/admitPatient');
    }
}]);