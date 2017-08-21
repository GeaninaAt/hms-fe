/**
 * Created by gatomulesei on 8/14/2017.
 */
'use strict';

angular.module('myApp.unadmittedPatients')

    .factory("unadmittedPatientsFactory", ["$rootScope", "$http", "$cookies", "$location", "$uibModal", function($rootScope, $http, $cookies, $location, $uibModal) {


        var getUnadmittedPatients = function() {
            var url = "http://localhost:8080/patients/getUnadmitted";

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };


        return {
            getUnadmittedPatients: getUnadmittedPatients
        }
    }]);