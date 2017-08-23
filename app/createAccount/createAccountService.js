/**
 * Created by gatomulesei on 8/23/2017.
 */
'use strict';

angular.module('myApp.createAccount')

    .factory("createAccountFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {

        var createAccount = function(accountData) {
            var url = 'http://localhost:8080/users/add';
            console.log(accountData);

            var config = {
                headers: {
                    "Authorization": "Basic " + $cookies.get("userToken")
                }
            };

            return $http.post(url, accountData, config).then(
                function(response) {
                    return response
                },
                function(err) {
                    console.log(err);
                })
        };

        return {
            createAccount: createAccount
        }
    }]);