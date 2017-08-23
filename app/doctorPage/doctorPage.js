/**
 * Created by gatomulesei on 8/22/2017.
 */
'use strict';

angular.module('myApp.doctorPage', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/doctorPage', {
            templateUrl: 'doctorPage/doctorPage.html',
            controller: 'doctorPageController'
        });
    }])

    .controller('doctorPageController', [ '$scope', '$location', '$cookies', 'doctorPageFactory', function($scope, $location, $cookies, doctorPageFactory) {


            var requestId = {
                doctorId: $location.search().idDoctor
            };
            doctorPageFactory.getDoctors(requestId.doctorId).then(function(response){
                $scope.currentDoctor = response.data;
            });


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

        $scope.goToEditDoctor = function() {
            $location.path('/editDoctor');
        }

        $scope.goToCreateAccount = function() {
            $location.path('/createAccount');
        }

    }]);