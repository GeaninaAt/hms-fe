/**
 * Created by gatomulesei on 8/23/2017.
 */
'use strict';

angular.module('myApp.updateAdmission', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/updateAdmission', {
            templateUrl: 'updateAdmission/updateAdmission.html',
            controller: 'updateAdmissionController'
        });
    }])

    .controller('updateAdmissionController', [ '$scope', '$location', '$cookies', 'updateAdmissionFactory', function($scope, $location, $cookies, updateAdmissionFactory) {


        var requestId = {
            admissionId: $location.search().idAdmission
        };
        updateAdmissionFactory.getAdmission(requestId.admissionId).then(function(response){
            $scope.currentAdmission = response.data;
            console.log($scope.currentAdmission)
        });


        $scope.updateAdmission = function(id) {
            $scope.addedPatient = false;
            $scope.invalidPatientForm = false;

            id = $scope.currentAdmission.id;
            var admissionObject = {
                "diagnosis": $scope.diagnosis,
                "treatmentInfo": $scope.treatmentInfo,
                "dischargeDate": $scope.dischargeDate
            };
            updateAdmissionFactory.updateAdmission(id, admissionObject).then(function(response) {
                $scope.addedPatient = true;
                $scope.invalidPatientForm = false;
                console.log($scope.currentAdmission);
            })
        };

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

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
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

    }]);