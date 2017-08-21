/**
 * Created by gatomulesei on 8/13/2017.
 */
'use strict';

angular.module('myApp.patientPage')

    .factory("patientPageFactory", ["$rootScope", "$http", "$cookies", "$location", "$uibModal", function($rootScope, $http, $cookies, $location, $uibModal) {


        var getPatient = function(id) {
            var url = "http://localhost:8080/patients/" + id;

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };

        var getDoctors = function(id) {
            var url = "http://localhost:8080/doctors/" + id;

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };




        return {
            getPatient: getPatient,
            getDoctors:getDoctors
        }
    }]);