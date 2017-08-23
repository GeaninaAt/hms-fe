/**
 * Created by gatomulesei on 8/22/2017.
 */
'use strict';

angular.module('myApp.admissionsPage', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/admissionsPage', {
            templateUrl: 'admissionsPage/admissionsPage.html',
            controller: 'admissionsPageController'
        });
    }])

    .controller('admissionsPageController', [ '$scope', '$location', '$cookies', 'admissionsPageFactory', function($scope, $location, $cookies, admissionsPageFactory) {

        if($location.search().idPatient){
            var requestId = {
                patientId: $location.search().idPatient
            };
            admissionsPageFactory.getPatient(requestId.patientId).then(function(response){
                $scope.currentPatient = response.data;
                console.log($scope.currentPatient);
            });
        }else{
            alert("some other error");
        }


        admissionsPageFactory.getAllForPatient(requestId.patientId).then(function(response) {
            $scope.admissionModel = [];
            $scope.admissions = response.data;
            console.log($scope.admissionModel);
        });



        $scope.deleteAdmission = function(admissionId) {
            var id = admissionId;
            admissionsPageFactory.deleteAdmission(id).then(function(response)  {
                admissionsPageFactory.getAllForPatient(requestId.patientId).then(function(response) {
                    $scope.admissionModel = [];
                    $scope.admissions = response.data;
                    console.log($scope.admissionModel);
                });
                alert("Admission has been deleted!");
            })
        };

        $scope.goToUpdateAdmission = function(id) {
            if(id.admissionId){
                $location.path('/updateAdmission').search({idAdmission: id.admissionId});
            }else {
                alert("An error occured!");
            }

        };

        $scope.goToHome = function() {
            $location.path('/home');
        };

        $scope.goToAddPatient = function() {
            $location.path('/addPatient');
        };

        $scope.goToAddDoctor = function() {
            $location.path('/addDoctor');
        };

        $scope.goToUnadmittedPatients = function() {
            $location.path('/unadmittedPatients');
        };

        $scope.goToCreateAccount = function() {
            $location.path('/createAccount');
        }

    }]);