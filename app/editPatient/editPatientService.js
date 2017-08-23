/**
 * Created by gatomulesei on 8/19/2017.
 */
'use strict';

angular.module('myApp.patientPage')

    .factory("editPatientFactory", ["$rootScope", "$http", "$cookies", "$location", "$uibModal", function($rootScope, $http, $cookies, $location, $uibModal) {


        var getPatient = function(id) {
            var url = "http://localhost:8080/patients/" + id;

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };

        var requestId = {
            patientId: $location.search().idPatient
        };


        var updatePatient = function(patientId, patientData) {
            var url = 'http://localhost:8080/patients/update/' + patientId;
            console.log(patientData);
            //we have to change this
            /*            var config = {
             headers: {
             "Authorization": "Bearer " + $cookies.get("userToken")
             }
             }*/
            return $http.put(url, patientData).then(
                function(response) {
                    return response
                },
                function(err) {
                    console.log(err);
                })
        };

        return {
            getPatient: getPatient,
            updatePatient: updatePatient
        }
    }]);