/**
 * Created by gatomulesei on 8/22/2017.
 */
'use strict';

angular.module('myApp.doctorPage')

    .factory("editDoctorFactory", ["$rootScope", "$http", "$cookies", "$location", "$uibModal", function($rootScope, $http, $cookies, $location, $uibModal) {


        var getDoctor = function(id) {
            var url = "http://localhost:8080/doctors/" + id;

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };

        var requestId = {
            doctorId: $location.search().idDoctor
        };


        var updateDoctor = function(doctorData) {
            var url = 'http://localhost:8080/doctors/update' + requestId.doctorId;
            console.log(doctorData);
            //we have to change this
            /*            var config = {
             headers: {
             "Authorization": "Bearer " + $cookies.get("userToken")
             }
             }*/
            return $http.put(url, doctorData).then(
                function(response) {
                    return response
                },
                function(err) {
                    console.log(err);
                })
        };

        return {
            getDoctor: getDoctor,
            updateDoctor: updateDoctor
        }
    }]);