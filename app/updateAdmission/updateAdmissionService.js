/**
 * Created by gatomulesei on 8/23/2017.
 */
'use strict';

angular.module('myApp.updateAdmission')

    .factory("updateAdmissionFactory", ["$rootScope", "$http", "$cookies", "$location", "$uibModal", function($rootScope, $http, $cookies, $location, $uibModal) {


        var getAdmission = function(id) {
            var url = "http://localhost:8080/admissions/" + id;

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };


        var updateAdmission = function(id, admissionData) {
            var url = 'http://localhost:8080/admissions/update/' + id;
            console.log(admissionData);
            //we have to change this
            /*            var config = {
             headers: {
             "Authorization": "Bearer " + $cookies.get("userToken")
             }
             }*/
            return $http.put(url, admissionData).then(
                function(response) {
                    return response
                },
                function(err) {
                    console.log(err);
                })
        };


        return {
            getAdmission: getAdmission,
            updateAdmission: updateAdmission
        }
    }]);