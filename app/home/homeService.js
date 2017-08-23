/**
 * Created by gatomulesei on 8/23/2017.
 */
'use strict';

angular.module('myApp.home')

    .factory("homeFactory", ["$rootScope", "$http", "$cookies", "$location", "$uibModal", function($rootScope, $http, $cookies, $location, $uibModal) {


        var getBed = function(bedNo) {
            var url = "http://localhost:8080/beds/getByNumber/" + bedNo;

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };


        return {
            getBed: getBed
        }
    }]);