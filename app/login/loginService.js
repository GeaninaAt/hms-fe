/**
 * Created by gatomulesei on 5/18/2017.
 */
'use strict';

angular.module('myApp.login')

    .factory("loginFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {


        var login = function(username, password) {
            var url = "http://localhost:8080/login";
            var base64Credentials = btoa(username + ':' + password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + base64Credentials;
            var headers =  {
                'Access-Control-Allow-Origin': '*',
                authorization: "Basic " + btoa(username + ":" + password)
            };
            /*var config = { headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + base64Credentials
            }
            };*/
            return $http.get(url, headers).then(function(response) {
                $cookies.put("userRole", response.data.authorities[0].authority);
                $cookies.put("userToken", base64Credentials);
                return response;

            }, function(err) {
                return err;
            });
        };

        return {
            login: login
        }
    }]);