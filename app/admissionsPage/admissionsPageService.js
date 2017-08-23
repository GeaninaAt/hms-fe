/**
 * Created by gatomulesei on 8/22/2017.
 */
'use strict';

angular.module('myApp.admissionsPage')

    .factory("admissionsPageFactory", ["$rootScope", "$http", "$cookies", "$location", "$uibModal", function($rootScope, $http, $cookies, $location, $uibModal) {


        var getPatient = function(id) {
            var url = "http://localhost:8080/patients/" + id;

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };


        var getAdmission = function(id) {
            var url = "http://localhost:8080/admissions/" + id;

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };


        var getAllForPatient = function(id) {
            var url = "http://localhost:8080/admissions/findAllForPatient/" + id;

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };

        var deleteAdmission = function(id) {
            var url = "http://localhost:8080/admissions/delete/" + id;

            return $http.delete(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };



        return {
            getPatient: getPatient,
            getAllForPatient: getAllForPatient,
            getAdmission: getAdmission,
            deleteAdmission: deleteAdmission
        }
    }]);