/**
 * Created by gatomulesei on 5/19/2017.
 */
'use strict';

angular.module('myApp.quiz')

    .factory("quizFactory", ["$rootScope", "$http", "$cookies", "$location", "$uibModal", function($rootScope, $http, $cookies, $location, $uibModal) {


        var getQuiz = function(quizType) {
            var url = "http://localhost:8080/quiz/" + quizType;

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        }

        var submit = function(answerList, quizId){
            var url = "http://localhost:8080/quiz/submit/" + quizId;

            return $http.post(url, answerList).then(function(response){
                return response;
            }, function(err){
                return err;
            });
        }


        //submit

        var submitModal = function(template, controller, scope, score) {
            console.log(score);
            var modalInstance = $uibModal.open({
                templateUrl: template,
                controller: controller,
                scope: scope,
                resolve: {
                    items: function() {
                        return score
                    }
                }
            })

            return modalInstance;
        }


        var addComment = function(text, quizId, username){
            var url = "http://localhost:8080/quiz/addComment/" + quizId;

            var comment = {
                "text":text,
                "username":username
            }

            return $http.post(url, comment).then(function(response){
                return response;
            }, function(err){
                return err;
            });
        }


        var getComments = function(quizId){
            var url = "http://localhost:8080/quiz/allComments/" + quizId;

            return $http.get(url).then(function(response){
                return response;
            }, function(err){
                return err;
            });
        }

        var deleteComment = function(commentId){
            var url = "http://localhost:8080/quiz/deleteComment/" + commentId;

            return $http.delete(url).then(function(response){
                return response;
            }, function(err){
                return err;
            });
        }


        return {
            getQuiz: getQuiz,
            submitModal:submitModal,
            submit:submit,
            addComment:addComment,
            getComments:getComments,
            deleteComment:deleteComment
        }
    }])