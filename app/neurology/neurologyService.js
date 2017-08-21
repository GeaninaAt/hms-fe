/**
 * Created by gatomulesei on 8/10/2017.
 */
'use strict';

angular.module('myApp.neurology')

    .factory("neurologyFactory", ["$rootScope", "$http", "$cookies", "$location", "$uibModal", function($rootScope, $http, $cookies, $location, $uibModal) {


        var getPatients = function() {
            var url = "http://localhost:8080/patients/getByDepartment/Neurology";

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };

        var getDoctors = function() {
            var url = "http://localhost:8080/doctors/getAllForDep/Neurology";

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };


        return {
            getPatients: getPatients,
            getDoctors: getDoctors
        }
    }]);