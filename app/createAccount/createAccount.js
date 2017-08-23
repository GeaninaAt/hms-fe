/**
 * Created by gatomulesei on 8/23/2017.
 */
'use strict';

angular.module('myApp.createAccount', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/createAccount', {
            templateUrl: 'createAccount/createAccount.html',
            controller: 'createAccountController'
        });
    }])

    .controller('createAccountController', [ '$scope', '$location', '$cookies', 'createAccountFactory', function($scope, $location, $cookies, createAccountFactory) {


        $scope.goToHome = function(){
            $location.path('/home');
        };

        $scope.goToUnadmittedPatients = function() {
            $location.path('/unadmittedPatients');
        };

        $scope.goToAddPatient = function() {
            $location.path('/addPatient');
        };

        $scope.goToAddDoctor = function() {
            $location.path('/addDoctor');
        };

        $scope.goToCreateAccount = function() {
            $location.path('/createAccount');
        };


        $scope.createAccount = function(firstName, lastName, username, password, email, role) {
            $scope.addedPatient = false;
            $scope.invalidPatientForm = false;
            var accountObject = {
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "password": password,
                "email": email,
                "role": role
            };

            if ($scope.addPatientForm.$pristine || $scope.addPatientForm.$invalid) {
                $scope.invalidQuestionForm = true;
                $scope.addedQuestion = false;
            } else {
                createAccountFactory.createAccount(accountObject).then(
                    function(responseSuccess) {
                        $scope.addedPatient = true;
                        $scope.invalidPatientForm = false;
                        $scope.addPatientForm.$setPristine();
                    },
                    function(responseError) {
                        $scope.addedPatient = false;
                        $scope.invalidPatientForm = false;
                    }
                );
            }
        }


    }]);