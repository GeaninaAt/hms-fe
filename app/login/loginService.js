/**
 * Created by gatomulesei on 5/18/2017.
 */
'use strict';

angular.module('myApp.login')

    .factory("loginFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {


        var login = function(username, password) {
            var url = "http://localhost:8080/home/authenticate?username=" + username + "&password=" + password;


            return $http.post(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        }

        return {
            login: login
        }
    }])