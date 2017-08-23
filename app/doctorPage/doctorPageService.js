/**
 * Created by gatomulesei on 8/22/2017.
 */
'use strict';

angular.module('myApp.doctorPage')

    .factory("doctorPageFactory", ["$rootScope", "$http", "$cookies", "$location", "$uibModal", function($rootScope, $http, $cookies, $location, $uibModal) {


        var getDoctors = function(id) {
            var url = "http://localhost:8080/doctors/" + id;

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };


        return {
            getDoctors:getDoctors
        }
    }]);