/**
 * Created by gatomulesei on 8/10/2017.
 */
'use strict';

angular.module('myApp.urology', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/urology', {
            templateUrl: 'urology/urology.html',
            controller: 'urologyController'
        });
    }])

    .controller('urologyController', [ '$scope', '$location', '$cookies', 'urologyFactory', function($scope, $location, $cookies, urologyFactory) {
        $scope.listPatients = true;
        $scope.listDoctors = false;

        $scope.goToHome = function() {
            $location.path('/home');
        }

        $scope.goToAddPatient = function() {
            $location.path('/addPatient');
        }

        $scope.goToAddDoctor = function() {
            $location.path('/addDoctor');
        }

        $scope.goToPatientPage = function(id) {
            if(id.patientId){
                $location.path('/patientPage').search({idPatient: id.patientId});
            }else if(id.doctorId){
                $location.path('/doctorPage').search({idDoctor: id.doctorId});
            }

        };

        $scope.goToUnadmittedPatients = function() {
            $location.path('/unadmittedPatients');
        }

        $scope.goToCreateAccount = function() {
            $location.path('/createAccount');
        }

        urologyFactory.getPatients().then(function(response){
            console.log(response);
            $scope.patients = response.data;
        });

        urologyFactory.getDoctors().then(function(response){
            console.log(response);
            $scope.doctors = response.data;
        });



        $scope.showPatients = function() {
            if($scope.listPatients == false) {
                $scope.listPatients = true;
                $scope.listDoctors = false;
            }
        };

        $scope.showDoctors = function() {
            if($scope.listDoctors == false) {
                $scope.listDoctors = true;
                $scope.listPatients = false;
            }
        };
    }]);