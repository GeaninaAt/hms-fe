'use strict';

angular.module('myApp.emergencies', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/emergencies', {
            templateUrl: 'emergencies/emergencies.html',
            controller: 'emergenciesController'
        });
    }])

    .controller('emergenciesController', [ '$scope', '$location', '$cookies', 'emergenciesFactory', function($scope, $location, $cookies, emergenciesFactory) {

        $scope.listPatients = true;
        $scope.listDoctors = false;

        $scope.goToHome = function() {
            $location.path('/home');
        };

        $scope.goToAddPatient = function() {
            $location.path('/addPatient');
        };

        $scope.goToAddDoctor = function() {
            $location.path('/addDoctor');
        };

        $scope.goToCreateAccount = function() {
            $location.path('/createAccount');
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
        };


        emergenciesFactory.getPatients().then(function(response){
            console.log(response);
            $scope.patients = response.data;
        });

        emergenciesFactory.getDoctors().then(function(response){
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