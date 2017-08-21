/**
 * Created by gatomulesei on 8/10/2017.
 */
'use strict';

angular.module('myApp.cardiology')

    .factory("cardiologyFactory", ["$rootScope", "$http", "$cookies", "$location", "$uibModal", function($rootScope, $http, $cookies, $location, $uibModal) {


        var getPatients = function() {
            var url = "http://localhost:8080/patients/getByDepartment/Cardiology";

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };

        var getDoctors = function() {
            var url = "http://localhost:8080/doctors/getAllForDep/Cardiology";

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