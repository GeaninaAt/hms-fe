/**
 * Created by gatomulesei on 8/14/2017.
 */
'use strict';

angular.module('myApp.unadmittedPatients', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/unadmittedPatients', {
            templateUrl: 'unadmittedPatients/unadmittedPatients.html',
            controller: 'unadmittedPatientsController'
        });
    }])

    .controller('unadmittedPatientsController', [ '$scope', '$location', '$cookies', 'unadmittedPatientsFactory', function($scope, $location, $cookies, unadmittedPatientsFactory) {

        unadmittedPatientsFactory.getUnadmittedPatients().then(function(response){
            console.log(response);
            $scope.unadmittedPatients = response.data;
        });


        $scope.goToHome = function() {
            $location.path('/home');
        }

        $scope.goToAddPatient = function() {
            $location.path('/addPatient');
        }

        $scope.goToAddDoctor = function() {
            $location.path('/addDoctor');
        }

        $scope.goToPatientPage = function() {
            $location.path('/patientPage');
        }

        $scope.goToUnadmittedPatients = function() {
            $location.path('/unadmittedPatients');
        }

    }]);