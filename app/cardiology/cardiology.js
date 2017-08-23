/**
 * Created by gatomulesei on 8/10/2017.
 */
'use strict';

angular.module('myApp.cardiology', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/cardiology', {
            templateUrl: 'cardiology/cardiology.html',
            controller: 'cardiologyController'
        });
    }])

    .controller('cardiologyController', [ '$scope', '$location', '$cookies', 'cardiologyFactory', function($scope, $location, $cookies, cardiologyFactory) {

        $scope.listPatients = true;
        $scope.listDoctors = false;

        $scope.goToHome = function(){
            $location.path('/home');
        }
        $scope.goToAddPatient = function() {
            $location.path('/addPatient');
        }

        $scope.goToAddDoctor = function() {
            $location.path('/addDoctor');
        }

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
        }

        cardiologyFactory.getPatients().then(function(response){
            console.log(response);
            $scope.patients = response.data;
        });

        cardiologyFactory.getDoctors().then(function(response){
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