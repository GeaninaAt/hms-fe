/**
 * Created by gatomulesei on 8/13/2017.
 */
'use strict';

angular.module('myApp.admitPatient')

    .factory("admitPatientFactory", ["$rootScope", "$http", "$cookies", "$location", "$uibModal", function($rootScope, $http, $cookies, $location, $uibModal) {


        var getDoctors = function(department) {
            var url = "http://localhost:8080/doctors/getAllForDep/" + department;

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };

        var getBeds = function(department) {
            var url = "http://localhost:8080/beds/findAvailableByDep/" + department;

            return $http.get(url).then(function(response) {
                console.log(response);
                return response;

            }, function(err) {
                return err;
            });
        };

        var admitPatient = function(patientData) {
            var url = 'http://localhost:8080/admissions/add/'; //+ response.data.id; //?
            console.log(patientData);
            //we have to change this
            /*            var config = {
             headers: {
             "Authorization": "Bearer " + $cookies.get("userToken")
             }
             }*/
            return $http.post(url, patientData).then(
                function(response) {
                    return response
                },
                function(err) {
                    console.log(err);
                })
        };


        return {
            getDoctors: getDoctors,
            getBeds: getBeds,
            admitPatient: admitPatient
        }
    }]);