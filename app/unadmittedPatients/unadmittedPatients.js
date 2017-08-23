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


        $scope.goToPatientPage = function(id) {
            $location.path('/patientPage').search({idPatient: id.patientId});
        };


        unadmittedPatientsFactory.getUnadmittedPatients().then(function(response){
            console.log(response);
            $scope.patients = response.data;
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


        $scope.goToUnadmittedPatients = function() {
            $location.path('/unadmittedPatients');
        }

        $scope.goToCreateAccount = function() {
            $location.path('/createAccount');
        }


    }]);