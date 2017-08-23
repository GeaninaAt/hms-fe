/**
 * Created by gatomulesei on 8/21/2017.
 */
/**
 * Created by gatomulesei on 8/13/2017.
 */
'use strict';

angular.module('myApp.addExamination')

    .factory("addExaminationFactory", ["$rootScope", "$http", "$cookies", "$location", "$uibModal", function($rootScope, $http, $cookies, $location, $uibModal) {


        var getDoctors = function() {
            var url = "http://localhost:8080/doctors";

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };

        var getPatient = function(id) {
            var url = "http://localhost:8080/patients/" + id;

            return $http.get(url).then(function(response) {
                return response;

            }, function(err) {
                return err;
            });
        };



        var addExamination = function(patientId, doctorId, examinationData) {
            var url = 'http://localhost:8080/examinations/add/' + patientId + '/' + doctorId;
            console.log(examinationData);
            //we have to change this
            /*            var config = {
             headers: {
             "Authorization": "Bearer " + $cookies.get("userToken")
             }
             }*/
            return $http.post(url, examinationData).then(
                function(response) {
                    return response
                },
                function(err) {
                    console.log(err);
                })
        };


        return {
            getDoctors: getDoctors,
            getPatient: getPatient,
            addExamination: addExamination
        }
    }]);