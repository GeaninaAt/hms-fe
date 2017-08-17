'use strict';

angular.module('myApp.emergencies', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/emergencies', {
            templateUrl: 'emergencies/emergencies.html',
            controller: 'emergenciesController'
        });
    }])

    .controller('emergenciesController', [ '$scope', '$location', '$cookies', 'emergenciesFactory', function($scope, $location, $cookies, emergenciesFactory) {
        var depType = $location.search().depType;
        /*$scope.answersList = [];
        $scope.questionsIds = [];
        console.log(quizType);*/
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

        $scope.goToHome = function() {
            $location.path('/home');
        }

        $scope.goToAddPatient = function() {
            $location.path('/addPatient');
        }

        $scope.goToAddDoctor = function() {
            $location.path('/addDoctor');
        }

        $scope.goToPatientPage = function() {
            $location.path('/patientPage');
        }

        $scope.goToUnadmittedPatients = function() {
            $location.path('/unadmittedPatients');
        }


    }]);