'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeController'
    });
}])

.controller('homeController', [ '$scope', '$location', function($scope, $location) {

    $scope.takeQuiz = function(type){
            $location.path('/quiz').search({ quizType: type });
        }

}]);