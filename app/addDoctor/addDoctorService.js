/**
 * Created by gatomulesei on 8/11/2017.
 */
'use strict';

angular.module('myApp.addDoctor')

    .factory("addDoctorFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {

        var addDoctor = function(doctorData, departmentName) {
            var url = 'http://localhost:8080/doctors/add/' + departmentName;
            console.log(doctorData);
            //we have to change this
            /*            var config = {
             headers: {
             "Authorization": "Bearer " + $cookies.get("userToken")
             }
             }*/
            return $http.post(url, doctorData).then(
                function(response) {
                    return response
                },
                function(err) {
                    console.log(err);
                })
        };

        return {
            addDoctor: addDoctor
        }
    }]);