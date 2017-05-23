/**
 * Created by gatomulesei on 5/19/2017.
 */
'use strict';

angular.module('myApp.admin')

    .factory("adminFactory", ["$rootScope", "$http", "$cookies", "$location", "$uibModal", function($rootScope, $http, $cookies, $location, $uibModal) {

        var getQuestions = function() {
            var url = "http://localhost:8080/admin/allQuestions";

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        }

        var deleteQuestion = function(questionId){
            var url = "http://localhost:8080/admin/deleteQuestion/" + questionId;
            return $http.delete(url).then(function(success){
                return success;
            }, function(err){
                return err;
            })
        }

        var addQuestion = function(question, quizId){
           // var url = ""

        }

        var addQuestionModal = function(template, controller, scope) {
            var modalInstance = $uibModal.open({
                templateUrl: template,
                controller: controller,
                scope: scope,
                resolve: {
                    items: function() {
                        //return $scope.items
                    }
                }
            })

            return modalInstance;
        }

        var addAnswerModal = function(template, controller, scope, questionId) {

            var modalInstance = $uibModal.open({
                templateUrl: template,
                controller: controller,
                scope: scope,
                resolve: {
                    items: function() {
                        return questionId
                    }
                }
            })

            return modalInstance;
        }


        var getCategories = function(){
            return $http.get("http://localhost:8080/quiz/getQuizzes").then(function(success){
                return success.data;

            })
        }

        var deleteAnswer = function(answerId){
            var url = "http://localhost:8080/admin/deleteAnswer/" + answerId;
            return $http.delete(url).then(function(success){
                return success;
            }, function(err){
                return err;
            })
        }

        return {
            getQuestions: getQuestions,
            deleteQuestion:deleteQuestion,
            addQuestionModal:addQuestionModal,
            addAnswerModal:addAnswerModal,
            getCategories:getCategories,
            deleteAnswer:deleteAnswer
        }
    }])