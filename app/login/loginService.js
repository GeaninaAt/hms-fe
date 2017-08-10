/**
 * Created by gatomulesei on 5/18/2017.
 */
'use strict';

angular.module('myApp.login')

    .factory("loginFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {


        var login = function(username, password) {
            var url = "http://localhost:8080/login";
            var base64Credentials = btoa(username + ':' + password);
            var config = {headers: {
                'Authorization': 'Basic ' + base64Credentials
            }
            };
            return $http.get(url, config).then(function(response) {
                $cookies.put("userRole", response.data.role);
                return response;

            }, function(err) {
                return err;
            });
        }

        return {
            login: login
        }
    }])