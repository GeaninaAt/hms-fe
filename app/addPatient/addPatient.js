/**
 * Created by gatomulesei on 8/11/2017.
 */
'use strict';

angular.module('myApp.addPatient', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/addPatient', {
            templateUrl: 'addPatient/addPatient.html',
            controller: 'addPatientController'
        });
    }])

    .controller('addPatientController', [ '$scope', '$location', '$cookies', 'addPatientFactory', function($scope, $location, $cookies, addPatientFactory) {

        $scope.goToHome = function(){
            $location.path('/home');
        }

        $scope.goToUnadmittedPatients = function() {
            $location.path('/unadmittedPatients');
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

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };


        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }

        $scope.form = {};


        $scope.addPatient = function(firstName, lastName, cnp, dateOfBirth, email, phoneNumber, bloodType, otherInfo) {

            $scope.addedPatient = false;
            $scope.invalidPatientForm = false;
            var patientObject = {
                "firstName": firstName,
                "lastName": lastName,
                "cnp": cnp,
                "dateOfBirth": dateOfBirth,
                "email": email,
                "phoneNumber": phoneNumber,
                "bloodType": bloodType,
                "otherInfo": otherInfo
            };

            if ($scope.addPatientForm.$pristine || $scope.addPatientForm.$invalid) {
                $scope.invalidQuestionForm = true;
                $scope.addedQuestion = false;
            } else {
                addPatientFactory.addPatient(patientObject).then(
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