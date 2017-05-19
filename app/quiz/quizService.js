/**
 * Created by gatomulesei on 5/19/2017.
 */
'use strict';

angular.module('myApp.quiz')

    .factory("quizFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {


        var getQuiz = function(quizType) {
            var url = "http://localhost:8080/quiz/" + quizType;

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        }

        return {
            getQuiz: getQuiz
        }
    }])