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

    .controller('patientPageController', [ '$scope', '$location', '$cookies', function($scope, $location, $cookies) {

        /* $scope.takeQuiz = function(type){
         $location.path('/quiz').search({ quizType: type });
         }

         $scope.userRole = $cookies.get("userRole");
         console.log($scope.userRole);

         $scope.adminAdd = function(){
         $location.path('/admin')
         }*/

        $scope.goToHome = function(){
            $location.path('/home');
        }

        $scope.goToAdmitPatient = function() {
            $location.path('/admitPatient');
        }

        $scope.goToUnadmittedPatients = function() {
            $location.path('/unadmittedPatients');
        }
    }]);