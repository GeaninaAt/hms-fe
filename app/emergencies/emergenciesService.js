/**
 * Created by gatomulesei on 8/10/2017.
 */
'use strict';

angular.module('myApp.emergencies')

    .factory("emergenciesFactory", ["$rootScope", "$http", "$cookies", "$location", "$uibModal", function($rootScope, $http, $cookies, $location, $uibModal) {


        var getPatients = function() {
            var url = "http://localhost:8080/patients/getByDepartment/Emergencies";

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };

        var getDoctors = function() {
            var url = "http://localhost:8080/doctors/getAllForDep/Emergencies";

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