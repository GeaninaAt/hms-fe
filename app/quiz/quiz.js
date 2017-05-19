'use strict';

angular.module('myApp.quiz', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/quiz', {
        templateUrl: 'quiz/quiz.html',
        controller: 'quizController'
    });
}])

.controller('quizController', ['$scope', '$location', 'quizFactory', '$http', function($scope, $location, quizFactory, $http) {
    var quizType = $location.search().quizType;
    $scope.answersList = [];
    console.log(quizType);
    quizFactory.getQuiz(quizType).then(function(response){{
        console.log("questions")
        console.log(response);
        $scope.questions = response.data.questions;
        $scope.answers = response.data.questions.answers;
    }})

    $scope.setValue = function(correct, id){
        console.log("tralalala")
        var object = {
            correct:correct,
            id:id
        }
                $scope.answersList.push(object);
        for(var i in $scope.answersList){
            if ($scope.answersList[i].id == object.id && $scope.answersList[i].correct != object.correct) {
                $scope.answersList[i] = object;
            }
    }}

    $scope.submit = function(){
        console.log($scope.answersList)
    }

}]);