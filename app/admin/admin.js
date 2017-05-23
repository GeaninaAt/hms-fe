/**
 * Created by gatomulesei on 5/19/2017.
 */
'use strict';

angular.module('myApp.admin', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: 'admin/admin.html',
            controller: 'adminDashboardController'
        });
    }])

    .controller('adminDashboardController', ["$scope", "$location", "$cookies", "adminFactory", "$uibModal", function($scope, $location, $cookies, adminFactory, $uibModal) {

        adminFactory.getQuestions().then(function(response){{
            // console.log("questions")
            //console.log(response);
            $scope.questions = response.data;
        }})

        $scope.deleteQuestion = function(questionId){
            adminFactory.deleteQuestion(questionId).then(function(response){
                alert("your question has been deleted.");
                adminFactory.getQuestions().then(function(response){{
                    $scope.questions = response.data;
                }})
            })
        }

        //add questions

        $scope.addQuestion = function() {
            var modalInstance = adminFactory.addQuestionModal('../directives/addQuestionDirective/addQuestionModal.html', modalController, $scope);
            modalInstance.result.then(function(selectedItem) {
               // var keyForBeers = selectedItem;
                adminFactory.addQuestionModal().then(function(response) {
                })
            }, function() {

            });
        }

        //modal controller
        var modalController = function($scope, $uibModalInstance, $http, $rootScope, items, adminFactory) {
            adminFactory.getCategories().then(function(response){
                $scope.categories = response;
            })

            $scope.setCurrentCategory = function(key, value){
                $scope.currentCategory = {
                    key:key,
                    value:value
                }
            }

            $scope.ok = function(questionText){
                var dataText = {
                    "text":questionText,
                    "category":$scope.currentCategory.value
                }
                console.log($scope.currentCategory)
                $http.post("http://localhost:8080/admin/addQuestion/" + $scope.currentCategory.key, dataText).then(function(response){
                    alert("question added");
                })
            };
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }





        //add answers

        $scope.addAnswer = function(questionId) {

            var modalInstance = adminFactory.addAnswerModal('../directives/addAnswerDirective/addAnswerModal.html', modalControllerAns, $scope, questionId);
            modalInstance.result.then(function(selectedItem) {
                // var keyForBeers = selectedItem;
                adminFactory.addAnswerModal().then(function(response) {
                })
            }, function() {

            });
        }

        $scope.deleteAnswer = function(answerId){
            adminFactory.deleteAnswer(answerId).then(function(response){
                console.log(response);
            })

        }



        //modal controller
        var modalControllerAns = function($scope, $uibModalInstance, $http, $rootScope, items, adminFactory, $location, $route) {
            //console.log(items + "ceva");
            $scope.ok = function(answerText, check) {
                var answerBody = {
                    "text":answerText,
                    "questionId":items,
                    "correct":(check == "TRUE")
                }
                console.log(answerBody);
               $http.post("http://localhost:8080/admin/addAnswers", answerBody).then(function(response){
                   alert("answer added");
                   $route.reload();
               })
            };
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }

    }]);