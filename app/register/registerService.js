/**
 * Created by gatomulesei on 5/18/2017.
 */
'use strict';

angular.module('myApp.register')

    .factory("registerFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {


        var register = function(firstName, lastName, birthdate, country, email, phone, username, password) {
            var url = "http://localhost:8080/users/createAccount";

            var userData = {
                "fname":firstName,
                "lname":lastName,
                "username":username,
                "password":password,
                "birthdate":birthdate,
                "country":country,
                "email":email,
                "phone":phone
            };

            console.log(userData);

            return $http.post(url, userData).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        }

        return {
            register: register
        }
    }])