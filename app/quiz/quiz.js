'use strict';

angular.module('myApp.quiz', ['ngRoute', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/quiz', {
        templateUrl: 'quiz/quiz.html',
        controller: 'quizController'
    });
}])

.controller('quizController', ['$scope', '$location', 'quizFactory', '$http', '$cookies', '$route', function($scope, $location, quizFactory, $http, $cookies, $route) {
    var quizType = $location.search().quizType;
    $scope.answersList = [];
    $scope.questionsIds = [];
    console.log(quizType);
    quizFactory.getQuiz(quizType).then(function(response){{
       // console.log("questions")
        //console.log(response);
        $scope.questions = response.data.questions;
        $scope.answers = response.data.questions.answers;
        $scope.quizId = response.data.id;
        quizFactory.getComments($scope.quizId).then(function(response){
            console.log(response);
            $scope.comments = response.data;
        })
    }})

    $scope.setValue = function(correct, answerId, questionId, quizId){
        //console.log("tralalala")
        var questionsIds = [];
        var object = {
            correct:correct,
            questionId:questionId,
            answerId:answerId,
            quizId:quizId
        }

        $scope.questionsIds = $scope.questionsIds.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        })
        if($scope.answersList.length == 0){
            $scope.answersList[0] = object;
        }
       // console.log(object)
        /*
                $scope.answersList.push(object);*/
        for(var i =0; i < $scope.answersList.length; i++){

            if ($scope.answersList[i].questionId == object.questionId) {
                $scope.questionsIds.push(object.questionId);
                if($scope.answersList[i].answerId == object.answerId && $scope.answersList[i].correct != object.correct){
                    $scope.answersList[i] = object;
                    console.log("first if");console.log(object);
                }

            }else if($scope.answersList[i].questionId != object.questionId && !$scope.questionsIds.includes(object.questionId)){
                $scope.questionsIds.push(object.questionId);
                $scope.answersList.push(object);
            }
    }
        console.log($scope.answersList);
    }

    $scope.submit = function(){
        $scope.answers = [];
        for(var i in $scope.answersList){
            $scope.answers.push($scope.answersList[i].correct)
        }
      //  console.log(answerList);
       // console.log($scope.quizId);
        quizFactory.submit($scope.answers, $scope.quizId).then(function(response){
            $scope.generalScore = response.data;
        })
    }


    //submit

    $scope.showScore = function() {
        quizFactory.submit($scope.answers, $scope.quizId).then(function(response){
            $scope.generalScore = response.data;
            var modalInstance = quizFactory.submitModal('../directives/submitDirective/submitModal.html', modalControllerScore, $scope, $scope.generalScore);
            modalInstance.result.then(function(selectedItem) {
                // var keyForBeers = selectedItem;
                quizFactory.submitModal().then(function(response) {
                })
            }, function() {

            });
        })

    }

    //modal controller
    var modalControllerScore = function($scope, $uibModalInstance, $http, $rootScope, items, quizFactory, $location) {
        console.log(items);
        $scope.retrievedScore = items;
        $scope.ok = function() {
            $location.path("/home");

        };
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
            $location.path("/home");
        };
    }

    $scope.addComment = function(text){
        if(text == null){
            alert("You cannot add an empty comment!");
        }else {
            quizFactory.addComment(text, $scope.quizId, $cookies.get("username")).then(function (response) {
                console.log(response);
                $route.reload();
            })
        }
    }

    $scope.deleteComment = function(commentId){
        quizFactory.deleteComment(commentId).then(function(response){
            console.log(response);
            $route.reload();
        })
    }

}]);