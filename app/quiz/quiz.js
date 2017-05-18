'use strict';

angular.module('myApp.quiz', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/quiz', {
        templateUrl: 'quiz/quiz.html',
        controller: 'quizController'
    });
}])

.controller('quizController', [function() {

}]);