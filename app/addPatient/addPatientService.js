/**
 * Created by gatomulesei on 8/11/2017.
 */
'use strict';

angular.module('myApp.addPatient')

    .factory("addPatientFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {

        /*        //get Locations http call
         var getLocations = function() {
         var url = 'http://localhost:8080/rest/locations';
         var config = {
         headers: {
         "Authorization": "Bearer " + $cookies.get("userToken")
         }
         }
         return $http.get(url, config).then(function(response) {
         return response.data;
         })
         }

         //get Organizers http call
         var getOrganizers = function() {
         var url = 'http://localhost:8080/rest/organizers';
         //we have to change this
         var config = {
         headers: {
         "Authorization": "Bearer " + $cookies.get("userToken")
         }
         }
         return $http.get(url, config).then(function(response) {
         //console.log(response);
         return response.data;

         })
         }*/

        //add Question http call
        var addPatient = function(patientData) {
            var url = 'http://localhost:8080/patients/add'; //+ response.data.id; //?
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
        }

        return {
            addPatient: addPatient
        }
    }])