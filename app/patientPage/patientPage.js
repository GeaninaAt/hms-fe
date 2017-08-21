/**
 * Created by gatomulesei on 8/13/2017.
 */
'use strict';

angular.module('myApp.patientPage', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/patientPage', {
            templateUrl: 'patientPage/patientPage.html',
            controller: 'patientPageController'
        });
    }])

    .controller('patientPageController', [ '$scope', '$location', '$cookies', 'patientPageFactory', function($scope, $location, $cookies, patientPageFactory) {


        if($location.search().idPatient){
            var requestId = {
                patientId: $location.search().idPatient
            };
            patientPageFactory.getPatient(requestId.patientId).then(function(response){
                $scope.currentPatient = response.data;
            });
        }else if($location.search().idDoctor){
            var requestId = {
                doctorId: $location.search().idDoctor
            };
            patientPageFactory.getDoctors(requestId.doctorId).then(function(response){
                $scope.currentPatient = response.data;
            });
        }else{
            alert("some other error");
        }


        $scope.goToHome = function(){
            $location.path('/home');
        }

        $scope.goToAdmitPatient = function() {
            $location.path('/admitPatient');
        }

        $scope.goToUnadmittedPatients = function() {
            $location.path('/unadmittedPatients');
        }

        $scope.goToEditPatient = function() {
            $location.path('/editPatient');
        }



    }]);